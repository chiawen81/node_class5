var express = require('express');
var router = express.Router();
const Post = require('../models/postModels');
const User = require('../models/usersModels');



// // 取得全部資料
// router.get("/", async function (req, res) {
//     const posts = await Post.find();
//     res.status(200).json({
//         status: "success",
//         method: "GET",
//         name: "posts",
//         data: posts,
//         msg: 'This is CORS-enabled for all origins!'
//     });
// });


// // 取得user關聯資料
// router.get("/", async function (req, res) {
//     const posts = await Post.find().populate({
//         path: "user",        // 從post裡面找user 這個欄位(從schema裡面找)
//         select: "name photo" // 從user裡面找name photo 這兩個欄位
//     });

//     res.status(200).json({
//         posts
//     });
// });


// 關鍵字搜尋
router.get("/", async function (req, res) {
    // 取得參數timesort
    const timeSort = (req.query.timeSort == "asc") ? "content" : "-content"

    // 取得參數q（關鍵字）
    const q = (req.query.q !== undefined) ? { "content": new RegExp(req.query.q) } : {};

    const post = await Post.find(q).populate({
        path: 'user',
        select: 'name photo '
    }).sort(timeSort);
    // note：
    // asc  遞增(由小到大，由舊到新)=>  content
    // desc 遞減(由大到小、由新到舊)=> -content

    res.status(200).json({
        status: "success",
        post
    });
});


// // 新增資料
// router.post("/", async function (req, res, next) {
//     const newPost = await Post.create({
//         user: req.body.user,
//         content: req.body.content,
//     });

//     res.status(200).json({
//         status: "success",
//         method: "POST",
//         data: {
//             newPost,
//         }
//     });
// });

module.exports = router;

