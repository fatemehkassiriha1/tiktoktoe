const buttons = document.querySelectorAll(".grid button")
const statusGame = document.querySelector("main h2")
const restart = document.querySelector("#restart")
let counter = 1
let xNumbers =[]//array of data's attribute that x buttons have 
let oNumbers =[]//array of data's attribute that o buttons have 
let whosTurn = true//true =>O  false =>X

buttons.forEach((item)=>{
    item.addEventListener("click",()=>{
        //if all of boxes are full or one of box is full(user can't click on it) 
        if(counter == 10 || item.textContent != "")return

        //if more than 5 boxes(buttons) full, search on data's buttons that x or o have, to find winner if somebody win 
        else if(counter >= 5){
            ++counter 
            setXO(whosTurn,item,statusGame)
            if(item.textContent == "X"){xNumbers.push(item.dataset.number)
            }else{oNumbers.push(item.dataset.number)}            
            if(!search(xNumbers,oNumbers)){
                if(counter == 10){
                    statusGame.textContent = "you're equal"
                    return
                }
                whosTurn = whosTurn ? false : true 
            }
            else{  
                statusGame.textContent =  `congratulations ${item.textContent} wins`
                counter = 10
                }

        //if 
        }else{
            ++counter
            setXO(whosTurn,item,statusGame)
            if(item.textContent == "X"){xNumbers.push(item.dataset.number)
            }else{oNumbers.push(item.dataset.number)}
            whosTurn = whosTurn ? false : true 
        }
    })
})


//restart game 
restart.addEventListener("click",()=>{
    if(counter<11){
        let wantToRestart = prompt("do you really want to restart?(yes/no)")

        //until user doesn't enter something in popup or
        // enter something else than yes or no do loop and popup
        while(!wantToRestart || (wantToRestart != ("yes" || "no")) ){
            wantToRestart = prompt("do you really want to restart?(yes/no)")            
        }

        //if user wants to restart game or all of boxes(buttons) are full 
        if(wantToRestart == "yes" || counter>11){
            buttons.forEach((item)=>{
                counter = 1
                xNumbers=[] ,oNumbers =[]
                item.textContent = "" 
            }) 
            statusGame.textContent = "it's O's turn"
        }
        else return
    }

})

//set x and o in boxes(buttons)
function setXO(whosTurn , item, statusGame){
    if(whosTurn){
        item.textContent = "O"
        statusGame.textContent = "it's X's turn"
    }else{
        item.textContent = "X"
        statusGame.textContent = "it's O's turn"
    }
}

//searching button data in arrayOfWinner to find winner 
//return false if nobody win 
//return true if somebody win 
function search(arrayx, arrayo){
    //states that someone can win
    const arrayOfWinner = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

    let statex =[],stateo = []
    for(let i=0;i<8;i++){
        for(let j=0;j<3;j++){
            console.log(arrayo,"o")
            console.log(arrayx,"x")    
            if((arrayx.includes(arrayOfWinner[i][j].toString())) == true) statex.push(true)
            if((arrayo.includes(arrayOfWinner[i][j].toString())) == true) stateo.push(true)
        }
        console.log(statex ,"sx")
        console.log(stateo,"so")
        if(statex[0]==true && statex[1]==true && statex[2]==true) return true
        if(stateo[0]==true && stateo[1]==true && stateo[2]==true) return true
        statex=[] ,stateo = []
    }
    return false
}