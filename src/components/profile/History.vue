<template>
  <div class="history">
    <div class="tab">
      <div class="tab-item" :class="{'current':currentIndex===0}" @click="leftClick">
        <span class="tab-link" >我的学习</span>
      </div>
      <div class="tab-item" :class="{'current':currentIndex===1}" @click="rightClick">
        <span class="tab-link" >热门学习</span>
      </div>
    </div>
    <scroll class="studyList" :data="myList" >
      <ul>
        <li class="content" v-for="item in  myList" @click.stop="clickItem(item)">
         <!--<router-link :to="{name: 'CourseDetail', query: {courseId: coursePK}}" class="course-link" >-->
          <img :src="item.url == true ? item.url : defaultURL" style="width: 5rem;height: 4rem"/>
          <div class="rightContent">
            <p   class="name" style="text-align: left">{{item.name}}</p>
            <div class="trainer" style="text-align: left;margin-top: 5px;">主讲人:{{item.courseLecturer}}</div>
            <div class="time" style="text-align: left;margin-top: 5px" v-show="currentIndex == 0">时长:{{item.duration}}&nbsp;&nbsp;&nbsp;已播:<span style="color: orange">{{item.progress}}</span></div>
            <p class="videoInfo" style="text-align: left;margin-top: 5px" v-show="currentIndex == 1">

              <img src="../../../static/images/player.svg" style="width: 0.7rem;height: 0.7rem;">
              <span class="playNums">
               &nbsp;{{item.chapterplaycount}}</span>
            </p>
          </div>
            <!--</router-link>-->
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../scroll.vue'
  import {getLearned,getCourseByChapterId,hotlearn} from '../../common/api/api'
  export default{
      data(){
          return {
            defaultURL:"../../../static/images/lesson-default.svg",
            myList:[],
            learn1:[],
            learn2:[],
            currentIndex:0,
            coursePK:""

          }
      },
    mounted(){
      let params = {code:global.code}
      getLearned(params).then((res)=>{
          console.log(res)
        if (res.success == "success"){
              this.learn1 = res.detailMsg.data.content
              this.myList.push(...this.learn1)
        }
      })
    },
    methods:{
      clickItem(item){
          let params = {useId:global.userId}
        this.coursePK = item.pkCourse
        this.$router.push({path:'/CourseDetail',query:{courseId:this.coursePK}})
      },
      leftClick(){
          if (this.currentIndex == 0) return
             this.currentIndex = 0
        if (this.myList.length > 1){
          this.myList.splice(0,this.myList.length)

          this.myList.push(...this.learn1)
        }
      },
      rightClick(){
        if (this.currentIndex == 1) return
            this.currentIndex = 1

        let params = {code:global.code}
        hotlearn(params).then((res)=>{

          if (res.success == "success"){
            console.log(res)
                if (this.myList.length > 0){
                    this.myList.splice(0,this.myList.length)

                }
            this.learn2 = res.detailMsg.data.chapters
            this.myList.push(...this.learn2)
          }
        })
      }
    },
    components:{
          Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.history
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
      border-bottom 1px solid #e5e5e5
      .rightContent
         padding-left 10px
         display flex
         flex-direction column
         .name
          color #333333
          font-family 600
          font-size $font-size-medium-x
         .trainer
          color #999999
          font-size $font-size-medium
         .time
          color #999999
          font-size $font-size-medium
         .date
          color #999999
          font-size $font-size-medium
         .videoInfo
          min-height 0.5rem
          font-size 0.6rem
          color #999999
          text-align left
          display flex
          flex-direction row
          align-content center
          align-items center
          .playNums
            text-align center
            display block
            height 0.6rem
            line-height 0.7rem
          img
             align-content center




</style>
