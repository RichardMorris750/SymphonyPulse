//**********************************************************************
//
// Title:       graph.js
//
// Type:        JavaScript
//
// Description: Display a graph of pulse inforamtion
//
// Author:      Richard C. Morris, Synergex Technology Evangelist
//				Synergex
//
// Copyright (c) 2016, Synergex International, Inc. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice,
//   this list of conditions and the following disclaimer.
//
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
//*****************************************************************************
function createCanvas(divName) {

    var div = document.getElementById(divName);
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    var ctx = canvas.getContext("2d");
    return ctx;
}

function renderDomainGraph(mapped) {

    var self = this;

    var got_a_graph = self.gotGraphDomains.value;

    if (got_a_graph == "0")
    {
        var ctx = createCanvas("domainGraphDiv");
        var graph = new BarGraph(ctx);
        self.graphItemDomains = graph;
        self.gotGraphDomains.value = "1";
    }
    else
    {
        var graph = self.graphItemDomains;
    }

    graph.margin = 2;

    var colors = [];
    var labels = [];
    var nullValues = [];
    var values = [];

    for (var i in mapped) {

        labels.push(mapped[i].Log_hour);
        nullValues.push(0);
        values.push(mapped[i].Number_of_active_domains + 1);
    }

    graph.xAxisLabelArr = labels;
    graph.update(nullValues);
    graph.update(values);

}
function renderAvgExecTimeGraph(mapped) {

    var self = this;

    var got_a_graph = self.gotGraphAvgExecTime.value;

    if (got_a_graph == "0") {
        var ctx = createCanvas("avgExecTimeGraphDiv");
        var graph = new BarGraph(ctx);
        self.graphItemAvgExecTime = graph;
        self.gotGraphAvgExecTime.value = "1";
    }
    else {
        var graph = self.graphItemAvgExecTime;
    }

    graph.margin = 2;

    var colors = [];
    var labels = [];
    var nullValues = [];
    var values = [];

    for (var i in mapped) {

        labels.push(mapped[i].Log_hour);
        nullValues.push(0);
        values.push(mapped[i].Agv_response_time);
    }

    graph.xAxisLabelArr = labels;
    graph.update(nullValues);
    graph.update(values);

}
