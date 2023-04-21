class UI{
	refreshInterval = setInterval( this.looping, 1000);
	window = 'door';
	constructor(){

	}
	refresh(){
		$("#houseNum").html(this.formatID(game.house))
		$("#time").html(this.formatTime(game.config.time));
		$("#day").html(game.config.day);
		$(".window").addClass('d-none');		
		if (this.window == 'houses'){			
			this.printHouses();
			return;
		}
		if (game.config.people[game.house].answered 
			&& game.config.people[game.house].tolerance > 0){
			this.printHouse();
			return;
		}		
		this.printDoor();


	}

	formatTime(time){
		return game.config.time.toFixed(1);
	}

	looping(){
		if (game.config.people[game.house].greetedAt == null){
			return;
		}
		let timeLeft = ui.refreshTimer();
		if (timeLeft < 1){
			game.config.people[game.house].greetedAt = null;
			ui.printHouse();
		}
	}

	printDoor(){
		$("#door").removeClass('d-none');		
		$("#knock").prop('disabled', false);
		if (game.config.people[game.house].knocked || game.config.people[game.house].tolerance < 1){
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

	printHouses(){
		$("#houseListing").removeClass('d-none');

		let txt = '';
		for (let i in game.config.people){
			let distance = (Math.abs(game.house - i) * .1).toFixed(1);

			let person = game.config.people[i];			
			let caption = "Trust: " + person.trust + " [" + person.sermon 
				+ "] Resistance: " + person.resistance;
			let here = "<button id='go-" + i + "' class='verb2 btn btn-link'>[ go ]</button> " + distance + "h away";
			if (game.house == i){
				here = " [ You are here ] ";
			}
			txt += "<div class='mt-1'><span class='fw-bold'>House #" 
				+ this.formatID(i) + "</span> " + here + "</div> ";
			if (!person.knocked){
				caption = "";
			} else if (person.knocked && !person.answered){
				caption = "You knocked but no one answered.";
			
			}
			txt += "<div class='ms-3'>" + caption + "</div>";
		}
		$("#houseListing").html(txt);
	}

	printMemories(){
		let txt = "";
		for (let memory of game.config.people[game.house].memories){
			txt += "<div>" + memory + "</div>";
		}
		$("#memories").html(txt);
	}

	refreshTimer(){
		let seconds = Math.round((Date.now() 
			- game.config.people[game.house].greetedAt) / 1000);
		let timeLeft = game.config.timeToReact - seconds;
		$("#reactTimer").html(timeLeft);
		return timeLeft;
	}

	formatID(id){
		return Number(id) + 1;
	}

	status(msg){
		$("#status").html(msg);
	}
}
