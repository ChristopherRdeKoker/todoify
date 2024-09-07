import "next-auth";

export type OptionType = {
  text: string;
  value: string;
};
declare module "next-auth" {
  interface User {
    roles: OptionType[];
  }
  interface Session {
    userCredentails: User;
  }
  interface JWT {
    userCredentials: User;
  }
}
