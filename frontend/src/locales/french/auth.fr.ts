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
            pseudo: {
                placeholder: "Entrez votre pseudo",
            }
        },
        errors: {
            email: "Veuillez entrer une adresse e-mail valide.",
            pseudo: 'Le pseudo est requis.',
            password: {
                required: "Le mot de passe est requis.",
                minLength: "Le mot de passe doit contenir au moins 8 caractères.",
                maxLength: "Le mot de passe ne doit pas dépasser 128 caractères.",
            },
            "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL": "L'utilisateur existe déjà, veuillez utiliser une autre adresse e-mail.",
        },
        confirmLogin: "Se connecter",
        confirmRegister: "S'inscrire",
        forgotPassword: "Mot de passe oublié ?"
    }
}

export default AuthLocaleFR;