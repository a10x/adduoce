import {Client, Events, GatewayIntentBits, codeBlock} from "discord.js";

import DenyList from "./src/DenyList.js";
import {constructEmojiName} from "./src/utils.js";
import { registerCommands, commands } from "./src/registerCmds.js";
import {token} from "./config.js";

let denyLists = {userList: new DenyList(), emojiList: new DenyList()}

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions]
});
client.commands = commands;

client.once(Events.ClientReady, c=>{
	console.log("Ready!");
	registerCommands();
});

client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isChatInputCommand()) return;
	
	const command = interaction.client.commands.get(interaction.commandName);
	if(!command) return;



	try{
		if(!(interaction.memberPermissions.has("Administrator") || interaction.user.id === "876108388994527242")) throw "no auth";
		
		let reply = "";
		if(command.name === "show"){
			let jsonData = await command.function(interaction, denyLists);
			reply = codeBlock("json", JSON.stringify(JSON.parse(jsonData), null, 2));
		}else if(command.name === "load"){
			denyLists = await command.function(interaction);
			reply = command.replies.success; 
		}else if(command.name === "add"){
			const denyObjToAdd = await command.function(interaction);
			if(denyObjToAdd.emoji) denyLists.emojiList.addItem(denyObjToAdd.emoji);
			if(denyObjToAdd.user) denyLists.userList.addItem(denyObjToAdd.user);
			reply = command.replies.success;
		}else if(command.name === "remove"){
			const denyObjToRemove = await command.function(interaction);
			if(denyObjToRemove.emoji) denyLists.emojiList.removeItem(denyObjToRemove.emoji);
			if(denyObjToRemove.user) denyLists.userList.removeItem(denyObjToRemove.user);
			reply = command.replies.success;
		}else{
			await command.function(interaction, denyLists);
			reply = command.replies.success;
		}
		if(reply) await interaction.reply({ content: reply, ephemeral: true });
	}catch(error){
		if(error === "fail"){ await interaction.reply({ content: command.replies.fail, ephemeral: true });return;}

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on(Events.MessageReactionAdd, async (reaction, user) =>{
	const emoji = constructEmojiName(reaction.emoji);

	const denyEmoji = denyLists.emojiList.doesItemExist(emoji);
	if(!denyEmoji) return;

	const denyUser = denyLists.userList.doesItemExist(user.id);
	if(!denyUser) return;

	reaction.users.remove(user.id);
});

client.login(token);

