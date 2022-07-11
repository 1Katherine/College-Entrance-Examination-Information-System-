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
        <el-input v-model="form.school_id" class="input_box" />
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

      <el-form-item label="区域">
        <el-select v-model="form.school_region" class="input_box" placeholder="请选择" @change="changeRegion" @focus="regionFocus">
          <el-option
            v-for="item in region"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="省份">
        <el-select v-model="form.school_province" class="input_box" @change="changeProvince" @focus="getProvinceByRegion">
          <el-option
            v-for="item in province"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="form.school_city" class="input_box" @focus="cityFocus">
          <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否211">
        <el-select
          v-model="form.school_211"
          class="input_box"
          placeholder="请选择"
        >
          <el-option v-for="item in school_211" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否985">
        <el-select
          v-model="form.school_985"
          class="input_box"
          placeholder="请选择"
        >
          <el-option v-for="item in school_985" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="隶属单位" prop="school_belong">
        <el-input v-model="form.school_belong" class="input_box" />
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
          v-model="form.school_requirments"
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
import { getAllRegions } from '@/api/region'
import { getProvinceByRegion } from '@/api/province'
import { getCityByProvince } from '@/api/city'
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
    form: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 表单验证
      rules: {
        school_id: [
          { required: true, message: '请输入学校id', trigger: 'blur' }
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
      },
      region: [],
      province: [],
      city: [],
      school_211: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
      school_985: [{ label: '是', value: 1 }, { label: '否', value: 0 }]
    }
  },
  created() {
    this.regionFocus()
  },
  methods: {
    // 获取地理位置（区域、省份、城市）
    async regionFocus() {
      const { data } = await getAllRegions(this.page)
      const regionsObj = data.data
      const regionsArr = []
      regionsObj.map(function(item, index, array) {
        const r = { 'value': item['region_code'],
          'label': item['region_name']
        }
        regionsArr.push(r)
      })
      this.region = regionsArr
    },
    async getProvinceByRegion() {
      var rid
      const region_label = this.form.school_region
      this.region.map(function(item, index, array) {
        if (item.label === region_label) {
          rid = item.value
        }
      })

      if (rid === '') {
        this.$message.warning('请先选择区域，再选择省份')
      } else {
        try {
          const { data } = await getProvinceByRegion(rid)
          const provinceObj = data.data
          const provinceArr = []
          provinceObj.map(function(item, index, array) {
            const pro = { 'value': item['province_code'],
              'label': item['province_name']
            }
            provinceArr.push(pro)
          })
          this.province = provinceArr
        } catch (error) {
          console.log(error)
        }
      }
    },
    async getCityByProvince() {
      var pid
      const pro_label = this.form.school_province
      this.province.map(function(item, index, array) {
        if (item.label === pro_label) {
          pid = item.value
        }
      })
      if (pid === '') {
        this.$message.warning('请先选择省份，再选择城市')
      } else {
        try {
          const { data } = await getCityByProvince(pid)
          const cityObj = data.data
          const cityArr = []
          cityObj.map(function(item, index, array) {
            const city = { 'value': item['city_code'],
              'label': item['city_name']
            }
            cityArr.push(city)
          })
          this.city = cityArr
        } catch (error) {
          console.log(error)
        }
      }
    },
    changeRegion() {
      this.form.school_province = ''
      this.form.school_city = ''
      this.getProvinceByRegion()
    },
    changeProvince() {
      this.form.school_city = ''
      this.getCityByProvince()
    },
    async cityFocus() {
      const pid = this.form.school_province
      console.log('pid', pid)
      if (pid === '' || typeof (pid) === 'undefined') {
        this.$message.warning('请先选择省份，再选择城市')
        // this.city = []
      } else {
        await this.getCityByProvince()
      }
    },
    btnCancel() {
      this.$refs.form.resetFields() // 移除校验规则
      this.$emit('cancelDialog', false) // 告诉父节点关闭弹窗
    },
    async onSave() {
      try {
        await this.$refs.form.validate() // 表单校验通过才会继续往下执行，否则跳到catch
        if (this.titleName === '编辑学校信息') {
          this.$emit('submitSchoolInfo', { type: 'edit', data: this.form })// 告诉父组件执行编辑接口
        } else {
          // 新增数据业务
          this.$emit('submitSchoolInfo', { type: 'add', data: this.form }) // 告诉父组件执行新增接口
        }
        // 重新获取所有数据
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
