import { User } from '../../entity/User';
import { AppDataSource } from '../../data-source';
import { z } from 'zod';
import bcrypt from 'bcrypt';
interface CreateUserArgsProps {
  name: string;
  email: string;
  birthDate: Date;
  password: string;
}

interface UserArgs {
  id: number;
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
    .refine((value) => /[a-zA-Z]/.test(value), {
      message: 'Password must contain at least one digit',
    }),
});

export const resolvers = {
  Query: {
    user: (_: unknown, args: UserArgs) => {
      return AppDataSource.manager.findOne(User, { where: { id: args.id } });
    },
    users: () => {
      return AppDataSource.manager.find(User);
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

      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(args.input.password, saltRounds);

      const newUser = new User();
      Object.assign(newUser, validation.data);
      newUser.password = hashedPassword;

      return AppDataSource.manager.save(newUser);
    },
  },
};
