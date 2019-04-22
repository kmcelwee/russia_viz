// attempted
var y = {"2005": ["MANAFORT"], "2006": ["COHEN", "MANAFORT", "SESSIONS"], "2007": ["TRUMP", "MANAFORT"], "2008": ["TRUMP"], "2011": ["MANAFORT"], "2012": ["MANAFORT"], "2013": ["TRUMP", "COHEN", "MANAFORT", "PAGE"], "2014": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "FLYNN", "SESSIONS"], "2015": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "TRUMP", "COHEN", "MANAFORT", "FLYNN", "SESSIONS"], "2016": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "TRUMP", "COHEN", "MANAFORT", "KUSHNER", "JR", "FLYNN", "PAPADOPOULOS", "PAGE", "SESSIONS"], "2018": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "TRUMP", "COHEN", "MANAFORT", "KUSHNER", "JR", "FLYNN", "PAPADOPOULOS", "PAGE", "SESSIONS"], "2017": ["MAJOR", "INVESTIGATIONS", "RUSSIANS", "TRUMP", "COHEN", "MANAFORT", "KUSHNER", "JR", "FLYNN", "PAPADOPOULOS", "PAGE", "SESSIONS"], "2019": ["MAJOR", "RUSSIANS", "COHEN", "SESSIONS"]};

var cal = `<div class="cal">
		<span style="position: absolute; left: 0%;">Jan</span>
		<span style="position: absolute; left: 8.33%;">Feb</span>
		<span style="position: absolute; left: 16.66%;">Mar</span>
		<span style="position: absolute; left: 25%;">April</span>
		<span style="position: absolute; left: 33.33%;">May</span>
		<span style="position: absolute; left: 41.66%;">June</span>
		<span style="position: absolute; left: 50%;">July</span>
		<span style="position: absolute; left: 58.33%;">Aug</span>
		<span style="position: absolute; left: 66.66%;">Sept</span>
		<span style="position: absolute; left: 75%;">Oct</span>
		<span style="position: absolute; left: 83.33%;">Nov</span>
		<span style="position: absolute; left: 91.66%;">Dec</span>
	</div>`

function toggle() {
	cat = event.target.classList[1];

	event.target.classList.toggle('active');

	arr = document.getElementsByClassName(cat);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].classList.contains('time_container')) {
			if (arr[i].style.display == 'none') {
				arr[i].style.display = 'block';
			} else {
				arr[i].style.display = 'none';
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
	document.getElementById("future_years").innerHTML = output;
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
        check_mobile();
    });

}
