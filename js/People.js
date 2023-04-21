class People{
    
    answered = false;
    defaultTolerance = randNum(1, 100);
    defaultResistance = randNum(1, Config.topics.length);    
    greetedWith = null;
    greetedAt = null;    
    knocked = false;
    loves = [];
    memories = [];
    reactReturned = false;
    resistance = null
    tolerance = null;
    topicFeelings = [];
    topicReacted = [];
    trust = 0; 
    sermon = randNum(1, 100); 

    
    constructor(emotion){
        this.resetEmotion();
        this.resetResistance();
        this.resetTolerance();
        
        let assigned = [];        
        let posTopics = []
        for (let i = 0; i < Config.topics.length; i ++){
            this.topicReacted.push(false);
        }
        while (1){
            assigned = [];
            posTopics = [];
            let pos = false, neg = false;
            for (let topic of Config.topics){
                
                let rand = randNum(-2, 2);
                if (!pos && rand > 0){
                    posTopics.push(topic);
                    pos = true;
                } 
                if (!neg && rand < 0){
                    neg = true;
                }                
                assigned.push(rand);                
            }
            if (pos && neg){
                break;
            }
        }
        this.loves = posTopics;
        this.topicFeelings = assigned;
    }
    createMemory(txt){
        this.memories.unshift(txt);
    }

    

    greet(day){        
        let caption = " Another day of spreading The Word!";
        if (!this.answered){
            this.answered = true;
		    caption = " You meet them for the first time!";
        }
        if (day == null){
            caption = " They are more interested in the conversation.";
        }
        day = game.config.day;
        this.createMemory("Day #" + day + ": " + caption);
        this.createMemory("They greet you with " + this.greetedWith);        
        this.greetedAt = Date.now();
        ui.refreshTimer();
    }

    pop(){
        this.resetTopics();
        this.resetEmotion();
        this.greet(null);
    }

    react(delta){
        if (delta == 0){
			return;
		}
		
		if (delta < 0){
			this.tolerance += delta;
			if (this.tolerance  < 1){
				this.defaultTolerance = Math.round(this.defaultTolerance * .5);
				ui.status("House #" + game.house 
					+ " slammed the door shut on you. They're done talking to you for today and will generally be less tolerant of you.");
				this.next();
			}
			this.createMemory("Tolerance: " 
				+ this.tolerance  
				+ " (<span class='text-danger'>" + delta + "</span>)")	
			ui.refresh();
			return;
		}
		let deltaCaption = "(<span class='text-danger'>-" + delta + "</span>)"

		this.resistance -= delta;
		let popCaption = '', resistanceCaption = ' ' + this.resistance;
		let popped = false;
		if (this.resistance < 0){
			popped = true;
			let old = delta; 
			
			delta += this.resistance;
			
			deltaCaption = "(<span class='text-danger'>-" 
				+ (old - delta) + "</span>)"
			resistanceCaption = ' 0';
            
			this.resistance = this.defaultResistance;
			console.log(delta);
			if (delta == 0){
				delta ++;
			}
			console.log(delta);
			popCaption = " You broke their social barriers!";
		}
		this.createMemory("Resistance: " + resistanceCaption + deltaCaption + popCaption);
		if (!popped){
			return;
		}

		this.trust += delta;
        this.pop();
		let sermonCaption = '';		
		this.createMemory("Trust: " + this.trust + "(<span class='text-success'>+" + delta + "</span>)");
    }

    reset(){
        this.reactReturned = false;
        this.knocked = false;
        this.resetEmotion();
        this.resetResistance();
        this.resetTolerance();
    }

    resetEmotion(){
        let rand = Config.emotions[randNum(0, Config.emotions.length - 1)];
        this.greetedWith = rand;
    }

    resetResistance(){
        this.resistance = this.defaultResistance;    
    }

    resetTolerance(){
        this.tolerance = this.defaultTolerance;
    }

    resetTopics(){
        for (let i in Config.topics){
            this.topicFeelings[i] = false;
        }
    }

    resetGreet(){
        this.greet = Config.emotions[randNum(0, Config.emotions.length - 1)];
    }   

    talk(topic){
        this.topicReacted[Config.topics.indexOf(topic)] = true;
    }
}