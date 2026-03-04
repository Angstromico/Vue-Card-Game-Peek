<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentColor = ref('#ff7518')
const currentShape = ref('')

const shapes = {
  circle: 'circle(50% at 50% 50%)',
  triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  square: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  pentagon: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  octagon:
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
}

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`
const getRandomShape = () => {
  const keys = Object.values(shapes)
  const idx = Math.floor(Math.random() * keys.length)
  return keys[idx] ?? ''
}

interface Props {
  onClick: Function
}

const props = defineProps<Props>()
const handleClick = () => {
  currentColor.value = getRandomColor()
  currentShape.value = getRandomShape() as string
  props.onClick()
}

onMounted(() => {
  currentShape.value = shapes.circle
})
</script>

<template>
  <div class="button-container">
    <div class="tooltip-wrapper" data-label="Reset Game">
      <button
        @click="handleClick"
        class="circle-button"
        :style="{ backgroundColor: currentColor }"
      >
        <div class="inner-shape" :style="{ clipPath: currentShape }"></div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-wrapper::before {
  content: attr(data-label);
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background-color: var(--bg-panel);
  color: var(--text-main);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.tooltip-wrapper::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  border-width: 6px;
  border-style: solid;
  border-color: var(--bg-panel) transparent transparent transparent;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.tooltip-wrapper:hover::before,
.tooltip-wrapper:hover::after {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.circle-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    background-color 0.5s ease,
    transform 0.2s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.circle-button:active {
  transform: scale(0.9);
}

.inner-shape {
  width: 40px;
  height: 40px;
  background-color: var(--bg-main);
  transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
