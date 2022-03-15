var express = require("express");
var multer = require("multer");
var port = 3000;

var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
// app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res, next) {
  return res.json({
    message: "정상 작동합니다",
  });
});

app.post(
  "/images/upload/single",
  upload.single("images"),
  function (req, res, next) {
    console.log(JSON.stringify(req.file));
    let response = { location: req.file.path };
    return res.send(response);
  }
);

app.post(
  "/images/upload/multiple",
  upload.array("images", 12),
  function (req, res, next) {
    console.log(JSON.stringify(req.files));
    let response = req.files.map((item) => {
      return { location: item.path };
    });
    return res.send(response);
  }
);

app.listen(port, () =>
  console.log(`Server running on port ${port}!\nClick http://localhost:3000/`)
);
