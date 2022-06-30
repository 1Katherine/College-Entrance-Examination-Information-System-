<template>
  <el-dialog
    title="新增学校招生信息"
    :visible="showDialog"
    :before-close="btnCancel"
  >
    <el-form label-width="150px" style="margin-top: 10px">
      <el-form-item label="学校名称">
        <el-select v-model="form.name" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属省份">
        <el-input v-model="form.province" style="width: 202px" />
      </el-form-item>
      <el-form-item label="招生专业">
        <el-input v-model="form.major" style="width: 202px" />
      </el-form-item>
      <el-form-item label="招生人数">
        <el-input v-model="form.zsrs" style="width: 202px" />
      </el-form-item>
      <el-form-item label="招生类型">
        <el-input v-model="form.zslx" style="width: 202px" />
      </el-form-item>
      <el-form-item label="招生批次">
        <el-input v-model="form.zspc" style="width: 202px" />
      </el-form-item>
      <el-form-item label="是否有强基计划">
        <el-input v-model="form.qjjh" style="width: 202px" />
      </el-form-item>
    </el-form>
    <!-- 弹框底部 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary">确定</el-button>
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
      // 对话框中selector选择器的数据
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '' // seletor框中最初显示的内容
    }
  },
  methods: {
    btnCancel() {
      this.$emit('cancelDialog', false)
    }
  }
}
</script>

<style lang="scss">
.el-dialog {
  width: 700px;
  .el-select {
    width: 300px !important;
  }
  .el-input {
    width: 300px !important;
  }
  .el-form-item__label {
    margin-left: 80px;
  }
}
</style>
