class Config {
    day = 1;
    static emotions = ['anger', 'fear', 'happy', 'sad'];
    maxTime = 8;
	people = [];
    numOfPeople = 50;
    reactions = {
        // first dimension is the greeted emotion
        // second dimension is the player's reaction and its subsequent delta
        anger: {anger:-1,	fear:1,	happy:-1,	sad:1 },
        fear: {anger: 0,	fear: 0,	happy: -1,	sad: 1 },
        happy: {anger: -1,	fear: -1,	happy: 3,	sad: -1},
        sad: {anger: 1,	fear: 1,	happy: -3,	sad: 1},

    };
    time = 0;
    timeToReact = 3;
    static topics = ['Christianity', 'Jesus', 'themselves', 'yourself', 'neighbors'];
    constructor(){
        for (let i = 0; i < this.numOfPeople; i++){
            let emotion = Config.emotions[randNum(0, Config.emotions.length - 1)];            
            this.people.push(new People(emotion));
        }
    }

    changeTime(delta){
        this.time += delta;
        if (this.time >= this.maxTime){
            this.nextDay();            
        }
    }

    nextDay(){
        console.log('nextDay');
        this.time = 0;
        this.day ++;
        for (let i in this.people){
            let person = this.people[i];
            person.reset();
        }
    }
}