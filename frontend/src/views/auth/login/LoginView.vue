<script setup lang="ts">

import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";

const {t} = useI18n()

const schema = computed(() =>
    z.object({
      email: z.email({error: t('auth.form.errors.email')}),
      password: z.string({error: t('auth.form.errors.password.required')})
          .min(8, {error: t('auth.form.errors.password.minLength')})
          .max(128, {error: t('auth.form.errors.password.maxLength')}),
    })
);


const {values, defineField, errors} = useForm({
  validationSchema: toTypedSchema(schema.value)
})
const [email, emailAttrs] = defineField("email")
const [password, passwordAttrs] = defineField("password")
const showPassword = ref(false)
const passwordRef = ref<HTMLInputElement>(null)


const handleViewPassword = () => {
  showPassword.value = !showPassword.value
  if (passwordRef.value) {
    passwordRef.value.type = showPassword.value ? 'text' : 'password'
  }
}


</script>

<template>

  <form action="" class="flex flex-col gap-4">
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

      <RouterLink to="/forgot-password" class="text-center">
        {{t('auth.form.forgotPassword')}}
      </RouterLink>

    </div>
  </form>
  <div class="divider">{{t('auth.or')}}</div>
  <div class="grid grid-cols-2 gap-3">
    <button class="btn btn-outline outline-primary">
      <v-icon name="fa-github" />
      Github
    </button>
    <button class="btn btn-outline outline-primary">
      <v-icon name="fa-google"/>
      Google
    </button>
  </div>
</template>

<style scoped>

</style>