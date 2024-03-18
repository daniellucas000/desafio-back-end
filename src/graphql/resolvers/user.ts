import { User } from '../../entity/User';
import { AppDataSource } from '../../data-source';
import { z } from 'zod';

interface CreateUserArgsProps {
  name: string;
  email: string;
  birthDate: Date;
  password: string;
}

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  birthDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: 'birthDate must be valid data',
  }),
  password: z
    .string()
    .min(6)
    .refine((value) => /\d/.test(value), {
      message: 'Password must contain at least one digit',
    }),
});

export const resolvers = {
  Query: {
    user: async (_: unknown, args: { id: number }) => {
      return await AppDataSource.manager.findOne(User, { where: { id: args.id } });
    },
    users: async () => {
      return await AppDataSource.manager.find(User);
    },
  },
  Mutation: {
    createUser: async (_: unknown, args: { input: CreateUserArgsProps }) => {
      const validation = userSchema.safeParse(args.input);

      if (!validation.success) {
        throw new Error('Validation error');
      }

      const existingUser = await AppDataSource.manager.findOne(User, { where: { email: args.input.email } });
      if (existingUser) {
        throw new Error('The email address already exists.');
      }

      const newUser = new User();
      Object.assign(newUser, validation.data);

      const savedUser = await AppDataSource.manager.save(newUser);
      return savedUser;
    },
  },
};
