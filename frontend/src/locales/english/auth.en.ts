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
            newPassword: {
                placeholder: "Enter your new password",
            },
            pseudo: {
                placeholder: "Enter your pseudo",

            }
        },
        success: {
            resetLinkSent: "A reset link has been sent to your email address if it is associated with an account.",
            resetPassword: "Your password has been successfully reset. You can now sign in with your new password.",
        },
        errors: {
            email: "Please enter a valid email address.",
            pseudo: 'Pseudo is required.',
            resetPassword: 'An error occurred while trying to reset the password. Please try again later.',
            oauth: {
                account_not_linked: 'This email address is already associated with another account. Please sign in using that method first to link your accounts.'
            },
            password: {
                required: "Password is required.",
                minLength: "Password must be at least 8 characters long.",
                maxLength: "Password must not exceed 128 characters.",
            },
            forgotPassword: 'An error occurred while trying to reset the password. Please try again later.',
            "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL": "User already exists, please use another email.",
            "INVALID_EMAIL_OR_PASSWORD": "Invalid email or password.",
        },
        confirmChangePassword: "Change Password",
        confirmLogin: "Sign In",
        confirmRegister: "Sign Up",
        sendResetLink: "Send Reset Link",
        forgotPassword: "Forgot Password ?"
    }
}

export default AuthLocaleEN;