$(document).ready(function(){
  $("#upload").click(function(){
    var formData = new FormData();
    formData.append('inputFiles', $('#file')[0].files[0]);

    $.ajax({
        url: 'http://localhost:3000/api/upload',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
    }).done(function(data) {
      var path = data.path;
      var name = $("#name").val();
      var date = $("#date").val();
      // var tag  = $("#tag").val();
      var description = $("#description").val();


      var uurl = "http://localhost:3000/api/picture?token="+localStorage.getItem("token");
        alert(uurl);

       $.post(uurl ,
        {
          path:path,
          name:name,
          date:"2017-9-3",
          tag:["red","green"],
          description:description
        },
         function(data){
        alert(data);
         window.location.href = "/admin/upload";
         }
       )


    }).fail(function(res) {});

  })
})
