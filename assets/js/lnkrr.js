$(function(){
   'use strict';
  var searchUser;
  // modal functions

  $(".info").click(function(e) {
    e.preventDefault();
    console.log("INFOOOO");
    $(".infoContent").toggle();
  });

  $('.shareButton').click(function(e) {
    e.preventDefault();
    console.log('forcePuke');
    $(".userShare").css("opacity", "1");
});

  $('.submit').click(function(e) {
    e.preventDefault();
    console.log('forceChoke');
    // $(".userShare").addClass("showing");

    var link = {
        "title": $(".inputTitle").val(),
        "url": $(".inputUrl").val(),
        "description": $(".inputDescription").val()
    };
    $.ajax({
      type: 'POST',
      url: 'http://lnkrr.herokuapp.com/user/links',
      data: link,
      headers: {"Authorization": "Basic" + btoa("skydaddy" + ":" + "lightsaber")},
      success: function(newLink){
        $(".savedLinks").append('<li class="linkList">' +  newLink.title + '<li>' + '<button class="delete"> x </button>');
      }
      //error: console.log("you done messed up");
    });

  });
  $(".post").click(function(e){
    $(".saveModal").addClass("showing");
    $(".userShare").css("opacity", "0");
  });


  $('.searchbar').submit(function (e) {
    e.preventDefault();

//on submit, clears the current page and fills it with an empty string
    $('.erase').html('');

  searchUser = $('input[name="searchUser"]').val();

  $.ajax({
  dataType: 'json',
  url: 'http://lnkrr.herokuapp.com/' + searchUser,
  method: 'GET',
  beforeSend: function (xhr) {
    var base64Credentials = btoa(searchUser + ":" + 'lightsaber');
    xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
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
      var base64Credentials = btoa(searchUser + ":" + 'lightsaber');
      xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
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
