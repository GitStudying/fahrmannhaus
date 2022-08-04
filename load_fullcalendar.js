// Load requirements:
//<link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.css" rel='stylesheet' />
//<script defer src="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.min.js"></script>
//<script defer src="https://cdn.jsdelivr.net/npm/@fullcalendar/google-calendar@5.10.1/main.global.min.js"></script>
//<script defer src="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/locales-all.min.js"></script>


// Handle unnecessary banners
var noheader = true;
var page = "";
var pageAvailability = false;
var pageInfo = false;
var pageHome = true;

if(window.location.href.indexOf("editor") > -1)
	page="editor";
else if(window.location.href.indexOf("vakantiewoning") > -1)
	noheader= true;
else if(window.location.href.indexOf("tarieven") > -1) 
{
	noheader= true;
	pageAvailability = true;
}
else if(window.location.href.indexOf("info") > -1 || window.location.href.indexOf("regio") > -1) 
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
	if(pageAvailability || pageInfo)
		fullcalendar_init();
});

// Only called when either availability or info
function fullcalendar_init() {
	var googlecalapi = 'AIzaSyDK4W4kNWfk2QUTu4izsTaDlH4GYZ-OMy8';
	
	var availabilityID = 'jk5c8vi00vfhshlodq67ca7qq8@group.calendar.google.com';
	var infoID = 'set2o5diubn1vg8l0d0lngvrk4@group.calendar.google.com';
	
	calendarjson = {
		eventAfterAllRender: function(allLoaded){
			if(allLoaded){
				console.log("everything loaded using load_fullcalendar")
				buttonclickhandler();
				hideinfo();
			}
		},
		initialView : 'dayGridMonth',
		headerToolbar: {
			left: 'today prev,next',
			center: 'title',
			right: 'dayGridMonth,listYear'
		},
		locale: 'nl',
		displayEventTime: false, // don't show the time column in list view
		googleCalendarApiKey: googlecalapi,
		height: "auto"
	};
	
	// Give mobile a different layout
	if(window.innerWidth < 1100){
		calendarjson.initialView = 'listYear';
		calendarjson.headerToolbar = {
			left: '',
			center: 'title',
			right: 'dayGridMonth,listYear'
		}
		calendarjson.footerToolbar =  {
			left: '',
			center: 'today prev,next',
			right: ''
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
	
	// Render previously initiated calendars
	render();
}

function render() {
	document.getElementById('fullcalendar-editor').style.display = "none";
	
	// Render previously initiated calendars
	calendar.render();

	if (document.getElementById('availability-ediger').childNodes.length == 0) {
		console.log('retrying fullcalendar')
		// setTimeout(render(), 500);
	} else {
		console.log('fullcalendar rendered')
	}
}