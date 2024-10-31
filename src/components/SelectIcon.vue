<template>
  <div
    :class="['icon-container', { selected: selected }]"
    @click="toggleSelect"
  >
    <svg
      v-if="selected"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path fill="white" d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="#ccc"
        stroke-width="2"
      />
      <path fill="white" d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z" />
    </svg>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:isSelected"],
  setup(props, { emit }) {
    const selected = computed(() => props.isSelected);

    const toggleSelect = () => {
      emit("update:isSelected", !props.isSelected);
    };

    return {
      selected,
      toggleSelect,
    };
  },
});
</script>

<style scoped>
.icon-container {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-container.selected {
  background-color: var(--primary-color);
}
</style>
