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
  assets?: object;
}

botCache.eventHandlers.presenceUpdate = async (presence) => {
  if (!cache.isReady) return;

  // twitch params
  const twitchChat = new TwitchChat(configs.oauthToken, "grievxus");
  await twitchChat.connect();
  const channel = twitchChat.joinChannel("grievxus");
  let twitchCategory: TwitchObject = {};

  // function that sends our twitch bot to set our game title
  const updateTitle = async (channel: Channel, game: string) => {
    channel.send(`!game ${game}`);
  };

  if (presence.activities) {
    // replace special characters in title
    const activityTitle = presence.activities[0]?.name.replace(
      /[^a-zA-Z0-9: ]/g,
      ""
    );

    presence.activities.forEach((activity) => {
      // TODO: possibly fix this id || Specific uuid for Twitch stream presence
      if (activity.id === "1c67c74ac6585498") {
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
    } else if (activityTitle === "SteamVR") {
      if (twitchCategory.state !== "Just Chatting") {
        updateTitle(channel, "Just Chatting");
      }
    } else if (activityTitle === "Call of Duty: Modern Warfare") {
      if (twitchCategory.state !== "Call of Duty: Warzone") {
        updateTitle(channel, "Call of Duty: Warzone");
      }
    } else if (activityTitle !== twitchCategory.state) {
      updateTitle(channel, activityTitle);
    }
  } else {
    channel.send("Error: Did not detect game presence");
  }
  console.log("presence : ", presence);
};
