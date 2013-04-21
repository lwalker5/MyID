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
		days+= daysInMonth(m);

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


	var countdownString = days + hours + ":" + minutes + ":" + seconds;

	document.getElementById("days").innerHTML = days;
	document.getElementById("hours").innerHTML = hours;
	document.getElementById("minutes").innerHTML = minutes;
	document.getElementById("seconds").innerHTML = seconds;

},1000);

var daysInMonth = function(month)
{
	switch(month+1)
	{
		case 2:
			days = 28;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			days = 30;
			break;
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			days = 31;
			break;
		default :
			days = 0;
			break;
	}
	return days;	
}

function Day(date,training,special)
{
	this.date = date;
	this.training = training;
	this.special = special;
};

var calculateStartDay = function(date,month,year)
{
	var w = (date + (2.6*month - 0.2) + 5*(year % 4) + 4*(year % 7) + 6*(year % 400)) % 7;
	return Math.round(w);
};

var getMonthName = function(monthNum)
{
	switch(monthNum+1)
	{
		case 1:
			name = "January";
			break;
		case 2:
			name = "February";
			break;
		case 3:
			name = "March";
			break;
		case 4:
			name = "April";
			break;
		case 5:
			name = "May";
			break;
		case 6:
			name = "June";
			break;
		case 7:
			name = "July";
			break;
		case 8:
			name = "August";
			break;
		case 9:
			name = "September";
			break;
		case 10:
			name = "October";
			break;
		case 11:
			name = "November";
			break;
		case 12:
			name = "December";
			break;
		default :
			name = "Month!";
			break;
	}
	return name;	
};

var initializeCalendar = function()
{
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth(); //starts from 0
	var year = today.getYear();
	var training = [];
	var special = false;

	//Month name header for calendar
	document.getElementById("month").innerHTML = getMonthName(month).toUpperCase();
	var daysOfMonth = []; 

	//get the day of week the 1st of the month is on
	var startDay = calculateStartDay(date,month,year)-1;

	//dummy days before the month starts
	for (var x = 0; x < startDay; x++)
	{
		dummyDay = new Day("",training,false);
		daysOfMonth[x] = dummyDay;
	}

	//create a day object for each day of the month. 
	var counter = 1;
	for (var i = startDay; i < (daysInMonth(month)+startDay); i++)
	{
		var justADay;
		if (counter == date){
			special = true;
		}

		justADay = new Day(counter,training,special);
		daysOfMonth[i] = justADay; 
		counter++;
	}

	//dummy days after the month ends
	while ((daysOfMonth.length % 7) != 0)
	{
		dummyDay = new Day("",training,false);
		daysOfMonth[daysOfMonth.length] = dummyDay;
	}

	var dayOfMonthCount = 0;
	var weekOfMonth = 0;

	while (dayOfMonthCount < daysOfMonth.length)
	{
		var tableRow = document.createElement("tr");
		for (var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++)
		{
			var tableElement = document.createElement("td");
			tableElement.setAttribute("onclick", "showFeisPopUp()");
			var text = document.createTextNode(daysOfMonth[dayOfMonthCount].date);
			tableElement.appendChild(text);
			tableRow.appendChild(tableElement);
			dayOfMonthCount++;
		}
		document.getElementById("tablebody").appendChild(tableRow);
	}
}

var draw = function(){
	var contex = document.getElementById('addFeisCanvas').getContext('2d');
	contex.fillRect(5,5,50,100);
}

var showFeisPopUp = function()
{
	var canvas = document.getElementById('addFeisCanvas');
	canvas.style.opacity = 1;
	if (canvas.getContext){
		var contex = canvas.getContext('2d');
		draw();
	}
	else{

	}
	//document.getElementById("feisPopUp").style.visibility = "visible";
	//document.getElementById("maincontent").style.opacity = "0.5";
};
