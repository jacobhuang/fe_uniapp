<template>
  <div class="classify-margin">
    <header>
      <h1>分类毛利</h1>
    </header>
    <section class="margin-list">
      <ul>
        <li v-for="(item, index) in marginList" :key="index">
          <div class="margin-item">
            <div class="margin-info">
              <h2>{{ item.name }}</h2>
              <p>毛利率：{{ item.margin }}%</p>
              <p>上次编辑时间：{{ item.editTime }}</p>
            </div>
            <div class="margin-action">
              <uni-icons name="edit"
                type="edit"
                color="#CFA66F"
                @click="editMargin(index)"
              ></uni-icons>
              <uni-icons
                type="reward"
                color="#CFA66F"
                @click="reward(index)"
              ></uni-icons>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <uni-button class="add-btn" color="#CFA66F" @click="addMargin"
      >新增分类</uni-button
    >
    <uni-modal
      :show="showEditModal"
      @confirm="onEditConfirm"
      @cancel="onEditCancel"
    >
      <div class="modal-content">
        <h2>{{ editIndex === null ? "新增分类毛利" : "编辑分类毛利" }}</h2>
        <form>
          <uni-form-item label="分类名称" required>
            <uni-input
              v-model="editMarginData.name"
              placeholder="请输入分类名称"
            />
          </uni-form-item>
          <uni-form-item label="毛利率" required>
            <uni-input
              v-model="editMarginData.margin"
              placeholder="请输入毛利率"
            />
          </uni-form-item>
        </form>
      </div>
    </uni-modal>
  </div>
</template>

<script>
import UniButton from "@/components/uni-button/uni-button";
import UniModal from "@/components/uni-modal/uni-modal";
import UniFormItem from "@/components/uni-form-item/uni-form-item";
import UniInput from "@/components/uni-input/uni-input";
import UniIcons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons";

export default {
  name: "ClassifyMargin",
  components: {
    UniButton,
    UniModal,
    UniFormItem,
    UniInput,
    UniIcons,
  },
  data() {
    return {
      marginList: [
        {
          name: "女装",
          margin: 20,
          editTime: "2022-12-31 23:59:59",
        },
        {
          name: "男装",
          margin: 25,
          editTime: "2022-12-31 23:59:59",
        },
        {
          name: "童装",
          margin: 15,
          editTime: "2022-12-31 23:59:59",
        },
      ],
      showEditModal: false,
      editIndex: null,
      editMarginData: {
        name: "",
        margin: "",
      },
    };
  },
  methods: {
    editMargin(index) {
      this.editIndex = index;
      this.editMarginData = { ...this.marginList[index] };
      this.showEditModal = true;
    },

    reward(index) {
      // TODO: 打开参与奖励页面
    },
    addMargin() {
      this.editIndex = null;
      this.editMarginData = {
        name: "",
        margin: "",
      };
      this.showEditModal = true;
    },
    onEditConfirm() {
      const { name, margin } = this.editMarginData;
      if (!name || !margin) {
        uni.showToast({
          title: "请填写完整信息",
          icon: "none",
        });
        return;
      }
      if (this.editIndex === null) {
        this.marginList.push({
          name,
          margin,
          editTime: new Date().toLocaleString(),
        });
      } else {
        this.marginList.splice(this.editIndex, 1, {
          name,
          margin,
          editTime: new Date().toLocaleString(),
        });
      }
      this.showEditModal = false;
    },
    onEditCancel() {
      this.showEditModal = false;
    },
  },
};
</script>

<style scoped>
.classify-margin {
  background-color: #1d1d1d;
  color: #f1d35a;
  min-height: 100vh;
  padding: 16px;
}
.classify-margin header {
  margin-bottom: 16px;
  text-align: center;
}
.classify-margin header h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
.classify-margin .margin-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.classify-margin .margin-list li {
  margin-bottom: 16px;
}
.classify-margin .margin-item {
  background-color: #272727;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
}
.classify-margin .margin-info {
  flex: 1;
}
.classify-margin .margin-info h2 {
  font-size: 18px;
  margin: 0;
  margin-bottom: 8px;
}
.classify-margin .margin-action {
  display: flex;
}
.classify-margin .margin-action uni-icons {
  margin-left: 12px;
}
.classify-margin .add-btn {
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
}
.classify-margin .modal-content h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 16px;
}
</style>