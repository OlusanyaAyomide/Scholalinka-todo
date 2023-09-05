import mongoose, {  Schema, Document, Model, Query } from "mongoose";
import bcrypt from "bcrypt";


interface IUser extends Document {
    _id:string,
    email: string;
    password: string;
    name:string
    select:(any:any)=>{}
    checkPassword: (inputpassword: string,hashedpassword:string) => Promise<boolean>;
}


const userSchema:Schema<IUser> = new mongoose.Schema<IUser>({
    email:{type: String},
    password:{type:String,select:false},
    name:{type:String}
    },
    {
    timestamps: { createdAt: true, updatedAt: false }
})


userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});


userSchema.methods.checkPassword = async function (
    inputpassword:string,
    hashedpassword:string
) {
    const isCorrect = await bcrypt.compare(inputpassword, hashedpassword);
    console.log(isCorrect)
    return isCorrect;
};
userSchema.pre<IUser>(/^find/,function(next){
    this.select("-__v -password")
    next()
})


export const userModel = mongoose.model("user", userSchema);