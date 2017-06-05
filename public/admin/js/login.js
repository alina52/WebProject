$(document).ready(function(){
  $("#login").click(function(){
    var username = $("#username").val();
    var password = $("#password").val();

     $.post( "http://localhost:3000/api/account/login",
      {
        username:username,
        password:password
      },
       function(data){
       localStorage.setItem("token",data);
        window.location.href = "/admin/gallery";
       }
     )
  })
})
