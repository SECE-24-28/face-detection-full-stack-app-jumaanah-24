import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/jwt";

export const resolvers = {
  Query: {
    hello: () => "GraphQL Working",
  },

  Mutation: {
    signup: async (
      _: any,
      { email, password }: any
    ) => {
      const existingUser =
        await prisma.user.findUnique({
          where: { email },
        });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const user =
        await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        });

      const token =
        generateToken(user.id);

      return {
        token,
        user,
      };
    },

    login: async (
      _: any,
      { email, password }: any
    ) => {
      const user =
        await prisma.user.findUnique({
          where: { email },
        });

      if (!user) {
        throw new Error("User not found");
      }

      const valid =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!valid) {
        throw new Error("Invalid password");
      }

      const token =
        generateToken(user.id);

      return {
        token,
        user,
      };
    },
  },
};