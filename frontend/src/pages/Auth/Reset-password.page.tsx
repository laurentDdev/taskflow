import { Link, useNavigate, useParams } from "react-router";
import * as z from "zod";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/auth-client";

const ResetPassword = () => {
  const { token } = useParams();
  const { t } = useTranslation("resetPassword");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const formSchema = z.object({
    password: z
      .string()
      .min(6, i18n.t("errors.password.min"))
      .max(100, i18n.t("errors.password.max")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  if (!token) {
    return (
      <div className="h-screen flex items-center justify-center">
        Token not found
      </div>
    );
  }

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // try {
    //   const response = await authApi.resetPassword(token, data.password);
    //   if (response.message) {
    //     setSuccess(true);
    //     setError(false);
    //     setTimeout(() => {
    //       navigate("/auth");
    //     }, 2000);
    //   }
    // } catch (error) {
    //   if (error) {
    //     setError(true);
    //     setSuccess(false);
    //   }
    // }

    const { error } = await resetPassword({
      newPassword: data.password,
      token,
    });
    if (error) {
      setError(true);
      setSuccess(false);
    } else {
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-reset-password" onSubmit={form.handleSubmit(onSubmit)}>
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center gap-2">
          <Field>
            <Button type="submit" form="form-reset-password">
              {t("confirm")}
            </Button>
          </Field>
          <Field>
            <Link to="/auth">{t("backToLogin")}</Link>
          </Field>
          <Field>
            {error && <FieldError errors={[{ message: t("error") }]} />}
            {success && (
              <p className="font-bold text-[var(--success)]">{t("success")}</p>
            )}
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
