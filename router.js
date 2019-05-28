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
    }
    const newPost = await db.insert({ title, contents });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "There was an error while saving the post to the database"
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    const post_id = req.params.id;
    const { text } = await req.body;

    if (!text) {
      return res.status(400).json({
        message: "Please provide text for the comment."
      });
    } else if (!post_id) {
      res.status(404).json({
        message: "The post with the specified ID could not be found."
      });
    }

    const newComment = await db.insertComment({ text, post_id });
    return res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({
      message: "There was an error while saving the comment to the database."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The post has been removed" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post could not be removed."
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, contents } = req.body;
    const { id } = req.params;

    if (!title || !contents) {
      return res.status(400).json({
        message: "Error, please provide title and contents for posts update."
      });
    } else if (!id) {
      res.status(404).json({
        message: "The post with the specified ID could not be found."
      });
    }

    const updatePost = await db.update(req.params.id, req.body);
    return res.status(201).json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post information could not be modified."
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error retrieving posts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postsById = await db.findById(req.params.id);
    res.status(200).json(postsById);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error retrieving post" });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const commentsById = await db.findCommentById(req.params.id);
    res.status(200).json(commentsById);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error finding comments" });
  }
});
module.exports = router;
