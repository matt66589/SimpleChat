while(true)
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