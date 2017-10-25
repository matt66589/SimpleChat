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
	var alluserssearch = false;

	// Main Function
	function main() {
		if(alluserssearch)
		{
			// WRiTE THE STUFF FOR SEARHCHING THE DATABASE
			// Make sure to have it false when its doe with searching the fatabase
			var ref = firebase.database().ref('users');
			var events = ref.child('email_id');
			
			

			
		}
		else
		{


			firebase.initializeApp(config);
			const auth = firebase.auth();


			// Making sure the current user is actively signed in
			auth.onAuthStateChanged(firebaseUser => 
				{
					

					// Getting the info of the signed in user
					var user = firebase.auth().currentUser;
					var name, email, photoUrl, uid, emailVerified;

					if(user != null)
					{
						name = user.displayName;
						email = user.email;
						photoUrl = user.photoUrl;
						uid = user.uid;

					}
					else { alert('authentication lost please re-sign in.'); window.location.replace('index.html');}

					currentUser = firebaseUser;
					$('.welcome-user').text('Welcome ' + email);

					// LEFT OFF RIGHT HERE
				});
				$('.signout-button').click(signout);
				$('.send-message').click(sendMessage);
				$('.back-button').click(backButton);
				$('.all-users').click(allUsersButton);
			}
		}


	function signout()
	{
		firebase.auth().signOut();
	}

	function sendMessage()
	{
		window.location.replace("sendmessage.html");
	}

	function backButton()
	{
		window.location.replace("signedin.html")
	}
	function allUsersButton()
	{
		window.location.replace("allusers.html");
		alluserssearch = true;
	}
})();