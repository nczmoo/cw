class UI{
	refreshInterval = setInterval( this.looping, 1000);
	constructor(){

	}
	refresh(){
		$("#houseNum").html(this.formatID(game.house))
		$("#time").html(game.config.time);
		$("#day").html(game.config.day);
		$(".window").addClass('d-none');

		//check if house is done talking with them
		
		if (game.config.people[game.house].answered){
			this.printHouse();
			return;
		}		
		this.printDoor();
	}

	looping(){
		if (game.config.people[game.house].greetedAt == null){
			return;
		}
		let seconds = Math.round((Date.now() - game.config.people[game.house].greetedAt) / 1000);
		let timeLeft = game.config.timeToReact - seconds;
		$("#reactTimer").html(timeLeft);

		if (timeLeft < 0){
			game.config.people[game.house].greetedAt = null;
			ui.printHouse();
		}
	}

	printDoor(){
		$("#door").removeClass('d-none');		
		$("#knock").prop('disabled', false);
		if (game.config.people[game.house].knocked){
			$("#knock").prop('disabled', true);
		}
	}

	printEmotions(){
		$(".emotions").addClass('d-none');
		if (game.config.people[game.house].reactReturned){
			return;
		}		
		$(".emotions").removeClass('d-none');
		let txt = "";		
		for (let emotion of Config.emotions){
			txt += "<button id='" + emotion + "' class='emotion'>" 
				+ emotion + "</button>";
		}
		$("#emotions").html(txt);
	}

	printHouse(){		
		$("#house").removeClass('d-none');
		let person = game.config.people[game.house];
		$("#reactBonus").addClass('d-none');
		if (person.greetedAt != null){
			$("#reactBonus").removeClass('d-none');
		}
		$("#trust").html(person.trust);
		$("#sermon").html(person.sermon);
		$("#tolerance").html(person.tolerance);
		$("#resistance").html(person.resistance);
		$("#greetedWith").html(person.greetedWith);
		this.printEmotions();
		
		let txt = '';

		for (let topic of Config.topics){
			let disabledClass = '';
			if (person.topicReacted[Config.topics.indexOf(topic)]){
				disabledClass = ' disabled ';
			}
			txt += "<button id='" + topic + "' class='topic' " + disabledClass + ">" + topic + "</button>";
		}
		$("#topics").html(txt);
		this.printMemories();
	}

	printMemories(){
		let txt = "";
		for (let memory of game.config.people[game.house].memories){
			txt += "<div>" + memory + "</div>";
		}
		$("#memories").html(txt);
	}

	formatID(id){
		return Number(id) + 1;
	}

	status(msg){
		$("#status").html(msg);
	}
}
