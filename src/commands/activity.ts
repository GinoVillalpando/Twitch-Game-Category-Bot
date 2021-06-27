import { createCommand } from "../utils/helpers.ts";
import { cache } from "../../deps.ts";
import { Channel, TwitchChat } from "https://deno.land/x/tmi/mod.ts";
import { delay } from "https://deno.land/std@0.64.0/async/delay.ts";
import { configs } from "../../configs.ts";

createCommand({
  name: `activity`,
  execute: async (message) => {
    try {
      const user = cache.members.get(message.author.id);
      const presence = cache.presences.get(user.id);
      const twitchChat = new TwitchChat(configs.oauthToken, "grievxus");
      await twitchChat.connect();
      const channel = twitchChat.joinChannel("grievxus");

      const updateTitle = async (channel: Channel, game: string) => {
        channel.send(`!game ${game}`);
      };

      updateTitle(channel, presence.activities[0]["name"]);

      console.log(presence.activities[0]["name"]);
      return await message.send(
        `member is playing ${presence.activities[0]["name"]}`,
      );
    } catch (error) {
      return message.send(`Error: ${error}`);
    }
  },
});
