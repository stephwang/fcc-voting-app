var apiUrl = appUrl + '/api' + window.location.pathname;

$(document).ready(function(){
    if (window.localStorage.getItem("vote")){
        $("#message").text("voted successfully for " + window.localStorage.getItem("vote"));
        $("#message").css("color", "#00BCD4");
        window.localStorage.removeItem("vote");
    }
});

 $("#dropdown").change(function () {
        if(this.value == 'other') {
            $("#otherfield").css("display", "block");
        }
        else{
            $("#otherfield").css("display", "none");
        }
});

$( "#vote" ).submit(function( event ) {
    var vote = $('#dropdown').val();
    if(vote == null){
        $("#message").text("Please select an option.");
        $("#message").css("color", "red");
    } else if (vote == 'other' && $("#otherfield input").val() == ''){
        $("#message").text("Please enter an option.");
        $("#message").css("color", "red");
    } else {
      $.get( apiUrl , $("#vote").serialize(), function(data) {
          window.localStorage.setItem("vote", data);
          window.location.reload();
        });
    }
    return false;
});