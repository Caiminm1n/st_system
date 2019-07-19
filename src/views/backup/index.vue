<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<span class="filter-item" style="font-size: 18px;color: #606266;">邮箱&nbsp</span>-->
      <!--<el-input class="filter-item" style="width: 300px;" v-model="usingEmail" readonly></el-input>-->
      <el-button type="primary" class="filter-item" icon="el-icon-edit"
                 @click="dialogVisible = true">设置邮箱</el-button>
    </div>
    <!--<el-table border :data="backupList">-->
      <!--<el-table-column label="备份记录" align="center">-->
        <!--<el-table-column type="index" label="序号" :index="indexMethod" width="80px" align="center" ></el-table-column>-->
        <!--<el-table-column prop="time" label="时间" min-width="20%" align="center"></el-table-column>-->
        <!--<el-table-column prop="email" label="邮箱" min-width="20%" align="center"></el-table-column>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<pagination v-show="total>0" :total="total" :page.sync="listQuery.page"-->
                <!--:limit.sync="listQuery.limit" @pagination="showBackupList"-->
                <!--style="text-align: center"/>-->

    <el-dialog title="设置备份邮箱" :visible.sync="dialogVisible" width="50%">
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="新邮箱">
          <el-input v-model="newEmail" type="email" autocomplete="on" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBackupEmail" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {updateEmail} from '../../api/backup'
// import pagination from '@/components/Pagination'
export default {
  name: 'index',
  // components: {pagination},
  data () {
    return {
      // usingEmail: null,
      dialogVisible: false,
      labelPosition: 'right',
      newEmail: null,
      submitLoading: false
      // backupList: [],
      // total: 0,
      // listQuery: {
      //   page: 1,
      //   limit: 10
      // },
    }
  },
  // activated () {
  //   // this.showBackupList()
  // },
  methods: {
    //  列表序号
    // indexMethod (index) {
    //   return ((this.listQuery.page - 1) * this.listQuery.limit + index + 1)
    // },
    // 获取最近备份记录
    // showBackupList () {
    //   getBackupList().then(res => {
    //     const data = res.data
    //     this.total = data.total
    //     this.backupList = data.list
    //     this.usingEmail = data.email
    //   })
    // },
    // 设置备份邮箱
    updateBackupEmail () {
      let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (re.test(this.newEmail)) {
        this.submitLoading = true
        updateEmail(this.newEmail).then(res => {
          console.log(res)
          if (res.data) {
            this.submitLoading = false
            this.dialogVisible = false
            this.newEmail = null
            this.$notify.success({
              title: '提示',
              message: '邮箱更新成功'
            })
          } else if (!res.data) {
            this.submitLoading = false
            this.$notify.error({
              title: '提示',
              message: '邮箱更新失败'
            })
          }
        }).catch(() => {
          this.submitLoading = false
        })
      } else {
        this.$notify.error({
          title: '提示',
          message: '邮箱格式输入有误'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
