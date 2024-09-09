const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js')


const cookieOptions = { httpOnly: true ,secure:process.env.NODE_ENV === 'production',sameSite: 'None'}
const tokenExpireTime = new Date(Date.now() + 2 * 60 * 1000);
// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password  } = req.body;

  try {
    if( !name || !email || !password){
      return res.status(400).json({msg:'Please fill in all the fields'})
    }
    const userExists = await User.findOne({email});
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const user = new User({ name ,email, password });
    const token = generateToken(user._id);
    user.activeToken = token;
    user.tokenExpireTime = tokenExpireTime;
    await user.save();
    res.cookie('token', token,cookieOptions );
    res.status(201).json({ msg: 'User registered successfully' ,token,name:user.name});
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if(!email || !password){
      return res.status(400).json({msg:'Please fill in all the fields'})
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check for active token
    if (user.activeToken && Date.now() < user.tokenExpireTime) {
      return res.status(409).json({ msg: 'User has already logged in' });
    }

    // Generate token
    const token = generateToken(user._id)

    user.activeToken = token;
    user.tokenExpireTime = tokenExpireTime;
    await user.save();

    res.cookie('token', token, cookieOptions);
    res.json({ token , name:user.name});
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error' }); 

  }
};

// Logout a user
const logoutUser = async (req, res) => {
 try {
  const user = await User.findById(req.user._id);
  user.activeToken = null;
  user.tokenExpireTime = null;
  await user.save();

  res.clearCookie('token');
  res.json({ msg: 'Logged out successfully' });
 } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Server error' }); 
 }
};

const verifyUser =  (req, res) => {
  res.status(200).json({msg:"User is verified",isAuthenticated:true})
 };



module.exports = { registerUser, loginUser, logoutUser,verifyUser};
