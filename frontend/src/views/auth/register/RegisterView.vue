<script setup lang="ts">

import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import * as z from "zod";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import {signUp} from "../../../lib/auth-client.ts";

const {t} = useI18n()

const schema = computed(() => z.object({
  pseudo: z.string({message: t('auth.form.errors.pseudo')}),
  email: z.string().email({message: t('auth.form.errors.email')}),
  password: z.string({message: t('auth.form.errors.password.required')})
      .min(8, {message: t('auth.form.errors.password.minLength')})
      .max(128, {message: t('auth.form.errors.password.maxLength')}),
}))


const {values, defineField, errors, handleSubmit, isSubmitting} = useForm({
  validationSchema: toTypedSchema(schema.value)
})

const [pseudo, pseudoAttrs] = defineField("pseudo")
const [email, emailAttrs] = defineField("email")
const [password, passwordAttrs] = defineField("password")

const showPassword = ref(false)
const errorSubmitting = ref("")
const passwordRef = ref<HTMLInputElement | null>(null)

const handleViewPassword = () => {
  showPassword.value = !showPassword.value
  if (passwordRef.value) {
    passwordRef.value.type = showPassword.value ? 'text' : 'password'
  }
}


const onSubmit =  handleSubmit(async (values) => {
  
  errorSubmitting.value.length > 0 && (errorSubmitting.value = "")

  const {data, error} = await signUp.email({
    email: values.email,
    password: values.password,
    name: values.pseudo,
    callbackURL: window.location.origin,
  })

  if (error) {
    errorSubmitting.value = t('auth.form.errors.'+ error.code)
  }

})

</script>

<template>
  <form id="form-register" class="flex flex-col gap-4" @submit="onSubmit">
    <div class="flex flex-col gap-2">
      <label for="pseudo" class="input outline-none w-full"  :class="errors.pseudo ? 'input-error' : values.pseudo && values.pseudo?.length > 0 && 'input-success'">
        <v-icon name="fa-user-alt" />
        <input id="pseudo" type="text" v-bind="pseudoAttrs" v-model="pseudo" :placeholder="t('auth.form.inputs.pseudo.placeholder')" />
      </label>
    </div>
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
      <button class="btn btn-primary" form="form-register" type="submit" :disabled="isSubmitting">
        {{t("auth.form.confirmRegister")}}
      </button>
    </div>
  </form>
</template>

<style scoped>

</style>