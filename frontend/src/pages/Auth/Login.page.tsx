import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";

const LoginPage = () => {
  const { t } = useTranslation(["login", "common"]);
  const { login } = useAuth();

  const formSchema = z.object({
    email: z.email({ message: t("errors.email") }),
    password: z
      .string()
      .min(6, t("errors.password.min"))
      .max(100, t("errors.password.max")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      login(data.email, data.password);
    } catch (error) {
      const err = error as string;
      setError(err);
    }
  };

  const handleSocialLogin = (social: string) => {
    console.log(`Social login with ${social}`);
    window.location.href = `${import.meta.env.VITE_API_URL}/${social}/redirect`;
  };

  const handleShowPassword = () => {
    setShowPassword((prevstate) => !prevstate);
  };

  useEffect(() => {
    if (searchParams.get("error")) {
      setError(searchParams.get("error") as string);
    }
  }, [searchParams]);

  return (
    <div className={"h-screen flex items-center justify-center"}>
      <Card className={"w-full sm:max-w-md"}>
        <CardHeader className={"text-center"}>
          <CardTitle>TaskFlow</CardTitle>
          <CardDescription>{t("slogan", { ns: "common" })}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id={"form-login"} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name={"email"}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={"form-login-email"}>
                      {t("email")}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder={"ex: exemple@gmail.com"}
                        autoComplete={"off"}
                        aria-invalid={fieldState.invalid}
                        id={"form-login-email"}
                      />
                      <InputGroupAddon>
                        <MdEmail />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={"password"}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={"form-login-password"}>
                      {t("password")}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder={"***********"}
                        autoComplete={"off"}
                        aria-invalid={fieldState.invalid}
                        id={"form-login-password"}
                      />
                      <InputGroupAddon>
                        <RiLockPasswordFill />
                      </InputGroupAddon>
                      <InputGroupAddon
                        align={"inline-end"}
                        onClick={handleShowPassword}
                        className="cursor-pointer hover:scale-110 transition-transform ease-in-out"
                      >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className={"flex flex-col gap-2"}>
          {error && (
            <Field>
              <p className="text-red-500">{error}</p>
            </Field>
          )}
          <Field>
            <Button type={"submit"} form={"form-login"}>
              {t("confirm")}
            </Button>
          </Field>
          <FieldGroup className={"flex flex-row"}>
            <Field>
              <Button
                type={"button"}
                onClick={() => handleSocialLogin("github")}
              >
                <FaGithub />
                Github
              </Button>
            </Field>
            <Field>
              <Button
                type={"button"}
                onClick={() => handleSocialLogin("google")}
              >
                <FaGoogle />
                Google
              </Button>
            </Field>
          </FieldGroup>
          <Field className={"text-center"}>
            <Link to="/auth/register">{t("notAccount")}</Link>
            <Link to="/auth/forgot-password">{t("forgotPassword")}</Link>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
