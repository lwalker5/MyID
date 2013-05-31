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
			tableElement.id = daysOfMonth[dayOfMonthCount].date;
			tableElement.setAttribute("onclick", "showFeisPopUp(" + tableElement.id + ")");
			var text = document.createTextNode(daysOfMonth[dayOfMonthCount].date);
			tableElement.appendChild(text);
			tableRow.appendChild(tableElement);
			dayOfMonthCount++;
		}
		document.getElementById("tablebody").appendChild(tableRow);
	}
}

var drawCircle = function(x,y,radius,start,end){
	var contex = document.getElementById('addFeisCanvas').getContext('2d');
	contex.fillStyle = "#00C5B2";
	contex.beginPath();
	contex.moveTo(x,y);
	contex.arc(x,y,radius,start,end,false);
	contex.fill();
	contex.closePath();

	/*contex.beginPath();
	contex.fillStyle = "#00C5B2";
	contex.fillRect(32,32,168,119);
	contex.fill();
	contex.lineWidth = 4;
	contex.strokeStyle = "white";
	contex.strokeRect(32,32,168,119); */
}

var removeFeisCanvas = function()
{
	var canvas = document.getElementById("addFeisCanvas");
	canvas.parentNode.removeChild(canvas);
}

var showFeisPopUp = function(theid)
{
	var body = document.getElementById("thebody");

	//getTable positions
	var table = document.getElementById("tablebody");
	var tablebounds = table.getBoundingClientRect();

	//get main content (calendar) position
	var themaincontent = document.getElementById("maincontent");

	//get the position of the day clicked
	var theday = document.getElementById(theid);
	var daybounds = theday.getBoundingClientRect();

	//canvas creation
	var canvas = document.createElement("canvas");
	canvas.id="addFeisCanvas";
	canvas.setAttribute('width', 950);
	canvas.setAttribute('height', 500);
	//canvas.setAttribute('onclick',"removeFeisCanvas()");
	canvas.style.left = (tablebounds.left - 10) + "px";
	canvas.style.top = (tablebounds.top) + "px";

	var x = daybounds.left - tablebounds.left + 30;
	var y = daybounds.top - tablebounds.top + 20;

	body.appendChild(canvas);
	if (canvas.getContext){
		var contex = canvas.getContext('2d');
		//contex.beginPath();
		//contex.moveTo(20,20);
		//contex.arc(20,20,6,0,Math.PI*2,false);
		//contex.fill();
		drawCircle(x,y,4.5,0,Math.PI*2,false);
		drawCircle(x+10,y+10,6,Math.PI*2,false);
		drawCircle(x+22,y+22,8,Math.PI*2,false);
		roundedRect(contex,x+22,y+22,168,119,8);
	}
	else{

	}
	x += tablebounds.left;
	y += tablebounds.top + 15;
	addFeisDialogText(themaincontent,x+22,y+22,theid);
};

var addFeisDialogText = function(themaincontent,x,y,theid){
	//the text and responses
	var feisDialog = document.createElement("div");
	feisDialog.id = "feisDialog";
	feisDialog.name = "feisDialog";
	feisDialog.style.left = x + "px";
	feisDialog.style.top = y + "px";


	var feisDialogHeader = document.createElement("h4");
	var feisForm = document.createElement("form");
	feisForm.id = "feisFormID";

	var feisTextInput = document.createElement("input");
	feisTextInput.type = "text";
	feisTextInput.id = "nameOfFeis";
	feisTextInput.value = "feis name";
	feisTextInput.setAttribute("autofocus", "autofocus");
	//feisTextInput.focus();

	var feisText = document.createTextNode("Add a Feis");

	var feisSubmit = document.createElement("a")
	feisSubmit.setAttribute("style:padding","5px")

	//feisSubmit.setAttribute('onclick',"document.getElementById('feisFormID').submit()");
	feisSubmit.setAttribute("onclick","addFeis(" + theid + ")");

	var feisCancel = document.createElement("a");
	feisCancel.setAttribute('onclick',"closeFeisDialog()");

	var feisOk = document.createTextNode("Ok");
	var feisJK = document.createTextNode("Just Kidding");

	feisForm.appendChild(feisTextInput);
	feisDialogHeader.appendChild(feisText);
	feisDialog.appendChild(feisDialogHeader);
	feisDialog.appendChild(feisForm);

	feisSubmit.appendChild(feisOk);
	feisCancel.appendChild(feisJK);
	feisDialog.appendChild(feisSubmit);
	feisDialog.appendChild(feisCancel);

	var body = document.getElementById('thebody');
	body.appendChild(feisDialog);
}

var addFeis = function(theid)
{
	var theday = document.getElementById(theid);
	theday.style.background = "#00C5B2";

	var thefeis = document.getElementById("nameOfFeis");
	var name = thefeis.value;

	var nameElement = document.createTextNode(name);
	var eventParagraph = document.createElement("p");
	eventParagraph.appendChild(nameElement); 
	nameElement.id = "event";
	theday.appendChild(eventParagraph);

	closeFeisDialog();
}

var closeFeisDialog = function()
{
	document.getElementById('feisDialog').parentNode.removeChild(document.getElementById('feisDialog'));
	removeFeisCanvas();
}

//From html5 tutorial
var roundedRect = function(ctx,x,y,width,height,radius){
  ctx.save();

  //set the shadows
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  //draw the inside of the rounded rectangle
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.fillStyle = "#00C5B2";
  ctx.fill();

  //Restore to get rid of the shadow property
  ctx.restore();

  //Draw the outline of the rectangle
  ctx.lineWidth = 3;
  ctx.strokeStyle = "white";
  ctx.stroke();
}