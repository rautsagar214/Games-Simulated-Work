const cardArray = [
    {
        name:'fries',
        img:'assets/fries.png',
    },
    {
        name:'cheeseburger',
        img:'assets/cheeseburger.png',
    },
    {
        name:'hotdog',
        img:'assets/hotdog.png',
    },
    {
        name:'ice-cream',
        img:'assets/ice-cream.png',
    },

    {
        name:'milkshake',
        img:'assets/milkshake.png',
    },
    {
        name:'pizza',
        img:'assets/pizza.png',
    },
    {
        name:'fries',
        img:'assets/fries.png',
    },
    {
        name:'cheeseburger',
        img:'assets/cheeseburger.png',
    },
    {
        name:'hotdog',
        img:'assets/hotdog.png',
    },
    {
        name:'ice-cream',
        img:'assets/ice-cream.png',
    },

    {
        name:'milkshake',
        img:'assets/milkshake.png',
    },
    {
        name:'pizza',
        img:'assets/pizza.png',
    }
]


cardArray.sort(()=>0.5 - Math.random())
// console.log(cardArray)

const gridDisplay = document.querySelector('#grid')
// console.log(gridDisplay)

let cardChoosen = []
let cardChosenIds = []
const cardsWon = [] 


function createBoard(){
    for(let i = 0;i<cardArray.length;i++){
       const card =  document.createElement('img')

       card.setAttribute('src','assets/blank.png')
       card.setAttribute('data-id',i)
       card.addEventListener('click',flipCard)

       gridDisplay.appendChild (card)

    //    console.log(card,i)
    }
}

createBoard()


function checkMatch(){
   const cards = document.querySelectorAll('img')
   const optionOneId = cardChosenIds[0]
   const optionTwoId = cardChosenIds[1]
    const resultDisplay = document.querySelector('#result')
   console.log(cards)

   console.log("check for match !")

   if(optionOneId == optionTwoId){
    cards[optionOneId].setAttribute('src','assets/blank.png')
    cards[optionTwoId].setAttribute('src','assets/blank.png')
    alert("You have clicked the same image !")

   }



   if (cardChoosen[0]===cardChoosen[1]){
    alert("You found a match !")
    cards[optionOneId].setAttribute('src','assets/white.png')
    cards[optionTwoId].setAttribute('src','assets/white.png')
    cards[optionOneId].removeEventListener('click',flipCard)
    cards[optionTwoId].removeEventListener('click',flipCard)
    
    cardsWon.push(cardChoosen)

   } else{
    cards[optionOneId].setAttribute('src','assets/blank.png')
    cards[optionTwoId].setAttribute('src','assets/blank.png')
    alert("sorry try again")
   }

   resultDisplay.textContent = cardsWon.length
   cardChoosen =[]
   cardChosenIds = []


   if(cardsWon.length == (cardArray.length/2)){
    resultDisplay.innerHTML = 'Congratulation you found them all'
   }

}

// console.log(cardArray)

function flipCard(){
 const cardId = this.getAttribute('data-id')  

//  console.log(cardArray[cardId].name)

 cardChoosen.push(cardArray[cardId].name)
 cardChosenIds.push(cardId)
 

//  console.log(cardChoosen)
// console.log("flip",cardId)
console.log(cardChosenIds)
this.setAttribute('src',cardArray[cardId].img)

if (cardChoosen.length===2){
    setTimeout(checkMatch,500)
}

} 


