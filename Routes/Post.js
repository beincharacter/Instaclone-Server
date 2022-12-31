const router = require('express').Router();
const User = require('../Models/UserModel');
const Post = require('../Models/PostModel');
const cloudinary = require('../Cloudinary/Cloudinary');

router.post('/posts', async (req, res) => {
    try{
        
        // console.log(req.user + " User from posts");
        // const userData = await User.find({_id: req.user});
        // console.log(userData.name)

        // const { description } = req.body;

        
        const file = req.files.image;
        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            if(err) console.log("error >>> " + JSON.stringify(err));
            else{
                
                const userData = await User.findOne({_id: req.user});
                console.log("userdata: " + userData)
                console.log("name: " + userData.name)

                let date = new Date;
                let finalDate = date + "";
                let today = finalDate.split(" ").splice(1, 3).join(" ");
                let time = finalDate.split(" ").splice(4, 1).join(" ");

                const { description } = req.body;


                // console.log("result >>> " + JSON.stringify(result));
                // const IsUser = await User.find({_id: req.user});
                const newPost = await Post.create({
                    image: result.secure_url,
                    description: description,
                    name: userData.name,
                    state: userData.state,
                    city: userData.city,
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

// router.post("/posts", async (req, res) => {
//     try {
//       const file = req.files.image;
//       cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
//         console.log("result >>> " + result.url);
//         // const IsUser = await User.findOne({_id: req.user})
//         // console.log("user" + IsUser)
        
//         //   let date = new Date;
//         //   let finalDate = date + "";
//         //   let today = finalDate.split(" ").splice(1, 3).join(" ");
//         //   let time = finalDate.split(" ").splice(4, 1).join(" ");
  
//         //   const { title, description} = req.body;
      
//         //   const user = await Post.create({
//         //     title,
//         //     image: result.url,
//         //     description,
//         //     author: IsUser.name,
//         //     date: today,
//         //     time: time
//         //   });
//           res.send("ok");
//         })
//       } catch (e) {
//         console.log(e)
//       }
//   });

module.exports = router;