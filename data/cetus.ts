const Warframe = require("warframe.js");
import fs from 'fs';

const getCetusData = async (): Promise<any> => {
  const WF = new Warframe({
    platform: "pc",
  });

  try {
    return await WF.cycleCetus;
  } catch (e) {
    //   return getCetusData();
    fs.writeFile('./crash.log', e as string, err => {
      if (err) {
        console.error(err);
      }
    });
  }
};

const updateCetusData = async () => {
  let data = await getCetusData();
  let rawTimeLeft = Math.abs(+new Date(Date.parse(data.until)) - +new Date());
  let timeLeft = Math.floor(rawTimeLeft / 1000 / 60);
  let isCetusDay = data.state === "day" ? true : false;

  return { timeLeft, isCetusDay };
};

export default updateCetusData;
