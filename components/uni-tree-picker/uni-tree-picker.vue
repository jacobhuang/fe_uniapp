<template>
  <view>
    <uni-tree-picker :options="options" :cur-nodes="curNodes" @change="onChange"></uni-tree-picker>
  </view>
</template>

<script>
import uniTreePicker from '@/components/uni-tree-picker/uni-tree-picker.vue'
export default {
  components: {
    uniTreePicker
  },
  props: {
    options: Array, // 树形结构数据
    curNodes: Array // 选中节点
  },
  methods: {
    onChange(nodes) {
      // 处理选中节点变化逻辑
      this.$emit('change', nodes)
    }
  }
}
</script>
