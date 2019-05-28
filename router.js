const express = require('express');
const router = express.Router();
const db = require('./data/db');


router.use(express.json());

router.post("/", (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        message: "Something is missing."
      });
    } else {
      db.insert({ title, contents })
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          res.status(500).json({
            error: err,
            message: "There was an error while saving the post to the database"
          });
        });
    }
});
module.exports = router;