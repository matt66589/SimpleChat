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

  	

	function main()
	{
		// First were gonna check if we're still authenticated
		$('.back-button').click(back);
		firebase.InitializeApp(config);
		const auth = firebase.auth();
		// make sure we are still signed in 
		auth.OnAuthStateChanged(firebaseuser => 
			{
				var user = firebase.auth().currentUser;

				if(user != null)
				{
					// search database stuff right here
					$('#result-text').text("Loading");
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