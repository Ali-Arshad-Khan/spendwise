// import mongoose from "mongoose"
// import bcrypt from "bcryptjs"

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     created: { type: Date, default: Date.now },
// })


// userSchema.pre("save", async function(next) {
//     if (!this.isModified("password")) return next()
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)   
//     next() 
// })

// userSchema.methods.comparePassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

// const User = mongoose.model("User", userSchema)
// export default User


import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional (Google users won't have this)
    googleId: { type: String }, // added for Google OAuth
    created: { type: Date, default: Date.now },
})

userSchema.pre("save", async function (next) {
    // Only hash password if it exists AND was modified
    if (this.password && this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    if (!this.password) return false // Google users have no password
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)
export default User
