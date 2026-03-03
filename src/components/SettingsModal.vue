<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  isTimeLimitEnabled,
  timeLimit,
  isAttemptLimitEnabled,
  attemptLimit,
} from '../composables/useGameSettings'

const emit = defineEmits(['close', 'save'])

const localIsTimeLimitEnabled = ref(isTimeLimitEnabled.value)
const localTimeLimit = ref(timeLimit.value)
const localIsAttemptLimitEnabled = ref(isAttemptLimitEnabled.value)
const localAttemptLimit = ref(attemptLimit.value)

// Reset local state when modal opens
watchEffect(() => {
  localIsTimeLimitEnabled.value = isTimeLimitEnabled.value
  localTimeLimit.value = timeLimit.value
  localIsAttemptLimitEnabled.value = isAttemptLimitEnabled.value
  localAttemptLimit.value = attemptLimit.value
})

const saveSettings = () => {
  isTimeLimitEnabled.value = localIsTimeLimitEnabled.value
  timeLimit.value = localTimeLimit.value
  isAttemptLimitEnabled.value = localIsAttemptLimitEnabled.value
  attemptLimit.value = localAttemptLimit.value
  emit('save')
  emit('close')
}
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Game Settings</h2>

      <div class="setting-group">
        <label>
          <input type="checkbox" v-model="localIsTimeLimitEnabled" />
          Enable Time Limit
        </label>
        <div v-if="localIsTimeLimitEnabled" class="input-row">
          <label for="timeLimit">Time (seconds):</label>
          <input
            id="timeLimit"
            type="number"
            min="10"
            v-model.number="localTimeLimit"
          />
        </div>
      </div>

      <div class="setting-group">
        <label>
          <input type="checkbox" v-model="localIsAttemptLimitEnabled" />
          Enable Attempt Limit
        </label>
        <div v-if="localIsAttemptLimitEnabled" class="input-row">
          <label for="attemptLimit">Max Attempts:</label>
          <input
            id="attemptLimit"
            type="number"
            min="8"
            v-model.number="localAttemptLimit"
          />
        </div>
      </div>

      <div class="actions">
        <button class="btn-cancel" @click="$emit('close')">Cancel</button>
        <button class="btn-save" @click="saveSettings">Save & Restart</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #1e1e2f;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  color: #fff;
}

h2 {
  margin-top: 0;
  text-align: center;
  margin-bottom: 20px;
  font-family: inherit;
  color: #42b883;
}

.setting-group {
  margin-bottom: 20px;
  background: #2a2a3f;
  padding: 15px;
  border-radius: 8px;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 1.1rem;
}

input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #42b883;
}

.input-row {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 28px;
}

input[type='number'] {
  width: 80px;
  padding: 8px;
  border: 1px solid #444;
  border-radius: 4px;
  background: #111;
  color: white;
  font-size: 1rem;
}

input[type='number']:focus {
  outline: none;
  border-color: #42b883;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
}

.btn-cancel {
  background: transparent;
  color: #aaa;
}

.btn-cancel:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.btn-save {
  background: #42b883;
  color: #1a1a1a;
}

.btn-save:hover {
  background: #33a06f;
  transform: translateY(-2px);
}
</style>
