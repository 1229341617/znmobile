<template>
  <!--未审核的数据列表-->
  <div style="width: 100%">
  <div class="panel" v-for="(item,index$1) in data">
    <div class="panelTitle" @click="openProject(index$1)">
      <div class="titleLeft">{{item.projectName}}</div>
      <div class="titleRight">


      </div>
    </div>
    <div class="panelBody" v-show="'show'+index$1 === isOpen" v-for="(stage,index2) in item.cwhMileStoneAO">
      <div class="bodyTop" @click="openStage(index2)">
        <div class="bodyTopLeft">
          <div class="bodyTitle">{{stage.stagename}}</div>
          <div :class="{'allCheck':'check'+ index2 == isCheck}" class="allCheckButton" @click.stop="checkAll(stage.cwhWorkHourEntityList,index2)">全选</div>
        </div>
        <div class="bodyTopRight">
          <div class="countImg">
            <img src="./image/icon_count1.svg"  v-show="parseFloat(stage.cpi.substr(0,stage.cpi.indexOf('%'))) < 90" @click.stop="showManDay(stage.pv,stage.cv,stage.cpi,stage.stagename)"/>
            <img src="./image/icon_count2.svg"  v-show="parseFloat(stage.cpi.substr(0,stage.cpi.indexOf('%'))) >= 90" @click.stop="showManDay(stage.pv,stage.cv,stage.cpi,stage.stagename)"/>
          </div>
          <div class="iconImg">
            <img src="./image/icon_arrows_up.svg" v-show="'show'+ index2 === isArrow" />
            <img src="./image/icon_arrows_down.svg" v-show="'show'+ index2 != isArrow" />
          </div>
        </div>
      </div>
      <ul class="bodyContent" v-show="'show'+ index2 === isArrow">
        <li :class="{'item-active':content.checked}" class="content-item" v-for="(content,index) in stage.cwhWorkHourEntityList" @click="changeClass(content,index,stage.cwhWorkHourEntityList,index2)" :id="content.pkCwhWorkHour">
          <div class="item">
            <div class="itemLeft">
            <div class="itemLeftTop">
              <button class="name">{{content.username}}</button>
              <img src="./image/icon_time.svg" style="width:0.7rem;height: 0.7rem" />
              <div class="date">{{content.workDate}}</div>
              <div class="time">{{content.startTime}}-{{content.endTime}}</div>
            </div>
            <div class="itemLeftBottom">
              <div class="detail">工作内容：</div>
              <div class="detailContent">{{content.workDescribe}}</div>
            </div>
          </div>
            <div class="itemRight"><img src="./image/icon_particulars.svg" @click.stop="showDetail(content.username,content.workLocation,content.workDescribe)"/></div>
          </div>
          <div class="itemDelay" v-show="content.billStatus === '4'">
            <img src="./image/icon_postpone2.svg" v-show="isDelay != 'show'+ index" @click.stop="showDelay(content.pkCwhWorkHour,index)"/>
            <img src="./image/icon_postpone1.svg" v-show="isDelay === 'show'+ index" @click.stop="showDelay(content.pkCwhWorkHour,index)"/>
            <ul class="delay-list" v-show="isDelay === 'show'+ index">
              <li class="delay-list-item" v-for="(content,index) in delayListData">
                <div class="delay-left-icon"></div>
                <div class="delay-list-right">
                  <div class="delay-list-title"><span class="delay-title">{{content.deferCause}}</span></div>
                  <div class="delay-list-content">
                    <span class="delay-content">{{content.deferDate}}</span>
                    <span class="delay-content-author">{{content.username}}</span>
                  </div>
                  <div class="delay-list-line" v-show="index != (delayListData.length-1)"></div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!--资源人天弹框-->
  <div class="overlayer"  v-show="manDayFlag === 'show'">
    <div class="over-panel" >
      <div class="over-top" >
        <div class="top-item-span"><span class="top-span">{{this.stagename}}-资源人天</span></div>
        <div class="top-item-img"><img src="./image/icon_shut.svg" class="top-img" @click="cancelManDay"></div>
      </div>
      <div class="over-bottom">
        <div class="content-top">
          <div class="planDay"><span class="planDayNum">{{this.pv}}</span><span class="planDayText">计划人天</span></div>
          <div class="planDay"><span class="surplusDayNum">{{this.cv}}</span><span class="surplusDayText">剩余人天</span></div>
        </div>
        <div class="content-bottom">
          <img src="./image/icon_count1.svg" style="width:4rem;height: 4rem" v-show="parseFloat(this.cpi.substr(0,this.cpi.indexOf('%'))) < 90"/>
          <img src="./image/icon_count2.svg" style="width:4rem;height: 4rem" v-show="parseFloat(this.cpi.substr(0,this.cpi.indexOf('%'))) >= 90"/>
        </div>
      </div>
    </div>
  </div>
  <!--工作详情弹框-->
  <div class="overDetail" v-show="detailFlag === 'show'">
    <div class="detail-panel" >
      <div class="detail-top" >
        <div class="top-item-span"><button class="top-name">{{this.name}}</button><span class="top-span">工作详情</span></div>
        <div class="top-item-img"><img src="./image/icon_shut.svg" class="top-img" @click="cancelDetail"></div>
      </div>
      <div class="detail-bottom">
        <div class="detail-content">
          <span>地点：</span>{{this.location}}
        </div>
        <div class="detail-content">
          <span>内容：</span>{{this.describe}}
        </div>
      </div>
    </div>
  </div>
  </div>
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
    },
  },
  data() {
    return {
      isOpen:"show0", //项目开合标识 show:显示  hidden:隐藏
      openLast:0, // 记录上一次点击的项目index
      openFlag:1, //偶数展开，奇数合上
      isArrow:"show0", //阶段开合标识 show:显示  hidden:隐藏
      arrowLast:0, // 记录上一次点击的项目index
      arrowFlag:1, //偶数展开，奇数合上
      manDayFlag:"hide", //资源人天弹框显示
      detailFlag:"hide", //详情弹框显示
      pv:0, //计划人天
      cv:0, //剩余人天
      stagename:"",//阶段名称
      cpi:"0%",//百分比
      name:"",//提交人
      location:"",//提交地点
      describe:"",//任务描述
      isCheck:"false",
      checkLast:-1, // 记录上一次选中的项目index
      checkData:[], //上一次选中的数据
      delayListData:[], //延期数据
      isDelay:'hidden',  //延期开合标识 show:显示  hidden:隐藏
      last:0, // 记录上一次点击的项目index
      flag:0, //偶数展开，奇数合上
    }
  },

  methods:{
    //项目展开收缩
    openProject(index) {
      if(index != this.openLast){
        this.isOpen = "hidden";
        this.openFlag = 0;
        //把上一个项目选中的数据取消
        this.isCheck = "false";
        for(var i=0;i<this.checkData.length;i++){
          this.$set(this.checkData[i],"checked",false)
        }
        this.checkLast= -1
      }
      if(this.openFlag % 2 === 0){
        this.isOpen = "show" + index
      }
      else{
        this.isOpen = "hidden"
      }
      this.openLast = index;
      this.openFlag = this.openFlag + 1;
    },
    //阶段展开收缩
    openStage(index){
      if(index != this.arrowLast){
        this.isArrow = "hidden";
        this.arrowFlag = 0
      }
      if(this.arrowFlag % 2 === 0){
        this.isArrow = "show" + index
      }
      else{
        this.isArrow = "hidden"
      }
      this.arrowLast = index;
      this.arrowFlag = this.arrowFlag + 1;
    },
    //去掉百分号
    throwPercent(para){
      var num = para.indexOf('%');
      para = para.substr(0,num-1);
      return para;
    },
    //显示人天
    showManDay(pv,cv,cpi,stagename){
      this.manDayFlag = 'show';
      this.pv = pv;
      this.cv = cv;
      this.cpi = cpi;
      this.stagename = stagename;
    },
    //关闭人天
    cancelManDay(){
      this.manDayFlag = 'hide';
    },
    //显示详细信息
    showDetail(name,location,describe){
      this.detailFlag = 'show';
      this.name = name;
      this.location = location;
      this.describe = describe;
    },
    //关闭详情
    cancelDetail(){
      this.detailFlag = 'hide';
    },
    //选中
    changeClass(item,index,stage,index2){
      if(typeof item.checked=='undefined' ||  item.checked==false){
        this.$set(item,"checked",true)
        this.checkData = stage;
        var num = 1;
        for(var i=0;i<stage.length;i++){
          if(typeof stage[i].checked=='undefined' ||  stage[i].checked==false){
            num = num * 0;
          }else{
            num = num * 1;
          }
        }
        if(num == 1){
          this.isCheck = "check" + index2;
        }
      }else{
        item.checked=!item.checked
        this.isCheck = "false";
        this.checkLast= -1;
      }
    },
    checkListExamine(){
      this.checkListData = document.getElementsByClassName('item-active');
      return this.checkListData
    },
    //全选
    checkAll(data,index){
      this.isCheck = "false";
      for(var i=0;i<this.checkData.length;i++){
        this.$set(this.checkData[i],"checked",false)
      }
      if(this.checkLast != -2){
        if(index != this.checkLast || this.checkLast== -1){
          this.isCheck = "check" + index;
          for(var i=0;i<data.length;i++){
            this.$set(data[i],"checked",true)
          }
          this.checkLast = index;
        }else{
          this.checkLast= -1;
        }
      }else{
        this.checkLast= -1;
      }

      this.checkData = data;
    },
    //延期
    showDelay(pk,index){
      if(index != this.last){
        this.isDelay = "hidden";
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
      }
      else{
        this.isDelay = "hidden"
      }
      this.last = index;
      this.flag = this.flag + 1;
    }
  },
  components:{

  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable"
  .panel
    background-color $color-theme-white
    margin-top 0.2rem
    border-radius 0.3rem
    margin-left 0.2rem
    margin-right 0.2rem
    font-family Microsoft Yahei
    .panelTitle
      width 100%
      display flex
      flex-direction row
      align-items center
      justify-content flex-start
      padding-top 0.3rem
      padding-bottom 0.3rem
      .titleLeft
        margin-left 0.5rem
        font-size $font-size-medium
        font-weight 600
        width 90%
        display flex
        justify-content flex-start
        word-break break-all
        text-align start
        line-height 0.8rem
      .titleRight
        margin-right 0.5rem
        img
          width 1.2rem
          height 1.2rem
    .panelBody
      width 100%
      border-top 1px solid #dcdcdc
      .bodyTop
        padding-left 0.5rem
        padding-top 0.2rem
        padding-bottom 0.2rem
        display flex
        flex-direction row
        align-items center
        justify-content flex-start
        background-color #f5f5f5
        .bodyTopLeft
          width 80%
          display flex
          flex-direction row
          align-items center
          .bodyTitle
            font-size $font-size-medium
            display flex
            justify-content flex-start
            word-break break-all
            text-align start
            line-height 0.8rem
          .allCheckButton
            margin-left 0.5rem
            font-size $font-size-small
            border 1px solid $color-theme
            border-radius 0.8rem
            color $color-theme
            background-color #f5f5f5
            padding 0.2rem 0.4rem
            &.allCheck
              background-color $color-theme
              color $color-theme-white
        .bodyTopRight
          display flex
          align-items center
          .countImg
            width 2rem
            display flex
            align-items center
            justify-content center
            img
              width 1.5rem
              height 1.3rem
          .iconImg
            width 1.2rem
            height 1.2rem
            display flex
            justify-content center
            align-items center
            margin-left 0.3rem
            margin-right 0.5rem
            img
              width 1.0rem
              height 1.0rem
      .bodyContent
        width 100%
        .content-item
          padding-top 0.3rem
          padding-bottom 0.3rem
          padding-left 0.5rem
          border-top 1px solid $color-line
          &.item-active
            background-color $color-background-line
            border-bottom 1px solid $color-background-line
            border-left: 1px solid #00b9ff;
          .item
            display flex
            flex-direction row
            align-items center
            .itemLeft
              width 90%
              .itemLeftTop
                display flex
                flex-direction row
                align-items center
                .name
                  font-size $font-size-small
                  border 1px solid $color-theme
                  border-radius 0.8rem
                  background-color $color-theme
                  color $color-theme-white
                  padding 0rem 0.4rem
                  margin-right 0.4rem
                .date
                  font-size $font-size-small
                  margin-left 0.4rem
                  color $color-project-font
                .time
                  font-size $font-size-small
                  margin-left 0.5rem
                  color $color-project-font
              .itemLeftBottom
                display flex
                flex-direction row
                margin-top 0.3rem
                .detail
                  font-size $font-size-small
                  color $color-theme
                .detailContent
                  font-size $font-size-small
                  color $color-project-font
                  width:75%
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                  text-align start
            .itemRight
              display flex
              align-items center
              justify-content center
              margin-right 0.3rem
              img
                width 1.5rem
                height 1.5rem
          .itemDelay
            display flex
            flex-direction row
            margin-top 0.2rem
            img
              width 1.8rem
              height 1.0rem
            .delay-list
              margin 0.2rem 0rem
              width 90%
              .delay-list-item
                display flex
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
  /*资源人天样式*/
  .overlayer
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 100
    background-color $color-overlayer
    .over-panel
      position fixed
      top 20%
      left 5%
      width 90%
      background-color $color-theme-white
      border-radius 5px
      .over-top
        width 100%
        height 2rem
        display flex
        flex-direction row
        border-bottom 1px solid $color-line
        .top-item-span
          width 80%
          height 100%
          display flex
          align-items center
          justify-content flex-start
          .top-span
            margin-left 0.8rem
            font-size $font-size-medium
            font-weight 500
        .top-item-img
          width 20%
          height 100%
          display flex
          align-items center
          justify-content center
          .top-img
            width 1.2rem
            height 1.2rem
      .over-bottom
        margin-top 1.0rem
        padding-bottom 0.5rem
        .content-top
          display flex
          flex-direction row
          justify-content center
          align-items center
          .planDay
            width 50%
            display flex
            flex-direction column
            align-items center
            justify-content center
            .planDayNum
              font-size $font-size-large-m
              color $color-theme
            .planDayText
              margin-top 0.2rem
              font-size $font-size-medium-x
              color $color-theme
            .surplusDayNum
              font-size $font-size-large-m
              color $color-button-theme
            .surplusDayText
              margin-top 0.2rem
              font-size $font-size-medium-x
              color $color-button-theme
        .content-bottom
          margin-top 0.3rem
          display flex
          justify-content center
          align-items center
  /*工作详情样式*/
  .overDetail
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    z-index 100
    background-color $color-overlayer
    .detail-panel
      position fixed
      top 20%
      left 5%
      width 90%
      background-color $color-theme-white
      border-radius 5px
      .detail-top
        width 100%
        height 2rem
        display flex
        flex-direction row
        border-bottom 1px solid $color-line
        .top-item-span
          width 80%
          height 100%
          display flex
          align-items center
          justify-content flex-start
          .top-name
            margin-left 0.8rem
            font-size $font-size-small
            border 1px solid $color-theme
            border-radius 0.8rem
            background-color $color-theme
            color $color-theme-white
            padding 0rem 0.4rem
            margin-right 0.4rem
          .top-span
            font-size $font-size-medium
            font-weight 500
            color $color-theme
        .top-item-img
          width 20%
          height 100%
          display flex
          align-items center
          justify-content center
          .top-img
            width 1.2rem
            height 1.2rem
      .detail-bottom
        margin-top 0.5rem
        padding-bottom 0.5rem
        margin-left 0.8rem
        margin-right 0.8rem
        .detail-content
          font-size $font-size-medium
          word-break break-all
          text-align start
          line-height 0.8rem
          margin-top 0.2rem
          span
            color $color-theme
</style>
