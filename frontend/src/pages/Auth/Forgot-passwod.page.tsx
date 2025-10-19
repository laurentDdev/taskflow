import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import i18n from "../../i18n";
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
import authApi from "@/apis/auth.api";
import { useState } from "react";

const formSchema = z.object({
  email: z.email({ message: i18n.t("pages.forgotPassword.errors.email") }),
});

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [success, sendSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      const response = await authApi.sendResetPasswordEmail(data.email);
      if (response.message) {
        sendSuccess(true);
        setTimeout(() => {
          sendSuccess(false);
          form.reset();
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      sendSuccess(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{t("pages.forgotPassword.title")}</CardTitle>
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
                    {t("pages.forgotPassword.email")}
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
              {t("pages.forgotPassword.confirm")}
            </Button>
            {success && (
              <div className="text-green-500">
                {t("pages.forgotPassword.success")}
              </div>
            )}
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
