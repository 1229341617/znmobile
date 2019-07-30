<template>
  <div class="profile">
    <header class="head">
      <img class="avatar" :src="info.avatar" style="width: 3.5rem;height: 3.5rem"/>
     <div class="profileName">
       <div class="name">{{info.name}}</div>
       <div class="position">{{info.deptName}}</div>
     </div>
    </header>
    <ul>
      <li class="content" @click.stop="historyClick">
        <img src="../../../static/images/icon_my_ls.svg" style="width: 1rem;height: 1rem"/>
        <div class="text">学习历史</div>
        <img src="../../../static/images/icon_right.svg" style="width: 0.8rem;height: 0.8rem"/>
      </li>
      <li class="content" @click.stop="collectClick">
        <img src="../../../static/images/icon_my_sc.svg" style="width: 1rem;height: 1rem"/>
        <div class="text">我的收藏</div>
        <img src="../../../static/images/icon_right.svg" style="width: 0.8rem;height: 0.8rem"/>
      </li>
      <li class="content" @click.stop="feedBack">
        <img src="../../../static/images/icon_my_wt.svg" style="width: 1rem;height: 1rem"/>
        <div class="text">问题反馈<div class="dot" v-show="info.unread ==='true' "></div></div>
        <img src="../../../static/images/icon_right.svg" style="width: 0.8rem;height: 0.8rem"/>
      </li>
    </ul>

  </div>
</template>
//127121201405880032
<script type="text/ecmascript-6">
  import {getUserInfo} from '../../common/api/api'

export default{
       data(){
           return {
               info:{}
           }
       },
    mounted(){
           console.log("go go go!  "+global.code)
        let params = {code:global.code}
        getUserInfo(params).then((res)=>{
             console.log(res)
            if (res.success == "success"){
              this.info = res.detailMsg.data
            }
        })
    },

    methods:{
      historyClick(){
          this.$router.push({path:'/History'})
      },
      collectClick(){
          this.$router.push({path:'/Collect'})
      },
      feedBack(){
          this.$router.push({path:'/Feedback'})
      }
    }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
 .profile
   position relative
   width 100%
   height 80%
   .head
     height 42%
     background -webkit-gradient(linear, 0 0, 0 bottom, from(#87c74b), to(#2dc38b))
     .avatar
       margin-top 1.3rem
       margin-bottom 0.5rem
       border-radius 50%
     .profileName
        display flex
        flex-direction column
        margin-bottom 1rem
        .name
          color white
          font-weight 700
          font-size $font-size-large
        .position
          margin-top 0.1rem
          color white
          font-size $font-size-small
   ul
    .content
      display flex
      padding  10px 20px
      flex-direction row
      border-bottom 0.5px solid #adacb1
      .text
       position relative
       text-align left
       padding-left 10px
       flex-basis 80%
       .dot
         position absolute
         top 0rem
         left 3.5rem
         background red
         width 0.4rem
         height 0.4rem
         border-radius 50%

</style>
