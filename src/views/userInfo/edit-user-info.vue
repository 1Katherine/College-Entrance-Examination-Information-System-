<template>
  <el-dialog title="编辑用户信息" :visible="showDialog" :before-close="btnCancel">
    <el-form
      ref="form"
      style="overflow-y: auto; height: 485px; margin-top: 10px"
      label-width="150px"
      :rules="rules"
      :model="form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" class="input_box" :disabled="true" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" class="input_box" />
      </el-form-item>

    </el-form>
    <!-- 弹框底部 -->
    <template v-slot:footer>
      <el-row class="footer" type="flex" justify="center">
        <el-col :span="24">
          <el-button @click="btnCancel">取消</el-button>
          <el-button type="primary" @click="onSave()">保存</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>

export default {
  props: {
    // 是否显示弹层 (父传子)
    showDialog: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 表单验证
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    btnCancel() {
      this.$refs.form.resetFields() // 移除校验规则
      this.$emit('cancelDialog', false) // 告诉父节点关闭弹窗
    },
    async onSave() {
      try {
        await this.$refs.form.validate() // 表单校验通过才会继续往下执行，否则跳到catch
        // 编辑数据业务
        this.$emit('edit', this.form)
      } catch (error) {
        console.log('表单校验不通过') // 表单校验不通过
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  width: 600px;
  height: 250px;
  border-radius: 6px; //设置输入框为圆角

  .el-dialog__header {
    background: #f5f5f5;
    border-radius: 6px 6px 0px 0px;
    border-bottom: 1px solid #f5f5f5;
    .el-dialog__title {
      color: #666666;
    }
    .el-icon-close:before {
      color: #666666;
      font-size: 20px;
    }
  }
  .el-dialog__body {
    height: 150px;
    overflow: hidden;
    padding: 5px 20px 0px 20px;
  }

  .input_box {
    width: 400px !important;
    .el-input__inner {
      border-radius: 5px; //设置输入框为圆角
    }
  }
  .el-form-item__label {
    padding-left: 10px;
    width: 120px !important;
    height: 40px;
    margin-left: 0;
    color: #666666;
  }
  .el-form-item__content {
    margin-left: 120px !important;
  }

  .el-dialog__footer {
    // background: pink;
    border-top: 1px solid #f5f5f5;
    height: 60px;
    padding-top: 0;
    .el-button {
      width: 80px;
      height: 30px;
      line-height: 30px;
      padding: 0;
    }
  }
}
</style>
