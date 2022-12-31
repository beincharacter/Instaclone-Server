const router = require('express').Router();
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try{
        
        const { username, password } = req.body;

        const isUser = isNaN(Number(username))
                ? await User.findOne({ email: username })
                : await User.findOne({ phone: username });


            console.log(isUser);

            if(!isUser) {
                return res.status(400).json({
                    error: "user error",
                    message: "email/phone not exists"
                })
            } else {
                bcrypt.compare(password, isUser.password, (err, result) => {
                    if(err) {
                        return res.status(400).json({
                            message: err.message,
                            from: 'bceypt err'
                        })
                    }

                    if (result) {
                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 *60),
                            data: isUser._id
                        }, 'nothing');

                        return res.status(200).json({
                            message: `Logged In Successfully Welcome ${isUser.name}`,
                            user: isUser,
                            token: token
                        })
                    } else {
                        return res.status(400).json({
                            error: 'password error',
                            message: 'invalid password'
                        })
                    }
                })
            }
    }catch(e) {
        res.status(401).send(e.message);
    }
})

module.exports = router;