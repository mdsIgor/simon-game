//Class
class Game{

    _gameSteps= [];
    _isRunning= false;
    _isStarted= false;
    _level= "";
    _maxLevel= 20;
    _strictMode= false;
    
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
        this._level++;
    };
    
    async resetGame() {
        this._gameSteps= undefined;
        this._isRunning= false;
        this._isStarted= false;
        this._level= "";
        this._maxLevel= 20;
        this._strictMode= false;
    };

    turnStrictModeOff(){
        this._isRunning = false,
        this._level = 1,
        this._strictMode = false,
        this._gameSteps = []
    }

    resetStrictGame() {
        this._level = 1,
        this._gameSteps = []
    }
    
    addStep(step) {
        this._gameSteps.push(step);
    }
}

//initializing game
const currentGame = new Game();

const onoffbutton = document.getElementById('btn-on-off');
const onoffspan = document.getElementById('on-off-span');
const levelCounter = document.getElementById('level-counter');
const strictLight = document.getElementById('strict-light');
const color1 = document.getElementById('color-1');
const color2 = document.getElementById('color-2');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');
const myColors = [color1, color2, color3, color4];
const strictModeButton = document.getElementById('btn-strict');
const startButton = document.getElementById('btn-start');


const runStrictStuff = () => {
    if(!currentGame._strictMode){
        currentGame._strictMode = true;
        strictLight.classList.add("simon-btn-strict-light--active")
        console.log("strict on " + currentGame._strictMode);
        
    } else {
        if(!currentGame._isRunning){
            currentGame.strictMode = false;
            strictLight.classList.remove("simon-btn-strict-light--active")
            console.log("strict off " + currentGame._strictMode);
        } else {
            console.log("game rodando");
            
        }
    }
};

const runStartStuff = () =>{
    if(!currentGame._isRunning){    
        
        runGame();
        
    } else {
        
        console.log("game já está ligado leigo");
    }
}

onoffbutton.addEventListener('click', () => {
    onoffspan.classList.toggle("simon-btn-on-off-span--active");
    
    if(!currentGame._isStarted){

        currentGame._isStarted = true;
        console.log("ligado " + currentGame.isStarted);
        currentGame._level = 1;
        levelCounter.textContent = currentGame._level;
    
        strictModeButton.addEventListener("click", runStrictStuff);
        startButton.addEventListener("click", runStartStuff);
        
        
    } else {
        currentGame.resetGame();
        strictModeButton.removeEventListener("click", runStrictStuff);
        startButton.removeEventListener("click", runStartStuff);
        strictLight.classList.remove("simon-btn-strict-light--active")
        console.log("desligado " + currentGame.isStarted + " strict mode " + currentGame._strictMode);
        levelCounter.textContent = ""; 
             
    }
    
      
});

const getRandonNumber = () => Math.floor(Math.random() * (5 - 1) + 1);

const blinkLight = (elem) => {

    if(currentGame._isStarted){   
        const addClass = () => elem.classList.add("simon-color-active");
        const removeClass = () => elem.classList.remove("simon-color-active");    

        return new Promise( (resolve) => {
            addClass();
            elem.children[0].play();
            setTimeout(() => {
                removeClass();      
            },1000);
            setTimeout(resolve, 1500);
            
            
        });
    }
};

const getUserClickedItem = () => {
    return new Promise( (resolve) => { 
        
        color1.addEventListener('click', ()=> resolve(1));
        color2.addEventListener('click', ()=> resolve(2));
        color3.addEventListener('click', ()=> resolve(3));
        color4.addEventListener('click', ()=> resolve(4));
         
    });
};

const blinkAllTillCurrentLevel = async (gameSteps) => {
    //blink all till current level
    for (let level = 0; level < gameSteps.length; level++){
        await blinkLight(myColors[gameSteps[level]-1]);    
    };
};

const runGame = async () => {
    currentGame._isRunning = true;
    currentGame._gameSteps = [];
    
    for (let iLevel = 0; iLevel < currentGame._maxLevel;) { 
        //verificacao constatada no debug   
        if(currentGame._isStarted || currentGame.isRunning){

            console.log("currgame1");
            console.log(currentGame);

            levelCounter.textContent = currentGame._level;

            //sorting a number and pushing it to the sequence
            const sortedNumber = getRandonNumber();
            currentGame.addStep(sortedNumber);
            //blink all till the current level
            await blinkAllTillCurrentLevel(currentGame._gameSteps);
        
        
        
        
            
            for (let index = 0; index < currentGame._gameSteps.length; ) {
                //create an array to all user steps every iteration
                const userSteps = [];
                

                const currentSelectedColor = await getUserClickedItem();
                await blinkLight(myColors[currentSelectedColor-1]);
            
                
                if(currentGame._gameSteps[index] === currentSelectedColor){
                    console.log("acertou esse botao");
                    userSteps.push(currentSelectedColor);
                    index++;
                } else {
                    if(currentGame._strictMode){
                        console.log("errou no strict mode");
                        levelCounter.textContent = "!!";
                        currentGame.resetStrictGame();
                        
                        return setTimeout(runGame,1500);
                        
                        
                    } else {
                        levelCounter.textContent = "!!";
                        console.log("errou, piscando de novo");
                        index = 0;                                        
                        await blinkAllTillCurrentLevel(currentGame._gameSteps);
                        levelCounter.textContent = currentGame._level;
                    }
                }
                    
            }
           

        
            iLevel++;
            currentGame.increaseLevel();
            console.log("proximo nivel: " + currentGame._level);
        } else {
            levelCounter.textContent = "";
            
        }
        
        
        
    }
    
}
