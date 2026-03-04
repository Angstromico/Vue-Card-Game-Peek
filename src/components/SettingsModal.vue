<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  isTimeLimitEnabled,
  timeLimit,
  isAttemptLimitEnabled,
  attemptLimit,
  isSoundEnabled,
} from '../composables/useGameSettings'
import useI18n from '../composables/useI18n'

const emit = defineEmits(['close', 'save'])
const { t, locale } = useI18n()

const localIsTimeLimitEnabled = ref(isTimeLimitEnabled.value)
const localTimeLimit = ref(timeLimit.value)
const localIsAttemptLimitEnabled = ref(isAttemptLimitEnabled.value)
const localAttemptLimit = ref(attemptLimit.value)
const localIsSoundEnabled = ref(isSoundEnabled.value)

// Reset local state when modal opens
watchEffect(() => {
  localIsTimeLimitEnabled.value = isTimeLimitEnabled.value
  localTimeLimit.value = timeLimit.value
  localIsAttemptLimitEnabled.value = isAttemptLimitEnabled.value
  localAttemptLimit.value = attemptLimit.value
  localIsSoundEnabled.value = isSoundEnabled.value
})

const saveSettings = () => {
  isTimeLimitEnabled.value = localIsTimeLimitEnabled.value
  timeLimit.value = localTimeLimit.value
  isAttemptLimitEnabled.value = localIsAttemptLimitEnabled.value
  attemptLimit.value = localAttemptLimit.value
  isSoundEnabled.value = localIsSoundEnabled.value
  emit('save')
  emit('close')
}
</script>

<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>{{ t('settings').value }}</h2>

      <div class="setting-group">
        <label>
          {{ t('language').value }}
          <select v-model="locale" class="lang-select">
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>
      </div>

      <div class="setting-group">
        <label>
          <input type="checkbox" v-model="localIsSoundEnabled" />
          {{ t('enableSound').value }}
        </label>
      </div>

      <div class="setting-group">
        <label>
          <input type="checkbox" v-model="localIsTimeLimitEnabled" />
          {{ t('enableTimeLimit').value }}
        </label>
        <div v-if="localIsTimeLimitEnabled" class="input-row">
          <label for="timeLimit">{{ t('timeLimitSeconds').value }}</label>
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
          {{ t('enableAttemptLimit').value }}
        </label>
        <div v-if="localIsAttemptLimitEnabled" class="input-row">
          <label for="attemptLimit">{{ t('maxAttempts').value }}</label>
          <input
            id="attemptLimit"
            type="number"
            min="8"
            v-model.number="localAttemptLimit"
          />
        </div>
      </div>

      <div class="actions">
        <button class="btn-cancel" @click="$emit('close')">
          {{ t('cancel').value }}
        </button>
        <button class="btn-save" @click="saveSettings">
          {{ t('saveRestart').value }}
        </button>
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
  background: var(--bg-panel);
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  color: var(--text-main);
}

h2 {
  margin-top: 0;
  text-align: center;
  margin-bottom: 20px;
  font-family: inherit;
  color: var(--primary);
}

.setting-group {
  margin-bottom: 20px;
  background: var(--bg-panel-light);
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
  accent-color: var(--primary);
}

.input-row {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 28px;
}

.lang-select {
  margin-left: auto;
  padding: 5px 10px;
  background: var(--bg-main);
  color: var(--text-main);
  border: 1px solid var(--border);
  border-radius: 4px;
}

.lang-select:focus {
  outline: none;
  border-color: var(--primary);
}

input[type='number'] {
  width: 80px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-main);
  font-size: 1rem;
}

input[type='number']:focus {
  outline: none;
  border-color: var(--primary);
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
  color: var(--text-muted);
}

.btn-cancel:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.1);
}

.btn-save {
  background: var(--primary);
  color: var(--bg-main);
}

.btn-save:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
}
</style>
