'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _C = require('./C9.Chart');

var _C2 = _interopRequireDefault(_C);

var _C3 = require('./utils/C9.Axis');

var _C4 = _interopRequireDefault(_C3);

var _C5 = require('./utils/C9.Title');

var _C6 = _interopRequireDefault(_C5);

var _C7 = require('./utils/C9.Legend');

var _C8 = _interopRequireDefault(_C7);

var _C9 = require('./utils/C9.Table');

var _C10 = _interopRequireDefault(_C9);

var _C11 = require('./utils/C9.Tooltip');

var _C12 = _interopRequireDefault(_C11);

var _C13 = require('../helper/C9.Helper');

var _C14 = _interopRequireDefault(_C13);

var _C15 = require('../helper/C9.DataAdapter');

var _C16 = _interopRequireDefault(_C15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = function (_Chart) {
    _inherits(LineChart, _Chart);

    function LineChart(options) {
        _classCallCheck(this, LineChart);

        var _this = _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this, options));

        var self = _this;

        self.config = {
            point: {
                show: true,
                fill: "steelblue",
                stroke: "steelblue",
                'stroke-width': 1,
                opacity: 1.0,
                radius: 5
            },
            area: {
                show: true
            },
            line: {
                style: "solid", // "dash", "dot"
                width: 2
            },
            interpolate: "linear" };

        // self.updateConfig(config);
        return _this;
    }

    /*==============================
    =            Getter            =
    ==============================*/


    _createClass(LineChart, [{
        key: 'updateConfig',

        /*=====  End of Setter  ======*/

        /*======================================
        =            Main Functions            =
        ======================================*/

        /**
         * Init Line Chart Config
         */
        value: function updateConfig(config, callback) {
            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'updateConfig', this).call(this, config);

            var self = this;

            self.options = _C14.default.mergeDeep(config, self.options);

            self.chartType = "line";
            self.bisectDate = d3.bisector(function (d) {
                return d.valueX;
            }).left;

            var dataOption = self.dataOption;
            dataOption.colorRange = self.colorRange;

            var da = new _C16.default(dataOption, self.chartType, null);
            da.getDataTarget(self.chartType, function (data) {
                self.dataTarget = data;
                self.isTimeDomain = da.timeFormat;

                var width = self.width - self.margin.left - self.margin.right,
                    height = self.height - self.margin.top - self.margin.bottom;

                self.x = self.isTimeDomain ? d3.time.scale().range([0, width]) : d3.scale.linear().range([0, width]), self.y = d3.scale.linear().range([height, 0]);

                self.updateDomain(self.dataTarget);

                self.lineGen = d3.svg.line().x(function (d) {
                    return self.x(d.valueX);
                }).y(function (d) {
                    return self.y(d.valueY);
                }).interpolate(self.options.interpolate);

                self.areaGen = d3.svg.area().x(function (d) {
                    return self.x(d.valueX);
                }).y0(function (d) {
                    return self.y(d.valueY);
                }).y1(height).interpolate(self.options.interpolate);

                if (_C14.default.isFunction(callback)) {
                    callback.call(self, self.dataTarget);
                }
            });
        }

        /**
         * Update data config
         */

    }, {
        key: 'updateDataConfig',
        value: function updateDataConfig(dataCfg, callback) {
            var self = this;

            self.options = _C14.default.mergeDeep(self.options, dataCfg);

            self.chartType = "line";
            self.bisectDate = d3.bisector(function (d) {
                return d.valueX;
            }).left;

            var dataOption = self.dataOption;
            dataOption.colorRange = self.colorRange;

            var da = new _C16.default(dataOption, self.chartType, null);
            da.getDataTarget(self.chartType, function (data) {
                self.dataTarget = data;
                self.isTimeDomain = da.timeFormat;

                var width = self.width - self.margin.left - self.margin.right,
                    height = self.height - self.margin.top - self.margin.bottom;

                self.x = self.isTimeDomain ? d3.time.scale().range([0, width]) : d3.scale.linear().range([0, width]), self.y = d3.scale.linear().range([height, 0]);

                self.updateDomain(self.dataTarget);

                self.lineGen = d3.svg.line().x(function (d) {
                    return self.x(d.valueX);
                }).y(function (d) {
                    return self.y(d.valueY);
                }).interpolate(self.options.interpolate);

                self.areaGen = d3.svg.area().x(function (d) {
                    return self.x(d.valueX);
                }).y0(function (d) {
                    return self.y(d.valueY);
                }).y1(height).interpolate(self.options.interpolate);

                if (_C14.default.isFunction(callback)) {
                    callback.call(self, self.dataTarget);
                }
            });
        }
    }, {
        key: 'updateOverlay',
        value: function updateOverlay() {
            var self = this;

            var width = self.width - self.margin.left - self.margin.right,
                height = self.height - self.margin.top - self.margin.bottom;

            //** Create a invisible rect for mouse tracking
            var paddingX = (self.x.domain()[1] - self.x.domain()[0]) * 0.01,
                paddingY = (self.y.domain()[1] - self.y.domain()[0]) * 0.05;

            self.body.append('rect').attr('class', 'c9-chart-line c9-rect-overlay')
            // .attr('width', self.actualWidth)
            // .attr('height', self.actualHeight)
            .attr('width', width - self.x(paddingX)).attr('height', height).attr('x', self.x(paddingX) / 2).style('fill', 'none').style('pointer-events', 'all');
        }
    }, {
        key: 'updateHoverLine',
        value: function updateHoverLine() {
            var self = this;

            //** Add the line to the group
            self.hoverLine = self.body.append('g').attr('class', 'c9-chart-line c9-comparator-line').append('line').style('stroke', 'grey').style('stroke-opacity', 0);

            self.hoverCircle = self.hoverLine.append('circle').attr('class', 'c9-chart-line c9-comparator-line').attr('r', self.options.point.radius);
        }

        /**
         * Update LineChart Domain
         * @param  {[type]} data [description]
         */

    }, {
        key: 'updateDomain',
        value: function updateDomain(data) {
            var self = this;

            var valueXArray = d3.merge(data.map(function (_data) {
                return _data.value.map(function (d) {
                    return d.valueX;
                });
            }));

            var valueYArray = d3.merge(data.map(function (_data) {
                return _data.value.map(function (d) {
                    return d.valueY;
                });
            }));

            self.x.domain(d3.extent(valueXArray));

            self.y.domain(d3.extent(valueYArray));

            // Update domain if all values positive / negative
            if (self.y.domain()[0] > 0 && self.y.domain()[1] > 0) {
                self.y.domain([0, self.y.domain()[1]]);
            } else if (self.y.domain()[0] < 0 && self.y.domain()[1] < 0) {
                self.y.domain([self.y.domain()[0], 0]);
            }

            // Check if its is timeDomain then skip
            if (!self.isTimeDomain) {
                var xDomain = self.x.domain(),
                    paddingX = (self.x.domain()[1] - self.x.domain()[0]) * 0.01;
                var yDomain = self.y.domain(),
                    paddingY = (self.y.domain()[1] - self.y.domain()[0]) * 0.05;

                self.x.domain([xDomain[0] - paddingX, xDomain[1] + paddingX]);
                self.y.domain([yDomain[0], yDomain[1] + paddingY]);
            }
            // else {
            //     var xDomain = self.x.domain(), paddingX = (self.x.domain()[1] - self.x.domain()[0]);
            //     var yDomain = self.y.domain(), paddingY = (self.y.domain()[1] - self.y.domain()[0]);
            //         console.log(xDomain[0]);
            //     self.x.domain([xDomain[0] - new Date(paddingX), xDomain[1] + new Date(paddingX)]);
            //     self.y.domain([yDomain[0], yDomain[1] + paddingY]);
            // }
        }

        /**
         * Update main path of Line Chart when brushing
         */

    }, {
        key: 'update',
        value: function update(data) {
            var self = this;

            var width = self.width - self.margin.left - self.margin.right,
                height = self.height - self.margin.top - self.margin.bottom;

            self.updateDomain(data);

            self.body.selectAll(".c9-chart-line.c9-area-container").data([]).exit().remove();
            self.body.selectAll(".c9-chart-line.c9-path-container").data([]).exit().remove();
            self.body.selectAll(".c9-chart-line.c9-point-container").data([]).exit().remove();

            if (self.options.area.show) {
                var areaContainer = self.body.append('g').attr('class', 'c9-chart-line c9-area-container').attr("clip-path", "url(#clip)");

                areaContainer.selectAll(".c9-chart-line.c9-path-area-custom")
                // self.body.selectAll("dot")
                .data(data).enter().append('path').filter(function (d) {
                    return d.enable;
                })
                // .attr("clip-path", "url(#clip)")
                .attr('class', 'c9-chart-line c9-path-area-custom').attr('d', function (d) {
                    return self.areaGen(d.value);
                }).attr('data-ref', function (d) {
                    return 'c9-' + d['data-ref'];
                }).style('fill', function (d) {
                    return d.color;
                }).style('stroke', 'none').style('opacity', '0.5');
            }

            var pathContainer = self.body.append('g').attr('class', 'c9-chart-line c9-path-container').attr("clip-path", "url(#clip)");

            pathContainer.selectAll(".c9-chart-line.c9-path-line-custom")
            // self.body.selectAll("dot")
            .data(data).enter().append('path').filter(function (d) {
                return d.enable;
            }).attr('class', 'c9-chart-line c9-path-line-custom').attr('d', function (d) {
                return self.lineGen(d.value);
            }).attr('data-ref', function (d) {
                return 'c9-' + d['data-ref'];
            }).style('stroke', function (d) {
                return d.color;
            }).style('stroke-dasharray', function () {
                return self.getLineStyle();
            }).style('stroke-width', self.options.line.width).style('fill', 'none');

            if (self.options.point.show) {
                var pointContainer = self.body.append('g').attr('class', 'c9-chart-line c9-point-container').attr("clip-path", "url(#clip)");

                data.forEach(function (d) {
                    if (!d.enable) return;
                    pointContainer.selectAll(".c9-chart-line.c9-point-container")
                    // self.body.selectAll("dot")
                    .data(d.value).enter().append("circle")
                    // .attr("clip-path", "url(#clip)")
                    .attr('class', 'c9-chart-line c9-circle-custom').attr("r", self.options.point.radius).attr("cx", function (_d) {
                        return self.x(_d.valueX);
                    }).attr("cy", function (_d) {
                        return self.y(_d.valueY);
                    }).attr("data-ref", function (data) {
                        return data["data-ref"];
                    }).style("fill", self.options.point.fill).style("stroke", self.options.point.stroke).style("stroke-width", self.options.point['stroke-width']).style("opacity", self.options.point.opacity);
                });
            }

            /*----------  Set actual size for chart after initialization  ----------*/
            var chartBox = self.body.node().getBBox();
            self.actualWidth = chartBox.width - 4 * self.options.point.radius;
            self.actualHeight = chartBox.height;
            /*----------  End of Set actual size for chart after initialization  ----------*/

            self.updateInteraction();
        }

        /**
         * Update sub chart
         */

    }, {
        key: 'updateSubChart',
        value: function updateSubChart(data) {
            var self = this;

            if (self.options.subchart.show) {
                var width = self.width - self.margin.left - self.margin.right,
                    height = self.height - self.margin.top - self.margin.bottom;

                /*----------  Sub Chart  ----------*/
                self.subChartWidth = width, self.subChartHeight = self.options.subchart.height;
                if (_C14.default.isEmpty(self.subChartMargin)) {
                    self.subChartMargin = {
                        'top': self.actualHeight + 100,
                        'left': self.margin.left
                    };
                }

                self.subChartX = self._isTimeDomain ? d3.time.scale().range([0, self.subChartWidth]) : d3.scale.linear().range([0, self.subChartWidth]), self.subChartY = d3.scale.linear().range([self.subChartHeight, 0]);

                self.subChartX.domain(self.x.domain());
                self.subChartY.domain(self.y.domain());

                self.subChartXAxis = d3.svg.axis().scale(self.subChartX).orient("bottom");

                self.brush = d3.svg.brush().x(self.subChartX).on("brush", function () {
                    // Update axis
                    self.x.domain(self.brush.empty() ? self.subChartX.domain() : self.brush.extent());
                    self.axis.update(self.x, self.y, 500);

                    // Update main path of Line Chart
                    if (self.options.area.show) {
                        self.body.selectAll("path.c9-chart-line.c9-path-area-custom").attr("d", function (d) {
                            return self.areaGen(d.value);
                        });
                    }
                    self.body.selectAll("path.c9-chart-line.c9-path-line-custom").attr("d", function (d) {
                        return self.lineGen(d.value);
                    });

                    if (self.options.point.show) {
                        self.body.selectAll("circle.c9-chart-line.c9-circle-custom").attr("cx", function (d) {
                            return self.x(d.valueX);
                        }).attr("cy", function (d) {
                            return self.y(d.valueY);
                        });
                    }
                });

                self.subChartAreaGen = d3.svg.area().x(function (d) {
                    return self.subChartX(d.valueX);
                }).y0(function (d) {
                    return self.subChartY(d.valueY);
                }).y1(self.subChartHeight).interpolate(self.options.interpolate);

                self.svg.attr('height', self.height + self.subChartHeight);

                self.svg.selectAll(".c9-subchart-custom").remove();
                self.svg.selectAll(".c9-subchart-custom .c9-subchart-axis").remove();

                var subChart = self.svg.append("g").attr("class", "c9-subchart-custom").attr("transform", "translate(" + self.subChartMargin.left + "," + self.subChartMargin.top + ")");

                var subChartAreaContainer = subChart.append('g').attr('class', 'c9-subchart-custom c9-subchart-area-container').attr("clip-path", "url(#clip)");

                data.forEach(function (d, i) {
                    if (!d.enable) return;

                    subChartAreaContainer.append("path")
                    // .attr("clip-path", "url(#clip)")
                    .attr("class", "c9-subchart-area").attr("d", function () {
                        return self.subChartAreaGen(d.value);
                    }).attr('data-ref', 'c9-' + d['data-ref']).style('fill', d.color).style('stroke', 'none').style('opacity', '0.5');
                });

                subChart.append("g").attr("class", "c9-subchart-axis").attr("transform", "translate(0," + self.subChartHeight + ")").call(self.subChartXAxis);

                //append the brush for the selection of subsection  
                subChart.append("g").attr("class", "c9-subchart-brush").call(self.brush).selectAll("rect").attr("height", self.subChartHeight);
            }
        }

        /**
         * Select all circle as type CIRCLE in Line Chart via its CLASS
         */

    }, {
        key: 'selectAllCircle',
        value: function selectAllCircle() {
            var self = this;

            return self.body.selectAll('circle.c9-chart-line.c9-circle-custom');
        }

        /**
         * Select all rect as type RECT in Line Chart via its CLASS
         */

    }, {
        key: 'selectRectLayer',
        value: function selectRectLayer() {
            var self = this;

            return d3.selectAll('svg rect.c9-chart-line.c9-rect-overlay');
        }

        /**
         * Update Interaction: Hover
         */

    }, {
        key: 'updateInteraction',
        value: function updateInteraction() {
            var self = this,
                selector = self.selectRectLayer(),
                hoverEnable = self.hover.enable,
                hoverOptions = self.hover.options,
                onMouseOverCallback = hoverOptions.onMouseOver.callback,
                onMouseOutCallback = hoverOptions.onMouseOut.callback,
                onMouseMoveCallback = hoverOptions.onMouseMove.callback,
                onClickCallback = self.click.callback;

            var tooltip = new _C12.default(self.options.tooltip);

            // Update Event Factory
            self.eventFactory = {
                // 'click': function(d) {
                //     if (Helper.isFunction(onClickCallback)) {
                //         onClickCallback.call(this, d);
                //     }
                // },
                // 'mouseover': function(d) {
                //     if (!hoverEnable) return;

                //     if (Helper.isFunction(onMouseOverCallback)) {
                //         onMouseOverCallback.call(this, d);
                //     }

                //     // tooltip.draw(d, self, 'mouseover');
                // },
                'mouseout': function mouseout(d) {
                    if (!hoverEnable) return;

                    // if (Helper.isFunction(onMouseOutCallback)) {
                    //     onMouseOutCallback.call(this, d);
                    // }

                    self.hoverLine.style('stroke-opacity', 0);

                    // Remove circle style before
                    self.selectAllCircle()[0].forEach(function (circle) {
                        d3.select(circle).style('fill', self.options.point.fill).style('fill-opacity', self.options.point.opacity);
                    });

                    tooltip.draw(d, self, 'mouseout');
                },
                'mousemove': function mousemove(d) {
                    if (!hoverEnable) return;

                    var mouse = d3.mouse(this),
                        mouseX = mouse[0],
                        mouseY = mouse[1],
                        curValueX = self.x.invert(mouseX);

                    var sameTimeArr = [],
                        sameTimeValueArr = [];

                    self.dataTarget.forEach(function (d, i) {
                        sameTimeArr[i] = d.value;
                        sameTimeArr[i].sort(function (a, b) {
                            return a.valueX - b.valueX;
                        });
                        var idx = self._isTimeDomain ? self.bisectDate(sameTimeArr[i], new Date(curValueX)) : self.bisectDate(sameTimeArr[i], curValueX);

                        var d0, d1;

                        d0 = idx === 0 ? sameTimeArr[i][idx] : sameTimeArr[i][idx - 1];
                        d1 = !_C14.default.isEmpty(sameTimeArr[i][idx]) ? sameTimeArr[i][idx] : sameTimeArr[i][idx - 1];

                        // Check d0, d1 still in boundary or not
                        // To work well with brushing
                        d0 = self.checkBoundary(d0.valueX) === -1 ? d1 : d0;
                        d1 = self.checkBoundary(d1.valueX) === 1 ? d0 : d1;

                        // work out which date value is closest to the mouse
                        sameTimeValueArr[i] = curValueX - d0.valueX > d1.valueX - curValueX ? d1 : d0;
                    });

                    if (_C14.default.isFunction(onMouseMoveCallback)) {
                        onMouseMoveCallback.call(this, sameTimeValueArr);
                    }

                    var x = self.x(!_C14.default.isEmpty(sameTimeValueArr[0].valueX) ? sameTimeValueArr[0].valueX : sameTimeValueArr[1].valueX);
                    var y = self.y(!_C14.default.isEmpty(sameTimeValueArr[0].valueY) ? sameTimeValueArr[0].valueY : sameTimeValueArr[1].valueY);

                    // console.log(x);

                    // Remove circle style before
                    self.selectAllCircle()[0].forEach(function (circle) {
                        d3.select(circle).style('fill', self.options.point.fill).style('fill-opacity', self.options.point.opacity);
                    });

                    // Update circle style after mouse move
                    for (var i = 0; i < sameTimeValueArr.length; i++) {
                        var circle = d3.select("circle[data-ref='" + sameTimeValueArr[i]['data-ref'] + "']");
                        circle.style('fill', self.getLightenColor(self.options.point.fill)).style('fill-opacity', 1);
                    }

                    // focus.select('#focusCircle')
                    //     .attr('cx', x)
                    //     .attr('cy', y);
                    self.hoverLine.attr('x1', x).attr('y1', self.y(self.y.domain()[0])).attr('x2', x).attr('y2', self.y(self.y.domain()[1])).style('stroke-opacity', 1);
                    // self.hoverLine
                    //     .attr('x1', self.x(self.x.domain()[0])).attr('y1', y)
                    //     .attr('x2', self.x(self.x.domain()[1])).attr('y2', y)
                    //     .attr('stroke-opacity', 1);

                    //** Display Hover line
                    // self.hoverLine
                    //     .attr('x1', self.x(sameTimeValueArr[0].valueX))
                    //     .attr('x2', self.x(sameTimeValueArr[0].valueX))
                    //     .attr('stroke-opacity', 1);

                    tooltip.draw(sameTimeValueArr, self, 'mousemove');
                }
            };

            selector.on(self.eventFactory);
        }
    }, {
        key: 'getLineStyle',
        value: function getLineStyle() {
            var self = this;

            var r = void 0;

            switch (self.options.line.style) {
                case 'dot':
                    r = "1, 1";
                    break;
                case 'solid':
                    r = 'none';
                    break;
                case 'dash':
                    r = "3, 3";
                    break;
                default:
                    r = 'none';
                    break;
            }

            return r;
        }
    }, {
        key: 'checkBoundary',
        value: function checkBoundary(value) {
            var self = this;

            var bound = self.width - self.margin.left - self.margin.right,
                checkWidth = self.x(value);

            return checkWidth < 0 ? -1 : checkWidth > bound ? 1 : 0;
        }

        /*=====  End of Main Functions  ======*/

        /*========================================
        =            User's Functions            =
        ========================================*/
        /**
         * Custom Event Listener
         * @param  {[type]}   eventType [description]
         * @param  {Function} callback  [description]
         */

    }, {
        key: 'on',
        value: function on(eventType, callback) {
            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'on', this).call(this, eventType, callback);

            var self = this;
            var selector = self.selectRectLayer();

            // Update Event Factory
            var eventFactory = {
                'mousemove.event': function mousemoveEvent(d) {

                    var mouse = d3.mouse(this),
                        mouseX = mouse[0],
                        mouseY = mouse[1],
                        curValueX = self.x.invert(mouseX);

                    var sameTimeArr = [],
                        sameTimeValueArr = [];

                    self.dataTarget.forEach(function (d, i) {
                        sameTimeArr[i] = d.value;
                        sameTimeArr[i].sort(function (a, b) {
                            return a.valueX - b.valueX;
                        });
                        var idx = self._isTimeDomain ? self.bisectDate(sameTimeArr[i], new Date(curValueX)) : self.bisectDate(sameTimeArr[i], curValueX);

                        var d0, d1;

                        d0 = idx === 0 ? sameTimeArr[i][idx] : sameTimeArr[i][idx - 1];
                        d1 = sameTimeArr[i][idx];

                        // work out which date value is closest to the mouse
                        sameTimeValueArr[i] = curValueX - d0.valueX > d1.valueX - curValueX ? d1 : d0;
                    });

                    if (_C14.default.isFunction(callback)) {
                        callback.call(this, sameTimeValueArr);
                    }
                }
            };

            var eventName = eventType + '.event';

            selector.on(eventName, eventFactory[eventName]);
        }

        /**
         * Main draw function of Line Chart
         */

    }, {
        key: 'draw',
        value: function draw() {
            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'draw', this).call(this);

            var self = this;

            self.updateConfig(self.config, function (data) {
                var axis = new _C4.default(self.options.axis, self, self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom);
                var title = new _C6.default(self.options.title, self);
                var legend = new _C8.default(self.options.legend, self);
                var table = new _C10.default(self.options.table, self, data);

                self.axis = axis;
                self.title = title;
                self.legend = legend;
                self.table = table;

                // Draw title
                self.title.draw();

                // Draw axis
                self.axis.draw();

                self.update(data);
                self.updateSubChart(data);
                self.updateOverlay();
                self.updateHoverLine();
                self.updateInteraction();

                // Draw legend
                self.legend.draw();
                self.legend.updateInteractionForLineChart(self);

                // Draw table
                self.table.draw();
            });
        }

        /**
         * Set option via stand-alone function
         * @param {[type]} key   [description]
         * @param {[type]} value [description]
         */

    }, {
        key: 'setOption',
        value: function setOption(key, value) {
            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'setOption', this).call(this, key, value);

            var self = this;

            _C14.default.set(key, value, self.options);

            self.updateConfig(self.options);
        }

        /**
         * Update chart based on new data with optional dataConfig
         * @param  {[type]} data       [description]
         * @param  {[type]} dataConfig [description]
         */

    }, {
        key: 'updateData',
        value: function updateData(newData, newDataConfig) {
            var self = this;

            var newCfg = {};

            if (!_C14.default.isEmpty(newDataConfig)) {

                newCfg.data = {
                    plain: newData,
                    keys: newDataConfig
                };
            } else {

                newCfg.data = {
                    plain: newData
                };
            }

            self.updateDataConfig(newCfg, function (data) {
                // Update Chart
                self.update(data);
                self.updateSubChart(data);

                // Update Axis
                self.axis.update(self.x, self.y, 100);

                // Update Legend
                self.legend.update(data);
                self.legend.updateInteractionForLineChart(self);

                // Update Table
                self.table.update(data);
            });
        }
        /*=====  End of User's Functions  ======*/

    }, {
        key: 'isTimeDomain',
        get: function get() {
            return this._isTimeDomain;
        },

        /*=====  End of Getter  ======*/

        /*==============================
        =            Setter            =
        ==============================*/
        set: function set(arg) {
            if (arg) {
                this._isTimeDomain = arg;
            }
        }
    }, {
        key: 'bisectDate',
        get: function get() {
            return this._bisectDate;
        },
        set: function set(arg) {
            if (arg) {
                this._bisectDate = arg;
            }
        }
    }, {
        key: 'hoverLine',
        get: function get() {
            return this._hoverLine;
        },
        set: function set(arg) {
            if (arg) {
                this._hoverLine = arg;
            }
        }
    }, {
        key: 'subChartX',
        get: function get() {
            return this._subChartX;
        },
        set: function set(arg) {
            if (arg) {
                this._subChartX = arg;
            }
        }
    }, {
        key: 'subChartY',
        get: function get() {
            return this._subChartY;
        },
        set: function set(arg) {
            if (arg) {
                this._subChartY = arg;
            }
        }
    }, {
        key: 'subChartWidth',
        get: function get() {
            return this._subChartWidth;
        },
        set: function set(arg) {
            if (arg) {
                this._subChartWidth = arg;
            }
        }
    }, {
        key: 'subChartHeight',
        get: function get() {
            return this._subChartHeight;
        },
        set: function set(arg) {
            if (arg) {
                this._subChartHeight = arg;
            }
        }
    }, {
        key: 'subChartMargin',
        get: function get() {
            return this._subChartMargin;
        },
        set: function set(arg) {
            if (arg) {
                this._subChartMargin = arg;
            }
        }
    }, {
        key: 'subChartXAxis',
        get: function get() {
            return this._subChartXAxis;
        },
        set: function set(arg) {
            if (arg) {
                this._subChartXAxis = arg;
            }
        }
    }, {
        key: 'brush',
        get: function get() {
            return this._brush;
        },
        set: function set(arg) {
            if (arg) {
                this._brush = arg;
            }
        }
    }, {
        key: 'subChartAreaGen',
        get: function get() {
            return this._subChartAreaGen;
        },
        set: function set(arg) {
            if (arg) {
                this._subChartAreaGen = arg;
            }
        }
    }, {
        key: 'lineGen',
        get: function get() {
            return this._lineGen;
        },
        set: function set(arg) {
            if (arg) {
                this._lineGen = arg;
            }
        }
    }, {
        key: 'areaGen',
        get: function get() {
            return this._areaGen;
        },
        set: function set(arg) {
            if (arg) {
                this._areaGen = arg;
            }
        }
    }]);

    return LineChart;
}(_C2.default);

exports.default = LineChart;