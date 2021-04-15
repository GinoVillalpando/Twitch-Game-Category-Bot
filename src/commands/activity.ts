import { createCommand } from "../utils/helpers.ts";
import { cache } from "../../deps.ts";

createCommand({
  name: `activity`,
  execute: async (message) => {
    try {
      const user = cache.members.get(message.author.id);
      const presence = cache.presences.get(user.id);
      console.log(presence.activities[0]["name"]);
      return await message.send(
        `member is playing ${presence.activities[0]["name"]}`
      );
    } catch (error) {
      return message.send(`Error: ${error}`);
    }
  },
});
