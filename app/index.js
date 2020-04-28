class Game{
    _gameSteps;
    _userSteps;
    _isRunning;
    _isStarted;
    _level;
    _maxLevel;
    _strictMode;

    constructor() {
        this.gameSteps= [];
        this.userSteps = [];
        this.isRunning= false;
        this.isStarted= false;
        this.level = 1;
        this.maxLevel= 20;
        this.strictMode= false;
        this.levelCounter = document.getElementById('level-counter');
        this.color1 = document.getElementById('color-1');
        this.color2 = document.getElementById('color-2');
        this.color3 = document.getElementById('color-3');
        this.color4 = document.getElementById('color-4');
        this.bigFourButtonColors = [this.color1, this.color2, this.color3, this.color4];
        this.strictLight = document.getElementById('strict-light');
        this.onoffButton = document.getElementById('btn-on-off');
        this.onoffSpan = document.getElementById('on-off-span');
        this.strictModeButton = document.getElementById('btn-strict');
        this.startButton = document.getElementById('btn-start');
    };
    
    get strictModeButton(){
        return this._strictModeButton
    };

    set strictModeButton(strictModeButton){
        this._strictModeButton = strictModeButton;
    };

    get startButton(){
        return this._startButton
    };

    set startButton(startButton){
        this._startButton = startButton;
    };

    get onoffSpan(){
        return this._onoffSpan
    };

    set onoffSpan(onoffSpan){
        this._onoffSpan = onoffSpan;
    };

    get onoffButton(){
        return this._onoffButton
    };

    set onoffButton(onoffButton){
        this._onoffButton = onoffButton;
    };

    get userSteps(){
        return this._userSteps
    };

    set userSteps(userSteps){
        this._userSteps = userSteps;
    };

    get strictLight(){
        return this._strictLight
    };

    set strictLight(strictLight){
        this._strictLight = strictLight;
    };

    get color1(){
        return this._color1
    };

    set color1(color1){
        this._color1 = color1;
    };

    get color2(){
        return this._color2
    };

    set color2(color2){
        this._color2 = color2;
    };

    get color3(){
        return this._color3
    };

    set color3(color3){
        this._color3 = color3;
    };

    get color4(){
        return this._color4
    };

    set color4(color4){
        this._color4 = color4;
    };

    get levelCounter(){
        return this._levelCounter
    };
    
    set levelCounter(levelCounter){
        this._levelCounter = levelCounter;
    };

    get bigFourButtonColors(){
        return this._bigFourButtonColors
    };
    
    set bigFourButtonColors(bigFourButtonColors){
        this._bigFourButtonColors = bigFourButtonColors;
    };
    
    get gameSteps(){
        return this._gameSteps
    };
    
    set gameSteps(gameSteps){
        this._gameSteps = gameSteps;
    };
    
    get isRunning(){
        return this._isRunning
    };
    
    set isRunning(isRunning){
        this._isRunning = isRunning;
    };
    
    get isStarted(){
        return this._isStarted
    };
    
    set isStarted(isStarted){
        this._isStarted = isStarted;
    };
    
    get level(){
        return this._level;
    };
    
    set level(level){
        return this._level = level;
    };
    
    get maxLevel(){
        return this._maxLevel;
    };
    
    set maxLevel(maxLevel){
        return this._maxLevel = maxLevel;
    };
    
    get strictMode(){
        return this._strictMode
    };
    
    set strictMode(strictMode){
        this._strictMode = strictMode;
    };
    
    increaseLevel(){
        this.level = this.level + 1;
    };

    resetGame() {
        this.gameSteps= [];
        this.isRunning= false;
        this.isStarted= false;
        this.level= 1;
        this.maxLevel= 20;
        this.strictMode= false;
        this.levelCounter.textContent = '';
        this.userSteps = [];
    };
    
    addStep(step) {
        this.gameSteps.push(step);
    };

    
    runStrictStuff =()=>{


        if(this.isStarted && !this.strictMode && !this.isRunning){
            this.strictMode = true;
            this.strictLight.classList.add("simon-btn-strict-light--active")
            
        } else {
            if(!this.isRunning){
                this.strictMode = false;
                this.strictLight.classList.remove("simon-btn-strict-light--active")
            } else {
                return;
            }
        }
    };

    runStartStuff =()=>{
        if(this.isStarted && !this.isRunning){
            this.isRunning = true; 
             
            this.runGame();
            console.log("chamei");
            
            
        } else {
            console.log("já está ligado");
            return;
            
        }
    };

    blinkLight = elem => {
        if(this.isRunning){
            const addClass = () => elem.classList.add("simon-color-active");
            const removeClass = () => elem.classList.remove("simon-color-active");    
            
            return new Promise (resolve => {
                addClass();
                elem.children[0].play();
                setTimeout(() => removeClass(), 500);    
                setTimeout(() =>{
                    this.sleep(500)
                    resolve()
                }, 1000);    
            }) 
        } else {
            return;
        }

    };
    
    blinkAllTillCurrentLevel = async (gameSteps) => {
        if(this.isRunning){
            //blink all till current level
            for (let level = 0; level < gameSteps.length; level++){
                const numberOfElem = gameSteps[level];
                const elemToBlink = this.bigFourButtonColors[numberOfElem];
                await this.blinkLight(elemToBlink);    
            };
        } else {
            return;
        }
    };

    getUserClickedItem = () => {

        if(this.isRunning){
            return new Promise( resolve => { 
                
                this.color1.addEventListener('click', ()=> resolve(0));
                this.color2.addEventListener('click', ()=> resolve(1));
                this.color3.addEventListener('click', ()=> resolve(2));
                this.color4.addEventListener('click', ()=> resolve(3));
                
            });
        } else {
            return;
        }
    };
    
    sleep = ms => {
        return new Promise(resolve => {
          const timeout = setTimeout(() => {
            resolve();
            clearTimeout(timeout);
          }, ms);
        })
    };

    resetUserSteps = () => {
        this.userSteps = [];
    };

    showLevel = () => {
        this.levelCounter.textContent = this.level;
    };

    showError = () => {
        if(this.isRunning && this.isStarted){
            return new Promise (resolve => {
                this.levelCounter.textContent = "!!";
                setTimeout(resolve, 500);
            })
        }
    };

    runGame = async () => {
        this.resetUserSteps();

        
        //generate first step
        const randonNumberForArray = getRandonNumber() - 1;
        this.gameSteps.push(randonNumberForArray);

        while(this.level <= this.maxLevel && this.isRunning){
            
            //new random number for lvl 1 on strict mode
            if (this.strictMode && this.level === 1 ){
                this.gameSteps = [];
                const randonNumberForArray = getRandonNumber() - 1;
                this.gameSteps.push(randonNumberForArray);
            }

            //blink all the sequence
            await this.blinkAllTillCurrentLevel(this.gameSteps);
            //this.resetUserSteps();


            if(this.isRunning && this.isStarted){
                for (let index = 0; index < this.level; ) {
                    
                    const userSelection = await this.getUserClickedItem();
                    const userElementToBlink = this.bigFourButtonColors[userSelection];
                    await this.blinkLight(userElementToBlink);

                    if (this.gameSteps[index] === userSelection){
                        console.log("acertou esse passo");
                        this.userSteps.push(userSelection);
                        index++;
                        this.showLevel();
                    } else {

                        if(this.strictMode){
                            console.log("entrei na condição de erro do strict");
                            
                            await this.showError();
                            this.resetUserSteps();
                            this.gameSteps = [];
                            this.level = 1;
                            break;

                        } else {
                            await this.showError();
                            this.resetUserSteps();
                            console.log("errou, piscando de novo");
                            break;
                        }

                    }
                    
                }

                console.log("sai do for");
                console.log(this.userSteps);

                if(this.strictMode){
                    if(this.userSteps.length !== 0){
                        //new number for the sequence
                        const randonNumberForArray = getRandonNumber() - 1;
                        this.gameSteps.push(randonNumberForArray);

                        this.resetUserSteps();
                        this.increaseLevel();    
                    } else {
                        console.log("errei no strict");
                        this.resetUserSteps();
                        this.gameSteps = [];
                        
                    }

                }else {
                    if(this.userSteps.length === this.gameSteps.length){
                        //new number for the sequence
                        const randonNumberForArray = getRandonNumber() - 1;
                        this.gameSteps.push(randonNumberForArray);

                        this.resetUserSteps();
                        this.increaseLevel();


                    } else {
                        //console.log("entrei no errado. Level: " + this.level);
                        //console.log(this.gameSteps);
                        
                        
                    }
                }
                
                this.showLevel();
            }
        }

        if(this.level === this.maxLevel){
            this.levelCounter.textContent = "WIN";
        } else {
            this.levelCounter.textContent = "";
        }
    };

    
    init = () => {
        this.onoffButton.addEventListener('click', () => {
            this.onoffSpan.classList.toggle("simon-btn-on-off-span--active");
            
            if(!this.isStarted){
                this.isStarted = true;
                this.level = 1;
                this.showLevel();
                this.strictModeButton.addEventListener("click", this.runStrictStuff);
                this.startButton.addEventListener("click", this.runStartStuff);
                
            } else {
                this.resetGame();
                this.strictModeButton.removeEventListener("click", this.runStrictStuff);
                this.startButton.removeEventListener("click", this.runStartStuff);
                this.strictLight.classList.remove("simon-btn-strict-light--active")
                this.levelCounter.textContent = ""; 
                    
            }
        });
    };
    
}


//helper
const getRandonNumber = () => Math.floor(Math.random() * (5 - 1) + 1);

//initializing game
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});