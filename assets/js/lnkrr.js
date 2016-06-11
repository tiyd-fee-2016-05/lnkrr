$(function(){
   'use strict';
  var searchUser;
  searchUser = $('input[name="searchUser"]').val();
  var userName
  var password
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
  });

  // modal functions

  $('.shareButton').click(function(e) {
    e.preventDefault();
    console.log('forcePuke');
    $(".userShare").css("opacity", "1");
});

  $('.submit').click(function(e) {
    e.preventDefault();
    console.log('forceChoke');
    console.log(searchUser);
    // $(".userShare").addClass("showing");

    var link = {
        "title": $('input[name="linkTitle"]').val(),
        "url": $('input[name="linkUrl"]').val(),
        "description": $('input[name="linkDescription"]').val()
    };
    var linkJson = JSON.stringify(link)
    console.log(link);
    $.ajax({
      type: 'POST',
      dataType: 'json',
      //url: "http://66990ec5.ngrok.io/skydaddy/links",
      url: 'http://lnkrr.herokuapp.com/skydaddy/links',
      data: linkJson,

      headers: {"Authorization": ("skydaddy" + ":" + "lightsaber")},

      success: function(newLink){
        $(".savedLinks").append('<li class="linkList">' +  newLink.title + '<li>' + '<button class="delete"> x </button>');
      }

      //error: console.log("you done messed up");
    });
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
    // $('.erase').html('');

  // searchUser = $('input[name="searchUser"]').val();

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

    $(".userProfile").append('<li id="avatar">' + '<img src="' + json.avatar + '" />'+ '</li>',
                              '<li id="username">' + json.username + '</li>',
                              '<li id="fullname">' + json.first_name + ' ' + json.last_name + '</li>',
                              '<li id="location">' + json.location + '</li>',
                              '<li id="joined_date">' + json.joined_date + '</li>',
                              '<li id="saved_links">' + json.saved_links + '</li>'
                            );

  });

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
      $(".savedLinks").append('<li class="linkList">' + json[l].title + '</li>',
                              '<button class="' + json[l].id + '">' + "X" + '</button>' );
    }
  });

});

});
