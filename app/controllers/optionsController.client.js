'use strict';

(function () {

   var optionsSelect = document.querySelector('select');
   var apiUrl = appUrl + '/api/optionslist/';

   function updateOptionsSelect (data) {
      var dataObj = JSON.parse(data);
      var html = "";
      dataObj.forEach(function(item){
         html += "<a href='/poll/" + item._id + "'><div class='poll'>" + item.title + "</div></a>";
      });
      optionsSelect.innerHTML = html;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateOptionsSelect));

})();
