const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    banner:{type:String},
    title:{type:String},
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    scores:{
        deifficut:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},

    },
    skills:[
        {delay1:{type:String},
    cost1:{type:String},
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}

    }],
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    usagetips:{type:String},
    battletips:{type:String},
    teamtips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'hero'},
        description:{type:String}
    }],
    

})
module.exports=mongoose.model('Hero',schema,'heroes')