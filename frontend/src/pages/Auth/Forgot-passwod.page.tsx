import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { requestPasswordReset } from "@/lib/auth-client";

const ForgotPassword = () => {
  const { t } = useTranslation("forgotPassword");
  const [success, sendSuccess] = useState(false);

  const formSchema = z.object({
    email: z.email({ message: t("errors.email") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.log(formData);
    // try {
    //   const response = await authApi.sendResetPasswordEmail(data.email);
    //   if (response.message) {
    //     sendSuccess(true);
    //     setTimeout(() => {
    //       sendSuccess(false);
    //       form.reset();
    //     }, 5000);
    //   }
    // } catch (error) {
    //   sendSuccess(true);
    //   setTimeout(() => {
    //     sendSuccess(false);
    //     form.reset();
    //   }, 5000);
    // }

    const { data, error } = await requestPasswordReset({
      email: formData.email,
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (data) {
      sendSuccess(true);
      setTimeout(() => {
        sendSuccess(false);
        form.reset();
      }, 5000);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="form-forgot-password"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-forgot-password-email">
                    {t("email")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      placeholder="ex: exemple@gmail.com"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      id="form-forgot-password-email"
                    />
                    <InputGroupAddon>
                      <MdEmail />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type={"submit"} form="form-forgot-password">
              {t("confirm")}
            </Button>
            {success && (
              <div className="text-[var(--success)]">{t("success")}</div>
            )}
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
