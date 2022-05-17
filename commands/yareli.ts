import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Testing",
  description: "Информация о боте",

  slash: true,
  testOnly: true,
  guildOnly: true,

  callback: async ({ interaction, client }) => {
    const embed = new MessageEmbed()
      .setTitle("Yareli Бот")
      .setURL("https://discord.js.org/")
      .setDescription("Простой бот, который показывает информацию по цетусу")
      .setColor("RED")
      .addFields(
        { name: "Проголосовать", value: "Link", inline: true },
        {
          name: "API Пинг",
          value: `${Math.round(client.ws.ping)}мс`,
          inline: true,
        }
      )
      .setFooter({
        text: "Сделал Globabee",
        iconURL:
          "https://cdn.discordapp.com/avatars/175126852182999040/fecddd412783252ece254d23b56b1861.webp?size=1024",
      });

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
} as ICommand;
