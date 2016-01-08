/*!
 * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
 * Copyright (c) 2015, Curtis Bratton
 * All rights reserved.
 *
 * Liquid Fill Gauge v1.1
 */
'use strict';
let d3 = require('d3');
let liquidFillGaugeDefaultSettings = function liquidFillGaugeDefaultSettings() {
  return {
    minValue: 0, // The gauge minimum value.
    maxValue: 100, // The gauge maximum value.
    threshold: 0.8, // Threshold when changing color
    circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
    circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
    circleColor: '#178BCA', // The color of the outer circle.
    circleThresholdColor: 'red', // The color of the outer circle when value above thresh hold.
    waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
    waveCount: 1, // The number of full waves per width of the wave circle.
    waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
    waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
    waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
    waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
    waveAnimate: true, // Controls if the wave scrolls or is static.
    waveColor: '#178BCA', // The color of the fill wave.
    waveThresholdColor: 'red', //The color of the fill wave when above threshold
    waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
    textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
    textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
    valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
    displayPercent: false, // If true, a % symbol is displayed after the value.
    textColor: '#045681', // The color of the value text when the wave does not overlap it.
    waveTextColor: '#A4DBf8' // The color of the value text when the wave overlaps it.
  };
};

let loadLiquidFillGauge = function loadLiquidFillGauge(payload) {
  if (!payload.hasOwnProperty('percentValue')) {
    payload.percentValue = 0;
  } else {
    if (payload.percentValue === 'undefined') {
      payload.percentValue = 0;
    }
  }
  if (!payload.hasOwnProperty('displayValue')) {
    payload.displayValue = payload.percentValue;
  } else {
    if (payload.displayValue === 'undefined') {
      payload.displayValue = payload.percentValue;
    }
  }
  if (!payload.hasOwnProperty('config')) {
    payload.config = liquidFillGaugeDefaultSettings();
  } else {
    if (payload.config === 'undefined') {
      payload.config = liquidFillGaugeDefaultSettings();
    }
  }

  let _elementId = payload.elementId;
  let _displayValue = payload.displayValue;
  let _percentValue = payload.percentValue;
  let _config = payload.config;
  var _gauge = d3.select('#' + _elementId);
  let _radius;
  let _locationX;
  let _locationY;
  let _fillPercent;
  var _waveHeightScale;
  var _textPixels;
  var _textFinalValue;
  var _textStartValue;
  var _percentText;
  var _circleThickness;
  var _circleFillGap;
  var _fillCircleMargin;
  var _fillCircleRadius;
  var _waveHeight;
  var _waveLength;
  var _waveClipCount;
  var _waveClipWidth;

  let setup = function () {
    _radius = Math.min(parseInt(_gauge.style('width')), parseInt(_gauge.style('height'))) / 2;
    _locationX = parseInt(_gauge.style('width')) / 2 - _radius;
    _locationY = parseInt(_gauge.style('height')) / 2 - _radius;
    _fillPercent = Math.max(_config.minValue, Math.min(_config.maxValue, _percentValue)) / _config.maxValue;
    _textPixels = (_config.textSize * _radius / 2);
    _textFinalValue = parseFloat(_displayValue).toFixed(2);
    _textStartValue = _config.valueCountUp ? _config.minValue : _textFinalValue;
    _percentText = _config.displayPercent ? '%' : '';
    _circleThickness = _config.circleThickness * _radius;
    _circleFillGap = _config.circleFillGap * _radius;
    _fillCircleMargin = _circleThickness + _circleFillGap;
    _fillCircleRadius = _radius - _fillCircleMargin;
    if (_config.waveHeightScaling) {
      _waveHeightScale = d3.scale.linear()
        .range([0, _config.waveHeight, 0])
        .domain([0, 50, 100]);
    } else {
      _waveHeightScale = d3.scale.linear()
        .range([_config.waveHeight, _config.waveHeight])
        .domain([0, 100]);
    }
    _waveHeight = _fillCircleRadius * _waveHeightScale(_fillPercent * 100);
    _waveLength = _fillCircleRadius * 2 / _config.waveCount;
    _waveClipCount = 1 + _config.waveCount;
    _waveClipWidth = _waveLength * _waveClipCount;
  };
  setup();

  // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
  var textRounder = function (value) {
    return Math.round(value);
  };
  if (parseFloat(_textFinalValue) !== parseFloat(textRounder(_textFinalValue))) {
    textRounder = function (value) {
      return parseFloat(value).toFixed(1);
    };
  }
  if (parseFloat(_textFinalValue) !== parseFloat(textRounder(_textFinalValue))) {
    textRounder = function (value) {
      return parseFloat(value).toFixed(2);
    };
  }

  // Data for building the clip wave area.
  var data = [];
  for (var i = 0; i <= 40 * _waveClipCount; i++) {
    data.push({x: i / (40 * _waveClipCount), y: (i / (40))});
  }

  // Scales for drawing the outer circle.
  var gaugeCircleX = d3.scale.linear().range([0, 2 * Math.PI]).domain([0, 1]);
  var gaugeCircleY = d3.scale.linear().range([0, _radius]).domain([0, _radius]);

  // Scales for controlling the size of the clipping path.
  var _waveScaleX = d3.scale.linear().range([0, _waveClipWidth]).domain([0, 1]);
  var _waveScaleY = d3.scale.linear().range([0, _waveHeight]).domain([0, 1]);

  // Scales for controlling the position of the clipping path.
  var _waveRiseScale = d3.scale.linear()
    // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
    // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
    // circle at 100%.
    .range([(_fillCircleMargin + _fillCircleRadius * 2 + _waveHeight), (_fillCircleMargin - _waveHeight)])
    .domain([0, 1]);
  var waveAnimateScale = d3.scale.linear()
    .range([0, _waveClipWidth - _fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
    .domain([0, 1]);

  // Scale for controlling the position of the text within the gauge.
  var textRiseScaleY = d3.scale.linear()
    .range([_fillCircleMargin + _fillCircleRadius * 2, (_fillCircleMargin + _textPixels * 0.7)])
    .domain([0, 1]);

  // Center the gauge within the parent SVG.
  var gaugeGroup = _gauge.append('g')
    .attr('transform', 'translate(' + _locationX + ',' + _locationY + ')');

  // Draw the outer circle.
  var gaugeCircleArc = d3.svg.arc()
    .startAngle(gaugeCircleX(0))
    .endAngle(gaugeCircleX(1))
    .outerRadius(gaugeCircleY(_radius))
    .innerRadius(gaugeCircleY(_radius - _circleThickness));
  if (_fillPercent < _config.threshold) {
    gaugeGroup.append('path')
      .attr('d', gaugeCircleArc)
      .style('fill', _config.circleColor)
      .attr('transform', 'translate(' + _radius + ',' + _radius + ')');
  }
  else {
    gaugeGroup.append('path')
      .attr('d', gaugeCircleArc)
      .style('fill', _config.circleThresholdColor)
      .attr('transform', 'translate(' + _radius + ',' + _radius + ')');
  }

  // Text where the wave does not overlap.
  var text1 = gaugeGroup.append('text')
    .text(textRounder(_textStartValue) + _percentText)
    .attr('class', 'liquidFillGaugeText')
    .attr('text-anchor', 'middle')
    .attr('font-size', _textPixels + 'px')
    .style('fill', _config.textColor)
    .attr('transform', 'translate(' + _radius + ',' + textRiseScaleY(_config.textVertPosition) + ')');

  // The clipping wave area.
  var clipArea = d3.svg.area()
    .x(function (d) {
      return _waveScaleX(d.x);
    })
    .y0(function (d) {
      return _waveScaleY(Math.sin(Math.PI * 2 * _config.waveOffset * -1 + Math.PI * 2 * (1 - _config.waveCount) + d.y * 2 * Math.PI));
    })
    .y1(function () {
      return (_fillCircleRadius * 2 + _waveHeight);
    });
  var waveGroup = gaugeGroup.append('defs')
    .append('clipPath')
    .attr('id', 'clipWave' + _elementId);
  var wave = waveGroup.append('path')
    .datum(data)
    .attr('d', clipArea)
    .attr('T', 0);

  // The inner circle with the clipping wave attached.
  var fillCircleGroup = gaugeGroup.append('g')
    .attr('clip-path', 'url(#clipWave' + _elementId + ')');
  if (_fillPercent < _config.threshold) {
    fillCircleGroup.append('circle')
      .attr('cx', _radius)
      .attr('cy', _radius)
      .attr('r', _fillCircleRadius)
      .style('fill', _config.waveColor);
  }
  else {
    fillCircleGroup.append('circle')
      .attr('cx', _radius)
      .attr('cy', _radius)
      .attr('r', _fillCircleRadius)
      .style('fill', _config.waveThresholdColor);
  }

  // Text where the wave does overlap.
  var text2 = fillCircleGroup.append('text')
    .text(textRounder(_textStartValue) + _percentText)
    .attr('class', 'liquidFillGaugeText')
    .attr('text-anchor', 'middle')
    .attr('font-size', _textPixels + 'px')
    .style('fill', _config.waveTextColor)
    .attr('transform', 'translate(' + _radius + ',' + textRiseScaleY(_config.textVertPosition) + ')');

  // Make the value count up.
  if (_config.valueCountUp) {
    var textTween = function () {
      var interp = d3.interpolate(this.textContent, _textFinalValue);
      return function (t) {
        this.textContent = textRounder(interp(t)) + _percentText;
      };
    };
    text1.transition()
      .duration(_config.waveRiseTime)
      .tween('text', textTween);
    text2.transition()
      .duration(_config.waveRiseTime)
      .tween('text', textTween);
  }

  // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
  var waveGroupXPosition = _fillCircleMargin + _fillCircleRadius * 2 - _waveClipWidth;
  if (_config.waveRise) {
    waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + _waveRiseScale(0) + ')')
      .transition()
      .duration(_config.waveRiseTime)
      .attr('transform', 'translate(' + waveGroupXPosition + ',' + _waveRiseScale(_fillPercent) + ')')
      .each('start', function () {
        wave.attr('transform', 'translate(1,0)');
      }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
  } else {
    waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + _waveRiseScale(_fillPercent) + ')');
  }

  if (_config.waveAnimate){
    animateWave();
  }
  function animateWave() {
    wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
    wave.transition()
      .duration(_config.waveAnimateTime * (1 - wave.attr('T')))
      .ease('linear')
      .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
      .attr('T', 1)
      .each('end', function () {
        wave.attr('T', 0);
        animateWave(_config.waveAnimateTime);
      });
  }

  function GaugeUpdater() {
    this.update = function (value) {
      var newFinalValue = parseFloat(value).toFixed(2);
      var textRounderUpdater = function (val) {
        return Math.round(val);
      };
      if (parseFloat(newFinalValue) !== parseFloat(textRounderUpdater(newFinalValue))) {
        textRounderUpdater = function (val) {
          return parseFloat(val).toFixed(1);
        };
      }
      if (parseFloat(newFinalValue) !== parseFloat(textRounderUpdater(newFinalValue))) {
        textRounderUpdater = function (val) {
          return parseFloat(val).toFixed(2);
        };
      }

      var textTweenUpdate = function (val) {
        var interp = d3.interpolate(this.textContent, parseFloat(val).toFixed(2));
        return function (t) {
          this.textContent = textRounderUpdater(interp(t)) + _percentText;
        };
      };

      text1.transition()
        .duration(_config.waveRiseTime)
        .tween('text', textTweenUpdate(value));
      text2.transition()
        .duration(_config.waveRiseTime)
        .tween('text', textTweenUpdate(value));

      var fillPercent = Math.max(_config.minValue, Math.min(_config.maxValue, value)) / _config.maxValue;
      var waveHeight = _fillCircleRadius * _waveHeightScale(fillPercent * 100);
      var waveRiseScale = d3.scale.linear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([(_fillCircleMargin + _fillCircleRadius * 2 + waveHeight), (_fillCircleMargin - waveHeight)])
        .domain([0, 1]);
      var newHeight = waveRiseScale(fillPercent);
      var waveScaleX = d3.scale.linear().range([0, _waveClipWidth]).domain([0, 1]);
      var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);
      var newClipArea;
      if (_config.waveHeightScaling) {
        newClipArea = d3.svg.area()
          .x(function (d) {
            return waveScaleX(d.x);
          })
          .y0(function (d) {
            return waveScaleY(Math.sin(Math.PI * 2 * _config.waveOffset * -1 + Math.PI * 2 * (1 - _config.waveCount) + d.y * 2 * Math.PI));
          })
          .y1(function () {
            return (_fillCircleRadius * 2 + waveHeight);
          });
      } else {
        newClipArea = clipArea;
      }

      var newWavePosition = _config.waveAnimate ? waveAnimateScale(1) : 0;
      wave.transition()
        .duration(0)
        .transition()
        .duration(_config.waveAnimate ? (_config.waveAnimateTime * (1 - wave.attr('T'))) : (_config.waveRiseTime))
        .ease('linear')
        .attr('d', newClipArea)
        .attr('transform', 'translate(' + newWavePosition + ',0)')
        .attr('T', '1')
        .each('end', function () {
          if (_config.waveAnimate) {
            wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
            animateWave(_config.waveAnimateTime);
          }
        });
      waveGroup.transition()
        .duration(_config.waveRiseTime)
        .attr('transform', 'translate(' + waveGroupXPosition + ',' + newHeight + ')');
    };
  }

  return new GaugeUpdater();
};

let LiquidGauge = {'setting': liquidFillGaugeDefaultSettings, 'gauge': loadLiquidFillGauge};

module.exports = LiquidGauge;
