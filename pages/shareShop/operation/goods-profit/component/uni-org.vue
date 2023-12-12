<template>
  <view>
    <!-- Check if orgData has any data -->
    <template v-if="orgData.length">
      <ul class="org-tree">
        <li>
          <span class="header">参与奖励</span>
          <span class="header">分类名称</span>
          <span class="header">毛利率</span>
        </li>
        <hr class="custom-hr"/>
        <!-- Loop through each department in orgData -->
        <li
          v-for="department in orgData"
          :key="department.id"
          class="org-tree__department"
        >
          <span
            @click="toggleDepartment(department.id)"
            class="org-tree__department-name"
          >
            <span class="header "><checkbox class="header"></checkbox></span><span class="custom-flex" >
              <transition name="fade">
                <!-- Show minus icon if department is open, else show plus icon -->
                <i v-if="department.open" class="icon-minus">-</i>
                <i v-else class="icon-plus">+</i>
              </transition>
              <!-- Display department name -->
              {{ department.categoryName }}
            </span>
            <span><input type="text" class="input-box"/></span>
            
          </span>
          <transition name="slide-fade">
            <!-- Show sub-departments if department is open -->
            <ul v-if="department.open" class="org-tree__sub-department-list">
               
              <!-- Loop through each sub-department in department -->
              <li
                v-for="subDepartment in department.children"
                :key="subDepartment.id"
                class="org-tree__sub-department "
              >
              <hr class="custom-hr"/>
                <span
                  @click="toggleSubDepartment(department.id, subDepartment.id)"
                  class="org-tree__sub-department-name"
                >
                  <span class="header">check</span
                  ><span class="custom-flex" style="margin-left:1em;">
                    <transition name="fade">
                      <!-- Show minus icon if sub-department is open, else show plus icon -->
                      <i v-if="subDepartment.open" class="icon-minus">-</i>
                      <i v-else class="icon-plus">+</i> </transition
                    ><!-- Display sub-department name -->
                    {{ subDepartment.categoryName }}</span
                  >
                </span>
                <transition name="slide-fade">
                  <!-- Show sub-tri-departments if sub-department is open -->
                  <ul
                    v-if="subDepartment.open"
                    class="org-tree__sub-tri-department-list"
                  >
                    <!-- Loop through each sub-tri-department in sub-department -->
                    <li
                      v-for="subTriDepartment in subDepartment.children"
                      :key="subTriDepartment.id"
                      class="org-tree__sub-tri-department"
                    >
                    <hr class="custom-hr"/>
                      <span class="header">check</span>
                      <!-- Display sub-tri-department name -->
                      <span class="org-tree__sub-tri-department-name" style="margin-left:2em;">{{
                        subTriDepartment.categoryName
                      }}</span>
                    </li>
                  </ul>
                </transition>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </template>
    <!-- Display message if no data is available -->
    <template v-else>
      <p style="margin:40rpx;">当前没有分类数据</p>
    </template>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // Define orgData
      orgData: [],
	  orgDataUrl:'http://localhost:9999/jeecg-demo/productCategory/orgData?page=10&pageSize=100',
    };
  },
  created() {
    this.fetchOrgData();
  },
  methods: {
    // Fetch orgData from API
    fetchOrgData() {

      uni.request({
        url: this.orgDataUrl,
        method: 'GET',
        header: {
          'X-ACCESS-TOKEN': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDIzMzA0OTYsInVzZXJuYW1lIjoiYWRtaW4ifQ.U8NL70BQCR-KuSrTPOpDyI6skiGbidrB2EohKkS-6t8' // Add X-ACCESS-TOKEN parameter to the header
        },
        success: (response) => {
          
		  this.orgData =  [
        {
          id: 1,
          categoryName: "Department A",
          open: false,
          children: [
            {
              id: 11,
              categoryName: "Sub-Department A1",
              open: false,
              children: [
                {
                  id: 111,
                  categoryName: "Sub-Department AA1",
                  open: false,
                  children: [
                    {
                      id: 111,
                      categoryName: "Sub-Department AA1",
                      open: false,
                      children: [
                        { id: 1111, categoryName: "Sub-Department AAA1" },
                        { id: 1112, categoryName: "Sub-Department AAA2" },
                      ],
                    },
                    { id: 112, categoryName: "Sub-Department AA2" },
                  ],
                },
                { id: 112, categoryName: "Sub-Department AA2" },
              ],
            },
            { id: 12, categoryName: "Sub-Department A2" },
          ],
        },
      ];
	  this.orgData = response.data.result.records;
          console.log(JSON.stringify(response.data));
        },
        fail: (error) => {
          console.error(error);
        }
      });
    },
    // Toggle open state of department
    toggleDepartment(departmentId) {
      this.orgData = this.orgData.map((department) => {
        if (department.id === departmentId) {
          department.open = !department.open;
        }
        return department;
      });
    },
    // Toggle open state of sub-department
    toggleSubDepartment(departmentId, subDepartmentId) {
      this.orgData = this.orgData.map((department) => {
        if (department.id === departmentId) {
          department.children = department.children.map((subDepartment) => {
            if (subDepartment.id === subDepartmentId) {
              subDepartment.open = !subDepartment.open;
            }
            return subDepartment;
          });
        }
        return department;
      });
    },
  },
};
</script>

<style>
.input-box{
  border:1px solid #EFEFEF;
  width:120rpx;
  margin-left:4em;
}
.header {
  font-weight: bold;
  margin-right: 90rpx;
}
.tree-item {
  width: 30%;
}
/* Define styles */
.org-tree {
  font-size: 11pt;
  list-style: none;
  /* margin-left: 0; */
  /* margin: 40rpx; */
}
.org-tree__department {
  /* margin-bottom: 1em; */
  margin: 10rpx 0 10rpx 0;
}
.org-tree__department-name {
  font-weight: bold;
  display: flex;
  align-items: center;
  /* margin-left: 1em;  */
}
.org-tree__sub-department-list {
  /* margin-left: 2em; */
  margin: 10rpx 0 10rpx 0;
}
.org-tree__sub-department {
  /* margin-bottom: 0.5em; */
}
.org-tree__sub-department-name {
  font-weight: normal;
  display: flex;
  align-items: center;
 
}
.org-tree__sub-tri-department-list {
  /* margin-left: 1em; */
  margin: 10rpx 0 10rpx 0;
}
.org-tree__sub-tri-department {
  /* margin-bottom: 0.5em; */
}
.org-tree__sub-tri-department-name {
  font-weight: normal;
}
.icon-minus,
.icon-plus {
  font-size: 0.8em;
}
.margin-left-2em{
  margin-left: 2em;
}
.custom-flex {
  display: flex; 
  align-item: center;
   
}
.custom-hr {
  border-bottom:1px solid #EFEFEF;
  margin: 10rpx 0 10rpx 0;
}
/* Define transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
