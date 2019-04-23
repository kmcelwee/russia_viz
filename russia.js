// attempted
var y = {"2005": ["MANAFORT"], "2006": ["COHEN", "MANAFORT", "SESSIONS"], "2007": ["TRUMP", "MANAFORT"], "2008": ["TRUMP"], "2011": ["MANAFORT"], "2012": ["MANAFORT"], "2013": ["TRUMP", "COHEN", "MANAFORT", "PAGE"], "2014": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "FLYNN", "SESSIONS"], "2015": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "TRUMP", "COHEN", "MANAFORT", "FLYNN", "SESSIONS"], "2016": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "TRUMP", "COHEN", "MANAFORT", "KUSHNER", "JR", "FLYNN", "PAPADOPOULOS", "PAGE", "SESSIONS"], "2018": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "TRUMP", "COHEN", "MANAFORT", "KUSHNER", "JR", "FLYNN", "PAPADOPOULOS", "PAGE", "SESSIONS"], "2017": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "TRUMP", "COHEN", "MANAFORT", "KUSHNER", "JR", "FLYNN", "PAPADOPOULOS", "PAGE", "SESSIONS"], "2019": ["MAJOR", "RUSSIANS", "COHEN", "SESSIONS"]};

var cal = `
	<div class="cal">
		<span style="width: 8.47%;">Jan</span>
		<span class="month" style="width: 7.92%;">Feb</span>
		<span class="month" style="width: 8.47%;">Mar</span>
		<span class="month" style="width: 8.2%;">April</span>
		<span class="month" style="width: 8.47%;">May</span>
		<span class="month" style="width: 8.2%;">June</span>
		<span class="month" style="width: 8.47%;">July</span>
		<span class="month" style="width: 8.47%;">Aug</span>
		<span class="month" style="width: 8.19%;">Sept</span>
		<span class="month" style="width: 8.47%;">Oct</span>
		<span class="month" style="width: 8.2%;">Nov</span>
		<span class="month" style="width: 8.47%;">Dec</span>
	</div>`

var after_info = `Data collected by the PBS NewsHour<br>
	Visualization by <a href="https://medium.com/@kevinrmcelwee">Kevin McElwee</a><br>
	Source code available <a href="https://github.com/kmcelwee/russia_viz">here</a><br>
	Original data available <a href="https://docs.google.com/spreadsheets/d/1utamO_EzX9VMyTKqWGF4x2upqohYCRYIdzyrx6YEyyk/edit?usp=sharing">here</a>`

function toggle() {
	cat = event.target.classList[1];
	event.target.classList.toggle('active');

	arr = document.getElementsByClassName(cat);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].classList.contains('time_container')) {
			if (arr[i].style['height'] == '0px') {
				arr[i].style['height'] = '48px';
				arr[i].style['visibility'] = 'visible';
				arr[i].style['transition'] = 'visibility 0ms 0ms, height 500ms ease-out, opacity 100ms ease-in';
			} else {
				arr[i].style['height'] = '0px';
				arr[i].style['visibility'] = 'hidden';
				arr[i].style['transition'] = 'visibility 0ms 500ms, height 500ms ease-out, opacity 100ms ease-in';
			}
		}
	}
}

function createYear(j, y) {
	return_s = "";
	for (var i = 0; i < j.length; i++) {
		return_s += `<div id="${y}_${j[i]}" class="time_container ${j[i]}"></div>`;
	}
	return_s += cal + '<br>';
	return return_s;
}

function years() {
	l = ['2005', '2006', '2007', '2008', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
	output = "";
	for (var i = l.length - 1; i >= 0; i--) {
		output += `<div id="${l[i]}"><h2>${l[i]}</h2>${createYear(y[l[i]], l[i])}</div>`;
	}
	document.getElementById("all_years").innerHTML = output;
}

function createAnnual(j) {
	return_s = "";
}

function createRange(j) {
	var d = {
		0: 40,
		1: 34,
		2: 28,
	};
	if (j.start_p < 10) {
		var pos = "right"
	}
	else if (j.start_p > 90) {
		var pos = "left"
	}
	else { var pos = "top"}

	var return_s = (`<a href="${j.url}" target="_blank"><div class="date_range" tooltip="${j.time_description} - ${j.info}"
			tooltip-position="${pos}"
			style="top: ${d[j.level]}px; left: ${j.start_p}%; width: ${j['width']}%;"></div><a>`);

	return return_s;
}


function createCircle(j) {
  // var return_s = (`
  // <div class="tooltip">
  // <a href="${j.url}">
  //   <div class='circle ${j.category}' id='this_circle' 
  // style='top: 75px; right: ${j.start_p}%;'></div></a>
  //   <span class="tooltiptext">${j.time_description}<br>HI</span>
  // </div>`);
  // ${j.info}
	var d = {
		0: 10,
		1: 16,
		2: 22,
		3: 28,
		4: 34,
	}
	if (j.start_p < 10) {
		var pos = "right"
	}
	else if (j.start_p > 90) {
		var pos = "left"
	}
	else { var pos = "top"}
	var return_s = (`<a href="${j.url}" target="_blank"><div class='circle' tooltip="${j.time_description} - ${j.info}"
		tooltip-position="${pos}"
		style='top: ${d[j.level]}px; left: ${j.start_p}%;'></div></a>`);
	return return_s;
}

function circles() {
  output = "";

  document.getElementById("circle_spot").innerHTML = output;
}


function all_items(all_j) {
	for (var year in y) {
		for (var i = 0; i < y[year].length; i++) {
			cat = y[year][i];
			output = "";
			for (var key in all_j) {
				var m = all_j[key];
				if (m["year"] == year && m["cat_id"] == cat && m["end"] == null) {
						output += createCircle(m);
					}
				if (m["year"] == year && m["cat_id"] == cat && m["end"] != null) {
						output += createRange(m);
					}
				}
			var id_text = `${year}_${cat}`;
			document.getElementById(id_text).innerHTML = output;
		}
	}
}

function check_mobile() {
    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) { alert("This page is meant to be viewed on a desktop. Some features will not be available on a mobile device."); } 
}


window.onload = function() {
    // var all_j;
    $.getJSON("https://kmcelwee.github.io/russia_viz/data/clean.json", function(data) {
        var all_j = data;
        years();
        all_items(all_j);
        document.getElementById("after_info").innerHTML = after_info;
        check_mobile();
        
    });

}
