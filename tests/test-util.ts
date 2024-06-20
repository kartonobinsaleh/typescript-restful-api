import { prismaClient } from "../src/applications/database";

export class UserTest {
  static async delete(username: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      await prismaClient.user.delete({
        where: {
          username: username,
        },
      });
    }
  }
}
