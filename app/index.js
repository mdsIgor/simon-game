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
    
    const addClass = () => elem.classList.add("simon-color-active");
    const removeClass = () => elem.classList.remove("simon-color-active");

    addClass();
    setTimeout(removeClass,1500);
};

const runGame = () => {
    modelGame.isStarted = true;
    
    const seq = [];
    seq.push(getRandonNumber());

    seq.forEach(element => {
        blinkLight(myColors[element]);
        
    });
    //console.log(seq);
    
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