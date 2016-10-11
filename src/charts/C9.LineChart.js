import Chart from './C9.Chart';

import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import Table from './utils/C9.Table';
import Tooltip from './utils/C9.Tooltip';

import Helper from '../helper/C9.Helper';
import DataAdapter from '../helper/C9.DataAdapter';

export default class LineChart extends Chart {
    constructor(options) {
        super(options);
        var self    = this;
        var config  = {
            pointShow: false,
            pointFill: "#fb8072",
            pointStroke: "#d26b5f",
            pointOpacity: 1.0,
            pointRadius: 5,
            interpolate: "linear" // refer: https://www.dashingd3js.com/svg-paths-and-d3js
        };

        self._pointShow         = options.pointShow            ||  config.pointShow;
        self._pointRadius       = options.pointRadius          ||  config.pointRadius;
        self._pointFill         = options.pointFill            ||  config.pointFill;
        self._pointStroke       = options.pointStroke          ||  config.pointStroke;
        self._pointOpacity      = options.pointOpacity         ||  config.pointOpacity;
        self._interpolate       = options.interpolate           ||  config.interpolate;
        self.body.type = "line";

        var width   = self.width - self.margin.left - self.margin.right;
        var height  = self.height - self.margin.top - self.margin.bottom;

        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        self._x = x;
        self._y = y;

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        var da = new DataAdapter(dataOption);
        self.dataTarget     = da.getDataTarget("line");

        self.updateConfig();

    }

    /*==============================
    =            Getter            =
    ==============================*/

    get pointShow() {
        return this._pointShow;
    }

    get pointFill() {
        return this._pointFill;
    }

    get pointStroke() {
        return this._pointStroke;
    }

    get pointOpacity() {
        return this._pointOpacity;
    }

    get pointRadius() {
        return this._pointRadius;
    }

    get interpolate() {
        return this._interpolate;
    }
    
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get dataGroup() {
        return this._dataGroup;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/

    set pointShow(newPointShow) {
        if (newPointShow) {
            this._pointShow = newPointShow;
        }
    }

    set pointFill(newPointFill) {
        if (newPointFill) {
            this._pointFill = newPointFill;
        }
    }

    set pointStroke(newPointStroke) {
        if (newPointStroke) {
            this._pointStroke = newPointStroke;
        }
    }

    set pointOpacity(newPointOpacity) {
        if (newPointOpacity) {
            this._pointOpacity = newPointOpacity;
        }
    }

    set pointRadius(newPointRadius) {
        if (newPointRadius) {
            this._pointRadius = newPointRadius;
        }
    }

    set interpolate(newInterpolate) {
        if (newInterpolate) {
            this._interpolate = newInterpolate;
        }
    }

    set x(newX) {
        if (newX) {
            this._x = newX;
        }
    }

    set y(newY) {
        if (newY) {
            this._y = newY;
        }
    }

    set dataGroup(newDataGroup) {
        if (newDataGroup) {
            this._dataGroup = newDataGroup;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/

    /**
     * First init Line Chart
     */
    updateConfig() {
        var self = this,
            x = self._x,
            y = self._y;

        self._dataGroup = d3.nest()
                        .key(function(d) { return d.name; })
                        .entries(self.dataTarget);

        var dataGroup = self._dataGroup;

        x.domain([d3.min(self.dataTarget, function(d) {
                    return d.time;
                }), d3.max(self.dataTarget, function(d) {
                    return d.time;
                })]);
        y.domain([d3.min(self.dataTarget, function(d) {
                    return d.value;
                }), d3.max(self.dataTarget, function(d) {
                    return d.value;
                })]);

        var lineGen = d3.svg.line()
                        .x(function(d) { return x(d.time); })
                        .y(function(d) { return y(d.value); })
                        .interpolate(self.interpolate);

        var _body        = self.body,
            _pointShow  = self.pointShow,
            _pointRadius= self.pointRadius,
            _pointFill  = self.pointFill,
            _pointStroke= self.pointStroke,
            _pointOpacity= self.pointOpacity;

        dataGroup.forEach(function(d,i) {
            _body.append('path')
                .attr('d', lineGen(d.values))
                .attr('stroke', d.values[0].color)
                .attr('stroke-width', 2)
                .attr('data-ref', 'c9-'+d.key)
                .attr('fill', 'none');

            if (_pointShow) {
                _body.selectAll("dot")
                    .data(d.values)
                    .enter()
                    .append("circle")
                    .attr('class', 'c9-chart-line c9-circle-custom')
                    .attr("r", _pointRadius)
                    .attr("cx", function(_d) { return x(_d.time); })
                    .attr("cy", function(_d) { return y(_d.value); })
                    .attr("data-ref", function (d) { return d["data-ref"]; })
                    .style("fill", _pointFill) 
                    .style("stroke", _pointStroke)
                    .style("opacity", _pointOpacity);
            }

        });
    }

    /**
     * Main draw function of Line Chart
     */
    draw() {
        var self = this;

        var axis    = new Axis(self.options, self.body, self.data, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom, self._x, self._y);
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);
        var legend  = new Legend(self.options, self.body, self.dataTarget);

        // Draw legend
        legend.draw();
        legend.updateInteractionForLineChart(self);

        self.updateInteraction();
    }

    /**
     * Select all circle as type CIRCLE in Line Chart via its CLASS
     */
    selectAllCircle() {
        var self = this;

        return self.body
                .selectAll('circle.c9-chart-line.c9-circle-custom');
    }

    /**
     * Update Interaction: Hover
     */
    updateInteraction() {
        var self = this,
            hoverEnable     = self.hover.enable,
            hoverOptions    = self.hover.options,
            selector        = self.selectAllCircle(),
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback,
            onClickCallback  = self.click.callback;

        // Update Tooltip options for Timeline Chart
        self.options.tooltip = {
            show: true,
            position: 'left', // [top, right, bottom, left]
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            fontColor: '#fff',
            fontSize: '11px',
            format: {
                title: function(name) {
                    return 'Title ' + name;
                },
                detail: function(value, time) {
                    return 'Value: ' + value + ' <br>Time: ' + time;
                }
            }
        };

        var tooltip = new Tooltip(self.options.tooltip);

        // Update Event Factory
        self.eventFactory = {
            'click': function(d) {
                if (Helper.isFunction(onClickCallback)) {
                    onClickCallback.call(this, d);
                }
            },
            'mouseover': function(d) {
                if (!hoverEnable) return;
                
                if (Helper.isFunction(onMouseOverCallback)) {
                    onMouseOverCallback.call(this, d);
                }

                tooltip.draw(d, self, 'mouseover');
            },
            'mouseout': function(d) {
                if (!hoverEnable) return;

                if (Helper.isFunction(onMouseOutCallback)) {
                    onMouseOutCallback.call(this, d);
                }

                tooltip.draw(d, self, 'mouseout');
            }
        }

        selector.on(self.eventFactory);
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}

// Backup - LOL
// var _currentDataY = this.data;
//         _currentDataY.forEach(function(_currentValue,_index,_arr) {
//                                     _currentDataY[_index].coordinate.sort(function(a,b) {
//                                         return (a.y > b.y) ? 1 : ((b.y > a.y) ? -1 : 0);
//                                     });
//                                 });
//         this.sortedDataY         = _currentDataY;

//         // Get maximum value of coordinate {x, y}
//         var tempMaxY = [];

//         for (var i=0; i<this.sortedDataY.length; i++) {
//             tempMaxY[i] = this.sortedDataY[i].coordinate[this.sortedDataY[i].coordinate.length - 1].y;
//         }

//         var _maxY = Math.max(...tempMaxY);


//         var _currentDataX = this.data;
//         _currentDataX.forEach(function(currentValue,index,arr) {
//                                     _currentDataX[index].coordinate.sort(function(a,b) {
//                                         return (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0);
//                                     });
//                                 });
//         this.sortedDataX         = _currentDataX;
//         var tempMaxX = [];
//         for (var i=0; i<this.sortedDataX.length; i++) {
//             tempMaxX[i] = this.sortedDataX[i].coordinate[this.sortedDataX[i].coordinate.length - 1].x;
//         }
//         var _maxX = Math.max(...tempMaxX);

//         // .1 to make outerPadding, according to: https://github.com/d3/d3/wiki/Ordinal-Scales
//         var width   = this.width - this.margin.left - this.margin.right;
//         var height  = this.height - this.margin.top - this.margin.bottom;

//         var x = d3.scale.linear().range([0, width]);
//         var y = d3.scale.linear().range([height, 0]);

//         x.domain([_maxX, 0]);
//         y.domain([_maxY, 0]);

//         var lineFunc = d3.svg.line()
//             .x(function(d, i) { return x(d.x); })
//             .y(function(d, i) { return y(d.y); })
//             .interpolate("linear");

//         // this.body.selectAll('g')
//         //         .data(this.sortedDataX)
//         //         .enter()
//         //         .append('path')
//         //         .attr('class', 'line')
//         //         .attr('d', function(d){
//         //             return lineFunc(d.coordinate);
//         //         });
//         this.body.selectAll('dot')
//                 .data(this.sortedDataX)
//                 .selectAll('dot')
//                 .data(function(d,i) {return d;})
//                 .enter()
//                 .append("circle")
//                 .attr("r", 3.5)
//                 .attr("cx", function(d, i) { console.log(d, i); return x(d.coordinate[i].x); })
//                 .attr("cy", function(d, i) { console.log(d, i); return y(d.coordinate[i].y); });