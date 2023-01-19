<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        class="absolute top-0 left-0 flex h-screen w-full justify-center bg-black bg-opacity-30 px-8"
        v-show="modalActive"
      >
        <Transition name="modal-inner">
          <div
            class="mt-32 max-w-screen-md self-start rounded-md bg-skin-fill-inverted p-4"
            v-if="modalActive"
          >
            <slot />
            <button
              class="mt-8 rounded-md bg-skin-button-accent py-2 px-6 text-skin-base hover:bg-skin-button-accent-hover"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  defineEmits(['close-modal'])
  defineProps({
    modalActive: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped>
  .modal-outer-enter-active,
  .modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-outer-enter-from,
  .modal-outer-leave-to {
    opacity: 0;
  }

  .modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }

  .modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-inner-enter-from {
    transform: scale(0.8);
    opacity: 0;
  }

  .modal-inner-leave-to {
    transform: scale(0.8);
  }
</style>
