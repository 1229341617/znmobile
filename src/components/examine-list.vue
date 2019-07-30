<template>
  <!--审核，未审核的数据列表-->
  <scroll class="exam-list"
          :data="data"
          :pullup="pullup"
          @scrollToEnd="scroll">
    <ul>
      <li v-for="(item,index) in data" >
        <div class="item">
          <div class="list-title">
            <span class="title">{{item.projectName}}</span>
          </div>
        </div>
      </li>
    </ul>
    <!--<ul>
      <li :class="{'li-active':item.checked}" class="list-item" v-for="(item,index) in data" @click="changeClass(item,index)" :id="item.pkCwhWorkHour">
        <div class="item">
          <div class="list-title">
            <span class="title">{{item.projectName}}</span>
          </div>
          <div class="list-content">
            <span class="content">开始时间：{{item.startTime}}</span>
            <span class="content">结束时间：{{item.endTime}}</span>
          </div>
          <div class="list-bottom">
            <div class="list-date">{{item.workDate}}</div>
            <div class="list-area" v-show="item.isEvection === '否'">本地</div>
            <div class="list-area" v-show="item.isEvection === '是'">出差</div>
            <div class="list-author">{{item.username}}</div>
            <div class="list-delay" v-show="item.billStatus === '4'" @click.stop="showDelay(item.pkCwhWorkHour,index)">
              <span>已延期</span>
              <div class="delay-down" :id="'id'+index"></div>
            </div>
          </div>
          <ul class="delay-list" v-show="isDelay === 'show'+ index">
            <li class="delay-list-item" v-for="(item,index) in delayListData">
              <div class="delay-left-icon"></div>
              <div class="delay-list-right">
                <div class="delay-list-title"><span class="delay-title">{{item.deferCause}}</span></div>
                <div class="delay-list-content">
                  <span class="delay-content">{{item.deferDate}}</span>
                  <span class="delay-content-author">{{item.username}}</span>
                </div>
                <div class="delay-list-line" v-show="index != (delayListData.length-1)"></div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>-->
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../components/scroll'
  import {getDelayList} from '../common/js/http.js'
  import {Toast} from 'mint-ui'
  export default {
    props:{
      data:{
        type:Array,
        default:null
      }
    },
    data() {
      return {
        pullup:true,
        checkListData:[],
        delayListData:[],
        isDelay:'hidden',  //show:显示  hidden:隐藏
        last:0, // 记录上一次点击的项目index
        flag:0 //偶数展开，奇数合上
      }
    },
    methods:{
      scroll(){
        this.$emit('scrollToEnd')
      },
      changeClass(item,index){
        if(typeof item.checked=='undefined'){
          this.$set(item,"checked",true)
        }else{
          item.checked=!item.checked
        }
      },
      checkList(){
        this.checkListData = document.getElementsByClassName('li-active');
        return this.checkListData
      },
      checkAllList(){
        for(var i=0;i<this.data.length;i++){
          this.$set(this.data[i],"checked",true)
        }
      },
      cancelAllList(){
        for(var i=0;i<this.data.length;i++){
          this.$set(this.data[i],"checked",false)
        }
      },
      showDelay(pk,index){
        if(index != this.last){
          this.isDelay = "hidden";
          document.getElementById('id' +this.last).style.transform = 'rotate(0deg)';
          this.flag = 0
        }
        if(this.flag === 0){
          let params= {
            code:global.code,
            userId:global.user_id,
            workhourid:pk,
          };
          getDelayList(params).then(res=>{
            if (res.flag === "success"){
              this.delayListData = res.data
            }else {
              Toast("获取数据失败,"+res.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
        if(this.flag % 2 === 0){
          this.isDelay = "show" + index
          document.getElementById('id' +index).style.transform = 'rotate(180deg)';
        }
        else{
          this.isDelay = "hidden"
          document.getElementById('id' +index).style.transform = 'rotate(0deg)';
        }
        this.last = index;
        this.flag = this.flag + 1;
      }
    },
    components:{
      Scroll
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable"
  .exam-list
    background $color-background
    width 100%
    height 100%
    overflow hidden
    .list-item
      width 100%
      display flex
      border-bottom 1px solid $color-line
      &.li-active
        background-color $color-line
        border-bottom 1px solid $color-background-line
      .item
        margin 0.5rem 0.8rem
        width 100%
        .list-title
          display flex
          width 100%
          align-items center
          .title
            text-align start
            word-break break-all
            font-size $font-size-medium-x
            line-height 0.8rem
            width 90%
        .list-content
          display flex
          margin 0.5rem auto
          .content
            font-size $font-size-medium
            color $color-project-font
            margin-right 1rem
        .list-bottom
          display flex
          color $color-theme-white
          font-size $font-size-medium
          .list-date
            padding 0.2rem 0.3rem
            background-color $color-theme
            border-radius 1rem
          .list-area
            padding 0.2rem 0.3rem
            background-color $color-button-theme
            margin-left 0.4rem
            border-radius 1rem
          .list-author
            padding 0.2rem 0.3rem
            background-color $color-button-theme-a
            margin-left 0.4rem
            border-radius 1rem
          .list-delay
            padding 0.2rem 0.3rem
            background-color #ea0000
            margin-left 0.4rem
            border-radius 1rem
            display flex
            align-items center
            .delay-down
              margin-left 0.1rem
              width 0
              height 0
              border-top 5px solid #ffffff
              border-left 5px solid transparent
              border-right 5px solid transparent
              transform rotate(0deg)
        .delay-list
          margin 0.8rem 0rem
          .delay-list-item
            display flex
            height 100%
            position relative
            .delay-left-icon
              width 0.5rem
              height 0.5rem
              background-color $color-theme
              border-radius 50%
              position absolute
              z-index 10
            .delay-list-right
              border-left 1px solid $color-line
              padding-left 0.5rem
              margin-left 0.25rem
              width 100%
              .delay-list-title
                display flex
                width 100%
                .delay-title
                  text-align start
                  word-break break-all
                  font-size $font-size-medium
                  line-height 0.8rem
                  width 90%
              .delay-list-content
                display flex
                margin 0.3rem auto
                .delay-content
                  font-size $font-size-small
                  color $color-project-font
                .delay-content-author
                  font-size $font-size-small
                  color $color-project-font
                  margin-left 0.2rem
              .delay-list-line
                width 100%
                height 0.1rem
                background-color $color-line
                margin-bottom 0.3rem
</style>
