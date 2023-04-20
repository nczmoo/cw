class Config {
    day = 1;
    static emotions = ['anger', 'fear', 'happy', 'sad'];

	people = [];
    numOfPeople = 1000;
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
    static topics = ['Christianity', 'Jesus', 'them', 'yourself'];
    constructor(){
        for (let i = 0; i < this.numOfPeople; i++){
            let emotion = this.emotions[randNum(0, this.emotions.length - 1)];            
            this.people.push(new People(emotion));
        }
    }
}