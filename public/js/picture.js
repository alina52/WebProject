$(".menu").mousedown(function(){
$(this).toggleClass("closed");

if($(this).hasClass("closed")) {
  $(".main.button").text("Menu");
} else {
  $(".main.button").text("Menu");
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

                        // for(i=0;i<res.length;i++){
                        //   that.id=res[i].picture_id;
                        //   that.path=res[i].path;
                        // }
                    }
                })
            })
        }
})
