const router = require('express').Router();
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    try{
        const { name, email, phone, password, state, city } = req.body;

        const isUser = await User.findOne({email: email});
        const isUserr = await User.findOne({phone: phone});
        if(isUser) {
            return res.status(400).json({
                status: 400,
                message: 'email already exist!'
            })
        } else if(isUserr) {
            return res.status(400).json({
                status: 400,
                message: 'phone already exist!'
            })
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if(err) {
                    return res.status(400).json({
                        message: 'hashing issue'
                    })
                } else {
                    const newUser = await User.create({
                        name,
                        email,
                        phone,
                        password: hash,
                        state,
                        city
                    })

                    console.log(newUser);

                    res.status(200).json({
                        message: 'user created successfully',
                        user: newUser
                    })
                }
            })
        }
    }catch (e) {
        console.log(e.message);
        res.status(401).send("from catch" + e.message);
    }
})

module.exports = router;