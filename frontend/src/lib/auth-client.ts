import { createAuthClient} from "better-auth/vue";

export const {signIn, signUp, useSession} = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL as string
})