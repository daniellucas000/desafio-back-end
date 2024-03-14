interface User {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  password: string;
}

interface CreateUserArgs {
  name: string;
  email: string;
  birthDate: string;
  password: string;
}

const users: User[] = [];

export const resolvers = {
  Query: {
    user: (_: unknown, args: User) => {
      return users.find((user) => user.id === args.id);
    },
    users: () => {
      return users;
    },
  },
  Mutation: {
    createUser: (_: unknown, args: CreateUserArgs) => {
      const newUser: User = {
        id: users.length + 1,
        name: args.name,
        email: args.email,
        birthDate: args.birthDate,
        password: args.password,
      };
      users.push(newUser);
      return newUser;
    },
  },
};
