console.log("hello from signUp.js")


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






const user = auth.currentUser;

// const boi = firebase.firestore();




//selecting the signUp form
const signupForm = document.querySelector('.signUp')





//selecting the signup button

document.querySelector(".sign-up-button").addEventListener("click", function(){




  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //defining the email and password

    const email = signupForm.email.value
    const password = signupForm.password.value

    //creating account

    createUserWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log('user created:', cred.user)


        
        // cd into accounts collection
        const colAccount = doc(db, 'accounts', cred.user.uid)
        const globalBubble = doc(db, 'globalBubble', 'bubbles')
        console.log(globalBubble)
        const username =  signupForm.username.value

        var numCheck = 1
        

        onSnapshot(globalBubble, (doc) => {

          var bubbles = doc.data().globalBubbles
          console.log(bubbles)


          var globalChat = {
            name: username,
            profilePic: "https://archive.org/download/twitter-default-pfp/e.png",
            globalBubbles: "New Person Joined: "+ username
            
          }

          if(numCheck == 1){
          
          bubbles.push(globalChat)

          setDoc(globalBubble, {globalBubbles: bubbles})

          


          }

          numCheck++

        })
        
        var user = {
          name: username,
          bio: "This person has not set up yet",
          localBubbles: ["New Person Joined: "+ username],
          profilePic : "https://archive.org/download/twitter-default-pfp/e.png"

          
        }

        


        
           
            
        //create document with specific user id 
           
        setDoc(colAccount, {User: user})
        
        
              
       
        setTimeout(run, 5000)    
        
        signupForm.reset();
        
        function run(){
        window.location.replace("index.html")
        }
        
        
        
        
      })
      .catch(err => {
        console.log(err.message)
      })


  })




  
})




