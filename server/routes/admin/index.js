module.exports = app => {
  const express = require('express')
  const router = express.Router();
  const Category = require('../../models/Category')
  router.post('/categories', async(req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  router.get('/categories', async(req, res) => {
    // populate指定关联数据库表中哪个字段
    const model = await Category.find().populate('parent').limit(10)
    res.send(model)
  })
  router.get('/categories/:id', async(req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
  router.put('/categories/:id', async(req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/categories/:id', async(req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  app.use('/admin/api', router)
}