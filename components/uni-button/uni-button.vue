<template>
  <button :class="['uni-btn', typeClass]" :style="btnStyle" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "UniButton",
  props: {
    type: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "normal",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    typeClass() {
      return `uni-btn-${this.type}`;
    },
    btnStyle() {
      return {
        "font-size": this.size === "large" ? "18px" : "14px",
        padding: this.size === "large" ? "12px 24px" : "8px 16px",
        "border-radius": this.size === "large" ? "8px" : "4px",
        opacity: this.disabled ? 0.5 : 1,
        "pointer-events": this.disabled ? "none" : "auto",
      };
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit("click");
      }
    },
  },
};
</script>

<style scoped>
.uni-btn {
  border: none;
  color: #fff;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease-in-out;
}
.uni-btn-primary {
  background-color: #f1d35a;
}
.uni-btn-primary:hover {
  background-color: #e2bb47;
}
.uni-btn-secondary {
  background-color: #272727;
  border: 1px solid #f1d35a;
}
.uni-btn-secondary:hover {
  background-color: #333333;
}
.uni-btn-normal {
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 4px;
}
.uni-btn-large {
  font-size: 18px;
  padding: 12px 24px;
  border-radius: 8px;
}
</style>
