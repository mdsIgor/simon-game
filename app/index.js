const onoffbutton = document.getElementById('btn-on-off');
onoffbutton.addEventListener('click', () => {
    setTimeout(runGame,1000);
});

const color1 = document.getElementById('color-1');
const color2 = document.getElementById('color-2');
const color3 = document.getElementById('color-3');
const color4 = document.getElementById('color-4');
const myColors = [color1, color2, color3, color4];


const getRandonNumber = () => Math.floor(Math.random() * (5 - 1) + 1);


const blinkLight = (elem) => {
    
    console.log(elem);
    

    const addClass = () => elem.classList.add("simon-color-active");
    const removeClass = () => elem.classList.remove("simon-color-active");    

    return new Promise(resolve => {
        addClass();
        setTimeout(() => {
            removeClass();
            resolve();
            
        },1500);
        
    });
};

const getUserClickedItem = () => {
    return new Promise( (resolve) => { 
        
        color1.addEventListener('click', ()=> resolve(1));
        color2.addEventListener('click', ()=> resolve(2));
        color3.addEventListener('click', ()=> resolve(3));
        color4.addEventListener('click', ()=> resolve(4));
         
    });
};

const runGame = async () => {
    modelGame.isStarted = true;
    
    //creating an array to store game steps
    const seq = [];
    const userSteps = [];

    //getting a number between 1 and 4 (-1 in array)
    for (let index = 0; index < 20; index++) {
        const sortedNumber = getRandonNumber();    
        await blinkLight(myColors[sortedNumber-1]);
        
        
        //wait user click
        const clickedColor = await getUserClickedItem();
        console.log(clickedColor);        
        //if they choose the correct one go to the next
        if(clickedColor == sortedNumber){
            seq.push(sortedNumber);
            userSteps.push(clickedColor);
        }
        else {
            console.log("errou");
            break;
            
        }


        
    }

    console.log(seq);
    
    
    
}



//model
const modelGame = {
    _isStarted: false,
    _level: 0,

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
    }
}