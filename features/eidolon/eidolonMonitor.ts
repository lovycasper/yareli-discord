import { Client, Guild, MessageEmbed, TextChannel } from "discord.js";
import updateCetusData from "../../data/cetus";
import creteEmbed from "./embeds";

export default async (client: Client, guild: Guild) => {
  let isNotified = {
    forStart: false,
    forEnd: false,
  };
  let messageEmbedId = "";

  const cetusInfoInit = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Обновление статистики...")
    .setDescription("Получаю данные от серверов Warframe")
    .setThumbnail(
      "https://psv4.userapi.com/c237131/u616004258/docs/d56/e72bdd835b7a/pngegg.png"
    );

  const msgChannel = client.channels.cache.get(
    `${process.env.CETUS_CHANNEL}`
  ) as TextChannel;

  const messages = msgChannel.messages.fetch({ limit: 3 });

  msgChannel.bulkDelete(await messages, true);
  msgChannel.send({ embeds: [cetusInfoInit] }).then((sent) => {
    messageEmbedId = sent.id;
  });

  const updateMonitor = async () => {
    let data = await updateCetusData();

    // Receieve all messages in a channel
    msgChannel.messages.fetch({ limit: 5 }).then((messages) => {
      messages.forEach(async (message) => {
        if (message.id === messageEmbedId) {
          const tempEmbed = await creteEmbed(message.embeds[0], data);
          message.edit({
            embeds: [tempEmbed],
          });
        }
      });
    });

    // Conditional Ping roles
    // If time less than 10 minutes, we ping and memorize that we already pinged
    if (data!.timeLeft <= 10) {
      // If it's day - ping about day end, and memorize that
      if (data!.isCetusDay) {
        if (!isNotified.forStart) {
          isNotified.forStart = true;
          msgChannel.send({
            content: `<@&${"975801929475170345"}> 10 минут осталось до начала ночи!`,
          });
        }
      } else {
        // If it's night - ping about night end, and memorize that
        if (!isNotified.forEnd) {
          isNotified.forEnd = true;
          msgChannel.send({
            content: `<@&${"975802005463384125"}> 10 минут осталось до конца ночи!`,
          });
        }
      }
    } else {
      // Else, we forgot that we pinged because day reset
      isNotified.forStart = false;
      isNotified.forEnd = false;
    }

    setTimeout(updateMonitor, 10000);
  };
  updateMonitor();
};

export const config = {
  dbName: "EIDOLON_MONITOR",
  displayName: "In-chat monitor for eidolon",
};
