<template>
  <div class="navbar">
    <ul>
      <li><img  style="width: 1rem;height: 1rem" ref="home" @click="home_click" src="../../static/images/home_active.svg"><span @click.stop>首页</span></router-link></li>
      <li><img style="width: 1rem;height: 1rem" ref="profile" @click="profile_click" src="../../static/images/profile.svg"><span @click.stop>我的</span></router-link></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations,mapGetters} from 'vuex'
 export default{
   mounted(){
       if (this.isHome){
         this.$refs.home.src = "../../static/images/home_active.svg"
         this.$refs.profile.src="../../static/images/profile.svg"
       }else {

         this.$refs.home.src = "../../static/images/home.svg"
         this.$refs.profile.src="../../static/images/profile_active.svg"
       }
   },
      computed:{
        ...mapGetters([
          'isHome'
        ])
      },
   watch:{
     isHome(value){
        if (value==true){
            this.$refs.home.src = "../../static/images/home_active.svg"
            this.$refs.profile.src="../../static/images/profile.svg"
        }else {
            console.log("不是home")
            this.$refs.home.src = "../../static/images/home.svg"
            this.$refs.profile.src="../../static/images/profile_active.svg"
        }
     }
   },
     methods:{
       ...mapMutations({
         setHome:"SET_HOME"
       }),
         home_click(){
           this.$router.push('/');
         },
         profile_click(){
           this.$router.push('/');
         }
     }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable.styl"
  .navbar
    background white
    ul
     width 100%
     list-style none
     border-top 1px solid rgba(238, 238, 238, 1)
     li
       float left
       display flex
       width 50%
       justify-content flex-start
       align-items center
       flex-flow column wrap
       margin-top 0.2rem
       height 2rem
       a
         color #ccc
         text-decoration none
         display flex
         flex-direction column
         &.router-link-active
           color #87c840
         span
           align-items flex-start
           font-size 12px
           display block
</style>
