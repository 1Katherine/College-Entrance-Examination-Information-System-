<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style="width:1080px">
        <el-tabs v-model="activeName">
          <!-- 显示所有地理信息 -->
          <el-tab-pane label="区域信息管理" name="first">
            <Region />
          </el-tab-pane>
          <el-tab-pane label="省份信息管理" name="second">
            <Province :allregions="allregions" @getAllProvinces="getAllProvinces" />
          </el-tab-pane>
          <el-tab-pane label="城市信息管理" name="third">
            <City :allprovinces="allprovinces" />
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </div>
  </div>

</template>

<script>
import Region from './components/region/region.vue'
import Province from './components/province/province.vue'
import City from './components/city/city.vue'
import { getAllRegions } from '@/api/region'
import { getProvinceByRegion } from '@/api/province'
export default {
  name: 'Geographic',
  // 添加依赖数据，它里面定义的数据，子组件可以选择性注入并直接使用。
  provide() {
    return {
      // 父组件中无法对provide（）中的allRegions进行数据更新操作, 可以通过data中数据赋值方式实现
      allRegions: () => this.allregions
    }
  },
  components: {
    Region,
    Province,
    City
  },
  data() {
    return {
      activeName: 'first',
      allregions: [],
      allprovinces: []
    }
  },
  created() {
    // 获取所有区域和省份
    this.getAllRegions()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 获取所有区域
    async getAllRegions() {
      const { data } = await getAllRegions()
      this.allregions = data.data
      console.log('获取所有区域', this.allregions)
      // 获取所有省份
      this.getAllProvinces()
      console.log('获取所有省份', this.allprovinces)
    },
    // 根据所有区域查询所有省份信息
    async getAllProvinces() {
      const allprovinces = []
      try {
        for (var i = 0; i < this.allregions.length; i++) {
          const { data } = await getProvinceByRegion(this.allregions[i].region_code)
          const province = data.data // 根据每个区域获取的该区域对应的省份数组
          for (var j = 0; j < province.length; j++) {
            allprovinces.push(province[j])
          }
        }
      } catch (err) {
        console.log(err)
      }
      this.allprovinces = allprovinces
    }

  }

}
</script>

<style lang="scss">

</style>
