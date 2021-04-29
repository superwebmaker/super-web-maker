<template>
  <ui-input-field :config="config" :item-class="itemClass" :readonly="readonly">
    <div class="yb-input-alert">
      {{ value }}
    </div>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';

export default {
  name: 'InputAlert',
  mixins: [formItemMixin]
};
</script>
