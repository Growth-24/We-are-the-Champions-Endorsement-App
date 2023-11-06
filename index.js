import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://lakers-57ec4-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref( database, "Endorsements")

const inputFieldEl = document.getElementById("endorsement")
const addButtonEl = document.getElementById("publish-btn")
const endorsementsListEl = document.getElementById("endorse-txt")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
        
    push(endorsementsInDB, inputValue)
    
    clearInputFieldEl()    
    
})


onValue(endorsementsInDB, function(snapshot){
    
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())
                   
        clearEndorsementsListEl()

        for (let i = 0; i < endorsementsArray.length; i++) {
            appendItemToEndorsementsListEl(endorsementsArray[i])

        }
    } else {
        endorsementsListEl.innerHTML = "No endorsements"
    }
})
    
    
function appendItemToEndorsementsListEl(endorse) {
    let endorsementID = endorse[0]
    let endorsementValue = endorse[1]
    
    
    let newEl = document.createElement("li")
    newEl.textContent = endorsementValue
    endorsementsListEl.append(newEl)
    
    // Remove endorsements from Firebase Database
    newEl.addEventListener ("click", function(){
        let exactLocationOfItemInDB = ref(database, `Endorsements/${endorsementID}`)
  
        remove(exactLocationOfItemInDB)
    })
   
}


// HELPER FUNCTIONS
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = ""
}