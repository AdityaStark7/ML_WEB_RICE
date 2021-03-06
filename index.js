const express = require("express");

const TeachableMachine = require("@sashido/teachablemachine-node");
const bodyParser = require("body-parser");



const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/4oBpSxCJ1/",
});



const app = express();
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.port || 5000;

app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.send(`
  <form action="/image/classify" method="POST">
  <p>
  Enter Rice Image URL</p>
  <input name='ImageUrl' autocomplete=off>
  <button>Predict Disease </button>
  </form>  
    `);
});

app.post("/image/classify", async (req, res) => {
  // console.log(req);
  const url = req.body.ImageUrl;

  return model
    .classify({
      imageUrl: url,
    })
    .then((predictions) => {
      // console.log("Hello");
      // console.log(predictions);
      res.json(predictions);
    })
    .catch((e) => {
      // console.error(e);
      res.status(500).send("Something went wrong!");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
