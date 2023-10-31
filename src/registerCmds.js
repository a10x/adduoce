import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

import { REST, Routes, Collection} from 'discord.js';
import {guildId, token, clientId } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cmds = new Collection();
const cmdPath = join(__dirname, "cmds");
const cmdFiles = readdirSync(cmdPath);

for(const file of cmdFiles){
	const filePath = join(cmdPath, file);
	const cmd = await import("file://" + filePath);
	cmds.set(cmd.data.name, cmd.data);
}

const rest = new REST().setToken(token);

export const commands = cmds;
export async function registerCommands() {
	try {
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
}