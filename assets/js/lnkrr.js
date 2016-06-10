$(function(){
   'use strict';
  var searchUser;
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
    var base64Credentials = btoa(searchUser + ":" + 'cool123');
    xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
    }
  }).done(function (json) {
    console.log(json);
    $(".userProfile").append('<li id="avatar">' + '<img src="' + json.avatar + '" />' + '</li>',
                              '<li id="username">' + json.username + '</li>',
                              '<li id="fullname">' + json.first_name + ' ' + json.last_name + '</li>',
                              '<li id="location">' + json.location + '</li>',
                              '<li id="joined_date">' + json.joined_date + '</li>',
                              '<li id="saved_links">' + json.saved_links + '</li>'
                            );

  });

  // $('.searchbar').submit(function () {
  //   console.log('hey');
  //   $.getJSON('apis/lnkrr/users/' + searchUser + '/links.json', function(json) {
  //     for (var l = 0; l < json.length; l++){
  //       $(".savedLinks").append('<li class="linkList">' + json[l].title + '</li>');
  //     }
  //   });
  // });


  $.ajax({
    dataType: 'json',
    url: 'http://lnkrr.herokuapp.com/' + searchUser + '/links',
    method: 'GET',
    beforeSend: function (xhr) {
      var base64Credentials = btoa(searchUser + ":" + 'cool123');
      xhr.setRequestHeader('Authorization', 'Basic ' + base64Credentials);
      }
  }).done(function(json) {
    console.log(json);
    for (var l = 0; l < json.length; l++){
      $(".savedLinks").append('<li class="linkList">' + json[l].title + '</li>');
    }
  });

});
});
