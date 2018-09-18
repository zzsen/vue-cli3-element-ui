<template>
  <div class='list'>
    <el-container>
      <el-header><div class='title'>项目列表</div></el-header>
      <el-main>
        <el-table
        align='left'
        stripe
        :data="projectList"
        style="width: 100%"
        max-height="300">
          <el-table-column
            fixed
            label="项目名"
            min-width="120">
            <template slot-scope="scope">
              <div
                class='link'
                style='cursor:pointer'
                @click="$router.push({name:'ProjectDetail',params:{id:scope.row.id}})">
                {{scope.row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="leader"
            label="负责人"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="pm"
            label="PM"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="master"
            label="主管"
            min-width="120">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            min-width="300">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="120">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'list',
  components: {
    // HelloWorld
  },
  data () {
    return {
      projectList: [
        {
          id: 'a',
          name: '项目a',
          status: '状态a',
          leader: '负责人a',
          pm: 'PMa',
          master: '主管a',
          description: '描述aaaaaaaaaaaaaaaaaaaaaaaaaa',
          createTime: '2018-08-08'
        }, {
          id: 'b',
          name: '项目b',
          status: '状态b',
          leader: '负责人b',
          pm: 'PMb',
          master: '主管b',
          description: '描述bbbbbbbbbbbbbbbbbbbbbbbbbb',
          createTime: '2018-08-10'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped lang='scss'>
tr.el-table__row>td>div.cell,
tr.el-table__row>td>div.cell>div{
  width:100% !important;
  height:100% !important;
}
</style>
