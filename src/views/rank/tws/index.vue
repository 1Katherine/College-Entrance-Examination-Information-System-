<template>
  <div>
    <!-- 新增信息按钮 -->
    <el-row style="height:40px">
      <el-button
        icon="el-icon-plus"
        size="small"
        type="primary"
        @click="handleClick"
      >新增排名信息</el-button>
    </el-row>
    <!-- table组件展示数据 -->
    <Table
      :data-list="dataList"
      :keys="keys"
      :page="page"
      :loading="loading"
      @handleClick="handleClick"
      @handleDelete="handleDelete"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:table-item-right>
        <el-table-column label="相关信息">
          <!-- 通过作用域插槽，通过点击行，获得父组件行的数据 -->
          <template slot-scope="{ row }">
            <el-button
              size="small"
              @click="admission(row)"
            >招生信息</el-button>
            <el-button
              size="small"
              @click="score(row)"
            >历年录取信息</el-button>
            <el-button
              size="small"
              @click="basicInfo(row)"
            >学校基本信息</el-button>
          </template>
        </el-table-column>
      </template>
    </Table>

    <!-- 对话框组件 -->
    <add-dialog
      ref="dialog"
      :form="form"
      :rules="rules"
      :show-dialog="showDialog"
      :title-name="titleName"
      @btnCancel="btnCancel"
      @onSave="onSave"
    >
      <!-- 具名插槽传特定的内容 -->
      <template #dialog>
        <el-form-item label="排名编号" prop="tws_code">
          <el-input v-model="form.tws_code" class="input_box" :disabled="true" />
        </el-form-item>
        <el-form-item label="排名" prop="tws_rank">
          <el-input v-model="form.tws_rank" class="input_box" />
        </el-form-item>
        <el-form-item label="评选年份" prop="tws_year">
          <el-input v-model="form.tws_year" class="input_box" />
        </el-form-item>
        <!-- （表单显示的是学校名称）请求传入的是学校编号 -->
        <el-form-item v-if="hidden" label="学校id">
          <el-input
            v-if="hidden"
            v-model="form.tws_school"
            class="input_box"
          />
        </el-form-item>
        <el-form-item label="学校" prop="tws_schoolName">
          <el-autocomplete
            v-model="form.tws_schoolName"
            class="inline-input input_box"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            clearable
            @select="handleSelect"
          />
        </el-form-item>
      </template>
    </add-dialog>

  </div>

</template>

<script>
import Table from '@/components/common/table.vue'
import AddDialog from '@/components/common/add-dialog.vue'
import { getAllSchoolList } from '@/api/school'
import { getTwssByPage, addTws, editTws, delTws } from '@/api/rank/tws'
export default {
  name: 'TWS',
  components: {
    Table,
    AddDialog
  },

  data() {
    return {
      // 表格
      loading: false,
      dataList: [],
      keys: [], // 数据的keys
      schools: [], // 所有学校，用于显示在el-select中
      // 分页
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      //  对话框
      titleName: '',
      showDialog: false,
      form: {},
      rules: {
        tws_rank: [
          { required: true, message: '请填入学校泰晤士排名', trigger: 'blur' }
        ],
        tws_year: [
          { required: true, message: '请填入排名年份', trigger: 'blur' }
        ],
        tws_schoolName: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ]
      },
      hidden: false // 隐藏输入框
    }
  },
  async created() {
    // 获取所有学校信息
    await this.getAllSchoolList()
    // 获取排名信息
    await this.getTwssByPage()
  },
  methods: {
    // 分页查询所有信息
    async getTwssByPage() {
      try {
        this.loading = true
        const { data } = await getTwssByPage(this.page)
        this.dataList = data.data.records
        this.page.total = data.data.total

        // 根据学校编号获取学校名称
        this.dataList.forEach((item) => {
          const shool_id = item.tws_school
          // 遍历所有学校
          this.dataList.forEach((school) => {
            if (school.school_id === shool_id) {
              item.tws_schoolName = school.school_name
            }
          })
        })

        this.keys = [
          // { label: '序号', value: 'tws_code', width: '150px' },
          { label: '排名', value: 'tws_rank', width: '150px' },
          // { label: '学校id', value: 'tws_school', width: '150px' },
          { label: '学校名称', value: 'tws_schoolName', width: '300px' },
          { label: '评选年份', value: 'tws_year', width: '150px' }]

        this.loading = false
      } catch (err) {
        console.log(err)
      }
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
      this.form.tws_school = item.school_id
    },
    // 换页操作
    handleCurrentChange(newPage) {
      this.page.currentPage = newPage
      //   重新获取数据
    },
    // 打开对话框
    async handleClick(row) {
      if (row.tws_code) {
        // 编辑
        this.titleName = '编辑排名信息'
        this.form = row
      } else {
        // 新增
        this.titleName = '新增排名信息'
      }
      this.showDialog = true
    },
    // 关闭对话框
    btnCancel(value) {
      this.showDialog = value
      // 清空数据
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
    },
    admission(row) { },
    score(row) { },
    basicInfo(row) {},
    async onSave() {
      try {
        if (this.titleName.indexOf('新增') !== -1) {
          const { data } = await addTws(this.form)
          if (data.code === 200) {
            this.$message.success('保存成功！')
          } else {
            this.$message.error(data.message)
          }
        } else {
          const { data } = await editTws(this.form)
          if (data.code === 200) {
            this.$message.success('保存成功！')
          } else {
            this.$message.error(data.message)
          }
        }
      } catch (err) {
        console.log(err)
      }

      // 刷新数据
      this.getTwssByPage()
      // 关闭对话框
      this.showDialog = false
      // 清空子组件表单校验
      this.$refs.dialog.$refs.form.resetFields()
      // 清空数据
      this.form = { 'tws_code': '', 'tws_rank': '', 'tws_school': '', 'tws_schoolName': '', 'tws_year': '' }
    },

    async handleDelete(row) {
      this.$prompt('请输入DELETE', '确认删除本行数据？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(value) {
          return value === 'DELETE'
        },
        inputErrorMessage: '输入格式不正确，无法删除数据！'
      }).then(async() => {
        await delTws(row.tws_code)
        this.$message({
          type: 'success',
          message: '删除数据成功'
        })
        this.getTwssByPage() // 刷新数据
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
  height: 360px;
  .el-dialog__body {
    height: 260px;
    overflow: hidden;
    padding: 5px 20px 0px 20px;
  }
}
</style>
