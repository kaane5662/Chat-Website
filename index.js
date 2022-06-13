




console.log("hello from index.js")


import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
import { getFirestore, collection, getDocs, addDoc, doc, onSnapshot, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBny1yByD2vgTlqc43OMcdyRN4XX0JgV0",
  authDomain: "chat-app-2f715.firebaseapp.com",
  projectId: "chat-app-2f715",
  storageBucket: "chat-app-2f715.appspot.com",
  messagingSenderId: "3380653034",
  appId: "1:3380653034:web:31ebce2690cc9801f32093",
  measurementId: "G-EZMBBL6KTE"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth()






onAuthStateChanged(auth, (user) => {


 



    console.log('user status changed:', user.email)


    //get the user local documents
    const userBubbles = doc(db, 'accounts', user.uid)
    const globalBubbles = doc(db, 'globalBubble', 'bubbles')
    //get the user profile info
    const  userStuff = doc(db, 'online', 'users')



    var numCheck = 0

   onSnapshot(userBubbles, (doc) => {
      //to add
      var localbubs = doc.data().User
      //to delete
      var localbubsDelete = doc.data().User
      onSnapshot(globalBubbles, (doc) => {
        
        var bubbles = doc.data().globalBubbles
        
        
        console.log(bubbles)

         
        
          for(var i = 0; i < bubbles.length; i++){

            

            
              
            
              
              

                
                if((localbubsDelete.localBubbles[0] == bubbles[i].globalBubbles)){

                  bubbling(bubbles[i].profilePic, bubbles[i].name, bubbles[i].globalBubbles)
                  localbubsDelete.localBubbles.shift()
                  
                }else {
                  globalChat(bubbles[i].profilePic, bubbles[i].name, bubbles[i].globalBubbles)
                }
                 

              

              


            }

          

            
            
        
        



        document.querySelector(".generate").addEventListener("click", function(){
          var parag = document.querySelector("#chat-text").value 

          bubbling(localbubs.profilePic, localbubs.name, parag)
          

          
          
          var globalChat = {
            name: localbubs.name,
            profilePic: localbubs.profilePic,
            globalBubbles: parag
            
          }

          bubbles.push(globalChat)

          localbubs.localBubbles.push(parag)

          setDoc(globalBubbles, {globalBubbles: bubbles})
          setDoc(userBubbles, {User: localbubs})





      })
        

        

      })

    })

    onSnapshot(userStuff, (doc) => {

      var onlineUsers = doc.data().onlineUsers

      for(var i = 0; i < onlineUsers.length; i++){

        online(onlineUsers[i].profilePic, onlineUsers[i].name, onlineUsers[i].bio)

      }

      document.querySelector(".logout-button").addEventListener("click", function(){

        signOut(auth)
          .then(() => {
          
            
            for(var i = 0; i < onlineUsers.length; i++){

                if(onlineUsers[i].userid == user.uid){
                  onlineUsers.splice(i, 1)
                  console.log(onlineUsers)

                  setDoc(userStuff, {onlineUsers: onlineUsers})
                  


                }

            }

            setTimeout(run, 5000)    
        
            signupForm.reset();
            
            function run(){
            window.location.replace("login.html")
            }


          })
          .catch(err => {
          console.log(err.message)
          })



      })


    })



})





