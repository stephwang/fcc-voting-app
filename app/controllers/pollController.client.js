'use strict';

(function () {

   var pollsDiv = document.querySelector('#polls');
   var apiUrl = appUrl + '/api/pollslist';

   function updatePollsDiv (data) {
      pollsDiv.innerHTML = 'hello!';
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePollsDiv));

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

})();
