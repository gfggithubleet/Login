function toggleResetPswd(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() 
    $('#logreg-forms .form-reset').toggle() 
}

function toggleSignUp(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); 
    $('#logreg-forms .form-signup').toggle(); 
}

$(()=>{
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
});

const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

  var signupbtn=document.getElementById("signupbtn")
  var emailsignup=document.getElementById("useremail")
  var passswordsignup=document.getElementById("userpass")



  signupbtn.onclick=function(){
      signupbtn.disabled=true;
      signupbtn.textContent="Registering Your Account! Please Wait";
      firebase.auth().createUserWithEmailAndPassword(emailsignup.value,passswordsignup.value).then(function(response){
        sendingVerifyEmail(signupbtn);
            console.log(response);
      })
      .catch(function(error){
        signupbtn.disabled=false;
        signupbtn.textContent="Sign Up";
          console.log(error);
      })


  }

  function sendingVerifyEmail(button){
     firebase.auth().currentUser.sendEmailVerification().then(function(response){
                signupbtn.disabled=false;
        signupbtn.textContent="Sign Up S";

        console.log(response);
     })
     .catch(function(error){
                signupbtn.disabled=false;
        signupbtn.textContent="Sign Up S";

         console.log(error);
     })
  }


   var loginemail=document.getElementById("inputEmail");
   var loginpassword=document.getElementById("inputPassword");
   var loginbtn=document.getElementById("loginbtn");


   loginbtn.onclick=function(){
    loginbtn.disabled=true;
    loginbtn.textContent="Logging In Please Wait.."
       firebase.auth().signInWithEmailAndPassword(loginemail.value,loginpassword.value).then(function(response){
           console.log(response);
           loginbtn.disabled=false;
    loginbtn.textContent="Sign In"
            var userobj=response.user;
            var token=userobj.xa;
            var provider="email";
            var email=loginemail.value;
            if(token!=null && token!=undefined && token!=""){
            sendDatatoServerPhp(email,provider,token,email);
            }
       })
       .catch(function(error){
           console.log(error);
           loginbtn.disabled=false;
        loginbtn.textContent="Sign In"

       })
   }

   function sendDatatoServerPhp(email,provider,token,username){
       
        var xhr = new XMLHttpRequest();
        //xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
            if(this.responseText=="Login Successfull" || this.responseText=="User Created"){
                alert("Login Successfull");
                location='home.php';
            }
            else if(this.responseText=="Please Verify Your Email to Get Login"){
                alert("Please Verify Your Email to Login")
            }
            else{
                alert("Error in Login");
            }
        }
        });

        
   }
 
   var loginphone=document.getElementById("phoneloginbtn");
   var phoneinput=document.getElementById("inputPhone");
   var otpinput=document.getElementById("inputOtp");
   var verifyotp=document.getElementById("verifyotp");

   loginphone.onclick=function(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(response) {
            
        },
        'expired-callback': function() {
           
        }
        });

        var cverify=window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneinput.value,cverify).then(function(response){
            console.log(response);
            window.confirmationResult=response;
        }).catch(function(error){
            console.log(error);
        })
   }

   verifyotp.onclick=function(){
       confirmationResult.confirm(otpinput.value).then(function(response){
           console.log(response);
            var userobj=response.user;
            var token=userobj.xa;
            var provider="phone";
            var email=phoneinput.value;
            if(token!=null && token!=undefined && token!=""){
            sendDatatoServerPhp(email,provider,token,email);
            }
       })
       .catch(function(error){
           console.log(error);
       })
   }

   var googleLogin=document.getElementById("googleLogin");

   googleLogin.onclick=function(){
       var provider=new firebase.auth.GoogleAuthProvider();

       firebase.auth().signInWithPopup(provider).then(function(response){
           var userobj=response.user;
            var token=userobj.xa;
            var provider="google";
            var email=userobj.email;
            if(token!=null && token!=undefined && token!=""){
            sendDatatoServerPhp(email,provider,token,userobj.displayName);
            }

           console.log(response);
       })
       .catch(function(error){
           console.log(error);
       })


   }

   var facebooklogin=document.getElementById("facebooklogin");
   facebooklogin.onclick=function(){
    var provider=new firebase.auth.FacebookAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(response){
    var userobj=response.user;
     var token=userobj.xa;
     var provider="facebook";
     var email=userobj.email;
     if(token!=null && token!=undefined && token!=""){
     sendDatatoServerPhp(email,provider,token,userobj.displayName);
     }

    console.log(response);
})
.catch(function(error){
    console.log(error);
})


}