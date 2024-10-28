import mongoose, { Schema, Document, Model} from 'mongoose';
import bcrypt from "bcrypt";
interface userDoc extends Document{
    name: string,
    email: string,
    password: string,
    isEmailVerified: boolean
    resetPasswordToken: string,
    resetPasswordExpires: Date,
    verifyEmailToken: string,
    verifyEmailExpires: Date,
}
const userSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: false, unique: true},
        password: {type: String, required: true},
        isEmailVerified: {type: Boolean, default: false},
        resetPasswordToken: {type: String, default: null},
        resetPasswordExpires: {type: Date, default: null},
        verifyEmailToken: {type: String, default: null},
        verifyEmailExpires: {type: Date, default: null},
    },
    {timestamps: true, usePushEach: true}
)
userSchema.pre("save", function checkPassword(next){
    const user = this;
    if(!user.isModified('password')){
        next();
        return;
    }
    bcrypt.genSalt(10,  (err, salt) => {
        if(err){
            next(err);
            return;
        }
        bcrypt.hash(user.password, salt, (innerErr, hashedPassword) => {
            if(innerErr){
                next(innerErr);
                return;
            }
            user.password = hashedPassword;
            next();
        })
    })

})
userSchema.virtual('id').get(function idToString(){
    return this._id.toHexString();
})
userSchema.set('toJSON',{
    virtuals: true,
})
userSchema.methods.comparePassword = async function(password: string) {
    const user = this;
    if(!user.password){
        return false;
    }
    try {
        return await bcrypt.compare(password, user.password);
    } catch (error) {
        console.error('Password not matched');
        return false;
    }
}

const userModel = mongoose.model<userDoc>('user', userSchema);
export {userModel};