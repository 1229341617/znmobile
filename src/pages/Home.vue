<template>
     <span>获取token失败,请联系管理员</span>
</template>
<script>
    export default{
        data(){
            return{
                bgHeight:document.documentElement.clientHeight +'px',//可视区域的高度
                bgWidth:document.documentElement.clientWidth +'px',//可视区域的宽度
                specialCourse:[]
            }
        },
        mounted(){
          if(typeof global.code == "undefined" || global.code == null || global.code == ""){
            global.code=this.$route.query.code;//当前app的url在钉钉里面访问的时候,会自动被加上参数code(如果不加code,需要钉钉提供前端方法取人员编号)
          }//query在浏览器中显示参数
//          global.code='1701350';
            //3s后进入登录界面.
//            setTimeout(()=>{
//                this.$router.push("/CourseIndex");
//                // this.$router.push("Main");
//            },3000)

          this.init();
        },
        methods:{
            init:function () {
              var that = this;
              that.axios.get(API + '/coursepackage/getcoursepackage', {
                params: {
                  code:global.code,
                }
              }).then(function (response) {
                  if (response.data.success === "success") {
                    that.specialCourse = response.data.detailMsg.data;
                    global.userId=response.data.detailMsg.userid;
                    console.log("userId")
                    console.log(global.userId)
                  } else {
                    Toast("查询失败");
                  }
                }).catch(function (error) {
                  console.log(error);
                });
            },
            into:function(){
              global.bagPk='' //空:全部分类  有值：专项
              this.$router.push("/Main");
            },
            special:function (pk) {
              global.bagPk=pk //空:全部分类  有值：专项
              this.$router.push("/CourseIndex");
            }
        }
    }
</script>

<style scoped>
    .homeBg{
        position:relative;
    }
    .intoStudy{
        color:#fff;
        bottom:2rem;
        left:15%;
        position:absolute;
        border:0;
        background-color:#86C840;
        width:4rem;
        height:1.5rem;
        border-radius: 0.75rem;
    }
    .intoSpecial{
        color:#fff;
        bottom:2rem;
        left:60%;
        position:absolute;
        border:0;
        background-color:#ffc832;
        width:4rem;
        height:1.5rem;
        border-radius: 0.75rem;
    }
</style>
