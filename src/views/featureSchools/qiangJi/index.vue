<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 使用 PageTools 公共组件实现通用栏 -->
      <page-tools :show-before="true">
        <template slot="before">
          <!-- 新增学校信息按钮 -->
          <el-button
            type="primary"
            @click="handleClick"
          >新增强基计划高校</el-button>
        </template>
        <template slot="after">
          <el-button
            type="warning"
          >导入</el-button>
          <el-button type="danger">导出</el-button>
        </template>
      </page-tools>

      <!-- 信息显示表格 -->
      <el-card>
        <el-table v-loading="loading" :data="datalist" style="width: 100%" stripe border>
          <el-table-column label="序号" type="index" width="200" />
          <el-table-column prop="qj_year" label="评选年份" width="400" sortable />
          <el-table-column prop="qj_schoolName" label="双一流高校名称" width="500" />
          <el-table-column label="操作">
            <!-- 通过作用域插槽，通过点击行，获得父组件行的数据 -->
            <template slot-scope="{ row }">
              <el-button
                size="small"
                type="primary"
                @click="handleClick(row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 分页组件 -->
      <el-row justify="center" type="flex" align="middle" style="height: 60px">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="page.total"
          @current-change="handleCurrentChange"
        />
      </el-row>

      <!-- 新增信息的弹框组件 -->
      <!-- 新增/编辑对话框 -->
      <el-dialog :title="titleName" :visible="showDialog" :before-close="btnCancel" style="margin-top: 120px;">
        <el-form
          ref="form"
          style="margin-top: 10px"
          label-width="150px"
          :rules="rules"
          :model="form"
        >
          <el-form-item label="强基计划编号" prop="qj_code">
            <el-input v-model="form.qj_code" class="input_box" :disabled="true" />
          </el-form-item>
          <el-form-item label="评选年份" prop="qj_year">
            <el-input v-model="form.qj_year" class="input_box" />
          </el-form-item>
          <el-form-item label="学校" prop="qj_school">
            <el-select v-model="form.qj_school" class="input_box">
              <el-option
                v-for="item in schools"
                :key="item.school_id"
                :label="item.school_name"
                :value="item.school_id"
              />
            </el-select>
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
    </div>

  </div>

</template>

<script>
import { getQiangJiByPage, addQiangJi, editQiangJi, delQiangJi } from '@/api/qiangji'
import { getAllSchoolList } from '@/api/school'
export default {
  data() {
    return {
      // el-table数据
      datalist: [],
      loading: false, // 控制el-table获取数据前显示加载圆圈
      // 分页数据
      page: {
        currentPage: 1,
        pageSize: 5,
        tatal: 0
      },
      // 表单信息
      form: {
        'qj_year': '',
        'qj_school': ''
      },
      // 表单校验规则
      rules: {
        qj_year: [
          { required: true, message: '请填写评选日期', trigger: 'blur' }
        ],
        qj_school: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ]
      },
      // 表单select中显示的所有学校列表
      schools: [],
      titleName: '新增数据', // 控制表单对话框的标题显示
      showDialog: false // 控制表单对话框的显示
    }
  },
  created() {
    this.getQiangJiByPage()
    this.getAllSchoolList()
  },
  methods: {
    // 分页显示所有双一流高校
    async getQiangJiByPage() { // 根据页码获取当前所有数据
      this.loading = true
      const { data } = await getQiangJiByPage(this.page)
      this.page.total = data.data.total
      this.datalist = data.data.records
      this.loading = false
    },
    // 获取所有学校信息，用于显示在表单的下拉框内
    async getAllSchoolList() {
      const { data } = await getAllSchoolList()
      this.schools = data.data
    },
    // 点击页数跳转到对应页面，显示对应页面的高校信息
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage // 修改当前页
      this.getDualsByPage() // 获取当前页的数据给datalist
    },
    // 关闭表单对话框
    btnCancel() {
      this.showDialog = false
      // 清除表单校验
      this.$refs.form.resetFields()
      this.form.qj_code = ''
      this.form.qj_year = ''
      this.form.qj_school = ''
    },
    // 点击新增/编辑按钮，显示表单
    handleClick(row) {
      if (row.qj_code) {
        this.titleName = '编辑强基计划信息'
        this.form = { 'qj_code': row.qj_code, 'qj_school': row.qj_school, 'qj_year': row.qj_year } // 数据回显
      } else {
        this.titleName = '新增强基计划信息'
      }
      this.showDialog = true
    },
    // 删除数据
    async handleDelete(row) {
      await delQiangJi(row.qj_code)
      // 重新刷新表格数据
      this.getQiangJiByPage()
    },
    // 保存表单信息（新增/删除）
    async onSave() {
      // 表单验证成功才会往下执行
      try {
        await this.$refs.form.validate()
        if (this.titleName.indexOf('新增') !== -1) {
          // 新增信息
          const { data } = await addQiangJi(this.form)
          if (data.code !== 200) {
            this.$message.warning(data.message)
          } else {
            this.$message.success('添加成功！')
          }
        } else {
          // 编辑信息
          const { data } = await editQiangJi(this.form)
          if (data.code !== 200) {
            this.$message.warning(data.message)
          } else {
            this.$message.success('保存成功！')
          }
        }
      } catch (err) {
        console.log(err)
      }
      // 重新加载表格数据
      this.getQiangJiByPage()
      // 清除表单校验
      this.$refs.form.resetFields()
      this.form.qj_code = ''
      this.form.qj_year = ''
      this.form.qj_school = ''
      // 关闭对话框
      this.showDialog = false
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  width: 600px;
  height: 300px;
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
    height: 200px;
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
    .el-form-item__error{
      padding-left: 105px;
    }
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

