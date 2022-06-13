console.log("hello from login.js")


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

  //selecting the login form
  const loginForm = document.querySelector(".login")

  // //selecting the logOut button
  // const loggingOut = document.querySelector(".logout")



  //logging the user in


  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value
    
    

    signInWithEmailAndPassword(auth, email, password)
      .then(cred => {
        console.log('user logged in:'+ cred.user)
        console.log(cred.user.uid)
        loginForm.reset()
        
        const onlinePeople = doc(db, 'online', 'users')
        const locals = doc(db, 'accounts', cred.user.uid)

        var checker = 0
        onSnapshot(onlinePeople, (doc) => {
          var onlineUsers = doc.data().onlineUsers
          
          
            onSnapshot(locals, (doc) => {
              var userStuff = doc.data().User
              


              if(checker == 0){

                userStuff.userid = cred.user.uid
                onlineUsers.unshift(userStuff)
                setDoc(onlinePeople, {onlineUsers: onlineUsers})
                console.log("Sheesh")
                


                checker++
              }


            })

            setTimeout(run, 5000)    
        
            signupForm.reset();
            
            function run(){
            window.location.replace("index.html")
            }
        
        
        })



        
      })
      .catch(err => {
        console.log(err.message)
      })
  })




  //logging the user out for now

  // document.body.addEventListener('keypress', function() {
      
  //     if(event.key == "f"){
  //     signOut(auth)
  //         .then(() => {
  //         console.log('user signed out')
  //         })
  //         .catch(err => {
  //         console.log(err.message)
  //         })
  //     }
  // })


//detecting auth changes

onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})
