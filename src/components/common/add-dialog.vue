<template>
  <!-- 新增/编辑对话框 -->
  <el-dialog :title="titleName" :visible="showDialog" :before-close="btnCancel" style="margin-top: 120px;">
    <el-form
      ref="form"
      style="overflow-y: auto; height: 485px; margin-top: 10px"
      label-width="150px"
      :rules="rules"
      :model="form"
    >
      <slot name="dialog" />
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
    titleName: {
      type: String,
      default: ''
    },
    showDialog: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: null
    },
    rules: {
      type: Object,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {
    // 取消对话框
    btnCancel() {
      // 关闭对话框
      this.$emit('btnCancel', false)
    },
    // 新增or修改
    onSave() {
      this.$refs.form.validate((valid) => {
        // 成功valid为true，失败为false
        if (valid) {
          // 校验通过才会进入下一步
          this.$emit('onSave')
        } else {
          this.$message.error('表单校验不通过')
        }
      })
    }
  }

}
</script>

<style>

</style>
