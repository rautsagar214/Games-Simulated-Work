const computerChoiceDisplay = document.getElementById("Computer-choice")
const UserChoiceDisplay = document.getElementById("User-choice")
const resultDisplay = document.getElementById("Result")
const possibleChoices = document.querySelectorAll('button')
let userchoice 
let computerChoice
let result


possibleChoices.forEach(possibleChoices =>  possibleChoices.addEventListener('click',(e)=>{
userchoice = e.target.id
UserChoiceDisplay.innerHTML = userchoice

 computerChoice = generateComputerChoice()
 computerChoiceDisplay.innerHTML = computerChoice

 result = getResult()
 resultDisplay.innerHTML = result

})) 

function generateComputerChoice() {
    const randomNumber = possibleChoices[Math.floor(Math.random()* 3)]; // or you can use possibleChoice.length
     return randomNumber.innerHTML;

}

function getResult(){

    if (computerChoice===userchoice){
       return result = 'its a draw!'
    }
    if (computerChoice==='Rock' && userchoice=='Paper'){
        return result = 'You Win'
    }
    if (computerChoice==='Rock' && userchoice=='Scissors'){
        return result = 'You Lost'
    }
    if (computerChoice==='Paper' && userchoice=='Scissors'){
        return result = 'You Win'
    }
    if (computerChoice==='Paper' && userchoice=='Rock'){
        return result = 'You lost'
    }
    if (computerChoice==='Scissors' && userchoice=='Rock'){
        return result = 'You Win'
    }
    if (computerChoice==='Scissors' && userchoice=='Paper'){
        return result = 'You lost'
    }
    
    

}