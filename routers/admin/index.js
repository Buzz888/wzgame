module.exports =app=>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const auth1 =require('../../middlewate/auth')
    const resource = require('../../middlewate/resource')
    const router = express.Router(
      { mergeParams:true}
    )
    //创建
    router.post('/create',async(req,res)=>{
      
     const model = await req.model.create(req.body)
      res.send(model)
    })
    //查看
    router.get('/list',async(req,res)=>{
      
      
      const queryOptions = {}
      if(req.model.modelName==='Category'){
        queryOptions.populate = 'parens'
      }
      const model = await req.model.find().setOptions(queryOptions).limit(100)
      res.send(model)
    })
    //查看修改
    router.get('/dist/:id',async(req,res)=>{
      const model = await req.model.findById(req.params.id)
      res.send(model)
    })
    //修改
    router.put('/dist/:id',async(req,res)=>{
      const model = await req.model.findByIdAndUpdate(req.params.id,req.body)
       res.send(model)
     })
     //删除
     router.delete('/dist/:id',async(req,res)=>{
      const model = await req.model.findByIdAndDelete(req.params.id,req.body)
       res.send({success:true})
     })
    app.use('/admin/api/rest/:resource',auth1(),resource(),router)
    const multer = require('multer')
    const upload =multer({dest:__dirname + '/../../uploads'})
    app.post('/admin/api/upload',auth1(),upload.single('file'),async(req,res)=>{
           const file = req.file
           file.url=`http://localhost:3000/uploads/${file.filename}`
           res.send(file)
    })

    app.post('/admin/api/login',async(req,res)=>{
     const {username,password} = req.body
    //  1.根据用户名找用户
    
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user,422,'用户不存在')
    const isvalid = require('bcrypt').compareSync(password,user.password)
    if(!isvalid){
      return res.status(422).send({
        message:'密码错误'

      })
    }
    const jwt = require('jsonwebtoken')  
    const token = jwt.sign(
      {id:user._id},app.get('secret'))
      return res.send({token})

    //  2.检验密码
    //  3.返回token
    })

    //错误处理
    app.use(async(err,req,res,next)=>{
      res.status(err.statusCode || 500).send({
        message:err.message
      })
    })

}