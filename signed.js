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
		}

	function signout()
	{
		firebase.auth().signOut();
	}

	function sendMessage()
	{
		// REDIRECT TO SEND MESSAGE PAGE OR POPUP
	}

})();