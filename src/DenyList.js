export default class DenyList{
	
	constructor(initialList = []){
		this.list = initialList;
	}

	addItem(item){
		for(let existingItem of this.list){if(existingItem === item) return;}
		this.list.push(item);
	}

	removeItem(item){
		this.list = this.list.filter(existingItem => existingItem !== item);
	}

	doesItemExist(item){
		for(let existingItem of this.list){if(existingItem === item) return true;}
		return false;
	}

	serialise(){
		return JSON.stringify(this.list);
	}

	getList(){
		return this.list;
	}
}