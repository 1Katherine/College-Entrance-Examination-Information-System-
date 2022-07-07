<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
        <div class="tips-top">
          <span> 后台管理系统 </span>
        </div>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <!-- 记住密码 -->
      <!-- <div>
        <el-checkbox
          v-model="check"
          style="padding:6px 5px 6px 15px"
        >记住密码</el-checkbox>
      </div> -->

      <div class="btn">
        <el-button
          class="loginBtn"
          :loading="loading"
          type="primary"
          style="width: 45%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
        >登录</el-button>
        <el-button
          class="loginBtn"
          :loading="loading"
          style="width: 45%; margin-bottom: 30px"
          @click.native.prevent="handleRegister"
        >注册</el-button>
      </div>
      <!-- 底部提示框：默认的账号和密码 -->
      <div class="tips">
        <span style="margin-right: 20px"> 账号: 张三 </span>
        <span> 密码: 123456 </span>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { login, register } from '@/api/user'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // // 在/src/utils/validate中有validUsername方法，定义了校验用户名的方法
      // // 用户名只能是admin 和 editor
      // if (!validUsername(value)) {
      //   callback(new Error('请输入正确的用户名'))
      // } else {
      //   callback()
      // }
      callback() // 通过校验
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度必须在6 - 16位之间'))
      } else {
        callback()
      }
    }
    return {
      check: true, // 忘记密码复选框的状态
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 用户登录
    handleLogin() {
      this.$refs.loginForm.validate(async(isOk) => {
        if (isOk) {
          try {
            // 校验通过，登录
            const { data } = await login({
              username: this.loginForm.username,
              password: this.loginForm.password
            })
            this.loading = true // 按钮显示loading
            console.log(data)
            if (data.code === 200) {
              this.$message.success('登录成功')
              this.$router.push('/') // 页面跳转
            } else {
              this.$message.warning('用户名或密码错误')
            }
          } catch (error) {
            // 登录不通过，弹框
          } finally {
            this.loading = false // 无论是否通过，都关闭loading
          }
        }
      })
    },

    // 注册用户

    handleRegister() {
      this.$refs.loginForm.validate(async(isOk) => {
        if (isOk) {
          try {
            // 校验通过，登录
            const { data } = await register({
              username: this.loginForm.username,
              password: this.loginForm.password
            })
            this.loading = true // 按钮显示loading
            console.log(data)
            if (data.code === 200) {
              this.$message.success('注册成功，请登录！')
            } else {
              this.$message.warning(data.message)
            }
          } catch (error) {
            // 登录不通过，弹框
          } finally {
            this.loading = false // 无论是否通过，都关闭loading
          }
        }
      })
    }

    //   this.$refs.loginForm.validate((valid) => {
    //     if (valid) {
    //       this.loading = true
    //       this.$store
    //         .dispatch('user/login', this.loginForm)
    //         .then(() => {
    //           this.$router.push({ path: this.redirect || '/' })
    //           this.loading = false
    //         })
    //         .catch(() => {
    //           this.loading = false
    //         })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips-top {
    font-size: 14px;
    color: rgba(194, 186, 186, 0.973);
    margin-bottom: 10px;
    text-align: center;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  // 错误信息的提示颜色
  ::v-deep {
    .el-form-item__error {
      color: #fff;
      padding-left: 5px;
    }
  }

  // 修改输出框内容字体
  .el-input {
    font-size: 18px;
  }

  .btn {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    // 修改登陆按钮的字体
    .loginBtn {
      font-size: 20px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
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
