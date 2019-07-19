<template>
  <div class="errPage-container">

    <el-row>
      <el-col :span="12">
        <h2>你没有权限去该页面</h2>
        <img :src="errGif" width="313" height="428" alt="抱歉,您没有权限...">
      </el-col>
    </el-row>
    <el-row>
      <el-button icon="arrow-left" class="pan-back-btn" @click="back">返回</el-button>
      <el-button icon="arrow-left" class="pan-back-btn" @click="index">首页</el-button>
    </el-row>
  </div>
</template>

<script>
  import errGif from '@/assets/401.gif'

  export default {
    name: 'Page401',
    data () {
      return {
        errGif: errGif + '?' + +new Date()
      }
    },
    methods: {
      back () {
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/dashboard' })
        } else {
          this.$router.go(-1)
        }
      },
      index () {
        this.$router.push({path: '/dashboard'})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
