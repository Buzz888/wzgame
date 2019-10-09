module.exports =option=> {return async(req,res,next)=>{
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')
    const token = String(req.headers.authorization|| '').split(' ').pop()
    assert(token,401,'请提供token')
    const {id} =jwt.verify(token,req.app.get('secret'))
    assert(id,401,'无效id')
    req.user = await AdminUser.findById(id)
    assert(req.user,401,'请登陆')
    await next()
  }}