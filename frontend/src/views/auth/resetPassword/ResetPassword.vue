<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useForm} from "vee-validate";
import {computed, ref} from "vue";
import * as z from "zod";
import {useI18n} from "vue-i18n";
import {toTypedSchema} from "@vee-validate/zod";
import {resetPassword} from "../../../lib/auth-client.ts";

const {t} = useI18n()

const route = useRoute()
const router = useRouter()

const resetToken = route.params['resetToken']


const schema = computed(() => z.object({
  password: z.string({message: t('auth.form.errors.password.required')})
      .min(8, {message: t('auth.form.errors.password.minLength')})
      .max(128, {message: t('auth.form.errors.password.maxLength')}),
}))

const {values, defineField, errors, handleSubmit, resetForm} = useForm({
  validationSchema: toTypedSchema(schema.value)
})

const showPassword = ref(false)
const passwordRef = ref<HTMLInputElement | null>(null)
const errorSubmitting = ref("")
const successSubmitting = ref("")

const [password, passwordAttrs] = defineField("password")

const onSubmit = handleSubmit(async (values) => {
  const {error} = await resetPassword({
    newPassword: values.password,
    token: resetToken as string
  })

  if (error) {
    errorSubmitting.value = t('auth.form.errors.resetPassword')
    setTimeout(() => {
      errorSubmitting.value = ""
    }, 5000)
    return
  }
  successSubmitting.value = t('auth.form.success.resetPassword')
  resetForm()
  setTimeout(() => {
    successSubmitting.value = ""
    router.push('/auth')
  }, 5000)

})


const handleViewPassword = () => {
  showPassword.value = !showPassword.value
  if (passwordRef.value) {
    passwordRef.value.type = showPassword.value ? 'text' : 'password'
  }
}


</script>

<template>
  <div v-if="!resetToken">
    <p class="text-center">Invalid password reset link.</p>
  </div>
  <form v-else id="form-reset-password" @submit="onSubmit" class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <label class="input outline-none w-full "
             :class="errors.password ? 'input-error' : values.password && values.password.length > 0 && 'input-success'"
             for="password">
        <v-icon name="bi-key-fill"/>
        <input id="password" type="password" ref="passwordRef" v-bind="passwordAttrs" v-model="password"
               :placeholder="t('auth.form.inputs.newPassword.placeholder')" required/>
        <span @click="handleViewPassword">
        <v-icon name="fa-regular-eye-slash" v-if="showPassword"/> <v-icon v-else name="fa-regular-eye"/>

        </span>
      </label>
    </div>
    <button class="btn btn-primary" form="form-reset-password" type="submit">
      {{ t('auth.form.confirmChangePassword') }}
    </button>
    <p v-if="errorSubmitting.length > 0" class="text-error
">
      {{ errorSubmitting }}
    </p>
    <p v-if="successSubmitting.length > 0" class="text-success">
      {{ successSubmitting }}
    </p>
  </form>
</template>

<style scoped>

</style>