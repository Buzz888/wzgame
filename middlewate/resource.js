module.exports = options =>{
    return async(req,res,next)=>{
        const modelname = require('inflection').classify(req.params.resource)
        req.model=require(`../models/${ modelname}`)
        next()
}
}