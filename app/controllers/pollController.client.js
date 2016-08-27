'use strict';

(function () {

   var pollsDiv = document.querySelector('#polls');
   var apiUrl = appUrl + '/api/pollslist';

   function updatePollsDiv (data) {
      var dataObj = JSON.parse(data);
      var html = "";
      dataObj.forEach(function(item){
         html += "<a href='/poll/" + item._id + "'><div class='poll'>" + item.title + "</div></a>";
      });
      pollsDiv.innerHTML = html;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollsDiv));

})();
