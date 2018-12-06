<template>
  <div class="system">
    <file-list
      :path="path"
      :title="title"></file-list>
  </div>
</template>

<script>
import FileList from '@/components/FileList'
export default {
  name: 'system',
  components: {
    FileList
  },
  computed: {
  },
  data () {
    return {
      title: '系统日志',
      path: ''
    }
  },
  watch: {
    $route: function () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const path = this.$route.query.path
      if (path !== undefined) {
        this.path = path
      }
    }
  }
}
</script>

<style lang='scss'>
</style>
