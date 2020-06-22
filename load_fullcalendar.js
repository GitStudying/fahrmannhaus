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
	// Add necessary scripts
			/*var script_tag = document.createElement('script');
		script_tag.setAttribute("type","text/javascript");
		script_tag.setAttribute("src","https://kit.fontawesome.com/543a1e5fb2.js");
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);*/
	
	/*var scripts  = ["https://cdn.jsdelivr.net/gh/PaulHermens/fahrmannhaus/fullcalendar-4.1.0/packages/core/main.min.js","https://cdn.jsdelivr.net/gh/PaulHermens/fahrmannhaus/fullcalendar-4.1.0/packages/daygrid/main.min.js","https://cdn.jsdelivr.net/gh/PaulHermens/fahrmannhaus/fullcalendar-4.1.0/packages/list/main.min.js","https://cdn.jsdelivr.net/gh/PaulHermens/fahrmannhaus/fullcalendar-4.1.0/packages/google-calendar/main.min.js",
	"https://cdn.jsdelivr.net/gh/PaulHermens/fahrmannhaus/fullcalendar-4.1.0/packages/core/locales/nl.js"];
	
	for(var i = 0; i <= scripts.length-1; i++){
		var script_tag = document.createElement('script');
		script_tag.setAttribute("type","text/javascript");
		script_tag.setAttribute("src",scripts[i]);
script_tag.async = false; 
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
	}
	
	// Add necessary styles
	var styles = ["https://cdn.jsdelivr.net/gh/PaulHermens/fahrmannhaus/fullcalendar-4.1.0/packages/core/main.min.css","https://cdn.jsdelivr.net/gh/PaulHermens/fahrmannhaus/fullcalendar-4.1.0/packages/daygrid/main.min.css","https://cdn.jsdelivr.net/gh/PaulHermens/fahrmannhaus/fullcalendar-4.1.0/packages/list/main.min.css"]
	
	for(var i = 0; i <= styles.length-1; i++){
		var link_tag = document.createElement('link');
		link_tag.setAttribute("rel","stylesheet");
		link_tag.setAttribute("href",styles[i]);
link_tag.async = false; 
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(link_tag);
	}
	*/

	var googlecalapi = 'AIzaSyDK4W4kNWfk2QUTu4izsTaDlH4GYZ-OMy8';
	
	var availabilityID = 'jk5c8vi00vfhshlodq67ca7qq8@group.calendar.google.com';
	var infoID = 'set2o5diubn1vg8l0d0lngvrk4@group.calendar.google.com';
	
	
	
	calendarjson = {
		defaultView: 'dayGridMonth',
		plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,listYear'
		},
		locale: 'nl',
		displayEventTime: false, // don't show the time column in list view
		googleCalendarApiKey: googlecalapi,
		height: "auto"
	};
	
		   if($(window).width() < 1100){
				  calendarjson.defaultView = 'listYear';
				  calendarjson.header = {
			left: '',
			center: 'title',
			right: 'dayGridMonth,listYear'
		}
					calendarjson.footer =  {
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
	
	// Render previously initiated calendars
	render(calendar);
}

function render() {
	document.getElementById('fullcalendar-editor').style.display = "none";
	
	// Render previously initiated calendars
	calendar.render();
	console.log('tried')

	if ($('#availability-ediger').children().length == 0) {
		console.log('retrying fullcalendar')
		setTimeout(render(), 500);
	} else {
		console.log('fullcalendar rendered')
	}
}