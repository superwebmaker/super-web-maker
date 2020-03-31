<template>
  <div class="container">
    <ui-top-app-bar contentSelector="#content-main" :navIcon="false">
      Super Web Maker
    </ui-top-app-bar>

    <div id="content-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>
