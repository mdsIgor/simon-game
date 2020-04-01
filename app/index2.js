//Class
class Game{

    _gameSteps= [];
    _isStarted= false;
    _level= 0;
    _maxLevel= 20;
    _strictMode= false;
    
    get gameSteps(){
        return this._gameSteps
    };
    
    set gameSteps(gameSteps){
        this._gameSteps = gameSteps;
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
    
    turnOffGame() {
        this._isStarted = false,
        this._level = 0,
        this._strictMode = false,
        this._gameSteps = []
    };
    
    addStep(step) {
        this._gameSteps.push(step);
    }
}


const currentGame = new Game();

console.log(currentGame);

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


/*
onoffbutton.addEventListener('click', () => {
    onoffspan.classList.toggle("simon-btn-on-off-span--active");
    
    if(!onoffspan.classList.contains("simon-btn-on-off-span--active")){
        console.log("desligado");
        levelCounter.textContent = "";
        startButton.style.pointerEvents = "none";
        strictModeButton.style.pointerEvents = "none";
    } else {
        console.log("ligado");
        startButton.style.pointerEvents = "auto";
        strictModeButton.style.pointerEvents = "auto";
        prepareGame();
        
    }
    
      
});




const prepareGame = () => {
    const thisGame = modelGame;
    thisGame._isStarted = true;
    thisGame._level = 0;
    levelCounter.textContent = thisGame.level;
    
    strictModeButton.addEventListener("click", ()=>{

        if(!thisGame._strictMode){
            thisGame._strictMode = true;
            strictLight.classList.add("simon-btn-strict-light--active")
            console.log("strict on");
        } else {
            thisGame._strictMode = false;
            strictLight.classList.remove("simon-btn-strict-light--active")
            console.log("strict off");
        }
    });


    startButton.addEventListener("click", () => {
        setTimeout(()=> {
            runGame(thisGame);
        },1000);
    });

    return thisGame;
      
};

const getRandonNumber = () => Math.floor(Math.random() * (5 - 1) + 1);


const blinkLight = (elem) => {
 
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
};

const getUserClickedItem = () => {
    return new Promise( resolve => { 
        
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

const runGame = async (thisGame) => {
    const gameSteps = [];
    while(thisGame._level !== thisGame._maxLevel){
     
        //sorting a number and pushing it to the sequence
        const sortedNumber = getRandonNumber();
        gameSteps.push(sortedNumber);
        //blink all till the current level
        await blinkAllTillCurrentLevel(gameSteps);
        
        
        //create an array to all user steps every iteration
        const userSteps = [];

        for (let index = 0; index < gameSteps.length; ) {
            
            const currentSelectedColor = await getUserClickedItem();
            await blinkLight(myColors[currentSelectedColor-1]);


            if(gameSteps[index] === currentSelectedColor){
                console.log("acertou esse botao");
                userSteps.push(currentSelectedColor);
                index++;
            } else {
                if(thisGame._strictMode){
                    console.log("errou no strict mode");
                    levelCounter.textContent = "!!";
                    let newGame;
                    setTimeout(()=>{ newGame = prepareGame()}, 1000);
                    return setTimeout(()=>{ runGame(newGame)}, 1500);
                    
                    
                } else {
                    levelCounter.textContent = "!!";
                    console.log("errou, piscando de novo");
                    index = 0;                
                    setTimeout(() => { levelCounter.textContent = thisGame.level },1000);
                    setTimeout(async ()=> { await blinkAllTillCurrentLevel(gameSteps)}, 1500);
                }
            }
        
        }

        console.log("saí do bagulho doido");
        thisGame.increaseLevel();
        levelCounter.textContent = thisGame.level;
        console.log("proximo nivel: " + thisGame._level);
        
    }
}
*/