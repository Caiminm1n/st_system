<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" v-if="item.meta.title" :key="item.path">
            <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">
              {{ item.meta.title}}
            </span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  name: 'index',
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      const {params} = this.$route
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
          var toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 16px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: white;
    cursor: text;
  }
}
</style>
