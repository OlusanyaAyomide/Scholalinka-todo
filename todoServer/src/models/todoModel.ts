import mongoose, {  Schema, Document } from "mongoose";



interface ITodo extends Document {
    _id:string
    text:string    
    startDate:Date
    endDate:Date
    dueDate:Date
    user:mongoose.Schema.Types.ObjectId
    isCompleted:boolean

}


const todoSchema:Schema<ITodo> = new mongoose.Schema<ITodo>({
    text:{type:String},
    startDate:{type:Date},
    endDate:{type:Date},
    dueDate:{type:Date},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    isCompleted:{type:Boolean,default:false}
    },
    {
    timestamps: { createdAt: true, updatedAt: false }
})

export const todoModel = mongoose.model("todo", todoSchema);