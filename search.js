(function(){
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

  	var userDataTree = new Array(10);

	function main()
	{
		// First were gonna check if we're still authenticated
		firebase.initializeApp(config);
		$('.back-button').click(back);
		const auth = firebase.auth();
		// make sure we are still signed in 
		auth.onAuthStateChanged(firebaseuser => 
			{
				var user = firebase.auth().currentUser;

				if(user != null)
				{
					// search database stuff right here
					$('#result-text').text("Loading...");
					var ref = firebase.database().ref("users");
					ref.on("child_added", function(snapshot) 
					{
						
						snapshot.forEach(function (userData) 
							{
								
								// attempting to display the user data hopelessley
								// maybe im not filtering the right data???
								// need to search for email_id but cant get directly there without getting
								// around the user toek thing. 
								var dataCounter = 0;
								var converted = userData.val();
								userDataTree[dataCounter] = converted;
								dataCounter++;
								
							});
							
					});


				}
				else
				{
					alert('Authentication lost please re-login');
					window.location.replace('index.html');
				}


			});
	}

	function back()
	{
		window.location.replace('signedin.html');
	}
})();