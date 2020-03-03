let connectedUser = JSON.parse(localStorage.getItem("connecteduser"));
$( document ).ready(function() {
    if (connectedUser.role === 'Superviser') {
        $('.sup').addClass('hide');
    } else if (connectedUser.role === 'Employee') {
        $('.emp').addClass('hide');
    }
});