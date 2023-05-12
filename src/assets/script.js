// Hallo allemaal! Vandaag gaan jullie leren hoe je HTML canvas en Javascript 
// game loops gebruikt om spritesheets te animeren! In deze ZIP heb ik wat
// ontbrekende code en een spritesheet aangeleverd. Stel vragen als je die hebt.
// Veel succes!

// Het je moet voor de code duidelijk maken dat het canvas 2d is. Zoek op
// met welke methode de informatie geeft.
let playerState = 'idle';
const dropdownMenu = document.getElementById('animation');
dropdownMenu.addEventListener('change', (e)=>{
    playerState = e.target.value;
})
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// Maak gebruik van een constructor om jouw spritesheet een variabele te maken.
const spriteIMAGE = new Image();
spriteIMAGE.src = '/src/img/void-spritesheet.png';
// Hoeveel kolommen heeft het spritesheet? Reken uit hoe groot iedere kolom is
const spriteWidth = 1000;
// Hoeveel rijen heeft het spritesheet? Reken uit hoe groot iedere rij is
const spriteHeight = 1000;
let gameFrame = 0;
const staggerFrames = 7;
// Maak een array voor de naam en het aantal frames. Dan hoef je niet continu De X en Y aan te passen.
const spriteAnimations = [];
const animationState = [
    {
        name: "idle",
        frames: 4,
    },
    {
        name: "slash",
        frames: 5,
    }
];
animationState.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
function animateSheet(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(spriteIMAGE, frameX, frameY, spriteWidth, 
    spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameFrame++;
    requestAnimationFrame(animateSheet);
};
animateSheet();