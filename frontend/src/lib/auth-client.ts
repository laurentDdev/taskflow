import { createAuthClient} from "better-auth/vue";

export const {signIn, signUp, useSession, requestPasswordReset, getSession} = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL as string
})