<script setup lang="ts">

import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import {signIn, signUp} from "../../../lib/auth-client.ts";

const {t} = useI18n()

const schema = computed(() =>
    z.object({
      email: z.string().email({message: t('auth.form.errors.email')}),
      password: z.string({message: t('auth.form.errors.password.required')})
          .min(8, {message: t('auth.form.errors.password.minLength')})
          .max(128, {message: t('auth.form.errors.password.maxLength')}),
    })
);


const {values, defineField, errors, handleSubmit} = useForm({
  validationSchema: toTypedSchema(schema.value)
})
const [email, emailAttrs] = defineField("email")
const [password, passwordAttrs] = defineField("password")
const showPassword = ref(false)
const passwordRef = ref<HTMLInputElement | null>(null)
const errorSubmitting = ref("")

const onSubmit =  handleSubmit(async (values) => {

  errorSubmitting.value.length > 0 && (errorSubmitting.value = "")

  const {error} = await signIn.email({
    email: values.email,
    password: values.password,
    callbackURL: window.location.origin + "/dashboard",
    rememberMe: true
  })

  if (error) {
    errorSubmitting.value = t('auth.form.errors.'+ error.code)
  }

})


const handleViewPassword = () => {
  showPassword.value = !showPassword.value
  if (passwordRef.value) {
    passwordRef.value.type = showPassword.value ? 'text' : 'password'
  }
}


</script>

<template>

  <form id="form-login" class="flex flex-col gap-4" @submit="onSubmit">
    <div class="flex flex-col gap-2">
      <label class="input outline-none w-full"
             :class="errors.email ? 'input-error' : values.email && values.email?.length > 0 && 'input-success'"
             for="email">
        <v-icon name="md-email"/>
        <input id="email" type="email" v-bind="emailAttrs" v-model="email"
               :placeholder="t('auth.form.inputs.email.placeholder')" required/>
      </label>
      <p v-if="errors.email" class="text-error">
        {{ errors.email }}
      </p>
    </div>
    <div class="flex flex-col gap-3">
      <label class="input outline-none w-full "
             :class="errors.password ? 'input-error' : values.password && values.password.length > 0 && 'input-success'"
             for="password">
        <v-icon name="bi-key-fill"/>
        <input id="password" type="password" ref="passwordRef" v-bind="passwordAttrs" v-model="password"
               :placeholder="t('auth.form.inputs.password.placeholder')" required/>
        <span @click="handleViewPassword">
        <v-icon name="fa-regular-eye-slash" v-if="showPassword"/> <v-icon v-else name="fa-regular-eye"/>

        </span>
      </label>
      <p v-if="errors.password" class="text-error">
        {{ errors.password }}
      </p>
      <p v-if="errorSubmitting.length > 0" class="text-error">
        {{ errorSubmitting }}
      </p>
      <button class="btn btn-primary" form="form-login" type="submit">
        {{t("auth.form.confirmLogin")}}
      </button>

      <RouterLink to="/auth/forgot-password" class="text-center">
        {{t('auth.form.forgotPassword')}}
      </RouterLink>

    </div>
  </form>
</template>

<style scoped>

</style>