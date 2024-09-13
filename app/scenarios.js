import actions from "./actions.js";

export default function (msg) {
  switch (msg.data) {
    case "profile":
      // console.log(msg);

      actions.profile(msg);
      break;
    case "keys":
      actions.keys(msg);
      break;
    case "subscription":
      actions.subscription(msg);
      break;
    case "help":
      actions.help(msg);
      break;
    case "back":
      actions.back(msg);
      break;
  }
}
