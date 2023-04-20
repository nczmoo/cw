class People{
    
    answered = false;
    defaultTolerance = randNum(10, 100);
    defaultResistance = randNum(1, 15);    
    greetedWith = null;
    greetedAt = null;    
    knocked = false;
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
        for (let i = 0; i < Config.topics.length; i ++){
            this.topicReacted.push(false);
        }
        while (1){
            assigned = [];
            
            let pos = false, neg = false;
            for (let topic of Config.topics){
                
                let rand = randNum(-2, 2);
                if (!pos && rand > 0){
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
        this.topicFeelings = assigned;
    }
    createMemory(txt){
        this.memories.unshift(txt);
    }

    

    greet(){        
        this.createMemory("They greet you with " + this.greetedWith);        
        this.greetedAt = Date.now();
    }

    nextDay(){
        this.reactReturned = false;
    }

    pop(){
        for (i of this.topics){
            this.topics[i] = false;
        }
        this.resetEmotion();
        this.greet();
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

    }

    resetGreet(){
        this.greet = game.config.emotions[randNum(0, game.config.emotions.length - 1)];
    }   

    talk(topic){
        this.topicReacted[Config.topics.indexOf(topic)] = true;
    }
}