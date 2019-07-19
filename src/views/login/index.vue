<template>
  <div class="login-container">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules"
               auto-complete="on" label-position="left">

        <el-form-item prop="username">
          <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input :type="passwordType" v-model="loginForm.password" name="password" auto-complete="on" placeholder="password" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                   @click.native.prevent="handleLogin">用户登录</el-button>
      </el-form>

  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      const validateUsername = (rule, value, callback) => {
        if (validateUsername == null) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value== undefined || value.length < 6) {
          callback(new Error('密码长度应大于6'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: undefined,
          password: undefined
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        loading: false
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }

    },
    methods: {
      showPwd () {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid && !this.loading) {
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            }).catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#e5e5e5;
  $light_gray:#eee;
  $dark_gray:#889aa4;
  template {
    background-color: $bg;
  }
  /* reset element-ui css */
  .login-container {

    width: 500px;
    border: 1px #1f2d3d;
    margin: auto auto;
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: black;
        margin: 50px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
    .login-form {
      /*position: absolute;*/
      left: 0;
      right: 0;
      width: 350px;
      padding: 10px 35px 15px 35px;
      margin: auto auto;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: #000 !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(200, 200, 200, 1);
      background: #fff;
      color: #000;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
