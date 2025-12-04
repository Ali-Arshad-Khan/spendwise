import User from "../userModel.js";

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        
        const user = new User({ name, email, password })
        await user.save()
        
        req.session.userId = user._id
        res.status(201).json({ message: "User registered" })
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body 
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch =  await user.comparePassword(password)
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        req.session.userId = user._id

        res.json({ message: "Login successful" })
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export function logout(req, res) {
    req.session.destroy(() => {
        res.json({ message: 'Logged out'})
    })
}
