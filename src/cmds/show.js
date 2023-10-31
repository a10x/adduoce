import { serialiseDenyLists } from "../utils.js";

export const data = {
	"name": "show",
	"description": "Show the current denylists",
	"function": async (interaction, denyLists) => {
		return serialiseDenyLists(denyLists);
	},
};