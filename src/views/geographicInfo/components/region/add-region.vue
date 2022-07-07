<template>
  <!-- 新增/删除对话框 -->
  <el-dialog :title="titleName" :visible="showDialog" :before-close="btnCancel" style="margin-top: 120px;">
    <el-form
      ref="form"
      style="overflow-y: auto; height: 485px; margin-top: 10px"
      label-width="150px"
      :rules="rules"
      :model="form"
    >
      <el-form-item label="区域编号" prop="region_code">
        <el-input v-model="form.region_code" class="input_box" :disabled="true" />
      </el-form-item>
      <el-form-item label="区域名" prop="region_name">
        <el-input v-model="form.region_name" class="input_box" />
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
  name: 'AddRegion',
  props: {
    showDialog: {
      type: Boolean,
      defalut: false
    },
    titleName: {
      type: String,
      default: ''
    },
    form: {
      type: Object,
      defalut: null
    }
  },
  data() {
    return {
      // 表单验证
      rules: {
        region_name: [
          { required: true, message: '请输入区域名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 关闭新增/删除数据对话框
    btnCancel() {
      this.$emit('cancelDialog', false)
    },
    async onSave() {
      try {
        await this.$refs.form.validate() // 表单校验通过才会继续往下执行，否则跳到catch
        if (this.titleName.indexOf('编辑') !== -1) {
          this.$emit('submitInfo', { type: 'edit', data: this.form })// 告诉父组件执行编辑接口
        } else {
          // 新增数据业务
          this.$emit('submitInfo', { type: 'add', data: this.form }) // 告诉父组件执行新增接口
        }
        // 重新获取所有数据
        this.$message.success('保存成功')
        this.$emit('cancelDialog', false) // 告诉父节点关闭弹窗
      } catch (error) {
        console.log('表单校验不通过')// 表单校验不通过
      }
    }

  }

}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  width: 600px;
  height: 240px;
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
    height: 140px;
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
    margin-left: 15px !important;
  }

  .el-dialog__footer {
    // background: pink;
    border-top: 1px solid #f5f5f5;
    height: 60px;
    .el-button {
      width: 80px;
      height: 30px;
      line-height: 30px;
      padding: 0;
    }
  }
}
</style>

