<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <template v-if="canUpload">
      <span v-if="!readonly">
        <ui-file
          text="上传附件"
          :disabled="disabled"
          @change="onChange('file', $event)"
        ></ui-file>
        <span v-if="config.tips !== false" class="tips">{{
          config.tips || '支持的格式有pdf、word、excel、ppt、rar，限制大小10M内'
        }}</span>
      </span>
    </template>
    <span v-else class="tips">最多可上传 {{ config.maxFileCount }} 个附件</span>

    <template #after>
      <div class="yb-form-action">
        <ul class="preview-file">
          <li v-for="(file, index) in files" :key="index">
            <span>{{ file.name }}</span>
            <a v-if="readonly" class="download" :href="file.url" download>
              下载
            </a>
            <a v-else class="remove" @click="removeFile(index)">删除</a>
          </li>
        </ul>
      </div>
    </template>
  </ui-input-field>
</template>

<script>
import uploadMixin from './upload';

export default {
  name: 'InputUploadFile',
  mixins: [uploadMixin]
};
</script>
