class Game{
	config = new Config();
	
	house = null;
	constructor(){
		this.house = randNum(0, this.config.people.length - 1);
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

	knock(){
		this.config.people[this.house].knocked = true;
		let rand = randNum(1, 3);
		if (rand == 1){
			this.config.people[this.house].answered = true;
			this.config.people[this.house].createMemory("Day #" + this.config.day + ": You meet them for the first time!");
			this.config.people[this.house].greet();
			return;
		} 
		ui.status("No one was home (#" + ui.formatID(this.house) + ") so you head next door.");	
		this.next();
		
	}

	next(){
		this.house++;
	}

	prev(){		
		this.house--;
	}

	talk(topic){		
		let id = Config.topics.indexOf(topic);
		let person = this.config.people[this.house];
		if (person.topicReacted[id]){
			return;
		}
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
	}
}
