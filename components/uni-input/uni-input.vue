<template>
  <div class="uni-input" :class="{ 'uni-input--error': showError }">
    <input
      class="uni-input__control"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <div class="uni-input__label" v-if="label">{{ label }}</div>
    <div class="uni-input__error" v-if="showError">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "UniInput",
  props: {
    label: String,
    value: [String, Number],
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    errorMessage: String,
    showError: Boolean,
  },
};
</script>

<style scoped>
.uni-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.uni-input--error .uni-input__control {
  border-color: #ff4d4f;
}

.uni-input__label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.uni-input__control {
  padding: 12px 16px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  height: 48px;
  outline: none;
}

.uni-input__control::placeholder {
  color: #bfbfbf;
}

.uni-input__error {
  margin-top: 8px;
  font-size: 14px;
  color: #ff4d4f;
}
</style>
