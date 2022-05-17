import { MessageEmbed } from "discord.js";

const creteEmbed = async (message: any, data: any) => {
  const tempEmbed = new MessageEmbed(message)
    .setTitle(
      `${
        data!.isCetusDay
          ? ":sleeping: Сейчас в цетусе день!"
          : ":ghost: Сейчас в цетусе ночь!"
      }`
    )
    .setDescription(
      `${data!.isCetusDay ? "Эйдолоны спят" : "Охота на ейдолонов началась!"}`
    )
    .setThumbnail(
      "https://psv4.userapi.com/c237131/u616004258/docs/d56/e72bdd835b7a/pngegg.png"
    )
    .setFooter({
      text: `${data!.timeLeft} минут осталось`,
    });

  return tempEmbed;
};

export default creteEmbed;
