const express = require("express");
const bodyParser = require("body-parser");
const bot = require("./bot");

const app = express();
app.use(bodyParser.json());

app.post("/move", async (req, res) => {
  const { username, targetChannel } = req.body;
  try {
    await bot.moveUser(username, targetChannel);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to move user");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));