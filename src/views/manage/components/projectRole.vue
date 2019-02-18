<template>
  <div class="project-role">
    <el-collapse accordion>
      <el-collapse-item
        v-for="user in users"
        :key="user.id">
        <template slot="title">
          <span style="float:left;">
            {{user.name}}
          </span>
        </template>
        <el-table
          stripe
          align="left"
          max-height="300"
          style="width: 100%"
          :data="user.projects">
          <el-table-column
            fixed
            label="项目名"
            min-width="120">
            <template slot-scope="scope">
              <span
                class="link"
                style="cursor:pointer"
                @click="viewProjectDetail(scope.row.id)">
                {{scope.row.name}}
              </span>
              <el-tag
                size="mini"
                type="danger"
                v-if="scope.row.isDelete">
                已删除
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            min-width="120"
            prop="statusName">
          </el-table-column>
          <el-table-column
            label="描述"
            min-width="300"
            prop="description">
          </el-table-column>
          <el-table-column
            label="创建人"
            min-width="120"
            prop="description">
            <template slot-scope="scope">
              {{scope.row.creator.name}}
              <el-tag
                size="mini"
                type="danger"
                v-if="scope.row.creator.state!==1">
                已离职
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            min-width="120"
            prop="createTime">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'projectRole',
  props: {
    users: { type: Array, default: () => { return [] } }
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
