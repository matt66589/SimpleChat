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
	//var messaging = firebase.messaging();
	// Main Function
	function main() {
		
		
		// messaging.requestPermission().then(function() 
		// 	{
		// 		var token = messaging.getToken();
		// 		console.log('Permission to show notifications granted');
		// 		console.log('Token is ', tokn);
		// 	});

		// messaging.setBackgroundMessageHandler(function(payload) 
		// 	{
		// 		/*
		// 		var title = "test";
		// 		var options = 
		// 		{
		// 			body: payload.data.// NOT FINISHED WITH THIS
		// 		}
		// 		*/
		// 	});


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
		var confirmPass = $('.password-confirm').val();
		var selectedUsername = $('.username-box').val();
		// First we have to make sure that they typed something

		if(email == "" || pass == "" || email == " " || pass == " " || selectedUsername == "" || selectedUsername == " ")
		{
			alert('invalid fields');
		}
		else
		{
				if(pass == confirmPass)
				{
							try 
						{
							auth.createUserWithEmailAndPassword(email, pass);
							
							var database = firebase.database();
							var path1 = "users/";
							email = email.toLowerCase();
							var emailKey = email.replace(/\./g, ',');
							var finalpath = path1 + emailKey;
							var ref = database.ref(finalpath);

							var userInfo = 
							{
								email: email,
								username: selectedUsername,
							}

								ref.set(userInfo);
								alert('account created, now login');
						}
						catch(e)
						{
							alert('problem pushing data to database');
							// periods arent allowed in firebase keys this is why i kept seeing this issue 
						}
				}
				else
				{
						alert("passwords don't match!");
				}


				// Before we sign them up into the database we gotta make sure they arent already in it.
				// what i tried to do to solve that didnt work so i have to do something else until then commenting
				// it out. I think its because of the quotation marks in the db

				// realized i need a really big db change in which each email will have a folder with corresponding information
			//if(searchfor(email))
			//{
				
			
			
			//}
			//else
			//{
			//	alert('Email already has an account!');
			//}
		}
		
		

		
		
		
	}


	function searchfor(email)
	{
		var dataRef = firebase.database().ref("users");
		dataRef.equalTo(email).limitToFirst(1).on("child_added", function(snapshot)
		{
			
			var searchResult;
			snapshot.forEach(function(result)
				{
					searchResult = result;
				});
			if(searchResult == email)
			{
				return true;
			}
			else
			{
				return false;
			}
		})

	}

})();