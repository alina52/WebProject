$(".menu").mousedown(function(){
$(this).toggleClass("closed");
if($(this).hasClass("closed")) {
  $(".main").text("Menu");
} else {
  $(".main").text("Menu");
}
})



new Vue({
        el: '#picture',
        data(){
            return{
                res:[]
            }
        },
        created(){
            this.$nextTick(()=>{
                var that=this;
                $.ajax({
                    type: 'GET',
                    url:'http://localhost:3000/api/picture',
                    contentType:'false',
                    success:function(data){
                        that.res = data.pictures
                    }
                })
            })
        }
})
