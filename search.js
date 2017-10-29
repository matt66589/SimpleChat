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

  	var userDataTree = new Array(30); // were holding 30 usernames per page for now
  	var dataLine = 0;

	function main()
	{
		// click listeners
		$('#result-text0').click(function()
			{
				if(userDataTree[0] != null)
				{
					var selecteduser = userDataTree[0];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text1').click(function()
			{
				if(userDataTree[1] != null)
				{
					var selecteduser = userDataTree[1];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text2').click(function()
			{
				if(userDataTree[2] != null)
				{
					var selecteduser = userDataTree[2];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text3').click(function()
			{
				if(userDataTree[3] != null)
				{
					var selecteduser = userDataTree[3];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text4').click(function()
			{
				if(userDataTree[4] != null)
				{
					var selecteduser = userDataTree[4];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text5').click(function()
			{
				if(userDataTree[5] != null)
				{
					var selecteduser = userDataTree[5];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text6').click(function()
			{
				if(userDataTree[6] != null)
				{
					var selecteduser = userDataTree[6];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text7').click(function()
			{
				if(userDataTree[7] != null)
				{
					var selecteduser = userDataTree[7];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text8').click(function()
			{
				if(userDataTree[8] != null)
				{
					var selecteduser = userDataTree[8];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});

		$('#result-text9').click(function()
			{
				if(userDataTree[9] != null)
				{
					var selecteduser = userDataTree[9];
					// SELECTED USER IS FOUND HERE 
					// SEND INFORMATION TO NEXT PAGE
				}
				else
				{

				}
			});


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
								userDataTree[dataLine] = userData.val();
								switch(dataLine)
								{
									default :

									break;

									case 0 :
										$('#result-text0').text(userData.val());
									break;
										
									case 1 :
										$('#result-text1').text(userData.val());
									break;
										
									case 2 :
										$('#result-text2').text(userData.val());
									break;
										
									case 3 :
										$('#result-text3').text(userData.val());
									break;
										
									case 4 :
										$('#result-text4').text(userData.val());
									break;

									case 5 :
										$('#result-text5').text(userData.val());
									break;

									case 6 :
										$('#result-text6').text(userData.val());
									break;

									case 7 : 
										$('#result-text7').text(userData.val());
									break;

									case 8 : 
										$('#result-text8').text(userData.val());
									break;

									case 9 : 
										$('#result-text9').text(userData.val());
									break;
								}
								dataLine++;
								
								
								
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