/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

$(document).ready(function() {

    // Jahsee's refresh button
    $('#refreshButton').click(function() {
        makeCorsRequest('http://rollcall.local:5000/cool');
    });

    // highlight current nav item
    $('.test a').each(function(){
        var href = $(this).attr('href');
        var url = window.location.href;
        if (url.indexOf(href) > -1) {
            $(this).addClass('nav-path-selected');
        }
    });

    // button clicks
    // $(document).on('click', '.category a', function(e){
    //     window.location.href = "/default.html";
    // });
    $(document).on('click', '#settings-icon', function(e){
        e.preventDefault();
        window.location.href = "/settings.html";
    });
    $(document).on('click', '#self-icon', function(e){
        e.preventDefault();
        window.location.href = "/self.html";
    });
    $(document).on('click', '#btn-login-procede', function(e){
        e.preventDefault();
        window.location.href = "/default.html";
    });


    // temp nav links
    $(document).on('click', '#login-link', function(e){
        e.preventDefault();
        $("body").load("/index.html");
    });
    $(document).on('click', '#register-link', function(e){
        e.preventDefault();
        window.location = "/register.html";
    });
    $(document).on('click', '#default-link', function(e){
        e.preventDefault();
        window.location = "/default.html";
    });
    $(document).on('click', '#settings-link', function(e){
        e.preventDefault();
        window.location = "/settings.html";
    });
    $(document).on('click', '#self-link', function(e){
        e.preventDefault();
        window.location = "/self.html";
    });

});



<<<<<<< HEAD

















=======
////////////////////////////
// Cross origin request shit
////////////////////////////

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest(url) {
    // All HTML5 Rocks properties support CORS.

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        //var title = getTitle(text);
        alert('Response from CORS request to ' + url + ': ' + text);
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}
>>>>>>> 89adbc223f424709f9dfb164b720c47bbc02c436
