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
          >新增双一流高校信息</el-button>
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
          <el-table-column
            prop="dual_year"
            label="评选年份"
            width="400"
            :filters="[{text: '2020', value: '2020'}, {text: '2021', value: '2021'},
                       {text: '2022', value: '2022'}]"
            :filter-method="filterHandler"
            sortable
          />
          <el-table-column prop="dual_schoolName" label="双一流高校名称" width="500" />
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
          style="overflow-y: auto; height: 485px; margin-top: 10px"
          label-width="150px"
          :rules="rules"
          :model="form"
        >
          <el-form-item label="评选年份" prop="dual_year">
            <el-input v-model="form.dual_year" class="input_box" />
          </el-form-item>

          <!-- （表单显示的是学校名称）请求传入的是学校编号 -->
          <el-form-item v-if="hidden" label="学校id">
            <el-input
              v-if="hidden"
              v-model="form.dual_school"
              class="input_box"
            />
          </el-form-item>
          <el-form-item label="学校" prop="dual_schoolName">
            <el-autocomplete
              v-model="form.dual_schoolName"
              class="inline-input input_box"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              clearable
              @select="handleSelect"
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
    </div>

  </div>

</template>

<script>
import { getDualsByPage, addDual, editDual, delDual } from '@/api/dual'
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

      },
      // 表单校验规则
      rules: {
        dual_year: [
          { required: true, message: '请填写评选日期', trigger: 'blur' }
        ],
        dual_schoolName: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ]
      },
      hidden: false, // 隐藏输入框
      // 表单select中显示的所有学校列表
      schools: [],
      titleName: '新增数据', // 控制表单对话框的标题显示
      showDialog: false // 控制表单对话框的显示
    }
  },
  created() {
    this.getDualsByPage()
    this.getAllSchoolList()
  },
  methods: {
    // 分页显示所有双一流高校
    async getDualsByPage() { // 根据页码获取当前所有数据
      this.loading = true
      const { data } = await getDualsByPage(this.page)
      this.page.total = data.data.total
      this.datalist = data.data.records
      this.loading = false
    },
    // 获取所有学校信息，用于显示在表单的下拉框内
    async getAllSchoolList() {
      const { data } = await getAllSchoolList()
      this.schools = data.data
    },
    // 表单输入框建议函数
    querySearch(queryString, callback) {
      var schools = this.schools
      var results = queryString ? schools.filter(this.createFilter(queryString)) : schools
      // 结果需要有value字段
      results.forEach((item) => {
        item.value = item.school_name
      })
      // 调用 callback 返回建议列表的数据
      callback(results)
    },
    // 输出狂建议匹配
    createFilter(queryString) {
      return (schools) => {
        return (schools.school_name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    // 获取学校名对应的学校id
    handleSelect(item) {
      this.form.dual_school = item.school_id
    },

    // 点击页数跳转到对应页面，显示对应页面的高校信息
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage // 修改当前页
      this.getDualsByPage() // 获取当前页的数据给datalist
    },
    // 按照年份筛选数据
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 清除日期筛选内容
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },

    // 关闭表单对话框
    btnCancel() {
      this.showDialog = false
      // 移除表单校验规则和数据
      this.$refs.form.resetFields()
      this.form.dual_year = ''
      this.form.dual_school = ''
      this.form.dual_schoolName = ''
    },
    // 点击新增/编辑按钮，显示表单
    handleClick(row) {
      if (row.dual_school) {
        // 打开编辑对话框
        this.titleName = '编辑双一流高校信息'
        this.form = { 'dual_code': row.dual_code, 'dual_school': row.dual_school, 'dual_year': row.dual_year, 'dual_schoolName': row.dual_schoolName } // 数据回显
      } else {
        // 打开新增对话框
        this.titleName = '新增双一流高校信息'
      }
      this.showDialog = true
    },
    // 保存表单信息（新增/删除）
    async onSave() {
      try {
      // 只有校验成功才会执行下面的内容
        await this.$refs.form.validate()
        if (this.titleName.indexOf('新增') !== -1) {
          // 新增数据
          const { data } = await addDual(this.form)
          if (data.code !== 200) {
            this.$message.warning(data.message)
          } else {
            this.$message.success('添加成功！')
          }
        } else {
          // 编辑数据
          const { data } = await editDual(this.form)
          if (data.code !== 200) {
            this.$message.warning(data.message)
          } else {
            this.$message.success('保存成功！')
          }
        }
        this.showDialog = false // 关闭对话框
        // 移除表单校验规则和数据
        this.$refs.form.resetFields()
        this.form.dual_year = ''
        this.form.dual_school = ''
        this.form.dual_schoolName = ''
        // 刷新表格数据
        this.getDualsByPage()
      } catch (err) {
        console.log(err)
      }
    },
    // 删除数据
    handleDelete(row) {
      this.$prompt('请输入DELETE', '确认删除本行数据？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(value) {
          return value === 'DELETE'
        },
        inputErrorMessage: '输入格式不正确，无法删除数据！'
      }).then(async() => {
        await delDual(row.dual_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getDualsByPage() // 刷新数据
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除操作'
        })
      })
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

