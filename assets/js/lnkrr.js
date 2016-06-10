$(function(){
   'use strict';
  var searchUser;
  // modal functions
  $(".post").click(function(e){
    $(".saveModal").addClass("showing");
  });

  $('.searchbar').submit(function (e) {
    e.preventDefault();

//on submit, clears the current page and fills it with an empty string
    $('.erase').html('');

  searchUser = $('input[name="searchUser"]').val();

   $.getJSON('http://lnkrr.herokuapp.com/skydaddy', function(json) {




     $(".userProfile").append('<li id="avatar">' + '<img src="' + json.avatar + '" />' + '</li>',
                              '<li id="username">' + json.username + '</li>',
                              '<li id="fullname">' + json.first_name + ' ' + json.last_name + '</li>',
                              '<li id="location">' + json.location + '</li>',
                              '<li id="joined_date">' + json.joined_date + '</li>',
                              '<li id="saved_links">' + json.saved_links + '</li>'
                            );

   });
  });

  $('.searchbar').submit(function () {
    console.log('hey');
    $.getJSON('apis/lnkrr/users/' + searchUser + '/links.json', function(json) {
      for (var l = 0; l < json.length; l++){
        $(".savedLinks").append('<li class="linkList">' + json[l].title + '</li>');
      }
    });
  });

$('.submit').click(function(e) {
  e.preventDefault();
  console.log('forceChoke');
  var link = {
      "title": $(".inputTitle").val(),
      "url": $(".inputUrl").val(),
      "description": $(".inputDescription").val()
  };
  $.ajax({
    type: 'POST',
    url: 'apis/lnkrr/users/vader/links.json',
    data: link,
    success: function(newLink){
      $(".savedLinks").append('<li class="linkList">' +  newLink.title + '<li>');
    }
    //error: console.log("you done messed up");
  });

});

});
