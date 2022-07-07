<template>
  <div>
    <el-card>
      <el-table ref="table" v-loading="loading" :data="dataList" style="width: 100%" stripe border>
        <!-- v-for 动态渲染表格 template -->
        <template v-for="(item,index) in keys">
          <el-table-column :key="index" :prop="item.value" :label="item.label" :width="item.width" />
        </template>
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
  </div>
</template>

<script>
export default {
  props: {
    // 表格显示信息
    dataList: {
      type: Array,
      default: null
    },
    keys: {
      type: Array,
      default: null
    },
    // 分页数据
    page: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {

    }
  },
  created() {
    console.log('loading', this.loading)
  },
  methods: {
    handleClick(row) {
      this.$emit('handleClick', row)
    },
    handleDelete(row) {
      this.$emit('handleDelete', row)
    },
    handleCurrentChange(newPage) {
      this.$emit('handleCurrentChange', newPage)
    }
  }

}
</script>

<style>

</style>
