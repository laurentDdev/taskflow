import { getUser } from "@/apis/auth.api";

export const rootLoader = () => {
  return getUser();
};
