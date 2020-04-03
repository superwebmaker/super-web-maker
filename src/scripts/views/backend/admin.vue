<template>
  <div>
    <h2>Admin Index</h2>
    <p>User: {{ $store.isAuthenticated }}</p>
  </div>
</template>

<script>
export default {
  name: 'adminIndex',
  async mounted() {
    console.log('hello');
    await this.$store.me();
  }
};
</script>
