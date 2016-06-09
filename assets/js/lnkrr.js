$(function(){
   'use strict';

  $('.userProfile').click(function () {
console.log('1');
   $.getJSON('apis/lnkrr/users/skywalker/skywalker.json', function(json) {
console.log('2');
     $(".userProfile").append(json.username);

   });
  });
});
