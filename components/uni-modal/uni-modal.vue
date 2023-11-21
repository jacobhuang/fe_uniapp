<template>
  <div class="uni-modal-mask" v-if="visible">
    <div class="uni-modal" :style="modalStyle">
      <div class="uni-modal-title">{{ title }}</div>
      <div class="uni-modal-content">
        <slot></slot>
      </div>
      <div class="uni-modal-buttons">
        <uni-button type="secondary" size="normal" @click="onCancel">{{
          cancelText
        }}</uni-button>
        <uni-button type="primary" size="normal" @click="onOk">{{
          okText
        }}</uni-button>
      </div>
    </div>
  </div>
</template>

<script>
import UniButton from "@/components/uni-button/uni-button.vue";

export default {
  name: "UniModal",
  components: {
    UniButton,
  },
  props: {
    title: {
      type: String,
      default: "提示",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    okText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    width: {
      type: [Number, String],
      default: "80%",
    },
    height: {
      type: [Number, String],
      default: "auto",
    },
    closeOnClickMask: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    modalStyle() {
      return {
        width: typeof this.width === "number" ? `${this.width}px` : this.width,
        height:
          typeof this.height === "number" ? `${this.height}px` : this.height,
      };
    },
  },
  methods: {
    onOk() {
      this.$emit("ok");
    },
    onCancel() {
      this.$emit("cancel");
    },
    onClickMask() {
      if (this.closeOnClickMask) {
        this.$emit("cancel");
      }
    },
  },
};
</script>

<style scoped>
.uni-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.uni-modal {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-width: 90%;
  max-height: 90%;
  box-sizing: border-box;
}
.uni-modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}
.uni-modal-content {
  margin-bottom: 24px;
}
.uni-modal-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
