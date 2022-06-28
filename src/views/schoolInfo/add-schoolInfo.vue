<template>
  <el-dialog :title="titleName" :visible="showDialog" :before-close="btnCancel">
    <el-form
      ref="form"
      style="overflow-y: auto; height: 485px; margin-top: 10px"
      label-width="150px"
      :rules="rules"
      :model="form"
    >
      <el-form-item label="学校编号" prop="school_code">
        <el-input v-model="form.school_code" class="input_box" />
      </el-form-item>
      <el-form-item label="学校名称" prop="school_name">
        <el-input v-model="form.school_name" class="input_box" />
      </el-form-item>
      <el-form-item label="学校等级" prop="school_level">
        <el-input v-model="form.school_level" class="input_box" />
      </el-form-item>
      <el-form-item label="学校类型" prop="school_type">
        <el-input v-model="form.school_type" class="input_box" />
      </el-form-item>
      <el-form-item label="办学性质" prop="school_nature">
        <el-input v-model="form.school_nature" class="input_box" />
      </el-form-item>
      <el-form-item label="隶属单位" prop="school_belong">
        <el-input v-model="form.school_belong" class="input_box" />
      </el-form-item>
      <el-form-item label="区域">
        <el-input v-model="form.school_region" class="input_box" />
      </el-form-item>
      <el-form-item label="省份">
        <el-input v-model="form.school_province" class="input_box" />
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.school_city" class="input_box" />
      </el-form-item>
      <el-form-item label="是否211">
        <el-select
          v-model="form.school_211"
          class="input_box"
          placeholder="请选择"
        >
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否985">
        <el-select
          v-model="form.school_985"
          class="input_box"
          placeholder="请选择"
        >
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-form-item>

      <el-form-item label="最新软科排名">
        <el-input v-model="form.school_rk" class="input_box" />
      </el-form-item>
      <el-form-item label="最新校友会排名">
        <el-input v-model="form.school_xyh" class="input_box" />
      </el-form-item>
      <el-form-item label="最新武书连排名">
        <el-input v-model="form.school_wsl" class="input_box" />
      </el-form-item>
      <el-form-item label="最新QS排名">
        <el-input v-model="form.school_qs" class="input_box" />
      </el-form-item>
      <el-form-item label="最新US排名">
        <el-input v-model="form.school_us" class="input_box" />
      </el-form-item>
      <el-form-item label="最新泰晤士排名">
        <el-input v-model="form.school_tws" class="input_box" />
      </el-form-item>
      <el-form-item label="报考要求">
        <el-input
          v-model="form.school_requirements"
          type="textarea"
          class="input_box"
        />
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
    titleName: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      // 表单数据结构, 用于接收编辑的表单数据，新增表单该数据为空就行
      form: {},
      // 表单验证
      rules: {
        school_code: [
          { required: true, message: '请输入学校编号', trigger: 'blur' }
        ],
        school_name: [
          { required: true, message: '请输入学校名', trigger: 'blur' }
        ],
        school_level: [
          { required: true, message: '请输入学校等级', trigger: 'blur' }
        ],
        school_type: [
          { required: true, message: '请输入学校类型', trigger: 'blur' }
        ],
        school_nature: [
          { required: true, message: '请输入办学性质', trigger: 'blur' }
        ],
        school_belong: [
          { required: true, message: '请输入学校隶属单位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    btnCancel() {
      this.form = {
        school_code: '', // 学校编号
        school_id: '', // 学校id
        school_name: '', // 学校名
        school_level: '', // 学校等级
        school_type: '', // 学校类型
        school_nature: '', // 办学性质
        school_region: '', // 区域
        school_province: '', // 省份
        school_city: '', // 省份
        school_211: '', // 是否211
        school_985: '', // 是否985
        school_belong: '', // 隶属单位
        school_rk: '', // 最新软科排名
        school_xyh: '', // 最新校友会排名
        school_wsl: '', // 最新武书连排名
        school_qs: '', // 最新QS排名
        school_us: '', // 最新US排名
        school_tws: '', // 最新泰晤士排名
        school_requirements: '' // 报考要求
      }
      this.$refs.form.resetFields() // 移除校验规则
      this.$emit('cancelDialog', false) // 告诉父节点关闭弹窗
    },
    async onSave() {
      try {
        await this.$refs.form.validate() // 表单校验通过才会继续往下执行，否则跳到catch
        if (this.form.id) {
          // 编辑数据业务
          // await 更新数据接口(id)
        } else {
          // 新增数据业务
          // await 新增接口(this.form)
        }
        // 重新获取所有数据
        this.$message.success('保存成功')
        this.$emit('cancelDialog', false) // 告诉父节点关闭弹窗
      } catch (error) {
        alert(error) // 表单校验不通过
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  width: 600px;
  height: 600px;
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
    height: 485px;
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
