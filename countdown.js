//A function that updates the timer every second.
window.setInterval(function()
{
	/*if (Modernizr.canvas) {
	  // let's draw some shapes!
	  alert("Script is working!");
	} 
	else {
	  // no native canvas support available :(
	}*/

	//Creating dates for today and the start of Nationals and calculating the difference.
	var today = new Date();
	var nationalsDate = new Date(2013,7,2);
	var nationalsMonth = nationalsDate.getMonth();
	var todayMonth = today.getMonth() + 1;
	var months = nationalsMonth - todayMonth;
	var days = 0;

	for (var m = todayMonth; m < nationalsMonth; m++)
	{
		switch(m)
		{
			case 2:
				days+= 28;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				days+= 30;
				break;
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				days+= 31;
				break;
			default :
				days += 0;
				break;
		}
	}

	var nationalsDay = nationalsDate.getDate();
	var todayDay = today.getDate();
	days =  days + nationalsDay - todayDay;

	var todayHour = today.getHours();
	var hours = 24 - todayHour;

	var todayMinutes = today.getMinutes();
	var minutes = 60 - todayMinutes;

	var todaySeconds = today.getSeconds();
	var seconds = 60 - todaySeconds;

	if (hours < 10)
	{ hours = "0" + hours; }

	if (minutes < 10)
	{ minutes = "0" + minutes; }

	if (seconds < 10)
	{ seconds = "0" + seconds; }



	//document.write(days);
	//document.write(hours);
	//document.write(minutes);
	//document.write(seconds);

	var countdownString = days + hours + ":" + minutes + ":" + seconds;

	document.getElementById("days").innerHTML = days;
	document.getElementById("hours").innerHTML = hours;
	document.getElementById("minutes").innerHTML = minutes;
	document.getElementById("seconds").innerHTML = seconds;

},1000);