<template>
   <div>
     <keep-alive><!--vue的内置组件，能在组件切换过程中将状态保存在内存中，防止重复渲染DOM-->
       <router-view></router-view>
     </keep-alive>
   </div>
</template>


<script type="text/ecmascript-6">
  import {appCreat} from '../common/js/http.js'
  import {Toast} from 'mint-ui'
  export default{
    data(){
      return{
        bgHeight:document.documentElement.clientHeight +'px',
        bgWidth:document.documentElement.clientWidth +'px',
        specialCourse:[]
      }
    },
    mounted(){
      if(global.userid == ''){
        this.init();
      }
    },
    methods:{
      init:function () {
        //获取用户信息
        console.log("一"+global.code)
        let params = {
          code:global.code
        };
        appCreat(params).then(res=>{
          var that = this;
          if (res.flag === "true"){
            global.userid = res.user_id;//根据code查询user_id
          }else {
            that.msg = res.flag
            if(that.msg === '1'){
              that.login = 'fail';
              Toast(res.msg);
              this.$router.push('/home');
            }
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      into:function(){
        global.bagPk=''; //空:全部分类  有值：专项
        this.$router.push("/Main");
      },
      special:function (pk) {
        global.bagPk=pk;//空:全部分类  有值：专项
        this.$router.push("/CourseIndex");
      }
    },
    components:{
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
  .bar{
  position:fixed;
  left:0;
  right:0;
  top:92%;
  bottom:0;
  }
</style>
