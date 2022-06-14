<script setup lang="ts">
import { ref } from 'vue';
import { getRepositoryDownlad } from '@/api/api';
const visable = ref(false);
const headerTitle = ref('');
const content = ref('');
interface Param {
  headerTitle: string;
  content: string;
  id: string;
}
const isoHref = ref('');
const sumHref = ref('');
const request = (id: string) => {
  getRepositoryDownlad(id).then((res) => {
    const { data, title } = res;
    const _data = JSON.parse(data);
    isoHref.value = _data.imagePath && _data.imagePath?.includes('http') ? _data.imagePath : title + _data.imagePath;
    sumHref.value = _data.checksumPath && _data.checksumPath?.includes('http') ? _data.checksumPath : title + _data.checksumPath;
  });
};
const open = (params: Param) => {
  visable.value = true;
  headerTitle.value = params.headerTitle || 'Download';
  content.value = params.content || 'Please choose to download the file.';
  request(params.id);
};
defineExpose({ open });
</script>
<template>
  <el-dialog v-model="visable" :title="headerTitle" width="30%" draggable center>
    <span>{{ content }}</span>
    <div class="downloadBtn">
      <a class="app-text-btn" :href="isoHref" download="file">download iso</a>
      <a class="app-text-btn" :href="sumHref" download="file">download checksum</a>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="visable = false">Close</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.downloadBtn {
  display: flex;
  justify-content: space-around;
  padding: 16px 40px 0px;
}
</style>
