<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    // async fetchParentOptions() {
    //   const res = await this.$http.get("rest/items");
    //   this.parents = res.data;
    // }
  },
  created() {
    this.id && this.fetch();
    // this.fetchParentOptions();
  }
};
</script>