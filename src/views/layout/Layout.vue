<template>
  <div :class="classObj" class="app-wrapper">
    <div class ='drawer-bg' >
      <sidebar class='sidebar-container'/>
      <div class="main-container">
        <navbar/>
        <app-main/>
      </div>
    </div>
  </div>
</template>

<script>
import {Navbar, Sidebar, AppMain} from './components'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #ffffff;
  opacity: 1;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  /*z-index: 999;*/
}
</style>
