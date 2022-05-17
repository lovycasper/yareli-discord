import { GuildChannelResolvable, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Testing",
  description: "Информация о боте",

  slash: true,
  testOnly: true,
  guildOnly: true,

  callback: async ({ interaction, guild }) => {
    const SERVER_OWNER = await guild!.fetchOwner();
    const SERVER_AVATAR = (await guild!.iconURL({ dynamic: true })) as string;
    const SERVER_NAME = (await guild!.name) as string;
    const SERVER_DESC = (await guild!.description) as string;
    const SERVER_RULES = guild!.channels.resolve(
      guild!.rulesChannelId as GuildChannelResolvable
    );
    const SERVER_LOCALE = (await guild!.preferredLocale) as string;
    const SERVER_MEMBER_COUNT = await guild!.memberCount;
    const SERVER_DATE = new Date(guild!.joinedTimestamp).toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) as string;
    const embed = new MessageEmbed()
      .setTitle(SERVER_NAME)
      .setDescription(SERVER_DESC)
      .setThumbnail(SERVER_AVATAR)
      .setColor("RED")
      .addFields(
        { name: "Основатель", value: `${SERVER_OWNER}`, inline: true },
        {
          name: "Основан",
          value: SERVER_DATE,
          inline: true,
        },
        {
          name: "Язык",
          value: SERVER_LOCALE.toUpperCase(),
          inline: true,
        },
        { name: "Правила", value: `${SERVER_RULES}`, inline: true },
        {
          name: "Участников",
          value: `${SERVER_MEMBER_COUNT}`,
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
} as ICommand;
