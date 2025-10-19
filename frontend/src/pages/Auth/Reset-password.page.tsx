import { useParams } from "react-router";
import * as z from "zod";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  password: z
    .string()
    .min(6, i18n.t("pages.resetPassword.errors.password.min"))
    .max(100, i18n.t("pages.resetPassword.errors.password.max")),
});

const ResetPassword = () => {
  const { token } = useParams();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return <div className="h-screen flex items-center justify-center"></div>;
};

export default ResetPassword;
