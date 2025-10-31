const AuthLocaleEN = {
    title: {
        signIn: "Sign In",
        signUp: "Sign Up",
    },
    or: "or",
    form: {
        inputs: {
            email: {
                placeholder: "Enter your email address",
            },
            password: {
                placeholder: "Enter your password",
            },
            pseudo: {
                placeholder: "Enter your pseudo",

            }
        },
        errors: {
            email: "Please enter a valid email address.",
            pseudo: 'Pseudo is required.',
            password: {
                required: "Password is required.",
                minLength: "Password must be at least 8 characters long.",
                maxLength: "Password must not exceed 128 characters.",
            },
            "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL": "User already exists, please use another email.",
            "INVALID_EMAIL_OR_PASSWORD": "Invalid email or password.",
        },
        confirmLogin: "Sign In",
        confirmRegister: "Sign Up",
        forgotPassword: "Forgot Password ?"
    }
}

export default AuthLocaleEN;