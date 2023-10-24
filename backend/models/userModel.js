import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true })

//static signup method
userSchema.statics.signup = async (username, password) => {
    const exists = await this.findOne({ username });

    if (exists) {
        throw Error('Username already taken!')
    }
}

export default mongoose.model('userModel', userSchema);