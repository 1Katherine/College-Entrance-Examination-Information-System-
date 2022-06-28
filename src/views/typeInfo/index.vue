<template>
  <div>
    <h2>学校一级学科信息页面（门类） Tree</h2>
    <div class="block">
      <p>使用 scoped slot</p>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="operations">
            <el-button type="text" size="small" @click="() => append(data)">
              Append
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="() => remove(node, data)"
            >
              Delete
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const data = [
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1'
              },
              {
                id: 10,
                label: '三级 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1'
          },
          {
            id: 6,
            label: '二级 2-2'
          }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1'
          },
          {
            id: 8,
            label: '二级 3-2'
          }
        ]
      }
    ]
    return {
      data: JSON.parse(JSON.stringify(data))
    }
  },

  methods: {
    append(data) {
      // const newChild = { id: id++, label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
      console.log(data)
    },

    remove(node, data) {
      // const parent = node.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex((d) => d.id === data.id)
      // children.splice(index, 1)
      console.log(node)
      console.log(data)
    }
  }
}
</script>

<style>
.operations {
  padding-left: 18px;
}
</style>
