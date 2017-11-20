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
	var messageArray = new Array(2);
	var lastMessage = new Array(2);
	lastMessage[0] = "f";
	lastMessage[1] = "f";
	var counter = 0;
	var updateWorker;

	// Main Function
	function main() {
		
			firebase.initializeApp(config);
			const auth = firebase.auth();

			// Making sure the current user is actively signed in
			auth.onAuthStateChanged(firebaseUser => 
				{
					
					updateWorker = new Worker('worker.js');
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
					else 
					{ 
						alert('authentication lost please re-sign in.'); 
						window.location.replace('index.html');
					}

					currentUser = firebaseUser;
					$('.welcome-user').text('Welcome ' + email);

					email = email.toLowerCase();
					var emailKey = email.replace(/\./g, ',');
					var path1 = "users/";
					var finalpath = path1 + emailKey;
					// if i forgot, firebase database entry keys cant have periods in them so were taking them out
					// and making the whole email lowercase to avoid any upper/lowercase confusion with the database
					var dataRef = firebase.database().ref(finalpath);

					
					dataRef.orderByChild().equalTo('username').on('child_added', function(snapshot)
						{
							console.log(snapshot.val());
						});

					



					//const messaging = firebase.messaging();
			
			

					// messaging.requestPermission()
					// .then(function() 
					// {
						
					// 	console.log('Permission to show notifications granted');
					// 	return messaging.getToken();
					// })
					
					// .then(function(token) 
					// {
					// 	console.log(token);
					// })
					
					// .catch(function(err)
					// 	{
					// 		console.log(err);
					// 	});


				// messaging.setBackgroundMessageHandler(function(payload) 
				// 	{
						
				// 		var title = "New Message";
				// 		var options = {
				// 			body: payload.data.status// NOT FINISHED WITH THIS
				// 		}
				// 		return self.registration.showNotification(title, options);
				// 	});

				///////////////////////////////////////////////////////////////////////////////////////////////////////\

				});
				$('.signout-button').click(signout);
				$('.send-message').click(sendMessage);
				$('.back-button').click(backButton);
				$('.all-users').click(allUsersButton);
				$('.group-text').click(groupChatClick);
				$('.retrieve-button').click(retrieve);

			
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
	
	function retrieve()
	{
		messageUpdater();
	}

	function messageUpdater()
	{
		var ref = firebase.database().ref('GC');
		ref.orderByKey().limitToLast(1).on("child_added", function(snapshot)
		{
			snapshot.forEach(function(iResult)
			{
				messageArray[counter] = iResult.val();
				counter++;
			});
		});

		
		if(messageArray[0] == lastMessage[0] && messageArray[1] == lastMessage[1])
		{
				// if were reading the message we just read why would we put it in the textarea again?
				counter = 0;
		}
		else
		{
				$('.message-box').append("Anonymous: " + messageArray[1] + "\n");
				lastMessage[0] = messageArray[0];
				lastMessage[1] = messageArray[1];
				counter = 0;
		}

		

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
			$('.message-box').append("Anonymous: " + message + "\n");

	}

})();