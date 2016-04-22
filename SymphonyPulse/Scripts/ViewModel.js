//**********************************************************************
//
// Title:       ViewModel.js
//
// Type:        JavaScript
//
// Description: Simple *viewmodel* - JavaScript that defines the data and behavior of your UI
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
function AppViewModel() {
    var self = this;

    self.pulseinfo = ko.observableArray();
    self.error = ko.observable();

    //createGraph();

    // Adds a JSON array of movies to the view model
    function addPulseInfo(data) {
        var mapped = ko.utils.arrayMap(data, function (item) {
            return new pulse(item);
        });
        self.pulseinfo(mapped);
        renderDomainGraph(mapped)
        renderAvgExecTimeGraph(mapped);
    }

    var uri = '/api/pulse_data';

    ajaxRequest('get', uri).then(addPulseInfo, onError);

    self.refresh = function () {
        ajaxRequest('get', uri).then(addPulseInfo, onError);
    };
}



// Creates an observable version of the movie model.
// Initialize with a JSON object fetched from the server.
function pulse(data) {
    var self = this;
    data = data || {};

    // Data from model
    self.Log_date = data.Log_date;
    self.Log_hour = data.Log_hour;
    self.Domain_timeout =data.Domain_timeout;
    self.Number_of_active_domains = data.Number_of_active_domains;
    self.Max_active_domains = data.Max_active_domains;
    self.Log_file_expire_days = data.Log_file_expire_days;
    self.Number_of_log_files = data.Number_of_log_files;
    self.Number_exec_calls = data.Number_exec_calls;
    self.Number_select_calls = data.Number_select_calls;
    self.Number_delete_calls = data.Number_delete_calls;
    self.Number_insert_calls = data.Number_insert_calls;
    self.Number_update_calls = data.Number_update_calls;
    self.Total_calls = data.Total_calls;
    self.Min_response_time = data.Min_response_time;
    self.Max_response_time = data.Max_response_time;
    self.Agv_response_time = data.Agv_response_time;
    self.Client_server_timeouts = data.Client_server_timeouts;
    self.Bytes_recieved = data.Bytes_recieved;
    self.Bytes_sent = data.Bytes_sent;

};
// Callback for error responses from the server
function onError(error) {
    var self = this;
    //self.error('Error: ' + error.status + ' ' + error.statusText);
}

function ajaxRequest(type, url, data) {
    var options = {
        url: url,
        headers: {
            Accept: "application/json"
        },
        contentType: "application/json",
        cache: false,
        type: type,
        data: data ? ko.toJSON(data) : null
    };
    return $.ajax(options);
}


