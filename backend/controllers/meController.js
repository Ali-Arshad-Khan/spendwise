// import User from "../userModel.js"

// export async function getCurrentUser(req, res) {
//   try {
//     if (!req.session.userId) {
//       return res.json({ isLoggedIn: false });
//     }

//     const user = await User.findById(req.session.userId);

//     if (!user) {
//       return res.json({ isLoggedIn: false });
//     }

//     res.json({ isLoggedIn: true, name: user.name });
//   } catch (err) {
//     console.error('getCurrentUser error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


import User from "../userModel.js";

export async function getCurrentUser(req, res) {
  try {
    let user;

    // Check Passport login (Google)
    if (req.user) {
      user = await User.findById(req.user._id);
    }
    // Fallback for email/password login using session
    else if (req.session.userId) {
      user = await User.findById(req.session.userId);
    }

    if (!user) {
      return res.json({ isLoggedIn: false });
    }

    res.json({ isLoggedIn: true, name: user.name });
  } catch (err) {
    console.error("getCurrentUser error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
