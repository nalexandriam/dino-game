const background = document.getElementsByClassName('background')[0];
const btn = document.querySelector('.btn');
const startScreen = document.querySelector('.start')
const gameover = document.querySelector('#gameover')
let jumping = false;
let dinoPositionBottom = null;

function jump(dino, dinoPositionBottom){
    let jumpIntervalUp = setInterval(()=>{

        if(dinoPositionBottom >= 200){
            clearInterval(jumpIntervalUp);
            let jumpIntervalDown = setInterval(()=>{

                if(dinoPositionBottom <= 0){
                    dinoPositionBottom = 20;
                    dino.style.bottom = dinoPositionBottom+'px'
                    
                    jumping = false
                    clearInterval(jumpIntervalDown)
                }else{
                    dinoPositionBottom -= 20;
                    dino.style.bottom = dinoPositionBottom+'px';
                }    
            },20)
        }else{
            dinoPositionBottom += 20;
            dino.style.bottom =dinoPositionBottom+'px';
        }
    },14)
}
function createDino(){
    const dino = document.createElement('div');
    dino.classList.add('dino');
    dino.id = 'dino';
    dino.style.position = 'absolute'; 
    dino.style.left = 100+'px';
    dino.style.bottom = 20+'px';
    dinoPositionBottom = 20;
    background.appendChild(dino)

    document.addEventListener('keydown', (event)=>{
        if(!jumping && event.keyCode === 32){
            jumping = true;
            jump(dino, dinoPositionBottom);
        }
           
    } );
}
function checkColision(){
    let dinoHeight = document.getElementById('dino').style.bottom;
    dinoHeight.length===5? Number(dinoHeight = dinoHeight.substring(0,3)): dinoHeight = Number(dinoHeight.substring(0,2));
    console.log(dinoHeight)
    if(dinoHeight <=80){
        return true
    }
    else return false
}
function createCactus(){
    const cactus = document.createElement('div');
    cactus.classList.add('cactus');
    cactus.style.position = 'absolute'; 
    cactus.style.right = 0+'px';
    cactus.style.bottom = 20+'px';
    let positionRight = 0;
    background.appendChild(cactus)

    let moveCactus = setInterval(()=>{
        
        if(positionRight >= (window.innerWidth - 160) && positionRight <= (window.innerWidth - 100) ){
            let colided = checkColision();
            if(colided){
                clearInterval(moveCactus)
                console.log(gameover.children)
                gameover.style.display='flex'
                gameover.children[0].style.display='block'
                //document.body.innerHTML = "<h1 id='gameover'>Fim de brincadeira</h1>";
            } 
        }
        if(positionRight >= (window.innerWidth + 60)){
            cactus.remove();
            clearInterval(moveCactus)
            createCactus();
        }else{
            cactus.style.right = (positionRight += 20) + 'px';
        }
        
    },20) 
}
btn.addEventListener('click', event=>{
    startScreen.style.display = 'none';
    createDino();
    createCactus(); 
})
