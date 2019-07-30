<template>
  <div class="collect">
    <div class="tab">
      <div class="tab-item" :class="{'current':currentIndex===0}" @click="leftClick">
        <span class="tab-link" >我的收藏</span>
      </div>
      <div class="tab-item" :class="{'current':currentIndex===1}" @click="rightClick">
        <span class="tab-link" >热门收藏</span>
      </div>
    </div>
    <scroll :data="data" class="studyList">
      <ul>
        <li v-for="item in data" class="content" @click.stop="clickItem(item)">
          <img :src="item.courseIconUrl === true ? geturl(item.courseIconUrl) : defaultURL" style="width: 5rem;height: 4rem"/>
          <div class="rightContent">
            <p   class="name" style="text-align: left;color: #333333">{{item.courseName}}</p>
            <div class="trainer" style="text-align: left;margin-top: 5px;">主讲人:{{item.courseLecturer}}</div>
            <div class="date" style="text-align: left;margin-top: 5px" >{{item.coursePublishTime}}</div>
            <p class="videoInfo" style="text-align: left;margin-top: 5px">
               <span class="playNums">
               <img src="../../../static/images/player.svg" >{{item.courseBroadcastNumber}}</span>
                <span class="favoriteNums">
               <img src="../../../static/images/icon_pj.svg" >{{item.courseCommentNumber}}</span>
               <span class="likesNums">
               <img src="../../../static/images/icon_sc_red.svg" >{{item.favoriteCount}}</span>
               <span class="commentNums">
               <img src="../../../static/images/icon_sc_orange.svg" >{{item.courseLikeNumber}}</span>
            </p>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../scroll.vue'
  import {getCollect,getHotCollect} from '../../common/api/api'
  export default{
      data(){
          return {
            currentIndex:0,
            defaultURL:"../../../static/images/lesson-default.svg",
            data:[],
            myCollect:[],
            hotCollect:[]
          }
      },
    mounted(){

        this.getCollectData();
    },
    methods:{
      clickItem(item){
        let params = {useId:global.userId}
        console.log(item)
        this.coursePK = item.pkCourse

        this.$router.push({path:'/CourseDetail',query:{courseId:this.coursePK}})
      },
      getCollectData(){
        let param = {
          code:global.code,
          myfavorite:true
        }
        getCollect(param).then((res)=>{
          console.log(res)
          if (res.success == "success"){
            this.myCollect = res.detailMsg.data.content
            this.data.push(...this.myCollect)
          }
        })
      },
      getHotData(){
          let param = {code:global.code,favorite:true}
        getHotCollect(param).then((res)=>{
          console.log(res)
          if (res.success == "success"){
            this.hotCollect = res.detailMsg.data.content
            if (this.data.length > 0){
              this.data.splice(0,this.data.length)
            }
            this.data.push(...this.hotCollect)
          }
        })
      },
      leftClick(){
        if (this.currentIndex == 0) return
        this.currentIndex = 0
        this.data.splice(0,this.data.length)
        this.data.push(...this.myCollect)
      },
      rightClick(){
        if (this.currentIndex == 1) return
        this.currentIndex = 1
        if (this.hotCollect.length > 0){
          this.data.splice(0,this.data.length)
          this.data.push(...this.hotCollect);
          return;
        }
        this.getHotData();
      },
      geturl (data) {
          console.log(global.BashImgUrl + "==============")
        return global.BashImgUrl + data;
      }
    },
    components:{
      Scroll
    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.collect
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  background white
  .tab
    display flex
    height 2rem
    line-height 2rem
    font-size $font-size-medium
    border-bottom 1px solid $color-background-d
    .tab-item
      flex 1
      text-align center
      &.current
        .tab-link
          color $color-sub-theme
          border-bottom 1px solid $color-sub-theme
      .tab-link
        padding-bottom 0.6rem
        padding-left 0.5rem
        padding-right 0.5rem
        color #666



  .studyList
    width 100%
    height 93%
    overflow hidden
    .content
      display flex
      padding 10px
      flex-direction row
      justify-content flex-start
      align-items center
      border-bottom 1px solid #e5e5e5
      .rightContent
        padding-left 10px
        display flex
        flex-direction column
        .name
          text-align left
          font-family 600
          font-size $font-size-medium-x
        .trainer
          color #999999
          font-size $font-size-medium
        .time
          color $color-background-d
          font-size $font-size-medium
        .date
          color $color-background-d
          font-size $font-size-medium
        .videoInfo
          font-size 0.6rem
          color #b5b5b5
          text-align left
          display flex
          flex-direction row
          span
             display flex
             flex-direction row
             margin-right 0.25rem
             width 1.4rem
             height 0.7rem
             line-height 0.7rem
             img
               margin-right 0.25rem
               align-content center
               width 0.7rem
               height 0.7rem

</style>
