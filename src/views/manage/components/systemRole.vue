<template>
  <div class="system-role">
    <el-table
      stripe
      align="left"
      max-height="300"
      style="width: 100%"
      :data="users">
      <el-table-column
        label="姓名"
        min-width="180">
        <template slot-scope="scope">
          <span class="defaultCursor">
            {{scope.row.name}}
            <el-tag
              size="mini"
              type="default"
              v-if="activeUser.id===scope.row.id">
              it's me
            </el-tag>
            <el-tag
              size="mini"
              type="danger"
              v-if="scope.row.status!=='正常'">
              {{scope.row.status}}
            </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="成员角色"
        min-width="180">
        <template slot-scope="scope">
          <el-popover
            placement="left-start"
            trigger="hover"
            width="200"
            :content="scope.row.createInfo">
            <span class="defaultCursor" slot="reference">
              {{scope.row.roleName}}
            </span>
          </el-popover>
          <div style="display:initial;margin-left:10px" v-if="!scope.row.isdelete">
            <el-button
              circle
              icon="mdi mdi-account-edit"
              size="mini"
              title="编辑"
              type="primary"
              @click="$emit('edit', scope.row)"></el-button>
            <el-button
              circle
              icon="el-icon-delete"
              size="mini"
              title="删除"
              type="danger"
              @click="$emit('delete', scope.row)"></el-button>
          </div>
          <el-tag
            closable
            v-else
            size="mini"
            type="danger"
            @close="$emit('undelete', scope.row)">
            已删除
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'systemRole',
  components: {
  },
  props: {
    users: { type: Array, default: () => { return [] } }
  },
  computed: {
    ...mapGetters(['activeUser'])
  },
  data () {
    return {
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
