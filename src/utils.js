import DenyList from "./DenyList.js";

export const constructEmojiName = (emoji)=>{
	return emoji.id??emoji.name;
}

export const serialiseDenyLists = denyLists =>{
	return JSON.stringify({users: denyLists.userList.getList(), emojis: denyLists.emojiList.getList()});
}

export const deserialiseDenyLists = denyListsString =>{
	const jsonData = JSON.parse(denyListsString);
	const userList = new DenyList(jsonData.users);
	const emojiList = new DenyList(jsonData.emojis);

	return {userList, emojiList};
}

export const getEmojiId = (emoji)=> {
	if(!emoji) return null;
	const parts = emoji.split(":");

	if(parts.length === 1){
		if(emoji.length !== 2) return;
		const emojiRegex = /\p{Emoji}/u;
		const isEmoji = emojiRegex.test(emoji);

		if(isEmoji) return emoji;
		else return null;
	}
	if(parts.length === 2) return parts[1].split(">")[0];
	if(parts.length === 3) return parts[2].split(">")[0];

	return null;
}
