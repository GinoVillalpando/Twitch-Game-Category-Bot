import { botCache, cache } from "../../deps.ts";
import { Channel, TwitchChat } from "https://deno.land/x/tmi/mod.ts";
import { configs } from "../../configs.ts";

interface TwitchObject {
  url?: string;
  type?: number;
  state?: string;
  name?: string;
  id?: string;
  details?: string;
  createdAt?: number;
  assets?: Record<string, unknown>;
}

botCache.eventHandlers.presenceUpdate = async () => {
  if (!cache.isReady) return;

  // twitch params
  const streamerPresence = cache.presences.get(configs.userId);
  const twitchChat = new TwitchChat(configs.oauthToken, configs.userName);
  await twitchChat.connect();
  const channel = twitchChat.joinChannel(configs.userName);
  let twitchCategory: TwitchObject = {};

  // function that sends our twitch bot to set our game title
  const updateTitle = async (channel: Channel, game: string) => {
    await channel.send(`!game ${game}`);
  };

  if (streamerPresence) {
    // replace special characters in title
    const activityTitle = streamerPresence.activities[0]?.name.replace(
      /[^a-zA-Z0-9: ]/g,
      "",
    );

    streamerPresence.activities.forEach((activity) => {
      // TODO: possibly fix this id || Specific uuid for Twitch stream presence
      if (activity.name === "Twitch") {
        twitchCategory = activity;
      }
    });

    if (activityTitle === "Visual Studio Code") {
      if (twitchCategory.state !== "Science & Technology") {
        updateTitle(channel, "Science & Technology");
      }
    } else if (activityTitle === "Twitch") {
      if (twitchCategory.state !== "Just Chatting") {
        updateTitle(channel, "Just Chatting");
      }
    } else if (activityTitle === "Call of Duty: Modern Warfare") {
      if (twitchCategory.state !== "Call of Duty: Warzone") {
        updateTitle(channel, "Call of Duty: Warzone");
      }
    } else if (activityTitle !== twitchCategory.state) {
      updateTitle(channel, activityTitle);
    } else if (activityTitle === "SteamVR") {
      return;
    } else if (activityTitle === "OVR Toolkit") {
      return;
    }
  } else return;
};
