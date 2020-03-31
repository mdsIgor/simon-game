//model
const modelGame = {
    _isStarted: false,
    _level: 0,
    _strictMode: false,

    get isStarted(){
        return this._isStarted
    },

    set isStarted(isStarted){
        this._isStarted = isStarted;
    },

    get level(){
        return this._level;
    },

    set level(level){
        return this._level = level;
    },
    
    get strictMode(){
        return this._strictMode
    },

    set strictMode(strictMode){
        this._strictMode = strictMode;
    },

    increaseLevel(){
        this._level++;
    }
}

const onoffbutton = document.getElementById('btn-on-off');
const onoffspan = document.getElementById('on-off-span');
const color1 = document.getElementById('color-1');
const color2 = document.getElementById('color-2');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');
const myColors = [color1, color2, color3, color4];
const strictModeButton = document.getElementById('btn-strict');
const startButton = document.getElementById('btn-start');

onoffbutton.addEventListener('click', () => {
    onoffspan.classList.toggle("simon-btn-on-off-span--active");
    
    if(!onoffspan.classList.contains("simon-btn-on-off-span--active")){
        console.log("desligado");
    } else {
        console.log("ligado");
        prepareGame();
        
    }
    
      
});




const prepareGame = () => {
    const thisGame = modelGame;
    thisGame._isStarted = true;
    thisGame._level = 0;
    
    strictModeButton.addEventListener("click", ()=>{
        thisGame._strictMode = true;
        console.log("strict on");
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
    while(thisGame._level < 5){
     
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
                    const newGame = prepareGame();
                    return runGame(newGame);
                    
                    
                } else {
                    console.log("errou, piscando de novo");
                    index = 0;                
                    await blinkAllTillCurrentLevel(gameSteps);
                }
            }
        
        }

        console.log("saí do bagulho doido");
        thisGame.increaseLevel();
        console.log("proximo nivel: " + thisGame._level);
        
    }
}