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
          accept="image/*"
          preview
          text="上传图片"
          :disabled="disabled"
          @change="onChange('image', $event)"
        ></ui-file>
        <span v-if="config.tips" class="tips">{{ config.tips }}</span>
      </span>
    </template>
    <span v-else class="tips">最多可上传 {{ config.maxFileCount }} 张图片</span>

    <template #after>
      <div class="yb-form-action">
        <ui-image-list class="preview-image">
          <template v-for="(file, index) in files" :key="index">
            <ui-image-item
              :bg-image="file.previewSrc || file.url"
              @click="previewImage(file)"
            >
              <ui-icon
                v-if="!readonly"
                class="remove"
                size="18"
                @click="removeFile(index)"
              >
                add_circle
              </ui-icon>
            </ui-image-item>
          </template>
        </ui-image-list>
      </div>
    </template>
  </ui-input-field>
</template>

<script>
import uploadMixin from './upload';
import { openInNewTab } from '@/utils';

export default {
  name: 'InputUploadImage',
  mixins: [uploadMixin],
  methods: {
    previewImage(file) {
      openInNewTab(file.previewSrc || file.url);
    }
  }
};
</script>
