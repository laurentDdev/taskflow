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
import { Link } from "react-router";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useState } from "react";
import authApi from "@/apis/auth.api";
import { useAuth } from "@/contexts/auth";

const formSchema = z.object({
  email: z.email({ message: i18n.t("pages.register.errors.email") }),
  pseudo: z
    .string()
    .min(3, i18n.t("pages.register.errors.pseudo.min"))
    .max(20, i18n.t("pages.register.errors.pseudo.max")),
  password: z
    .string()
    .min(6, i18n.t("pages.register.errors.password.min"))
    .max(100, i18n.t("pages.register.errors.password.max")),
});

const RegisterPage = () => {
  const { t } = useTranslation();
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      pseudo: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const registerUser = await authApi.registerUser(
        data.email,
        data.pseudo,
        data.password,
      );
      setUser(registerUser);
    } catch (error) {
      const err = error as string;
      setError(err);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevstate) => !prevstate);
  };

  return (
    <div className={"h-screen flex items-center justify-center"}>
      <Card className={"w-full sm:max-w-md"}>
        <CardHeader className={"text-center"}>
          <CardTitle>TaskFlow</CardTitle>
          <CardDescription>{t("slogan")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id={"form-register"} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name={"email"}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={"form-register-email"}>
                      {t("pages.register.email")}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder={"ex: exemple@gmail.com"}
                        autoComplete={"off"}
                        aria-invalid={fieldState.invalid}
                        id={"form-register-email"}
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
                name={"pseudo"}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={"form-register-pseudo"}>
                      {t("pages.register.pseudo")}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder={"ex: Power"}
                        aria-invalid={fieldState.invalid}
                        id={"form-register-pseudo"}
                      />
                      <InputGroupAddon>
                        <FaUser />
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
                    <FieldLabel htmlFor={"form-register-password"}>
                      {t("pages.register.password")}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder={"***********"}
                        autoComplete={"off"}
                        aria-invalid={fieldState.invalid}
                        id={"form-register-password"}
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
            <Button type={"submit"} form={"form-register"}>
              {t("pages.register.confirm")}
            </Button>
          </Field>
          <Field className={"text-center"}>
            <Link to="/auth">{t("pages.register.hasAccount")}</Link>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
