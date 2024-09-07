import "next-auth";

declare module "next-auth" {
  interface User {
    isParent: boolean;
  }
  interface Session {
    userCredentails: User;
  }
  interface JWT {
    userCredentials: User;
  }
}
