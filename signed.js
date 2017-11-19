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

					// MESSAGING WONT WORK BECAUSE TO USE FIREBASE CLOUD MESSAGING YOU NEED TO BE USING AN SSL CONNECTION
					//
					/////////////////////////////////////////////////////////////////////////////////////////////////////
					const messaging = firebase.messaging();
			
			

					messaging.requestPermission()
					.then(function() 
					{
						
						console.log('Permission to show notifications granted');
						return messaging.getToken();
					})
					
					.then(function(token) 
					{
						console.log(token);
					})
					
					.catch(function(err)
						{
							console.log(err);
						});


				messaging.setBackgroundMessageHandler(function(payload) 
					{
						
						var title = "New Message";
						var options = {
							body: payload.data.status// NOT FINISHED WITH THIS
						}
						return self.registration.showNotification(title, options);
					});

				///////////////////////////////////////////////////////////////////////////////////////////////////////
				});
				$('.signout-button').click(signout);
				$('.send-message').click(sendMessage);
				$('.back-button').click(backButton);
				$('.all-users').click(allUsersButton);
				$('.group-text').click(groupChatClick);

			
		}


	function signout()
	{
		firebase.auth().signOut();
	}

	function sendMessage()
	{
		var text = $('.send-text').val();
		messageSender(text);

	}

	function backButton()
	{
		window.location.replace("signedin.html")
	}
	function allUsersButton()
	{
		//TEMPORARY CHANGEMEEEEE TODO
		window.location.replace("allusers.html");
		
		// WRiTE THE STUFF FOR SEARHCHING THE DATABASE
			// Make sure to have it false when its doe with searching the database
			// https://www.youtube.com/watch?v=oYhIhEVmXXw
			 // test to see if we got here
			
	}
	function groupChatClick()
	{
		window.location.replace("groupchat.html");
		messageUpdater();
	}
	function messageUpdater()
	{
		var ref = firebase.database().ref('GC');
		ref.on("child_added", function(snapshot)
		{
			snapshot.forEach(function(iResult)
			{
				alert(iResult);
			});
		});

	}
	function messageSender(message)
	{
		// NEED An IF STATEMENT TO CHECK FOR AN EMPTY BOX BEFORE
		// SENDING THE MESSAGE TO THE DATABASE

				var messagePath = firebase.database().ref('GC');
			// We need to gather user information right here
			var userInfo = firebase.auth().currentUser;

			var messageStruct = 
			{
				text : message,
				sender : "Anonymous",

			}
			messagePath.push(messageStruct);
			$('.send-text').val('');

	}

})();