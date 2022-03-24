const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", 
                    "T", "U", "V",  "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",",
                    "?", "!", "'", "_", "-", "&", "@", "#", "$", "%","*", "(", ")", " "];
                    

function stringToIndex(string){     // transforms the string into an array of indexes from the characters array
    let stringIndex=[];
    for(let i=0; i<string.length; i++){
        stringIndex[i]=characters.map(elem => elem.toLowerCase()).indexOf(string[i].toLowerCase())
        }
        
    return stringIndex;
  }


function indexSum(message, key){       // calculates the sum of indexes (for encryption)
  let messageIndex = stringToIndex(message);
  let keyIndex = stringToIndex(key);
  let encriptedMessage=[];
  for (let i=0; i<messageIndex.length; i++){  
    if(messageIndex[i]+keyIndex[i%keyIndex.length]>characters.length-1){ 
        encriptedMessage[i]=messageIndex[i]+keyIndex[i%keyIndex.length]-characters.length; 
    } else { 
        encriptedMessage[i]=messageIndex[i]+keyIndex[i%keyIndex.length]; 
      }
  }
  return encriptedMessage;
}


function indexDif(message, key){  //calculates the difference betwen the indexes (for decryption)
  let decriptedMessage=[];
  let messageIndex = stringToIndex(message);
  let keyIndex = stringToIndex(key);
  for (let i=0; i<messageIndex.length; i++){
    if(messageIndex[i]-keyIndex[i%keyIndex.length]<0){ 
        decriptedMessage[i]=messageIndex[i]-keyIndex[i%keyIndex.length]+characters.length; 
    } else { 
        decriptedMessage[i]=messageIndex[i]-keyIndex[i%keyIndex.length]; 
      }
  }
  return decriptedMessage;
}


function indexToString(messageIndex){  // transforms the indexes to strings according to character array
  let stringMessage=[];
  for(let i=0; i<messageIndex.length; i++){
    stringMessage[i]=characters[messageIndex[i]];
    } 
  return stringMessage;
}


function verify(message, key){ //verifies for no values or bad values (values not included in characters array)

  if(!message){
    document.getElementById('message-error').textContent="Please insert a value in order to continue"
  } else { document.getElementById('message-error').textContent="" }

  if(!key){
    document.getElementById('key-error').textContent="Please insert a value in order to continue"
  } else { document.getElementById('key-error').textContent="" }

  if(stringToIndex(message).includes(-1)){
    document.getElementById('message-error').textContent="Bad value inserted, decryption not to be trusted"
    return 0;
  }

  if(stringToIndex(key).includes(-1)){
    document.getElementById('key-error').textContent="Bad value inserted, decryption not to be trusted"
    return 0;
  }
}


document.getElementById("encrypt").addEventListener("click", () => {
    let message = document.getElementById("message-input").value;
    let key = document.getElementById("key-input").value;
    verify(message, key);
    let newMessage=indexToString(indexSum(message, key));
    document.getElementById("decryption").innerHTML = newMessage.join("");
});


document.getElementById("decrypt").addEventListener("click", () => {
    let message = document.getElementById("message-input").value;
    let key = document.getElementById("key-input").value;
    verify(message, key);
    let newMessage=indexToString(indexDif(message, key));
    document.getElementById("decryption").textContent = newMessage.join("");
});


document.getElementById("copy").addEventListener("click", () => {  
    var copyText = document.getElementById("decryption");
    copyText.select();      
    navigator.clipboard.writeText(copyText.value); 
});