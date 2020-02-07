module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true // 将接口地址里的参数合并到router里
  });
  // const Category = require('../../models/Category')
  // router.post('/categories', async(req, res) => {
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.get('/', async(req, res) => {
    let queryOptions = {}
    if(req.Model.modelName === 'Category'){
      queryOptions.populate = 'parent'
    }
    // populate指定关联数据库表中哪个字段
    const model = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(model)
  })
  router.get('/:id', async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id', async(req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  // resource指定模型名称-写成通用CURD
  app.use('/admin/api/rest/:resource', async(req, res, next) => {
    // 拦截器-通过接口路径中resource,获取模型名
    const ModelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${ModelName}`)
    next();
  },router)
  // app.use('/admin/api', router)
}