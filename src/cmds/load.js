import { readFileSync } from 'node:fs';

import { saveFilePath } from "./../../config.js";
import { deserialiseDenyLists } from '../utils.js';

const loadSave = ()=>{
	let jsonData = "";
	try{
		jsonData = readFileSync(saveFilePath, "utf8");
	}catch(error){
		throw "fail";
	}
	return jsonData;
}

export const data = {
	"name": "load",
	"description": "Load denylists from a file",
	"function": async (interaction) => {
		return deserialiseDenyLists(loadSave());
	},
	"replies": {
		"success": "Denylists loaded successfully",
		"fail": "Unable to load denylists"
	}
};