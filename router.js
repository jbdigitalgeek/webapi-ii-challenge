const express = require("express");
const router = express.Router();
const db = require("./data/db");

router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { title, contents } = await req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Something is missing."
      });
    } else {
      db.insert({ title, contents }).then(post => {
        res.status(201).json(post);
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "There was an error while saving the post to the database"
    });
  }
});

// router.post("/:id/comments", async (req, res) => {
//   try {
//     const { text } = await req.body;
//     db.insertComment(text).then(comment => {
//       res.status(200).json(comment);
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.get("/", async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error retrieving comments" });
    }
});
module.exports = router;
