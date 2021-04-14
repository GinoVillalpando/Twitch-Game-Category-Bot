import { createCommand } from "../utils/helpers.ts";
import { cache } from "../../deps.ts";

createCommand({
  name: `activity`,
  execute: async (message) => {
    try {
      const user = cache.members.get(message.author.id);
      const presence = cache.presences.get("104184695750680576");
      return message.send(`member is playing ${presence}`);
    } catch (error) {
      return message.send(`Error: ${error}`);
    }
  },
});
