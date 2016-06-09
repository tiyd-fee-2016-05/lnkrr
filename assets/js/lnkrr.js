$(function(){
   'use strict';
  var searchUser;
  $('.searchbar').submit(function (e) {
    e.preventDefault();
  searchUser = $('input[name="searchUser"]').val();

   $.getJSON('apis/lnkrr/users/' + searchUser + '/' + searchUser + '.json', function(json) {
     $(".userProfile").append('<li id="avatar">' + '<img src="' + json.avatar + '" />' + '</li>',
                              '<li id="username">' + json.username + '</li>',
                              '<li id="fullname">' + json.first_name + ' ' + json.last_name + '</li>',
                              '<li id="location">' + json.location + '</li>',
                              '<li id="joined_date">' + json.joined_date + '</li>',
                              '<li id="saved_links">' + json.saved_links + '</li>'
                              )

   });
  });

  $('.searchbar').submit(function () {
    console.log('hey');
    $.getJSON('apis/lnkrr/users/' + searchUser + '/links.json', function(json) {
    // $.getJSON('apis/lnkrr/users/skywalker/links.json', function(json) {
      for (var l = 0; l < json.length; l++){
        $(".savedLinks").append('<li class="linkList">' + json[l].title + '</li>');
      }
    });
  });

});
