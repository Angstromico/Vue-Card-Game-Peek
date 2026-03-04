<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="settings-btn"
    @click="$emit('click')"
    aria-label="Pause Game"
    title="Pause Game"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  </button>
</template>

<style scoped>
.settings-btn {
  background: none;
  border: none;
  color: var(--text-main);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.settings-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.settings-btn svg {
  width: 28px;
  height: 28px;
}
</style>
