## Bar Chart:

1. `stack`: auto stack based on input data
e.g: {name: a, value: 2} -> {name: a, y0: lowerbound(2), y1: upperbound(2)}

## Sep., 7th:

#### DONE:

2. `Restructor SVG container`: Main Skeleton
	SVG
	 	body (g.c9-chart.c9-custom-container)
	 		bar(c9-chart-bar c9-custom-bar) | arc(c9-chart-donut c9-custom-arc) | line
	 		tooltip
		title
		legend

3. `Make Grunt-Webpack combo`: Should auto-run webpack to pack modules every time each files changed
	-> run: webpack --progress --colors --watch
			or type './build.bat' in cmd

4. `Coding Convention`: Rename object attributes from `bla_bla` to `blaBla`

5. `Remake Hover Interaction for Donut Chart`: 
http://bl.ocks.org/erichoco/6694616  
http://zeroviscosity.com/d3-js-step-by-step/step-6-animating-interactivity

6. `Hover Interaction for all Charts`:
	- DONE: Bar Chart, Line Chart, Donut Chart, Pie Chart

#### TODO:

0000. `Add Hover on Legend, temporarily disable/enable like Click on Legend`
	- DONE: Donut Chart, Pie Chart
		- Option 1: on Hover Legend, we should make it HIGHLIGHT current pie/donut data
		- Option 2: on Hover Legend, we should make it INVISIBLE current pie/donut data
	- NEXT: Line Chart, Bar Chart

000. `Add General Legend to all charts, Interaction when Click on each Legend`: 
	- DONE: Donut Chart, Pie Chart
	- NEXT: Line Chart, Bar Chart

1. `setOption`: After construct a new instance from defined class, we could change individual
option of that object

2. `Data Adapter`: 
	- Support data reader with various formats (json, csv, tsv, txt,..), of course with data format 
	that match our definition
	- Add getValue(), getKey() that based on key-definition by user. DON'T use .name, .value instead
	-> Make it customizable

	- Notes: With XHR, only accept response data with format JSON, so we just call getJson for the specific request


3. `Make C9.Config`: File contains all default configs, should not put all configs in each files
Put them all in 1 file: Classes, default configs, etc.

4. `Bar Chart: Add Group bar chart to filter domain`: To create legend for bar chart, we should add new type of 
Bar Chart (Group of bar chart)

5. `Bar Chart`: Add isLogaric Implementation for DATA-SCALE, currently only implement for y-scale

6. `Create Table View`: 
	- REF: https://developers.google.com/chart/interactive/docs/gallery/table