import User from '../models/userModel.js';
import generatetoken from '../utils/generateToken.js';
//@desc Auth User and get Token
//@route POST /api/users/login
//@access public
const authUser = async (req, res)=>{
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if(user && (await user.matchPassword(password))){
    
    generatetoken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401).json({error: 'user not found'})
  }
} 


//@desc register user
//@route POST /api/users
//@access public
const registerUser = async (req, res)=>{
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if( userExists ){
    res.status(400).json({message: 'user Already Exits'})
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if(user) {
    generatetoken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
    
  } else {
    res.status(400).json('Invalid User Data')
  }
}


//@desc Logout user / clear Cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = async (req, res)=>{
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out sucessfully' });
}


//@desc Get user Profile
//@route POST /api/users/profile
//@access Private
const getUserProfile = async (req, res)=>{
  const user = await User.findById(req.user._id);
  if(user){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404).json('User not found')
  }
}


//@desc Update user Profile
//@route PUT /api/users/profile
//@access public
const updateUserProfile = async (req, res)=>{
  const user = await User.findById(req.user._id);

  if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
    

    if(req.body.password){
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    })
  } else{
    res.status(404).json('User not found')
  }
}


//@desc get Users
//@route PUT /api/users
//@access Private/Admin
const getUsers = async (req, res)=>{
  const users = await User.find({});
  res.status(200).json(users);
}

//@desc get User by ID
//@route PUT /api/users/:id
//@access Private/Admin
const getUserById = async (req, res)=>{
  const user = await User.findById(req.params.id).select('-password');

  if(user){
    res.status(200).json(user);
  } else{
    res.status(404).json({message: 'User not found'});
  }
}

//@desc delete Users
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = async (req, res)=>{
  const user = await User.findById(req.params.id);

  if(user){
    if(user.isAdmin ){
      res.status(400).json('Cannot delete admin user')
    }
    await User.deleteOne({_id: user._id});
    res.status(200).json({ message: 'USer delete Successfully'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
}


//@desc Update User
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = async (req, res)=>{
  const user = await User.findById(req.params.id);

  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
    } else {
      res.status(404).json({message: 'User not found'});
    }
}


export { 
  authUser, 
  registerUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers, 
  deleteUser, 
  getUserById, 
  updateUser
}
