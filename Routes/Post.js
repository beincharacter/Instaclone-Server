const router = require('express').Router();
const User = require('../Models/UserModel');
const Post = require('../Models/PostModel');
const cloudinary = require('../Cloudinary/Cloudinary');


// get all the posts

router.get('/posts', async (req, res) => {
    try{

        const posts = await Post.find();
         
        res.status(200).json({
            message: 'sucess',
            post: posts
        });

    } catch(e) {
        res.status(400).json({
            message: 'not fetched'
        })
    }
})

//get post by id

router.get('/posts/:id', async (req, res) => {
    try{

        const posts = await Post.find({ userId: req.params.id });
         
        res.status(200).json({
            message: 'sucess',
            post: posts
        });

    } catch(e) {
        res.status(400).json({
            message: 'not fetched'
        })
    }
})

// change the data in post

router.put('/posts/:id', async (req, res) => {
    try{

        const { description } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { description: description }, { new: true });

        res.status(200).json({
            message: 'updated'
        })


    } catch(e) {
        res.status(400).json({
            message: 'not fetched'
        })
    }
})

// delete a post

router.delete('/posts/:id', async (req, res) => {
    try{

        const { description } = req.body;

        const updatedPost = await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'deleted'
        })
        
    } catch(e) {
        res.status(400).json({
            message: 'not fetched'
        })
    }
})

// post a post

router.post('/posts', async (req, res) => {
    try{
        
        const file = req.files.image;
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            if(err) console.log("error >>> " + JSON.stringify(err));
            else{
                
                const userData = await User.findOne({_id: req.user});
                // console.log("userdata: " + userData)
                // console.log("name: " + userData.name)

                let date = new Date;
                let finalDate = date + "";
                let today = finalDate.split(" ").splice(1, 3).join(" ");
                let time = finalDate.split(" ").splice(4, 1).join(" ");

                const { description } = req.body;


                // console.log("result >>> " + JSON.stringify(result));
                // const IsUser = await User.find({_id: req.user});
                const newPost = await Post.create({
                    userId: req.user,
                    image: result.secure_url,
                    description: description,
                    user: {
                        name: userData.name,
                        state: userData.state,
                        city: userData.city
                    },
                    date: today,
                    time: time
                })
                
                res.status(200).json({
                    post: newPost
                })
            }
        })
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})






module.exports = router;