import Chart from './C9.Chart';
import Axis from './utils/C9.Axis';
import Title from './utils/C9.Title';
import Legend from './utils/C9.Legend';
import DataAdapter from '../helper/C9.DataAdapter';

export default class DonutChart extends Chart {
    constructor(options) {
        super(options);
        var self = this;
        var R = Math.min(self.width - self.margin.left - self.margin.right, self.height - self.margin.top - self.margin.bottom) / 2;
        var config = {
            outerRadius: R,
            innerRadius: R > 80 ? R - 80 : R - 40,
            showText: true // show/hide text on middle or each donut
        };

        self._outerRadius   = options.outerRadius || config.outerRadius;
        self._innerRadius   = options.innerRadius || config.innerRadius;
        self._showText      = options.showText || config.showText;
        self.body.type      = 'donut';

        var dataOption          = self.dataOption;
        dataOption.colorRange   = self.colorRange;

        var da = new DataAdapter(dataOption);
        self.dataTarget     = da.getDataTarget("donut");

        self.updateConfig();
    }

    /*==============================
    =            Getter            =
    ==============================*/
    get outerRadius() {
        return this._outerRadius;
    }

    get innerRadius() {
        return this._innerRadius;
    }

    get showText() {
        return this._showText;
    }

    get eventFactory() {
        return this._eventFactory;
    }

    get pathAnim() {
        return this._pathAnim;
    }

    get tooltip() {
        return this._tooltip;
    }

    get pie() {
        return this._pie;
    }

    get arc() {
        return this._arc;
    }

    get currentData() {
        return this._currentData;
    }

    get chartType() {
        return this._body.type;
    }
    /*=====  End of Getter  ======*/

    /*==============================
    =            Setter            =
    ==============================*/
    set outerRadius(newOuterRadius) {
        if (newOuterRadius) {
            this._outerRadius = newOuterRadius;
        }
    }

    set innerRadius(newInnerRadius) {
        if (newInnerRadius) {
            this._innerRadius = newInnerRadius;
        }
    }

    set showText(newShowText) {
        if (newShowText) {
            this._showText = newShowText;
        }
    }

    set eventFactory(newEventFactory) {
        if (newEventFactory) {
            this._eventFactory = newEventFactory;
        }
    }

    set pathAnim(newPathAnim) {
        if (newPathAnim) {
            this._pathAnim = newPathAnim;
        }
    }

    set tooltip(newTooltip) {
        if (newTooltip) {
            this._tooltip = newTooltip;
        }
    }

    set pie(newPie) {
        if (newPie) {
            this._pie = newPie;
        }
    }

    set arc(newArc) {
        if (newArc) {
            this._arc = newArc;
        }
    }

    set currentData(newCurrentData) {
        if (newCurrentData) {
            this._currentData = newCurrentData;
        }
    }
    /*=====  End of Setter  ======*/
    
    /*======================================
    =            Main Functions            =
    ======================================*/
    /**
     * Update Donut Chart Config
     */
    updateConfig() {
        var self = this;

        // chartInnerAfter, chartOuterAfter define easing radius of donut chart during animation
        // TODO: Add configs allow users to define these radius
        var width   = self.width - self.margin.left - self.margin.right,
            height  = self.height - self.margin.top - self.margin.bottom,
            color   = self.colorRange,
            chartInnerBefore = self.innerRadius,
            chartOuterBefore = self.outerRadius,
            chartInnerAfter = self.innerRadius,
            chartOuterAfter = self.outerRadius * 1.2;

        var hoverOptions        = self.hover.options,
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback;

        // Define Animations for paths
        self.pathAnim = function(path, dir) {
            switch(dir) {
                
                case 'mouseover':
                    path.transition()
                        .attr('d', d3.svg.arc()
                            .innerRadius(chartInnerAfter)
                            .outerRadius(chartOuterAfter)
                        )
                        // .style('stroke', '#000')
                        .attr('fill-opacity', '1.0');
                    break;

                case 'mouseout':
                    path.transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3.svg.arc()
                            .innerRadius(chartInnerBefore)
                            .outerRadius(chartOuterBefore)
                        )
                        // .style('stroke', '#000')
                        .attr('fill-opacity', '0.5');
                    break;
                
            }
        
        };

        // Main Event Dispatch for paths in donut chart
        self.eventFactory = {

            'mouseover': function(d, i, j) {
                self.pathAnim(d3.select(this), 'mouseover');
                self.tooltip().mouseover(d);

                // var thisDonut = self.body..select('.type' + j);
                // thisDonut.select('.value').text(function(donut_d) {
                //     return d.data.val.toFixed(1) + donut_d.unit;
                // });
                // thisDonut.select('.percentage').text(function(donut_d) {
                //     return (d.data.val/donut_d.total*100).toFixed(2) + '%';
                // });
            },
            
            'mouseout': function(d, i, j) {
                self.pathAnim(d3.select(this), 'mouseout');
                self.tooltip().mouseout(d);

                // var thisDonut = charts.select('.type' + j);
                // setCenterText(thisDonut);
            }

        };

        // Define the tooltip
        // TODO: Define it as a individual CLASS, in C9.Tooltip
        self.tooltip = function() {
            // First, remove all before hover div
            self.body.selectAll('g.c9-custom-tooltip-container').remove();

            // TODO: Add margin to tooltip configs
            // Default: (100, 100) relative to mouse coordinate and chart margin transformation
            var divOnHover = self.body.append('g')
                                .attr('class', 'c9-custom-tooltip-container')
                                .attr("transform", function() { return 'translate(' + (d3.mouse(this)[0] - 100) +","+ (d3.mouse(this)[1]- 100) + ')'; })
                                .style('display', 'none')

            var arc = d3.svg.arc()
                    .outerRadius(self.outerRadius)
                    .innerRadius(self.innerRadius);

            // Rect Container
            divOnHover
                .append('rect')
                    .attr('class', 'c9-custom-tooltip-box')
                    .attr('x', 25)
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .style('position', 'absolute')
                    .style('width', '100px')
                    .style('height', '50px')
                    .attr('fill', '#FEE5E2')
                    .attr('stroke', '#FDCCC6')
                    .attr('stroke-width', 2);
            // First line
            var text_1 = divOnHover
                            .append('text')
                                .attr('class', 'c9-custom-tooltip-label')
                                .attr('x', 30)
                                .attr('y', 10)
                                .style('font-family', 'sans-serif')
                                .style('font-size', '10px');
            // Second line
            var text_2 = divOnHover
                            .append('text')
                                .attr('class', 'c9-custom-tooltip-label')
                                .attr('x', 30)
                                .attr('y', 20)
                                .style('font-family', 'sans-serif')
                                .style('font-size', '10px');

            var tooltipEventFactory = {

                'mouseover': function(d) {
                    divOnHover.transition()
                        .duration(hoverOptions.onMouseOver.fadeIn)
                        .style("display", 'block');
                        
                   let name = d.data.name || d.data.data.name,
                       value = d.data.value || d.data.data.value;

                    text_1.text('Name: ' + name);
                    text_2.text('Value: ' + value);
                },

                'mouseout': function(d) {
                    divOnHover.transition()
                        .duration(hoverOptions.onMouseOut.fadeOut)      
                        .style('display', 'none');

                }

            };

            return tooltipEventFactory;

        };

        self.arc = d3.svg.arc()
                    .outerRadius(self.outerRadius)
                    .innerRadius(self.innerRadius);

        //we can sort data here
        self.pie = d3.layout.pie()
                    .sort(null)
                    .value(function(d) { return d.value; });

        //draw chart
        var arcs = self.body
                    .append('g')
                        .attr('class', 'c9-chart c9-custom-arc-container')
                        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                        .selectAll('.c9-chart-donut.c9-custom-arc')
                        .data(self.pie(self.dataTarget)).enter()
                        .append('g')
                            .attr('class', 'c9-chart-donut c9-custom-arc');

        // Append main path contains donut
        // TODO: add a unique class to allow Legend could find selected donut/pie
        arcs.append('path')
                .attr('class', 'c9-chart-donut c9-custom-path')
                .attr('data-ref', function(d) { return d.data['data-ref']; })
                .attr('d', self.arc)
                .attr('fill', function(d, i) { return color(i); })
                .attr('stroke', '#ffffff')
                .attr('fill-opacity', '0.5')
                .each(function(d) { self._currentData = d; }); 
                // Current data used for calculate interpolation 
                // between current arc vs disabled arc


        // Append middle text display name
        // if (self.showText) {
        //     arcs.append('text')
        //             .attr('class', 'c9-chart-donut c9-custom-text')
        //             .attr('transform', function(d) { return 'translate(' + self.arc.centroid(d) + ')'; })
        //             .attr('dy', '.35em')
        //             .attr('text-anchor', 'middle')
        //             .text(function(d) { return d.data.name; });
        // }
    }

    /**
     * Main draw function of Donut Chart
     */
    draw() {

        var self = this;
        
        var title   = new Title(self.options, self.body, self.width, self.height, self.margin);
        var legend  = new Legend(self.options, self.body, self.dataTarget);

        // Draw legend
        legend.draw();
        legend.updateInteractionForDonutPieChart(self, self.selectAllPath(), self.pie, self.currentData, self.arc);

        // Update interaction of this own chart
        self.updateInteraction();

    }

    /**
     * Select all path as type PATH in Donut Chart via its CLASS
     */
    selectAllPath() {
        var self = this;

        return self.body
                // .selectAll('g')
                    .selectAll('path.c9-chart-donut.c9-custom-path');
    }

    /**
     * Update Interaction: Hover
     * @return {} 
     */
    updateInteraction() {
        var self = this,
            hoverEnable     = self.hover.enable,
            hoverOptions    = self.hover.options,
            selector        = self.selectAllPath(),
            onMouseOverCallback = hoverOptions.onMouseOver.callback,
            onMouseOutCallback  = hoverOptions.onMouseOut.callback;

        if (hoverEnable) {
            selector.on(self._eventFactory);
        }
    }
    
    /*=====  End of Main Functions  ======*/
    
    
}
