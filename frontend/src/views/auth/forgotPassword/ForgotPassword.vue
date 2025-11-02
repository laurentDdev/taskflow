<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import * as z from "zod";
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import {requestPasswordReset} from "../../../lib/auth-client.ts";

const {t} = useI18n()

const errorForgot = ref("")
const successForgot = ref(false)

const schema = computed(() => z.object({
  email: z.string({message: 'Email is required'}).email({message: t('auth.form.errors.email')}),
}))

const {values, defineField, errors, handleSubmit, resetForm} = useForm({
  validationSchema: toTypedSchema(schema.value)
})

const [email, emailAttrs] = defineField("email")

const onSubmit = handleSubmit(async (values) => {

  errorForgot.value.length > 0 && (errorForgot.value = "")

  const {data, error} = await requestPasswordReset({
    email: values.email,
    redirectTo: window.location.origin + '/auth/reset-password'
  })

  if (error) {
    errorForgot.value = t('auth.form.errors.forgotPassword')
    successForgot.value = false
  } else {
    errorForgot.value = ""
    successForgot.value = true
    resetForm()

    setTimeout(() => {
      successForgot.value = false
    }, 5000)

  }

})


</script>

<template>
  <form id="form-forgot-password" class="flex flex-col gap-3" @submit="onSubmit">
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
      <p v-if="successForgot" class="text-success">{{t('auth.form.success.resetLinkSent')}}</p>
    </div>
    <button class="btn btn-primary w-full">{{ t('auth.form.sendResetLink') }}</button>
  </form>
</template>

<style scoped>

</style>