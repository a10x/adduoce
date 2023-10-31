import { writeFileSync } from 'node:fs';

import { saveFilePath } from "./../../config.js";
import { serialiseDenyLists } from '../utils.js';

const createSave = (data)=>{
	writeFileSync(saveFilePath, data, err=>{
		if(err) throw "fail";
	});
}

export const data = {
	"name": "save",
	"description": "Save current denylists to a file",
	"function": async (interaction, denyLists) => {
		createSave(serialiseDenyLists(denyLists));
	},
	"replies": {
		"success": "Denylists saved successfully",
		"fail": "Unable to save denylists"
	}
};