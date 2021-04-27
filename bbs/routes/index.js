const express = require("express");
const db_config = require("../config/database");
const conn = db_config.init();

db_config.connect(conn);
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("list.ejs");
});

router.get("/list", (req, res) => {
  const sql = "SELECT * FROM BOARD";
  conn.query(sql, (err, rows, fields) => {
    if (err) console.error(`query is not executed. select fail ${err}`);
    else res.render("list.ejs", { list: rows });
    console.log(rows);
  });
});

router.get("/write", (req, res) => {
  res.render("write.ejs");
});

router.post("/writeContent", (req, res) => {
  const body = req.body;
  console.log(body);

  const sql = "INSERT INTO BOARD VALUES(?,?,?,NOW())";
  const params = [body.id, body.title, body.content];
  console.log(sql);

  conn.query(sql, params, (err) => {
    if (err) console.error(`query is not executed. insert fail.. ${err}`);
    else res.redirect("/list.ejs");
  });
});

module.exports = router;
