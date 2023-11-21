<template>
	<div class="table-container">
		<div class="table-header">
			<div class="fixed-column">
				<div class="table-cell"></div>
				<div class="table-cell">订单号</div>
			</div>
			<div class="scrollable-header">
				<div v-for="header in displayedHeaders" :key="header" class="table-cell" @click="sortData(header)">
					{{ header }}
					<span v-if="header === sortField">
						{{ isAsc ? "↑" : "↓" }}
					</span>
				</div>
			</div>
			<div class="fixed-column">
				<div class="table-cell">
					<span class="refresh-icon"  @click="refreshList">
						↺
					</span>
				</div>
				<div class="table-cell">
					<span class="settings-icon" @click="showSettings">≡</span>
				</div>
			</div>
		</div>
		<div class="table-body">
			<div class="fixed-column">
				<div v-for="(item, index) in displayedItems" :key="item.id" class="table-row">
					<div class="table-cell">{{ index + 1 }}</div>
					<div class="table-cell">{{ item.orderNumber }}</div>
				</div>
				<div class="load-more" @click="loadMore">
					{{ loading ? "加载中..." : "加载更多" }}
				</div>
			</div>
			<div class="scrollable-body">
				<div v-for="(item, index) in displayedItems" :key="item.id" class="table-row">
					<div v-for="(value, key) in item" :key="key" v-if="displayedHeaders.includes(key)"
						class="table-cell">
						{{ value }}
					</div>
				</div>
			</div>
		</div>
		<div v-if="showSettingsModal" class="settings-modal" @click.stop @keydown.enter.stop.prevent="saveSettings">
			<div class="setting-item" v-for="header in headers" :key="header">
				<input type="checkbox" v-model="displayedHeaders" :value="header" class="setting-item-checkbox" />
				<span class="setting-item-text">{{ header }}</span>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		name: "TableList",
		data() {
			return {
				headers: [],
				items: [],
				displayedItems: [],
				displayedHeaders: ["名称"],
				sortField: "",
				isAsc: true,
				loading: false,
				refreshing: false,
				showSettingsModal: false,
			};
		},
		computed: {
			fixedHeaderWidth() {
				return (this.displayedHeaders.length + 1) * 100 + "px";
			},
			scrollableHeaderWidth() {
				return this.displayedHeaders.length * 100 + "px";
			},
		},
		mounted() {
			this.loadMore();
		},
		methods: {
			async loadMore() {
				if (this.loading) {
					return;
				}
				this.loading = true;
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const newItems = [];
				for (let i = 0; i < 10; i++) {
					const id = this.items.length + i + 1;
					newItems.push({
						id,
						orderNumber: `order-${id}`,
						...this.generateRandomData(),
					});
				}
				this.items = [...this.items, ...newItems];
				this.refreshDisplayedItems();
				this.loading = false;
			},
			sortData(header) {
				if (header === this.sortField) {
					this.isAsc = !this.isAsc;
				} else {
					this.sortField = header;
					this.isAsc = true;
				}
				this.refreshDisplayedItems();
			},
			refreshList() {
				if (this.refreshing) {
					return;
				}
				this.refreshing = true;
				setTimeout(() => {
					this.items.forEach((item) => {
						Object.assign(item, this.generateRandomData());
					});
					this.refreshDisplayedItems();
					this.refreshing = false;
				}, 1000);
			},
			generateRandomData() {
				return {
					name: this.getRandomName(),
					address: this.getRandomAddress(),
					price: this.getRandomPrice(),
					date: this.getRandomDate(),
					status: this.getRandomStatus(),
				};
			},
			getRandomName() {
				const names = [
					"Alice",
					"Bob",
					"Charlie",
					"David",
					"Eva",
					"Frank",
					"Grace",
					"Henry",
					"Ivy",
					"Jack",
				];
				return names[Math.floor(Math.random() * names.length)];
			},
			getRandomAddress() {
				const addresses = [
					"Beijing",
					"Shanghai",
					"Guangzhou",
					"Shenzhen",
					"Chengdu",
					"Wuhan",
					"Hangzhou",
					"Xi'an",
					"Nanjing",
					"Chongqing",
				];
				return addresses[Math.floor(Math.random() * addresses.length)];
			},
			getRandomPrice() {
				return Math.floor(Math.random() * 1000) / 100;
			},
			getRandomDate() {
				const start = new Date("2021-01-01");
				const end = new Date();
				return new Date(
					start.getTime() + Math.random() * (end.getTime() - start.getTime())
				).toLocaleDateString();
			},
			getRandomStatus() {
				const statuses = ["Paid", "Pending", "Cancelled", "Refunded"];
				return statuses[Math.floor(Math.random() * statuses.length)];
			},
			refreshDisplayedItems() {
				const items = [...this.items];
				items.sort((a, b) => {
					const valueA = a[this.sortField];
					const valueB = b[this.sortField];
					if (valueA < valueB) {
						return this.isAsc ? -1 : 1;
					} else if (valueA > valueB) {
						return this.isAsc ? 1 : -1;
					} else {
						return 0;
					}
				});
				this.displayedItems = items;
			},
			showSettings() {
				this.showSettingsModal = true;
			},
			saveSettings() {
				this.showSettingsModal = false;
			},
		},
	};
</script>

<style scoped>
	.table-container {
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		height: 400px;
		overflow: hidden;
	}

	.table-header {
		display: flex;
		flex-shrink: 0;
		height: 50px;
		background-color: black;
		color: gold;
		font-weight: bold;
	}

	.fixed-header {
		width: 30px;
	}

	.scrollable-header {
		width: 30px;
		overflow-x: auto;
	}

	.header-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 50px;
		border-right: 1px solid gold;
		cursor: pointer;
	}

	.header-cell:last-child {
		border-right: none;
	}

	.header-cell.active {
		color: red;
	}

	.table-body {
		flex-grow: 1;
		overflow-y: auto;
	}

	.table-row {
		display: flex;
		height: 50px;
		border-top: 1px solid black;
	}

	.table-row:first-child {
		border-top: none;
	}

	.table-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 50px;
		border-right: 1px solid black;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.table-cell:last-child {
		border-right: none;
	}

	.settings-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}

	.setting-item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.setting-item-text {
		margin-left: 5px;
	}

	.setting-item-checkbox {
		margin-right: 5px;
	}
</style>