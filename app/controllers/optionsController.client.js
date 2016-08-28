'use strict';

(function () {

   var optionsSelect = document.querySelector('select');
   var apiUrl = appUrl + '/api/optionslist/:pollid';
   
   var debugSelect = document.querySelector('#debug');
   
   function updateOptionsSelect (data) {
      debugSelect.text = "HI!";
      optionsSelect.innerHTML = data;
      var dataObj = JSON.parse(data);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateOptionsSelect));

})();
