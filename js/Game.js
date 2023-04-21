class Game{
	config = new Config();
	
	house = null;
	constructor(){
		this.house = 0;//randNum(0, this.config.people.length - 1);
	}
	go(houseID){
		let distance = Math.abs(this.house - houseID) * .1;		
		this.config.changeTime(distance);
		this.house = houseID;
		ui.window = 'doors';

	}

	houses(){		
		ui.window = 'houses';
	}

	knock(){
		if (this.config.people[this.house].knocked){
			return;
		}
		this.config.people[this.house].knocked = true;
		let rand = randNum(1, 3);
		this.config.time += .1;
		if (rand == 1 || this.answered){			
			this.config.people[this.house].greet(this.config.day);
			return;
		} 
		ui.status("No one was home (#" + ui.formatID(this.house) + ") so you head next door.");	
		this.next();
		
	}

	next(){
		this.house++;		
		this.config.changeTime(.1);
	}

	prev(){		
		this.house--;
		this.config.changeTime(.1);		
	}

	react(emotion){
		let bonus = 0;
		let bonusCaption = "";
		let person = this.config.people[this.house];		
		this.config.people[this.house].reactReturned = true;
		if (person.greetedAt != null && person.greetedAt - Date.now() <= this.config.timeToReact){
			bonus = 1;
			bonusCaption = " quickly ";
		}
		let delta = this.config.reactions[person.greetedWith][emotion] + bonus;
		let caption = " They do not respond. (0)";
		if (delta > 0){
			caption = " They respond positively. (<span class='text-success'>+" 
				+ delta + " </span>)"
		} else if (delta < 0){
			caption = " They respond negatively. (<span class='text-danger'>" 
				+ delta + "</span>)"
		}
		person.createMemory("You " + bonusCaption + " react with " + emotion + ". " + caption)
		person.react(delta);
	}

	talk(topic){		
		let id = Config.topics.indexOf(topic);
		let person = this.config.people[this.house];
		if (person.topicReacted[id]){
			return;
		}
		this.config.time += .2;
		person.talk(topic);
		let delta = person.topicFeelings[id];
		let reactionCaption = " they have no opinion about it.";
		if (delta > 0){
			reactionCaption = " they respond <span class='text-success'>positively</span>."
		} else if (delta < 0){
			reactionCaption = " they respond <span class='text-danger'>negatively</span>."
		}
		person.createMemory("You bring up the subject of <span class='fw-bold'>" + topic + "</span> and " + reactionCaption);
		person.react(delta);
		if (topic == 'neighbors' && randNum(1,2) == 1){
			let rand = randNum(1, 3);
			let houseID = this.house + rand;
			console.log(houseID, rand);
			let gossip =  "House #" + ui.formatID(houseID) + " enjoys talking about <span class='fw-bold'>" 
				+ this.config.people[houseID].loves[randNum(0, this.config.people[houseID].loves.length - 1)] + "</span>"
			person.createMemory('They let you know that ' + gossip);
			this.config.people[houseID].createMemory("House #" + ui.formatID(this.house) + " told you that " + gossip);
		}
	}
}
