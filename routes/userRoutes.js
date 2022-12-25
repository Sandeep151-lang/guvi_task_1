var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./models/userSchema')
// var jwtAuth =require('../authentication/adminauth')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', async (req, res, next) => {
  console.log(req.body)
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).send({ message: 'plz filled the data' });
  } else {
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(400).send({ message: 'Email already exist' })
      } else {
        const hash = await bcrypt.hash(password, 10)
        var user_register = await User({ name, email, password: hash });

        user_register.save();
        return res.status(200).send({ message: 'successfull' }) && req.send({ message: 'succes' })
        next();
      }

    } catch (error) {
      return res.status(400).send({ message: 'Invalid Credential' })
    }


  }
})



//POST METHOD FOR LOGING THE USERS
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.send({ message: 'plz filled the data' })
    } else {
      const singin = await User.findOne({ email: email });
      if (singin) {
        const isMatch = await bcrypt.compare(password, singin.password);
        const token = await singin.generateAuthtoken();
        // const token = jwt.sign({ _id: singin._id }, "sandeepnandanwarfullstackdeveloper", { expiresIn: '1h' });
        res.cookie("jwt", token, {
          path: "/",
          expires: new Date(Date.now() + 30000000),
          httpOnly: true
        })
        const { name, email } = singin;
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid Credential' })
        } else {
          return res.json({ token, name, email,message:'Login Successful' })
          next()
        }
      } else {
        return res.status(400).json({ message: 'Invalid Credential' })
      }
    }
  } catch (error) {
    return res.status(400).send({ message: 'Invalid Credential' })
  }
})


router.post('/profile',async(req,res)=>{
 const {email}= req.body
  try {
    const profile = await User.findOne({email:email})
    res.send(profile) 
  } catch (error) {
    return res.status(400).json({message: "User not find"})
  }
})


router.put('/update', async (req, res) => {
  const {email}= req.body
  try{
     await User.findOneAndUpdate({email:email},{$set:{...req.body}})
    res.send({message:"Update successful"})
  }catch(error){
return res.status(400).json({message:"User not updated"})
  }
})


module.exports = router;
