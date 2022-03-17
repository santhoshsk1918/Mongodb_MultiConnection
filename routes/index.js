const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
const indexService = require("../service/indexService");

/* GET home page. */
router.get("/", async (req, res) => {
  let { postId, limit, skip } = req.query;
  console.log("1");
  let results = await indexService.getPosts(
    postId ? postId : null,
    limit,
    skip
  );

  res.status(200).send(results);
});

router.post("/", async (req, res) => {
  console.log("12312412")
  let data = req.body;
  let result = await indexService.savePost(data);
  res.status(201).send(result);
});

router.get("/bulk", async (req, res) => {
  let { noOfCalls = 500 } = req.query;
  let list = [];
  for (var i = 0; i < noOfCalls; i++) {
    list.push(axios.get("http://127.0.0.1:3003/?limit=100"));
  }
  axios .all(list)
    .then((data) => {
      console.log(data)
      res.status(200).send({ match: "done" });
    })
    .catch((err) => {
       console.error(err);
    });
});
module.exports = router;
