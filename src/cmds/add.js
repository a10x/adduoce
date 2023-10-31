import { ApplicationCommandOptionType} from "discord.js";

import {getEmojiId} from "../utils.js";

export const data = {
	"name": "add",
	"description": "Add to denylist",
	"options": [
		{
			"name": "emoji",
			"description": "Emoji to add to denylist",
			"type": ApplicationCommandOptionType.String
		},
		{
			"name": "user",
			"description": "User to add to denylist",
			"type": ApplicationCommandOptionType.User
		}
	],
	"function": async (interaction) => {		
		const userOpt = interaction.options.get("user");
		const emojiOpt = interaction.options.get("emoji");
		const denyObj = {};
		
		if(!userOpt && !emojiOpt) throw "fail";

		if(emojiOpt){
			const emoji = getEmojiId(emojiOpt.value);
			if(emoji) denyObj.emoji = emoji;
		}
		if(userOpt)denyObj.user = userOpt.value;

		return denyObj;
	},
	"replies": {
		"success": "Added to denylist",
		"fail": "Unable to add"
	}
};