const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

const users = JSON.parse(fs.readFileSync("users.json"));

async function moveUser(robloxUsername, targetChannelId) {
  const discordUserId = users[robloxUsername];
  if (!discordUserId) throw new Error("User not found");

  const guild = client.guilds.cache.first(); // or .get("your_server_id")
  const member = guild.members.cache.get(discordUserId);
  if (!member || !member.voice.channel) throw new Error("User not in a voice channel");

  await member.voice.setChannel(targetChannelId);
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

module.exports = { moveUser };