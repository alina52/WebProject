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
                    url:'http://localhost:3000/api/picture?token='+localStorage.getItem("token"),
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
        },
        methods:{
          handleDelete(picture_id){
            var url_operation = 'http://localhost:3000/api/picture/'+picture_id+'?token='+localStorage.getItem("token")
            $.ajax({
                type: 'DELETE',
                url:url_operation,
                contentType:'false',
                success:function(status){
                    if(status=='OK'){
                      window.location.href = "/admin/gallery";
                    }

                    // for(i=0;i<res.length;i++){
                    //   that.id=res[i].picture_id;
                    //   that.path=res[i].path;
                    // }
                }
            })
          }
        }

})
