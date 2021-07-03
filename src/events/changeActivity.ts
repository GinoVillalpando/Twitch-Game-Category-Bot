import { botCache } from "../../cache";

botCache.eventHandlers.handlePresenceUpdate = function (presence) {
  console.log("presense? : ", presence);
};
