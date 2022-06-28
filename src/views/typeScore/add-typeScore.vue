<template>
  <el-dialog :title="titleName" :visible="showDialog" :before-close="btnCancel">
    <el-form
      ref="form"
      style="overflow-y: auto; height: 485px; margin-top: 10px"
      label-width="150px"
      :rules="rules"
      :model="form"
    >
      <el-form-item label="学校门类编号" prop="lq_school_type_code">
        <el-input v-model="form.lq_school_type_code" class="input_box" />
      </el-form-item>
      <el-form-item label="学校名称" prop="lq_school_type_name">
        <el-input v-model="form.lq_school_type_name" class="input_box" />
      </el-form-item>
      <el-form-item label="门类" prop="lq_school_type_subject">
        <el-input v-model="form.lq_school_type_type" class="input_box" />
      </el-form-item>
      <el-form-item label="年份" prop="lq_school_type_year">
        <el-input v-model="form.lq_school_type_year" class="input_box" />
      </el-form-item>
      <el-form-item label="省份" prop="lq_school_type_province">
        <el-input v-model="form.lq_school_type_province" class="input_box" />
      </el-form-item>
      <el-form-item label="省控线" prop="lq_school_type_p_line">
        <el-input v-model="form.lq_school_type_p_line" class="input_box" />
      </el-form-item>
      <el-form-item label="最低分" prop="lq_school_type_min_score">
        <el-input v-model="form.lq_school_type_min_score" class="input_box" />
      </el-form-item>
      <el-form-item label="最高分" prop="lq_school_type_max_score">
        <el-input v-model="form.lq_school_type_max_score" class="input_box" />
      </el-form-item>
      <el-form-item label="平均分" prop="lq_school_type_average_score">
        <el-input
          v-model="form.lq_school_type_average_score"
          class="input_box"
        />
      </el-form-item>
      <el-form-item label="最低排名" prop="lq_school_type_low_rank">
        <el-input v-model="form.lq_school_type_low_rank" class="input_box" />
      </el-form-item>
      <el-form-item label="最高排名" prop="lq_school_type_high_rank">
        <el-input v-model="form.lq_school_type_high_rank" class="input_box" />
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
    }
  },
  data() {
    return {
      // 表单数据结构, 用于接收编辑的表单数据，新增表单该数据为空就行
      form: {},
      // 表单验证
      rules: {
        lq_school_type_code: [
          { required: true, message: '请输入学校门类编号', trigger: 'blur' }
        ],
        lq_school_type_school: [
          { required: true, message: '请输入学校名', trigger: 'blur' }
        ],
        lq_school_type_subject: [
          { required: true, message: '请输入录取门类名称', trigger: 'blur' }
        ],
        lq_school_type_year: [
          { required: true, message: '请输入录取年份', trigger: 'blur' }
        ],
        lq_school_type_province: [
          { required: true, message: '请输入录取省份', trigger: 'blur' }
        ],
        lq_school_type_min_score: [
          { required: true, message: '请输入录取门类的最低分', trigger: 'blur' }
        ],
        lq_school_type_max_score: [
          { required: true, message: '请输入录取门类的最高分', trigger: 'blur' }
        ],
        lq_school_type_average_score: [
          { required: true, message: '请输入录取门类的平均分', trigger: 'blur' }
        ],
        lq_school_type_low_score: [
          { required: true, message: '请输入录取门类的最低排名', trigger: 'blur' }
        ],
        lq_school_type_high_score: [
          { required: true, message: '请输入录取门类的最高排名', trigger: 'blur' }
        ],
        lq_school_type_p_line: [
          { required: true, message: '请输入省控线', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    btnCancel() {
      this.form = {
        lq_school_type_code: '',
        lq_school_type_school: '',
        lq_school_type_subject: '',
        lq_school_type_year: '',
        lq_school_type_province: '',
        lq_school_type_max_score: '',
        lq_school_type_min_score: '',
        lq_school_type_average_score: '',
        lq_school_type_high_rank: '',
        lq_school_type_low_rank: '',
        lq_school_type_p_line: '',
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
</style>
