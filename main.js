(function() {
	$(document).ready(main);
	
	// Config for Firebase
	var config = {
    apiKey: "AIzaSyCnNTZOV9q_hh1WfgXAi95Mufl6kcNx64U",
    authDomain: "simplechat-85df8.firebaseapp.com",
    databaseURL: "https://simplechat-85df8.firebaseio.com",
    projectId: "simplechat-85df8",
    storageBucket: "",
    messagingSenderId: "596433248868"
  		};

  	// Tells if We're Signed in or not
	var signedin = false;
	var currentUser;

	// Main Function
	function main() {
		firebase.initializeApp(config);
		// Login button on main page 
		$('.myButton').click(login);
		// Sign up button
		$('.signup-button-on-page').click(signup);
		}


	// If Login Button is Clicked
	function login() {
		const auth = firebase.auth();
		var email = $('.email-box').val();
		var pass = $('.password-box').val();
		
			try {
			auth.signInWithEmailAndPassword(email, pass);
				}
			
			catch(e)
			{
				alert('Incorrect Password or user with email ' + email + ' has not been created');

			}
			// Checking to see if we're signed in
			auth.onAuthStateChanged(firebaseUser => 
				{
					if(firebaseUser)
					{
						alert('Login Successful, Redirecting');
						console.log('login successful, welcome!');
						console.log(firebaseUser);
						currentUser = firebaseUser;
						window.location.replace("signedin.html");
					}
					else
					{
						
					}
				});

	}

	// If Signup Button is Clicked
	function signup() {
		const auth = firebase.auth();
		var email = $('.email-box').val();
		var pass = $('.password-box').val();
		try {
			auth.createUserWithEmailAndPassword(email, pass);
			
			var database = firebase.database();
			var ref = database.ref("users");
			var userInfo = {
				email_id: email,
				}
				ref.push(userInfo);
			

		}
		catch(e)
		{

		}
		alert('account created, now login');
		
		
	}


	/* USED TO USE THIS FUNCTION NOW IM THINKING ITS NOT SUCH A GOOD IDEA
	function signinchanged()
	{
		if(signedin == false)
		{
			signedin = true;
			alert('signin state changed, si');
		}
		else {
			signedin = false;
			alert('signin state changed');
		}

	}
	*/

})();