<template>
  <div class="home">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.$route.path === '/') {
        const name = 'ProjectList'
        this.$router.push({ name })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.home{
  max-width: 1280px;
  margin: 0 auto;
}
</style>
