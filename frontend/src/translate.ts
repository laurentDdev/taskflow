import type ForgotPassword from "./pages/Auth/Forgot-passwod.page";

export default {
  en: {
    translation: {
      slogan: "Organise your ideas, structure your day",
      pages: {
        register: {
          email: "Email",
          password: "Password",
          pseudo: "Username",
          errors: {
            email: "Invalid email address",
            password: {
              min: "Your password must be at least 8 characters long",
              max: "Your password must be at most 100 characters long",
            },
            pseudo: {
              min: "Your username must be at least 3 characters long",
              max: "Your username must be at most 20 characters long",
            },
          },
          hasAccount: "Already have an account? Log in",
          confirm: "Sign up",
        },
        login: {
          email: "Email",
          password: "Password",
          errors: {
            email: "Invalid email address",
            password: {
              min: "Your password must be at least 8 characters long",
              max: "Your password must be at most 100 characters long",
            },
          },
          notAccount: "Don't have an account? Sign up",
          forgotPassword: "Forgot password ?",
          confirm: "Log in",
        },
        forgotPassword: {
          email: "Email",
          title: "Forgot Password",
          errors: {
            email: "Invalid email address",
          },
          confirm: "Send reset link",
        },
      },
    },
  },
  fr: {
    translation: {
      slogan: "Organise tes idées, structure ton quotidien",
      pages: {
        register: {
          email: "Email",
          password: "Mot de passe",
          pseudo: "Pseudo",
          errors: {
            email: "Votre email est invalide",
            password: {
              min: "Votre mot de passe doit contenir au moins 6 caractères",
              max: "Votre mot de passe doit contenir au plus 100 caractères",
            },
            pseudo: {
              min: "Votre pseudo doit contenir au moins 3 caractères",
              max: "Votre pseudo doit contenir au plus 20 caractères",
            },
          },
          hasAccount: "Déjà un compte ? Connectez-vous",
          confirm: "S'inscrire",
        },
        login: {
          email: "Email",
          password: "Mot de passe",
          errors: {
            email: "Votre email est invalide",
            password: {
              min: "Votre mot de passe doit contenir au moins 6 caractères",
              max: "Votre mot de passe doit contenir au plus 100 caractères",
            },
          },
          notAccount: "Vous n'avez pas de compte ? Inscrivez-vous",
          forgotPassword: "Mot de passe oublié ?",
          confirm: "Se connecter",
        },
        ForgotPassword: {
          email: "Email",
          title: "Mot de passe oublié",
          errors: {
            email: "Adresse email invalide",
          },
          confirm: "Envoyer le lien de réinitialisation",
        },
      },
    },
  },
};
