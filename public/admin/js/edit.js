$(document).ready(function(){
  $("#handleEdit").click(function(){
    var name = $("#name").val();
    var date = $("#date").val();
    var tag  = $("#tag").val();
    var description = $("#description").val();

    var d = new Date(date),
    day = '' + d.getDate(),
    month = '' + (d.getMonth()+1),
    year = d.getFullYear();

    if(month.length<2)month = '0'+ month;
    if(day.length < 2) day = '0' +day;

    var dd = [year,month,day].join('-');
    $.ajax({
      url: 'http://localhost:3000/api/picture/'+sessionStorage.getItem("id")+'?token='+localStorage.getItem("token"),
      type: 'PUT',
      cache:false,
      data: {
          name:name,
          date:dd,
          tag:tag,
          description:description
        },
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success:function(){
        window.location.href = "/admin/gallery";
      }
    })
  })
})
