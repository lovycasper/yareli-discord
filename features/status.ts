import { Client } from "discord.js";
import updateCetusData from "../data/cetus";

export default async (client: Client) => {
  const updateStatus = async () => {
    let data = await updateCetusData();

    client.user!.setPresence({
      status: "dnd",
      activities: [
        {
          name: `${data!.isCetusDay ? "☀️" : "🌚"}${data!.timeLeft} минут(а)`,
        },
      ],
    });
    setTimeout(updateStatus, 10000);
  };
  updateStatus();
};

export const config = {
  dbName: "DYNAMIC_STATUS",
  displayName: "Dynamic status with Cetus time",
};
