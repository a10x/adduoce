import { fileURLToPath } from 'url';
import { join, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const token = "token_here";
export const guildId = "server_id";
export const clientId = "1168976205337342045";
export const saveFilePath = join(__dirname, "save", "save.json");
