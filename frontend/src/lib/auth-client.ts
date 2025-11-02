import { createAuthClient} from "better-auth/vue";

export const {signIn, signUp, useSession, signOut, requestPasswordReset, getSession, resetPassword} = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL as string
})