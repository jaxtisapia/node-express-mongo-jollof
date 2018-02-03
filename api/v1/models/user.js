let mongoose = require('../mongodb/database').mongoose;
let Schema = mongoose.Schema;

let util = require('../util/util');

let userSchema = new Schema({
    _id:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    password:{
        real:{type:String, required:true},
        reset:{
            token:{type:String, default:''},
            activeTill:{type:Date, default:null}
        }
    },
    verifications:{
        isEmailVerified:{type:Boolean, default:false},
        isPhoneVerified:{type:Boolean, default:false},
        isUserBanned:{type:Boolean, default:false}
    },
    financial:{
        balance:{type:Number, default:0.00},
    },
    membership:{
        status:{type:Number, default:0},
        privileges:[]
    },
    meta:{
        topups:{type:Number, default:0},
        date_created:{type:Date, default:Date.now}
    },
    session:{
        id:{type:String, default:`${util.randomText(24)}`},
        lastActive:{type:Date, default:Date.now},
        activeTill:{type:Date, default:util.nMinutesFromNow(minutes=30)}
    }
});

let User = mongoose.model('User', userSchema);

exports.User = User;