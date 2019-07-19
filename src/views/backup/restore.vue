<template>
  <div class="app-container">
    <div class="filter-container">
      <el-upload
        class="upload-demo filter-item"
        ref="upload"
        :limit="1"
        action="http://hgdr.top/admin/backup/upload"
        :on-remove="handleRemove" :on-success="handleFileSuccess"
        :on-error="handleFileFail" :on-exceed="handleExceed"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传文件</el-button>
      </el-upload>
      <!--<el-button class="filter-item" type="primary" @click="restoreDatabase" :loading="submitLoading">恢复</el-button>-->
    </div>
    <el-button class="filter-item" type="primary" @click="restoreDatabase"
               :loading="submitLoading">恢复</el-button>
  </div>
</template>

<script>
import { updateDatabase } from '../../api/backup'
export default {
  name: 'restore',
  data () {
    return {
      fileList: [],
      submitLoading: false
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    // 移除文件
    handleRemove (file, fileList) {
    },
    // 判断文件数量
    handleExceed (files, fileList) {
      this.$notify.error({
        title: '提示',
        message: '上传文件不能超过1份!'
      })
    },
    // 上传文件成功
    handleFileSuccess (res, file) {
      this.$notify.success({
        title: '提示',
        message: '文件上传成功'
      })
    },
    // 上传文件失败
    handleFileFail (err, file, fileList) {
      this.$notify.error({
        title: '提示',
        message: '上传文件失败'
      })
    },
    // 确认恢复数据库
    restoreDatabase () {
      this.$confirm('此操作将对数据库进行恢复，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitLoading = true
        updateDatabase().then(res => {
          this.fileList = []
          if (res.data) {
            this.submitLoading = false
            this.$notify.success({
              title: '提示',
              message: '恢复数据成功'
            })
          } else if (!res.data) {
            this.submitLoading = false
            this.$notify.error({
              title: '提示',
              message: '恢复数据失败'
            })
          }
        }).catch(() => {
          this.fileList = []
          this.submitLoading = false
          this.$notify.error({
            title: '提示',
            message: '恢复数据失败'
          })
        })
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style scoped>

</style>
