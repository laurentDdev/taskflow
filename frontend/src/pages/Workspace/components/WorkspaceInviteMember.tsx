import workspaceApi from "@/apis/workspace.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaLink, FaPlus } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import * as z from "zod";

interface WorkspaceInviteMemberProps {
  children: React.ReactNode;
  workspaceId: string;
}

const WorkspaceInviteMember = ({
  children,
  workspaceId,
}: WorkspaceInviteMemberProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("workspace");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const formSchema = z.object({
    email: z.email(t("inviteMembersCard.errors.email")),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await workspaceApi.inviteMemberToWorkspace(workspaceId, data.email);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        form.reset();
      }, 3000);
    } catch (error) {
      const err = error as { message: string };
      setError(err.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>{t("inviteMembersCard.title")}</DialogTitle>
          <DialogDescription>
            {t("inviteMembersCard.description")}
          </DialogDescription>
        </DialogHeader>
        <form
          id="form-invite-member-workspace"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="from-invite-member-workspace-email">
                  {t("inviteMembersCard.label")}
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    type="email"
                    id="from-invite-member-workspace-email"
                    placeholder={t("inviteMembersCard.placeholder")}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon>
                    <MdEmail />
                  </InputGroupAddon>
                </InputGroup>
                {success && (
                  <div className="text-[var(--success)]">
                    {t("inviteMembersCard.success")}
                  </div>
                )}
                {error && <div className="text-[var(--error)]">{t(error)}</div>}
                <Button>
                  <FaPlus />
                  {t("inviteMembersCard.submit")}
                </Button>
                <Button variant={"secondary"}>
                  <FaLink />
                  {t("inviteMembersCard.generateLink")}
                </Button>
              </Field>
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkspaceInviteMember;
