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
                }
            })
          },

          GotoEdit(picture_id){
            sessionStorage.setItem("id", picture_id);
            window.location.href = "/admin/edit";


          }
        }

})
