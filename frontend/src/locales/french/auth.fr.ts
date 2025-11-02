const AuthLocaleFR = {
    title: {
        signIn: "Se connecter",
        signUp: "S'inscrire",
    },
    or: "ou",
    form: {
        inputs: {
            email: {
                placeholder: "Entrez votre adresse e-mail",
            },
            password: {
                placeholder: "Entrez votre mot de passe",
            },
            newPassword: {
                placeholder: "Entrez votre nouveau mot de passe",
            },
            pseudo: {
                placeholder: "Entrez votre pseudo",
            }
        },
        success: {
            resetLinkSent: "Un lien de réinitialisation a été envoyé à votre adresse e-mail si elle est associée à un compte.",
            resetPassword: "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
        },
        errors: {
            email: "Veuillez entrer une adresse e-mail valide.",
            pseudo: 'Le pseudo est requis.',
            resetPassword: 'Une erreur est survenue lors de la tentative de réinitialisation du mot de passe. Veuillez réessayer plus tard.',
            oauth: {
                account_not_linked: "Cette e-mail est déjà associée à un autre compte. Veuillez vous connecter en utilisant cette méthode d'abord pour lier vos comptes.",
            },
            password: {
                required: "Le mot de passe est requis.",
                minLength: "Le mot de passe doit contenir au moins 8 caractères.",
                maxLength: "Le mot de passe ne doit pas dépasser 128 caractères.",
            },
            "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL": "L'utilisateur existe déjà, veuillez utiliser une autre adresse e-mail.",
            "INVALID_EMAIL_OR_PASSWORD": 'E-mail ou mot de passe invalide.',
            forgotPassword: 'Une erreur est survenue lors de la tentative de réinitialisation du mot de passe. Veuillez réessayer plus tard.',
        },
        confirmChangePassword: "Changer le mot de passe",
        confirmLogin: "Se connecter",
        confirmRegister: "S'inscrire",
        sendResetLink: "Envoyer le lien de réinitialisation",
        forgotPassword: "Mot de passe oublié ?"
    }
}

export default AuthLocaleFR;