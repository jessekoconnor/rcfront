// remember the user
var user;


// This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
        if (response.status === 'connected') {
            console.log('RC: logged in');
            fbAPI();
        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
        }
    }

// This function is called when someone finishes with the Login
    function checkLoginState() {
        console.log('RC: check log in state');
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

// load FB API
    window.fbAsyncInit = function() {
        FB.init({
          appId      : '1011936855539253',
          cookie     : true,
          xfbml      : true, 
          version    : 'v2.2'
        });
        // manually check log in status
        FB.getLoginStatus(function(response) {
            console.log('RC: manually check log in state');
            statusChangeCallback(response);
        });
    };

// Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

// hit the API and return data about this user
    function fbAPI() {
        FB.api('/me?fields=first_name,last_name,email,age_range,gender,locale', function(response) {
            console.log(JSON.stringify(response));
            console.log('Successful login for: ' + response.first_name);
            $('#logged-in .first_name').text(response.first_name);
            user = response;
        });
    }


// testing buttons click functions
    $(document).ready(function(){
        // check if user is logged in
        $('#check-login').click(function(){
            checkLoginState();
            fbAPI();
        });
        // check if user is logged in
        $('#store-user').click(function(){
            makeCorsRequest('http://rollcall.local:5000/storeUser', user);
        });
        // log user out
        $('#logout').click(function(){
            FB.logout(function(response) {
               console.log('RC: user is logged out');
            });
        });
    });




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
function makeCorsRequest(url, body) {
    // All HTML5 Rocks properties support CORS.

    var xhr = createCORSRequest('POST', url);
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

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(body));
}