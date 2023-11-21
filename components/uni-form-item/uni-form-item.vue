<template>
  <div class="uni-form-item" :class="{ 'uni-form-item--error': showError }">
    <div class="uni-form-item__label" v-if="label">{{ label }}</div>
    <div class="uni-form-item__content">
      <slot></slot>
    </div>
    <div class="uni-form-item__error" v-if="showError">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "UniFormItem",
  props: {
    label: String,
    errorMessage: String,
    showError: Boolean,
  },
};
</script>

<style scoped>
.uni-form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.uni-form-item--error .uni-form-item__content {
  border-color: #ff4d4f;
}

.uni-form-item__label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.uni-form-item__content {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  height: 48px;
}

.uni-form-item__error {
  margin-top: 8px;
  font-size: 14px;
  color: #ff4d4f;
}
</style>
