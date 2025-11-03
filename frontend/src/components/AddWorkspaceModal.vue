<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const modalRef = ref<HTMLDialogElement | null>(null);
</script>

<template>
    <div
        class="btn btn-primary w-full flex items-center gap-2"
        @click="() => modalRef?.showModal()"
    >
        {{ t("button.newWorkspace") }}
        <v-icon name="fa-plus" />
    </div>
    <dialog id="my_modal_add_workspace" ref="modalRef" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Hello!</h3>
            <p class="py-4">Press ESC key or click outside to close</p>
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
