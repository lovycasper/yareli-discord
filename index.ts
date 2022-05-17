import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import WOKCommands from "wokcommands";
import path from "path";

dotenv.config();

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  console.log(`Bot loaded as ${client.user?.tag}`);

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    messagesPath: path.join(__dirname, 'translations.json'),
    typeScript: true,
    botOwners: ["973211847555702835"],
    testServers: ["972953065659453441"],
  });
});

client.login(process.env.TOKEN);
