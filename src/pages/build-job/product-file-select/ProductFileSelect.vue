<script setup lang="ts">
import { Search, Check } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';
import { CommonOptionsItem } from '@/shared/interface/interface';
import { cloneDeep } from 'lodash';

const props = defineProps({
  options: {
    type: Array as () => CommonOptionsItem[],
    required: true,
    default: () => [],
  },
  width: {
    type: String,
    default: '400px',
  },
  height: {
    type: String,
    default: '150px',
  },
});

// 全选
const selectAll = ref({
  key: 'All',
  label: 'Select All',
  selected: false,
} as CommonOptionsItem);
const clickSelectAll = () => {
  selectAll.value.selected = !selectAll.value.selected;
  _searchOption.value.forEach((item) => {
    item.selected = selectAll.value.selected;
  });
  _options.forEach((item) => {
    const label: string = item.label?.toLocaleUpperCase() || '';
    const search = searchValue.value.toLocaleUpperCase();
    if (label.includes(search)) {
      item.selected = selectAll.value.selected;
    }
  });
  emit('selectData', getAllSelectData());
};
const searchValue = ref('');
// options副本，记录选中状态
let _options: CommonOptionsItem[] = [];
// options展示副本，可供搜索
let _searchOption = ref([] as CommonOptionsItem[]);
watch(
  () => props.options,
  () => {
    _options = cloneDeep(props.options);
    _searchOption.value = searchData(_options);
  },
  { deep: true }
);
watch(
  () => searchValue.value,
  () => {
    // 搜索展示
    _searchOption.value = searchData(_options);
  }
);
const searchData = (data: CommonOptionsItem[]) => {
  return cloneDeep(
    data.filter((item) => {
      const label: string = item.label?.toLocaleUpperCase() || '';
      const search = searchValue.value.toLocaleUpperCase();
      return label.includes(search);
    })
  );
};
const emit = defineEmits(['selectData']);

const clickCheckBox = (defaultItem: CommonOptionsItem) => {
  // 切换展示副本状态
  defaultItem.selected = !defaultItem.selected;
  const { key } = defaultItem;
  const findOne = _options.find((item) => item.key === key);
  if (findOne) {
    // 切换副本状态
    findOne.selected = !findOne?.selected;
  }
  emit('selectData', getAllSelectData());
};
// 获取所有选中项
const getAllSelectData = () => {
  return _options.filter((item) => item.selected);
};
</script>
<template>
  <div class="common-text-content-block">
    <el-input v-model="searchValue" :prefix-icon="Search" placeholder="Please input" class="m-b-16"> </el-input>
    <div class="m-b-16 line"></div>
    <div class="transfer m-b-8">
      <div class="select-box" :class="selectAll.selected && 'common-text-content-bg-color'" @click="clickSelectAll()">
        <el-icon v-if="selectAll.selected" :size="16" color="#ffffff"><check /></el-icon>
      </div>
      <div style="font-weight: 500">
        {{ selectAll.label }}
      </div>
    </div>
    <div class="common-level-two-fz common-level-two-color" :style="{ width, height }">
      <virtual-list :data="_searchOption">
        <template #default="{ item }">
          <div class="transfer">
            <div class="select-box" :class="item.selected && 'common-text-content-bg-color'" @click="clickCheckBox(item)">
              <el-icon v-if="item.selected" :size="16" color="#ffffff"><check /></el-icon>
            </div>
            <div :class="item.selected && 'common-level-one-color'">
              {{ item.label }}
            </div>
          </div>
        </template>
      </virtual-list>
    </div>
  </div>
</template>
<style scoped lang="scss">
.line {
  height: 2px;
  background: rgba($color: #424242, $alpha: 0.05);
  border-radius: 1px;
}

.transfer {
  display: flex;
  align-items: center;
}
.select-box {
  margin-right: 12px;
  width: 18px;
  height: 18px;
  border: 1px solid #8d8d8d;
  line-height: 18px;
}
</style>
