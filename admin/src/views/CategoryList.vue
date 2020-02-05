<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="150"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="samll" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="samll" @click="remove(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      items:[]
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('categories')
      this.items = res.data
    },
    async remove(id) {
      this.$confirm('确定要删除改项吗?',"提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$http.delete(`categories/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.fetch()
      })
    }
  },
  created(){
    this.fetch()
  }
}
</script>