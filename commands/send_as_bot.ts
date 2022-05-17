import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Configuration",
  description: "Отправляет сообщение от имени бота",

  permissions: ["ADMINISTRATOR"],

  minArgs: 2,
  expectedArgs: "<channel> <text>",
  expectedArgsTypes: ["CHANNEL", "STRING"],

  // options: [
  //   {
  //     name: "channel", // Must be lower case
  //     description: "Канал в который нужно написать сообщение",
  //     required: true,
  //     type: "CHANNEL",
  //   },
  //   {
  //     name: "text", // Must be lower case
  //     description: "Текст который нужно написать от имени бота",
  //     required: true,
  //     type: "STRING",
  //   },
  // ],

  slash: true,
  testOnly: true,
  guildOnly: true,

  callback: ({ interaction, args }) => {
    const channel = interaction.options.getChannel("channel") as TextChannel;

    // Check if user looks for other than text channel
    if (!channel || channel.type !== "GUILD_TEXT") {
      interaction.reply({
        content:
          "Выбран голосовой канал. Ты можешь написать только в **текстовый** канал!",
        ephemeral: true,
      });
    }

    // Remove first index in array, so args full of text
    args.shift();
    const text = args.join(" ");

    // Send message
    channel.send(text);
    interaction.reply({
      content: "Сообщение отправлено!",
      ephemeral: true,
    });
  },
} as ICommand;
