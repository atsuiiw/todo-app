import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLength: 30
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 30
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },

    {
        timestamps: true
    }
);

// before saving password, hash it
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); // if the password is not modified
    this.password = await bcrypt.hash(this.password, 10); // hashing
});

// comparing password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User",userSchema);