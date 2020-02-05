const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    // 指定是数据模型中ObjectId,并关联Category表
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("Category", schema);
