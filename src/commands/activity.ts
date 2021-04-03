import { createCommand, sendEmbed } from "../utils/helpers.ts";
import { cache } from "../../deps.ts";

createCommand({
  name: `activity`,
  execute: async (message) => {
    try {
      const member = cache.members.get("104184695750680576");
      console.log(member);

      return message.send(`member: ${member.username}`);
    } catch (error) {
      return message.send("no member");
    }
  },
});
