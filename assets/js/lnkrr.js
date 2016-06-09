$(document).ready(function() {

$.ajax({
  dataType: 'json',
  url: '/apis/lnkrr/users/skywalker/skywalker.json',
  method: 'GET',
}).done(function (userInfo){
  $('.userProfile').append('<li class="username">' + json.name + '</li>');
console.log('hey');
});
});
