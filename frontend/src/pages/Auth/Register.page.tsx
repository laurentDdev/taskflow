import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {Link} from "react-router";


const formSchema = z.object({
    email: z.email(),
    pseudo: z.string().min(3).max(20),
    password: z.string().min(6).max(100),
})

const RegisterPage = () => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            pseudo: "",
            password: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    }


    return (
        <div className={"h-screen flex items-center justify-center"}>
            <Card className={"w-full sm:max-w-md"}>
                <CardHeader>
                    <CardTitle>TaskFlow</CardTitle>
                    <CardDescription>
                        Organise tes idées, structure ton quotidien
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id={"form-register"} onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller name={"email"} control={form.control} render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={"form-register-email"}>
                                        Email
                                    </FieldLabel>
                                    <Input {...field} id={"form-register-email"} aria-invalid={fieldState.invalid}
                                           placeholder={"exemple@gmail.com"} autoComplete={"off"}/>
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )
                                    }
                                </Field>
                            )}/>
                            <Controller name={"pseudo"} control={form.control} render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={"form-register-pseudo"}>
                                        Pseudo
                                    </FieldLabel>
                                    <Input {...field} id={"form-register-pseudo"} aria-invalid={fieldState.invalid}
                                           placeholder={"Votre pseudo"} autoComplete={"off"}/>
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )
                                    }
                                </Field>
                            )}/>
                            <Controller name={"password"} control={form.control} render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={"form-register-password"}>
                                        Mot de passe
                                    </FieldLabel>
                                    <Input {...field} type={"password"} id={"form-register-password"}
                                           aria-invalid={fieldState.invalid} placeholder={"Votre mot de passe"}
                                           autoComplete={"off"}/>
                                    {
                                        fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]}/>
                                        )
                                    }
                                </Field>
                            )}/>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className={"flex flex-col gap-2"}>
                    <Field>
                        <Button type={"submit"} >
                            S'inscrire
                        </Button>
                    </Field>
                    <FieldGroup className={"flex flex-row"}>
                        <Field>
                            <Button type={"submit"} >
                                <FaGithub />
                                Github
                            </Button>
                        </Field>
                        <Field>
                            <Button type={"submit"}>
                                <FaGoogle />
                                Google
                            </Button>
                        </Field>
                    </FieldGroup>
                    <Field className={"text-center"}>
                        <Link to={"/auth/login"} >Déjà un compte ? Connectez-vous</Link>
                    </Field>
                </CardFooter>

            </Card>
        </div>
    );
};

export default RegisterPage;