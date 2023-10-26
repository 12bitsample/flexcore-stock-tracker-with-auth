import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

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
userSchema.statics.signup = async function(username, password) {
    
    //validation
    if (!username || !password) {
        throw Error('All fields must be correctly filled!')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough!')
    }
    
    const exists = await this.findOne({ username });

    if (exists) {
        throw Error('Username already taken!')
    }

    //salt
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hash = await bcrypt.hash(password, salt);

    //create user
    const user = await this.create({ username, password: hash });

    return user;
}

export default mongoose.model('User', userSchema);