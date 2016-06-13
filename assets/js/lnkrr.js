$(function(){
   'use strict';
  var searchUser;
  searchUser = $('input[name="searchUser"]').val();
  var userName;
  var password;

  //login functions
  $(".info").click(function(e) {
    e.preventDefault();
    console.log("INFOOOO");
    $(".infoContent").toggle();
  });

  $(".loginButton").click(function(e){
    e.preventDefault();
    userName = $('input[name="usernameLogin"]').val();
    password = $('input[name="password"]').val();
    $(".login").css("display", "none");
    $(".navBar").css("opacity", "1");
    $(".mainWrapper").css("opacity", "1");
    console.log(userName);
    console.log(password);

      //get request to pull profile data
      $.ajax({
      dataType: 'json',
      //url: "http://8b3734ab.ngrok.io/skydaddy",
      url: 'http://lnkrr.herokuapp.com/' + userName,
      method: 'GET',
      beforeSend: function (xhr) {
        var cred = ("skydaddy:pass");
        //var base64Credentials = btoa("skydaddy" + ":" + "pass");
        xhr.setRequestHeader("Authorization", "skydaddy:lightsaber");
        console.log(cred);

        }
      }).done(function (json) {
        console.log(json);
      //if no img src, show first and last initial of username
        if (json.avatar === null){
          $(".userProfile").append('<li id="avatar">' + '<span id="initials">' + json.first_name[0] + json.last_name[0] + '</span>' + '</li>',
                                  '<li id="username">' + json.username + '</li>',
                                  '<li id="fullname">' + json.first_name + ' ' + json.last_name + '</li>',
                                  '<li id="location">' + '<i class="fa fa-map-marker" aria-hidden="true"></i>' + '<span class="iconPad">' + json.location + '</span>' + '</li>',
                                  '<li id="joined_date">' + '<i class="fa fa-calendar" aria-hidden="true"></i>' + '<span class="iconPad">' + json.joined_date + '</span>' + '</li>',
                                  '<li id="saved_links">' + '<i class="fa fa-bookmark" aria-hidden="true"></i>' + '<span class="iconPad">' + json.saved_links.length + '</span>' + '</li>'
                                );
                              }
        else {
          $(".userProfile").append('<li id="avatar">' + '<img src="' + json.avatar + '" />'+ '</li>',
                                  '<li id="username">' + json.username + '</li>',
                                  '<li id="fullname">' + json.first_name + ' ' + json.last_name + '</li>',
                                  '<li id="location">' + '<i class="fa fa-map-marker" aria-hidden="true"></i>' + '<span class="iconPad">' + json.location + '</span>' + '</li>',
                                  '<li id="joined_date">' + '<i class="fa fa-calendar" aria-hidden="true"></i>' + '<span class="iconPad">' + json.joined_date + '</span>' + '</li>',
                                  '<li id="saved_links">' + '<i class="fa fa-bookmark" aria-hidden="true"></i>' + '<span class="iconPad">' + json.saved_links.length + '</span>' + '</li>'
                                );
                              }

      });

      //end of request to pull profile data

      //request to get user links
      $.ajax({
        dataType: 'json',
        url: 'http://lnkrr.herokuapp.com/' + userName + '/links',
        method: 'GET',
        beforeSend: function (xhr) {
          var cred = ("skydaddy:pass");
          //var base64Credentials = btoa("skydaddy" + ":" + "pass");
          xhr.setRequestHeader("Authorization", "skydaddy:lightsaber");
          console.log(cred);
        }
      }).done(function(json) {
        console.log(json);
        for (var l = 0; l < json.length; l++){
          $(".savedLinks").append('<li class="linkList">' +
                                  '<h3>' + json[l].title + '</h3>' +
                                  '<button class="xbutton" id="' +
                                    json[l].id + '">' + "X" + '</button>' +
                                  '<p>' + json[l].description + '</p>' +
                                  '<span>' + json[l].url + '</span>' + '<li>');
        }
      });
      //end of request to pull user links

      //request to pull shared links
      $.ajax({
        dataType: 'json',
        url: 'http://lnkrr.herokuapp.com/' + userName + '/recommended',
        method: 'GET',
        beforeSend: function (xhr) {
          var cred = ("skydaddy:pass");
          //var base64Credentials = btoa("skydaddy" + ":" + "pass");
          xhr.setRequestHeader("Authorization", "skydaddy:lightsaber");
          console.log(cred);
        }
      }).done(function(json) {
        console.log(json);
        for (var l = 0; l < json.length; l++){
          $(".sharedLinks").append('<li class="linkList">' +
                                  '<h3>' + json[l].title + '</h3>' +
                                  '<button class="xbutton" id="' +
                                    json[l].id + '">' + "X" + '</button>' +
                                  '<p>' + json[l].description + '</p>' +
                                  '<span>' + json[l].url + '</span>' + '<li>');
        }
      });
      // end of request to pull shared links





  });

  // modal functions

  $('.shareButton').click(function(e) {
    e.preventDefault();
    console.log('forcePuke');
    $(".userShare").css("opacity", "1");
});

  $('.submit').click(function() {
    // e.preventDefault();
    console.log('forceChoke');
    console.log(searchUser);
    // $(".userShare").addClass("showing");

    var link = {
        "title": $('input[name="linkTitle"]').val(),
        "url": $('input[name="linkUrl"]').val(),
        "description": $('input[name="linkDescription"]').val()
    };
    var linkJson = JSON.stringify(link);                          //inspired by stackoverflow here http://stackoverflow.com/questions/10559660/how-can-i-build-a-json-string-in-javascript-jquery
    console.log(link);                                            //it works and it pleases me, solves the issue of the backend not understanding the way the data was sent to them.

    if ($('input[name="userShare"]').val() === "") {
    //post to username
      $.ajax({
        type: 'POST',
        dataType: 'json',
        //url: "http://66990ec5.ngrok.io/skydaddy/links",
        url: 'http://lnkrr.herokuapp.com/' + userName + '/links',
        data: linkJson,

        headers: {"Authorization": ("skydaddy" + ":" + "lightsaber")},

        success: function(newLink){
          $(".savedLinks").append('<li class="linkList">' +  newLink.title + '<button class="xbutton"> x </button>' +
                                  '<h3>' + newLink.title + '</h3>' +
                                  '<button class="xbutton" id="' +
                                  newLink.id + '">' + "X" + '</button>' +
                                  '<p>' + newLink.description + '</p>' +
                                  '<span>' + newLink.url + '</span>' + '</li>' );

        }

        //error: console.log("you done messed up");
      });
    } // end of post to username

    else {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        //url: "http://66990ec5.ngrok.io/skydaddy/links",
        url: 'http://lnkrr.herokuapp.com/' + $('input[name="userShare"]').val() + '/recommended',
        data: linkJson,

        headers: {"Authorization": ("skydaddy" + ":" + "lightsaber")},

        // success: function(newLink){
        //   $(".savedLinks").append('<li class="linkList">' + '<h3>' + newLink.title + '</h3>' +
        //                           '<button class="xbutton"> x </button>' +
        //                           '<p>' + newLink.description + '</p>' +
        //                           '<span>' + newLink.url + '</span>' + '<li>');
        // }

        //error: console.log("you done messed up");
      });
    }

    console.log(linkJson);
  });
  $(".post").click(function(e){
    $(".saveModal").addClass("showing");
    $(".userShare").css("opacity", "0");
  });


  $('.searchbar').submit(function (e) {
    e.preventDefault();
    searchUser = $('input[name="searchUser"]').val();
    console.log(userName);
    console.log(searchUser);

//on submit, clears the current page and fills it with an empty string
    $('.erase').html('');

  // searchUser = $('input[name="searchUser"]').val();

  //get request to pull profile data
  $.ajax({
  dataType: 'json',
  //url: "http://8b3734ab.ngrok.io/skydaddy",
  url: 'http://lnkrr.herokuapp.com/' + searchUser,
  method: 'GET',
  beforeSend: function (xhr) {
    var cred = ("skydaddy:pass");
    //var base64Credentials = btoa("skydaddy" + ":" + "pass");
    xhr.setRequestHeader("Authorization", "skydaddy:lightsaber");
    console.log(cred);

    }
  }).done(function (json) {
    console.log(json);
    if (json.avatar === null){
      $(".userProfile").append('<li id="avatar">' + '<div id="initials">' + json.first_name[0] + json.last_name[0] + '</div>' + '</li>',
                              '<li id="username">' + json.username + '</li>',
                              '<li id="fullname">' + json.first_name + ' ' + json.last_name + '</li>',
                              '<li id="location">' + '<i class="fa fa-map-marker" aria-hidden="true"></i>' + '<span class="iconPad">' + json.location + '</span>' + '</li>',
                              '<li id="joined_date">' + '<i class="fa fa-calendar" aria-hidden="true"></i>' + '<span class="iconPad">' + json.joined_date + '</span>' + '</li>',
                              '<li id="saved_links">' + '<i class="fa fa-bookmark" aria-hidden="true"></i>' + '<span class="iconPad">' + json.saved_links.length + '</span>' + '</li>'
                            );
                          }
    else {
      $(".userProfile").append('<li id="avatar">' + '<img src="' + json.avatar + '" />'+ '</li>',
                              '<li id="username">' + json.username + '</li>',
                              '<li id="fullname">' + json.first_name + ' ' + json.last_name + '</li>',
                              '<li id="location">' + '<i class="fa fa-map-marker" aria-hidden="true"></i>' + '<span class="iconPad">' + json.location + '</span>' + '</li>',
                              '<li id="joined_date">' + '<i class="fa fa-calendar" aria-hidden="true"></i>' + '<span class="iconPad">' + json.joined_date + '</span>' + '</li>',
                              '<li id="saved_links">' + '<i class="fa fa-bookmark" aria-hidden="true"></i>' + '<span class="iconPad">' + json.saved_links.length + '</span>' + '</li>'
                            );
                          }


  });

  //end of request to pull profile data

  //request to get user links
  $.ajax({
    dataType: 'json',
    url: 'http://lnkrr.herokuapp.com/' + searchUser + '/links',
    method: 'GET',
    beforeSend: function (xhr) {
      var cred = ("skydaddy:pass");
      //var base64Credentials = btoa("skydaddy" + ":" + "pass");
      xhr.setRequestHeader("Authorization", "skydaddy:lightsaber");
      console.log(cred);
    }
  }).done(function(json) {
    console.log(json);
    for (var l = 0; l < json.length; l++){
      $(".savedLinks").append('<li class="linkList">' +
                              '<h3>' + json[l].title + '</h3>' +
                              '<button class="xbutton" id="' +
                                json[l].id + '">' + "X" + '</button>' +
                              '<p>' + json[l].description + '</p>' +
                              '<span>' + json[l].url + '</span>' + '<li>');
    }
  });
  //end of request to pull user links

  //request to pull shared links
  $.ajax({
    dataType: 'json',
    url: 'http://lnkrr.herokuapp.com/' + searchUser + '/recommended',
    method: 'GET',
    beforeSend: function (xhr) {
      var cred = ("skydaddy:pass");
      //var base64Credentials = btoa("skydaddy" + ":" + "pass");
      xhr.setRequestHeader("Authorization", "skydaddy:lightsaber");
      console.log(cred);
    }
  }).done(function(json) {
    console.log(json);
    for (var l = 0; json.length; l++){
      $(".sharedLinks").append('<li class="linkList">' +
                              '<h3>' + json[l].title + '</h3>' +
                              '<button class="xbutton" id="' +
                                json[l].id + '">' + "X" + '</button>' +
                              '<p>' + json[l].description + '</p>' +
                              '<span>' + json[l].url + '</span>' + '<li>');
    }
  });
  // end of request to pull shared links

});

});
