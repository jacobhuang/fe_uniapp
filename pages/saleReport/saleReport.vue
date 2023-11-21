<template>
  <div class="sales-report">
    <!-- Sales Count Section -->
    <u-list>
     
    </u-list>

    <!-- Sales Details Section -->
    <u-card>
      <u-table :data="salesDetails">
		  
      </u-table>
    </u-card>

    <!-- Filter Section -->
    <u-popup v-model="showFilterPopup" position="bottom">
      <div class="filter-container">
        <h4>过滤数据</h4>
        <u-form>
          <u-form-item label="Start Date">
            <u-date-picker v-model="filter.startDate"></u-date-picker>
          </u-form-item>
          <u-form-item label="End Date">
            <u-date-picker v-model="filter.endDate"></u-date-picker>
          </u-form-item>
          <u-button type="primary" @click="applyFilters">Apply Filters</u-button>
        </u-form>
      </div>
    </u-popup>
  </div>
</template>

<script>
import UList from '@/uni_modules/uni-list/components/uni-list/uni-list'
import UCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue'
import UTable from '@/uni_modules/uni-table/components/uni-table/uni-table'
import UPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup'
import UForm from '@/uni_modules/uni-forms/components/uni-forms/uni-forms'
import UFormItem from '@/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item'
import UDatePicker from '@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker'

export default {
  components: {
    UList,
    UCard,
    UTable,
    UPopup,
    UForm,
    UFormItem,
    UDatePicker
  },
  data() {
    return {
      salesCount: {},
      salesDetails: [],
      showFilterPopup: false,
      filter: {
        startDate: null,
        endDate: null
      }
    };
  },
  methods: {
    async fetchSalesData() {
      // Make an API call to fetch sales data with optional filter parameters
      let apiUrl = "/api/sales";
      if (this.filter.startDate && this.filter.endDate) {
        apiUrl += `?startDate=${this.filter.startDate}&endDate=${this.filter.endDate}`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Update the component's data with fetched data
      this.salesCount = data.salesCount;
      this.salesDetails = data.salesDetails;
    },
    applyFilters() {
      // Hide the filter popup and fetch data with new filter parameters
      this.showFilterPopup = false;
      this.fetchSalesData();
    }
  },
  mounted() {
    this.fetchSalesData();
  }
};
</script>

<style scoped>
.sales-report {
  padding: 20px;
}

.filter-container {
  width: 300px;
  height: 250px;
  padding: 20px;
}
</style>