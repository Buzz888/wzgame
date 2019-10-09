const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String},
    parens:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
})
schema.virtual('children',{
    localField:'_id',
    foreignField:'parens',
    justOne:false,
    ref:'Category'
})
schema.virtual('newlist',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})
module.exports=mongoose.model('Category',schema)