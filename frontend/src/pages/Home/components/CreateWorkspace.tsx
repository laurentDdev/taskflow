import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { MdWorkspaces } from "react-icons/md";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import useWorkspaceStore from "@/stores/workspace.store";
import { useState } from "react";

type CreateWorkspaceProps = {
  children: React.ReactNode;
};

const CreateWorkspace = ({ children }: CreateWorkspaceProps) => {
  const { t } = useTranslation("home");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);

  const { createWorkspace } = useWorkspaceStore();

  const formSchema = z.object({
    name: z
      .string({ message: t("createWorkspace.errors.name.required") })
      .min(2, t("createWorkspace.errors.name.min"))
      .max(50, t("createWorkspace.errors.name.max")),
    description: z
      .string()
      .min(2, t("createWorkspace.errors.description.min"))
      .max(100, t("createWorkspace.errors.description.max"))
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      createWorkspace(data.name, data.description || "");
      setError("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setOpen(false);
        form.reset();
      }, 500);
    } catch (error) {
      const err = error as string;
      setError(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center">
          <DialogTitle>{t("newWorkspaces")}</DialogTitle>
          <DialogDescription>{t("newWorkspaceDescription")}</DialogDescription>
        </DialogHeader>
        <form id="form-create-workspace" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name={"name"}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-workspace-name">
                    {t("createWorkspace.form.name.label")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="form-create-workspace-name"
                      placeholder={t("createWorkspace.form.name.placeholder")}
                      aria-invalid={fieldState.invalid}
                    ></InputGroupInput>
                    <InputGroupAddon>
                      <MdWorkspaces />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name={"description"}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-create-workspace-description">
                    {t("createWorkspace.form.description.label")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      className="min-h-[125px]"
                      {...field}
                      id="form-create-workspace-description"
                      placeholder={t(
                        "createWorkspace.form.description.placeholder",
                      )}
                      aria-invalid={fieldState.invalid}
                    ></InputGroupTextarea>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <Field>
          <Button
            type="submit"
            form="form-create-workspace"
            disabled={form.formState.isSubmitting}
          >
            {t("createWorkspace.form.submit")}
          </Button>
        </Field>
        {success && (
          <p className="text-green-400">{t("createWorkspace.form.success")}</p>
        )}
        {error && <FieldError errors={[{ message: error }]} />}
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
