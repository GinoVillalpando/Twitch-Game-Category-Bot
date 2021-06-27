import { Milliseconds } from "../utils/constants/time.ts";
import { Channel, TwitchChat } from "https://deno.land/x/tmi/mod.ts";
import { botCache, botID, cache } from "../../deps.ts";
import { configs } from "../../configs.ts";

botCache.tasks.set(`activityCheck`, {
  name: `activityCheck`,
  interval: Milliseconds.MINUTE,
  execute: async () => {
    if (!cache.isReady) return;

    // Game Activity for Grievxus
    const presence = cache.presences.get("104184695750680576");

    // twitch params
    const twitchChat = new TwitchChat(configs.oauthToken, "grievxus");
    await twitchChat.connect();
    const channel = twitchChat.joinChannel("grievxus");

    // function that sends our twitch bot to set our game title
    const updateTitle = async (channel: Channel, game: string) => {
      channel.send(`!game ${game}`);
    };

    // if presence is not defined then fire these if else statements for setting the game title on twitch
    if (presence) {
      if (presence.activities[0]["name"] === "Visual Studio Code") {
        updateTitle(channel, "Science & Technology");
      } else {
        updateTitle(channel, presence.activities[0]["name"]);
        console.log(presence.activities[0]["name"]);
      }

      // else console log custom error message
    } else {
      console.log("did not work");
    }
  },
});
