const User = require("../Models/UserModel");
const jwt = require('jsonwebtoken');
const { model } = require("mongoose");

const Authentication = (req, res, next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, 'nothing', (err, decoded) => {
                if(err) {
                    res.status(400).json({
                        error: 'not a valid token'
                    })
                }
                // console.log(decoded);
                req.user = decoded.data;
                next()
            })
        } else{
            res.status(400).json({
                error: 'token missing'
            })
        }
    } else {
        res.status(400).json({
            error: "not authenticated user"
        })
    }
}

module.exports = Authentication;
