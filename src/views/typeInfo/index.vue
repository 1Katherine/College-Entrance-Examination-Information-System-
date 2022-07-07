<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 树形结构 -->
      <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
      <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
        <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 -->
        <el-row slot-scope="{ data }" type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
          <!-- 左侧内容 -->
          <el-col>{{ data.name }}</el-col>
          <!-- 右侧操作 -->
          <el-col :span="8">
            <el-row justify="end" type="flex">
              <!-- 放置下拉操作 -->
              <el-dropdown>
                <span>操作
                  <i class="el-icon-arrow-down" />
                </span>
                <!-- 具名插槽 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子元素 </el-dropdown-item>
                  <el-dropdown-item>编辑元素</el-dropdown-item>
                  <el-dropdown-item>删除元素 </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>

        </el-row>

      </el-tree>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [{ name: '工学', children: [{ name: '计算机科学与技术', children: [{ name: '计算机系统结构' }, { name: '计算机应用技术' }, { name: '计算机软件与理论' }] }] },
        { name: '经济学', children: [{ name: '理论经济学', children: [{ name: '西方经济学' }, { name: '世界经济' }] }, { name: '应用经济学', children: [{ name: '财政学' }, { name: '金融学' }] }] },
        { name: '法学', children: [{ name: '政治学', children: [{ name: '国际政治' }, { name: '国际关系' }] },
          { name: '社会学', children: [{ name: '人口学' }, { name: '人类学' }] },
          { name: '民族学', children: [{ name: '中国少数民族史' }, { name: '中国少数民族艺术' }] }] }]
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

