// Handle unnecessary banners
var noheader = true;
var page = "";
var pageAvailability = false;
var pageInfo = false;
var pageHome = true;

if(window.location.href.indexOf("vakantiewoning") > -1)
	noheader= true;
else if(window.location.href.indexOf("tarieven") > -1) 
{
	noheader= true;
	pageAvailability = true;
}
else if(window.location.href.indexOf("info") > -1) 
{
	noheader= true;
	pageInfo = true;
}
else if(window.location.href.indexOf("contact") > -1) 
	noheader= false;
else if(window.location.href.indexOf("recensies") > -1) 
	noheader= false;
else if(window.location.href.indexOf("huurder") > -1) 
	noheader= false;


var calendar;
var calendarEl;
var calendarjson;

document.addEventListener('DOMContentLoaded', function() {
	$(".banner").parent().slideUp('slow');
	/*if(noheader)
	{
		$(".banner").parent().slideUp('slow');
	} else {
		$(".banner").parent().fadeIn('slow');
	}*/
	

	if(!(pageAvailability || pageInfo))
		return;
	fullcalendar_init();
});

// Only called when either availability or info
function fullcalendar_init() {
	var googlecalapi = 'AIzaSyDK4W4kNWfk2QUTu4izsTaDlH4GYZ-OMy8';
	
	var availabilityID = 'jk5c8vi00vfhshlodq67ca7qq8@group.calendar.google.com';
	var infoID = 'set2o5diubn1vg8l0d0lngvrk4@group.calendar.google.com';
	
	
	
	calendarjson = {
		headerToolbar: { start: 'prev,next today', center: 'title', end: 'dayGridMonth,listYear' }, // buttons for switching between views
		
		plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
		initialView: 'dayGridMonth',

		locale: 'nl',
		displayEventTime: false, // don't show the time column in list view
		googleCalendarApiKey: googlecalapi,
		height: "auto"
	};
	
	if($(window).width() < 1100){
		calendarjson.initialView = 'listYear';
		calendarjson.headerToolbar = {
			left: '',
			center: 'title',
			right: 'dayGridMonth,listYear'
		}
		calendarjson.footerToolbar =  {
			left: '',
			center: 'prev,next,today',
			right: ','
		}
	}
	
	
	if(pageAvailability) {	
		calendarEl = document.getElementById('availability-ediger');
		calendarjson.events = availabilityID;
	}
	
	if(pageInfo) {
		calendarEl = document.getElementById('events-ediger');
		calendarjson.events = infoID;
	}

	// Create calendar itself
	calendar = new FullCalendar.Calendar(calendarEl, calendarjson);
	
	document.getElementById('fullcalendar-editor').style.display = "none";
	
	// Render previously initiated calendars
	calendar.render();
}

function render() {
	// Create calendar itself
	calendar = new FullCalendar.Calendar(calendarEl, calendarjson);
	
	document.getElementById('fullcalendar-editor').style.display = "none";
	
	// Render previously initiated calendars
	calendar.render();

	if (calendar == null) {
		setTimeout(function() { wait() }, 500);
	} else {
		//
	}
}