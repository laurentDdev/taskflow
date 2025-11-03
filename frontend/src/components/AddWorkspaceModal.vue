<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import * as z from "zod";

const { t } = useI18n();

const modalRef = ref<HTMLDialogElement | null>(null);

const schema = computed(() =>
    z.object({
        name: z
            .string({
                message: t("modal.workspace.add.form.errors.name.required"),
            })
            .min(3, {
                message: t("modal.workspace.add.form.errors.name.minLength", {
                    min: 3,
                }),
            })
            .max(25, {
                message: t("modal.workspace.add.form.errors.name.maxLength", {
                    max: 25,
                }),
            }),
        description: z
            .string({
                message: t(
                    "modal.workspace.add.form.errors.description.required",
                ),
            })
            .min(10, {
                message: t(
                    "modal.workspace.add.form.errors.description.minLength",
                    {
                        min: 10,
                    },
                ),
            })
            .max(100, {
                message: t(
                    "modal.workspace.add.form.errors.description.maxLength",
                    {
                        max: 100,
                    },
                ),
            }),
    }),
);

const { values, defineField, errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema.value),
});

const [name, nameAttrs] = defineField("name"),
    [description, descriptionAttrs] = defineField("description");

const onSubmit = handleSubmit(async (values) => {});
</script>

<template>
    <div
        class="btn btn-primary w-full flex items-center gap-2"
        @click="() => modalRef?.showModal()"
    >
        <v-icon name="fa-plus" />
        {{ t("button.newWorkspace") }}
    </div>
    <dialog id="my_modal_add_workspace" ref="modalRef" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold text-center mb-5">
                {{ t("modal.workspace.add.title") }}
            </h3>
            <form id="add-workspace-form" class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label
                        for="name"
                        class="input outline-none w-full"
                        :class="
                            errors.name
                                ? 'input-error'
                                : values.name &&
                                  values.name.length > 0 &&
                                  'input-success'
                        "
                    >
                        <v-icon name="md-workspacesfilled" />
                        <input
                            id="name"
                            v-bind="nameAttrs"
                            v-model="name"
                            type="text"
                            :placeholder="t('modal.workspace.add.form.name')"
                        />
                    </label>
                    <p v-if="errors.name" class="text-error">
                        {{ errors.name }}
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <textarea
                        class="w-full resize-none textarea"
                        :class="
                            errors.description
                                ? 'input-error'
                                : values.description &&
                                  values.description.length > 0 &&
                                  'input-success'
                        "
                        id="description"
                        rows="5"
                        v-bind="descriptionAttrs"
                        v-model="description"
                        type="text"
                        :placeholder="t('modal.workspace.add.form.description')"
                    />
                    <p v-if="errors.description" class="text-error">
                        {{ errors.description }}
                    </p>
                </div>
                <button class="btn btn-primary">
                    <v-icon name="fa-plus" />
                    {{ t("modal.workspace.add.form.confirm") }}
                </button>
            </form>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<style scoped>
/*
 * Supprime l'animation de fermeture par défaut de DaisyUI qui
 * déplace et rétrécit la modale vers le haut de la page.
 */
.modal-box {
    transition: none;
}
</style>
