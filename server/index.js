const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "e264941eeedaf8b31c42030847b729dde0b61301332e658934a2526d5b105dd9";

function validateInput(body) {
  if (!body.name) throw new Error("Missing name in body");
  if (!body.proof) throw new Error("Missing proof in body");
}

app.post("/gift", (req, res) => {
  try {
    // grab the parameters from the front-end here
    const body = req.body;

    validateInput(body);
    const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
    if (isInTheList) {
      res.send("You got a toy robot!");
    } else {
      res.send("You are not on the list :(");
    }
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
