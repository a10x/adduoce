import { ApplicationCommandOptionType} from "discord.js";

export const data = {
	"name": "remove",
	"description": "Remove emoji from denylist",
	"options": [
		{
			"name": "emoji",
			"description": "Emoji to remove from denylist",
			"type": ApplicationCommandOptionType.String
		},
		{
			"name": "user",
			"description": "User to remove from denylist",
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
		"success": "Removed from denylist",
		"fail": "Unable to remove"
	}
};