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
import { useState } from "react";
import { signUp } from "@/lib/auth-client";

const RegisterPage = () => {
  const { t } = useTranslation(["register", "common"]);

  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    email: z.email({ message: t("errors.email") }),
    pseudo: z
      .string()
      .min(3, t("errors.pseudo.min"))
      .max(20, t("errors.pseudo.max")),
    password: z
      .string()
      .min(6, t("errors.password.min"))
      .max(100, t("errors.password.max")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      pseudo: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const { data, error } = await signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.pseudo,
    });
    if (!error && data && data.user) {
      setError(null);
    }
    if (error) {
      setError(error.message || "An error occurred");
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
          <CardDescription>{t("slogan", { ns: "common" })}</CardDescription>
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
                      {t("email")}
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
                      {t("pseudo")}
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
                      {t("password")}
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
              <p className="text-[var(--error)]">{error}</p>
            </Field>
          )}
          <Field>
            <Button type={"submit"} form={"form-register"}>
              {t("confirm")}
            </Button>
          </Field>
          <Field className={"text-center"}>
            <Link to="/auth">{t("hasAccount")}</Link>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
