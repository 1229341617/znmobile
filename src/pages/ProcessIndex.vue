<template>

  <div id="ProcessIndex" ref="ProcessIndex">

    <div class="course" v-infinite-scroll="scrollToEnd" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="my-header">
        <div class="top-Header">
          <div class="back" @click="backhome" style="display: none">
            <img src="../../static/images/back.svg" alt="">
          </div>
          <div class="mySearch">
            <input type="search" style="font-size: 0.6rem;" placeholder="请输入单据名称或发起人查询" v-model="searchname"
                   @keyup.enter="openProject1">
            <!--<i class="mintui mintui-search" @click="openProject1(index$1)"></i>-->
            <img class="searchico" @click="openProject1(index$1)" src="../../static/images/ico_search.svg">
          </div>
        </div>
      </div>
      <!--总-->
      <ul>
        <li :class="{'li-active':item.checked}" class="list-item" v-for="(item,index) in noexamineData"
            @click="changeClass(item,index)" :id="item.pkBilltype">
          <div class="course-info">

            <div class="course-img">
              <div class="image circle">{{item.shortName}}</div>
              <!--<img :src="avatarUrl" alt="">-->
              <p class="lecturerInfo">
                <span class="imgurerName">
                    <span>{{item.senderName}}</span>
                </span>
              </p>
            </div>
            <div class="about-course">
              <p class="course-name">{{ item.billtypename }}</p>
              <p class="promulgateTime">
                <span>{{item.senddate | formatDate}}</span>
              </p>
              <p class="videoInfo" style="display: flex;flex-direction: row">
                <span class="playNums">
                    <img src="../../static/images/message.svg">{{item.total}}条回复</span>
              </p>
            </div>
          </div>
        </li>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="router-view"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view>
      </ul>

      <div class="overlayer" v-show="overlayer">
        <div class="over-panel">
          <div class="over-top">
            <div class="top-item-span">
              <span class="top-span">*驳回原因</span>
            </div>
            <div class="top-item-img">
              <img src="../../static/images/icon_close-13.svg" class="top-img"
                   @click="rejectCancel">
            </div>
          </div>
          <div class="reject-box">
            <textarea class="reject-area" v-model="getReject"></textarea>
          </div>
          <div class="over-bottom">
            <button class="over-confirm" @click="rejectConfirm">确定</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import noexamineList from '../components/noexamine-list.vue'
  import {formatDate} from '../common/js/date.js'
  import {getUnExamineList, getExamineList, approval} from '../common/js/http.js'
  import {Search, Button, Loadmore, Spinner,  Toast, Indicator,InfiniteScroll} from 'mint-ui'
  import Vue from 'vue'
 Vue.use(InfiniteScroll) //滚动
  import Header from '../components/Header'
  //import $ from 'jquery';
  import sidebar from './Sidebar'

  export default {
    name: 'ProcessIndex',
    data() {
      return {
        searchname:'',//搜索的关键字
        index$1:0,
        isOpen1:"show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag1:0, //偶数展开，奇数合上
        avatarUrl:'../static/images/girl.svg',
        isOpen:"show", //项目开合标识 show:显示  hidden:隐藏
        isCheck:"false",
        isArrow:"show", //阶段开合标识 show:显示  hidden:隐藏
        isDelay:'hidden',  //延期开合标识 show:显示  hidden:隐藏
        currentIndex:"noexamine" ,//noexamine是未审批，examine是已审批
        pageIndex:0 ,  //当前页
        pageSize:5 ,  //每页显示条数
        noexamineData:[],//未审批数据
        examineData:[], //当前列表数据
        checkListData:[], //被选中的数据
        checkListId:'',
        overlayer:false,
        delayListData:[], //延期数据
        getReject:'', //驳回原因
        loading:true,
      }
    },
    filters: {
      formatDate (time) {
        let a=time.replace(/\s+/g,'T');
        let date = new Date(a)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    //初始化页面
    mounted() {
      this.initUnExamine();
    },
    deactivated(){
      this.loading = true;
      //console.log(this.loading);
    },
    methods: {
      //项目展开收缩
      openProject1(index) {
        if(this.openFlag1 % 2 === 0){
          this.isOpen1 = "show" + index
        }else{
          this.isOpen1 = "hidden";
        }
        this.openFlag1 = this.openFlag1 + 1;
        this.getUnExamineDate();
      },
      //获取人员照片
        geturl: function (data) {
        return BashImgUrl + data;
      },
      // 回到首页
      backhome: function () {
        this.$router.push('/');
      },
      // 跳到新页面
      changeClass: function (item1, index1) {
        console.log(item1);
        if (item1.mobilebilltype == "type01") {
          this.$router.push({
            path: '/TravelDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
          //this.$router.push({path:'/travelDetail/:billtype/:billid/:checkman/:pk_flow/:mobilebilltype/:workflowtype/:billtypename',query:{billtype:item1.pkBilltype,billid:item1.billid,checkman:item1.checkman,pk_flow:item1.taskid,mobilebilltype:item1.mobilebilltype,workflowtype:item1.workflow_type,billtypename:item1.billtypename}});
        } else if (item1.mobilebilltype == "type02") {
          //this.$router.push({name:'EntertainmentDetail',params:{billtype:item1.pkBilltype,billid:item1.billid,checkman:item1.checkman,pk_flow:item1.taskid,mobilebilltype:item1.mobilebilltype,workflowtype:item1.workflow_type,billtypename:item1.billtypename}});
          this.$router.push({
            path: '/EntertainmentDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type03") {
          this.$router.push({
            path: '/CommonDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type04") {
          this.$router.push({
            path: '/BenefitDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type05") {
          this.$router.push({
            path: '/InvoiceInDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type06") {
          this.$router.push({
            path: '/ServeNeedApplyDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type07") {
          this.$router.push({
            path: '/CostPsnDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type08") {
          this.$router.push({
            path: '/ComputerDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type09") {
          this.$router.push({
            path: '/CostClassDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type10") {
          this.$router.push({
            path: '/SalesPropDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type11") {
          this.$router.push({
            path: '/PublicBusDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type12") {
          this.$router.push({
            path: '/RepaymentDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type13") {
          this.$router.push({
            path: '/BorrowPsnDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type14") {
          this.$router.push({
            path: '/BorrowPubDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type15") {
          this.$router.push({
            path: '/ServePutDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else if (item1.mobilebilltype == "type16") {
          this.$router.push({
            path: '/OilCardDetail',
            query: {
              billtype: item1.pkBilltype,
              billid: item1.billid,
              checkman: item1.checkman,
              pk_flow: item1.taskid,
              mobilebilltype: item1.mobilebilltype,
              workflowtype: item1.workflow_type,
              billtypename: item1.billtypename
            }
          });
        } else {
          Toast(item1.billtypename + "暂未开放移动审批..");
        }
      },
      // 搜索框获得焦点时，跳转新的页面搜索
      toSearch: function () {
        this.$router.push('/Search');
      },
      //第一次获得未审批列表数据
      getUnExamineDate(){
        console.log("二"+global.code)
        if(typeof global.code == "undefined" || global.code == null || global.code == ""){
          global.code=this.$route.query.code;
        }
        var that = this;
        console.log("三"+global.code)
        let params={
          code:global.code,
          userid:global.userid,
          searchname:encodeURI(that.searchname)
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getUnExamineList(params).then(res=>{
          Indicator.close();
          if (res.flag === "success"){
            that.noexamineData = res.data;
            //console.log(res.data);
            if(that.noexamineData.length === 0){
              Toast("没有待审批数据");
            }
          }else {
            Toast("获取失败,"+res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      //第一次获得已审批列表数据
      getExamineDate() {
        this.pageIndex = this.pageIndex + 1;
        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        getExamineList(params).then(res => {
          if (res.flag === "success") {
            this.examineData = res.data;
            if (this.examineData.length === 0) {
              Toast("亲，没有已审批数据哦");
            }
          } else {
            Toast("获取失败," + res.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      //下拉刷新获得列表数据
      scrollToEnd() {
        this.loading = true;
        this.pageIndex = this.pageIndex + 1;
        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        if ('noexamine' == this.currentIndex) {
          getUnExamineList(params).then(res => {
            if (res.flag === "success") {
              if (res.data.length === 0) {
                Toast("我是有底线的哦");
              }
              let examineData = res.data;
              this.examineData.push(...examineData)
            } else {
              Toast("获取失败," + res.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
        if ('examine' == this.currentIndex) {
          getExamineList(params).then(res => {
            if (res.flag === "success") {
              if (res.data.length === 0) {
                Toast("没有更多数据");
              }
              let examineData = res.data;
              this.examineData.push(...examineData)
            } else {
              Toast("获取失败," + res.msg);
            }
          }).catch(function (error) {
            console.log(error);
          });
        }
        this.loading = false;
      },
      //全选
      checkAllProject() {
        var box = document.getElementsByClassName('exam-box');
        if (box[0].checked === true) {
          this.$refs.examineList.checkAllList()
        } else {
          this.$refs.examineList.cancelAllList()
        }
      },
      //审批
      approveProject() {
        var checkId = "";
        this.checkListData = this.$refs.examineList.checkList(); //被选中的数据
        if (this.checkListData.length === 0) {
          Toast("请选择要审批的项目")
          return
        } else {
          for (var i = 0; i < this.checkListData.length; i++) {
            checkId = checkId + this.checkListData[i].id;
            if (i != this.checkListData.length - 1) {
              checkId = checkId + ","
            }
          }
        }
        let params = {
          id: checkId,
          flag: "1"
        };
        approval(params).then(res => {
          document.getElementsByClassName('exam-box')[0].checked = false
          this.initUnExamine()
          if (res.flag === "success") {
            Toast("审批成功");
          } else {
            Toast("审批失败," + res.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      //驳回
      rejectProject() {
        this.checkListId = "";
        this.getReject = "";
        this.checkListData = this.$refs.examineList.checkList(); //被选中的数据
        if (this.checkListData.length === 0) {
          Toast("请选择要驳回的项目")
          return
        } else {
          for (var i = 0; i < this.checkListData.length; i++) {
            this.checkListId = this.checkListId + this.checkListData[i].id;
            if (i != this.checkListData.length - 1) {
              this.checkListId = this.checkListId + ","
            }
          }
          this.rejectShow()
        }

      },
      rejectShow() {
        this.overlayer = true
      },
      rejectCancel() {
        this.overlayer = false
      },
      rejectConfirm() {
        if (this.getReject === "") {
          Toast({
            message: "请输入驳回原因",
            duration: 1500
          });
          return
        }
        let params = {
          id: this.checkListId,
          flag: "2",
          text: this.getReject
        };
        approval(params).then(res => {
          document.getElementsByClassName('exam-box')[0].checked = false
          this.initUnExamine()
          if (res.flag === "success") {
            Toast("驳回成功");
          } else {
            Toast("驳回失败," + res.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
        this.getReject = ""
        this.rejectCancel()
      },
      //弃审
      abandonProject() {
        var checkId = "";
        this.checkListData = this.$refs.examineList.checkList(); //被选中的数据
        if (this.checkListData.length === 0) {
          Toast("请选择要弃审的项目")
          return
        } else {
          for (var i = 0; i < this.checkListData.length; i++) {
            checkId = checkId + this.checkListData[i].id;
            if (i != this.checkListData.length - 1) {
              checkId = checkId + ","
            }
          }
        }
        let params = {
          id: checkId,
          flag: "3"
        };
        approval(params).then(res => {
          document.getElementsByClassName('exam-box')[0].checked = false;
          this.initExamine();
          if (res.flag === "success") {
            Toast("弃审成功");
          } else {
            Toast("弃审失败," + res.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      //初始化
      initUnExamine() {
        this.pageIndex = 0;
        this.getUnExamineDate()
      },
      initExamine() {
        this.pageIndex = 0;
        this.getExamineDate()
      }

    },
    components: {
      'my-header': Header,
      'mt-button': Button,
      Spinner,
      Search,
      noexamineList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable"
  #ProcessIndex {
    position: absolute;
    width: 100%;
    margin-bottom: 15%;
  }

  .my-header {
    text-align: center;
    color: #fff;
    position: relative;
  }

  .my-header .top-Header {
    height: 2.5rem;
    text-align: left;

  }

  .back {
    /* margin: 0.5rem; */
    position: absolute;
    top: 0.75rem;
    left: 0.65rem;
    display: inline-block;
  }

  .back img {
    width: 1rem;
    height: 1rem;
  }

  .user-header {
    height: 5rem;
    text-align: left;
    position: relative;
    background-image: url("../../static/images/home_img.svg");
    background-repeat: no-repeat;
    background-size: cover;
    /* fallback for old browsers */
    /* background: -webkit-linear-gradient(to top, #06CF86, #86c840);
     /* Chrome 10-25, Safari 5.1-6 */
    /* background: linear-gradient(to bottom, #86c840, #86c840);
     /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .user-header .avatar {
    position: absolute;
    text-align: center;
    width: 40%;
    display: inline-block;
  }

  .user-header .avatar img {
    margin-top: 1rem;
    border-radius: 100%;
    display: inline-block;
    width: 3rem;
    height: 3rem;
  }

  .user-header .header-title {
    margin-top: 1.5rem;
    margin-left: 40%;
    display: inline-block;
  }

  .user-header .header-title p {
    font-size: 0.8rem;
  }

  .user-header .filter {
    position: absolute;
    top: 0.25rem;
    right: 0.5rem;
  }

  .user-header .filterBtn {
    position: relative;
    font-size: 0.6rem;
    color: #06CF86;
    background-color: #fff;
    border: 0;
    width: 3.25rem;
    height: 1.3rem;
    line-height: 1.4rem;
    border-radius: 0.75rem;
    text-align: center;
    margin: 0.25rem 0 0.5rem 0;
    display: inline-block;
  }

  .filter img {
    margin-top: 0.2rem;
    left: 0.3rem;
    position: absolute;
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }

  .filter span {
    color: #86c840;
    margin-left: 1rem;
  }

  .mint-loadmore {
    width: 100%;
  }

  a {
    text-decoration: none
  }

  li {
    list-style: none;
  }

  .search-input .mint-search {
    height: 2.5rem;
  }

  .tip {
    display: inline-block;
    margin-top: 2rem;
    text-align: center;
  }

  .fixheight {
    height: 480px;
  }

  //分隔
  .tab
    position absolute
    top 0
    left 0
    width 100%
    display flex
    height 2rem
    line-height 2rem
    font-size $font-size-medium
    background #FFFFFF
    border-bottom 1px solid #DCDCDC
    .tab-item
      flex 1
      text-align center
      display flex
      justify-content center
      &.current
        .tab-link
          color $color-theme
          border-bottom 1px solid $color-theme
      .tab-link
        height 100%
        padding-left 0.5rem
        padding-right 0.5rem
        color #666

  .noexamine-list
    position absolute
    top 2rem
    left 0
    right 0
    bottom 3rem
    width 100%

  .exam-bottom
    position absolute
    bottom 0
    left 0
    width 100%
    height 3rem
    background-color $color-theme
    display flex
    .exam-left
      width: 50%
      display flex
      align-items center
      justify-content flex-start
      .exam-box
        margin-left 1rem
        width 1rem
        height 1rem
        background-color $color-theme
      .exam-span
        margin-left 0.5rem
        color $color-theme-white
        font-size $font-size-large
    .exam-right
      width: 50%
      display flex
      justify-content flex-end
      align-items center
      .right-button
        padding 0.2rem 0.5rem
        border 1px solid $color-button-theme
        border-radius 0.8rem
        background-color $color-button-theme
        color $color-theme-white
        margin-right 1rem

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
            color $color-theme
            margin-left 0.8rem
        .top-item-img
          width 20%
          height 100%
          display flex
          align-items center
          justify-content center
          .top-img
            width 1.5rem
            height 1.5rem
      .reject-box
        margin-top 0.2rem
        .reject-area
          border-style none
          border-color #FFFFFF
          outline none
          overflow auto
          resize none
          width 90%
          height 4rem
          overflow-y scroll
      .over-bottom
        width 100%
        display flex
        justify-content center
        align-items center
        border-top 1px solid $color-line
        .over-confirm
          margin-top 0.2rem
          margin-bottom 0.2rem
          padding 0.1rem 0.4rem
          border 1px solid $color-button-theme
          border-radius 0.8rem
          background-color $color-button-theme
          color $color-theme-white

  .my-header {
    text-align: center;
    color: #fff;
    position: relative;
  }

  .my-header .top-Header {
    height: 2.5rem;
    text-align: left;

  }

  .back {
    /* margin: 0.5rem; */
    position: absolute;
    top:0.75rem;
    left:0.65rem;
    display: inline-block;
  }

  .back img {
    width: 1rem;
    height: 1rem;
  }

  .mySearch {
    margin-top: 0.3rem;
    /*  margin-left: 1.75rem;*/
    display: inline-block;
    width: 100%;
    height:1.5rem;
    line-height: 1.5rem;
    /* padding: 0.25rem 0.25rem; */
    border: 0.05rem solid #fff;
    border-radius: 1rem;
    /*background-color: #86c840;*/
  }

    .mySearch .searchico {
      float:right ;
      width: 1.2rem;
      height:1.2rem;
      margin-bottom 0rem;
      margin-right: 1.5rem;
      color: #80bafe;
    }
  .mySearch .mintui-search {
    float:right ;
    margin-right: 1.5rem;
    color: #80bafe;
  }

  .mySearch input {
    margin-left:1.5rem;
    padding:0.2rem 0;
    height:1.5rem;
    width: 70%;
    text-indent: 0;
    border: 0;
    background-color: #fbf9fe;
    outline: none;
    /* opacity: 0.2; */
  }

  .mySearch input::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #5a5a5a;
  }

  .mySearch input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #5a5a5a;
  }

  .mySearch input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #5a5a5a;
  }

  .mySearch input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #5a5a5a;
  }

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

  .course-info {
    position: relative;
    text-align: left;
    /* background-color:aqua;    */
    /* margin-top: 0.5rem; */
    min-height: 4rem;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
  }

  .course-info .course-link {
    color: #000;
  }
  .exam-bottom
    position absolute
    bottom 0
    left 0
    width 100%
    height 3rem
    background-color $color-theme
    display flex
    .exam-left
      width:35%
      display flex
      align-items center
      justify-content flex-start
      .checkAll
        display flex
        align-items center
        justify-content flex-start
        .exam-box
          margin-left 1rem
          width 1.5rem
          height 1.5rem
        .exam-span
          margin-left 0.5rem
          color $color-theme-white
          font-size $font-size-large
    .exam-right
      width:65%
      display flex
      justify-content flex-end
      align-items center
      .right-button
        font-size $font-size-medium
        padding 0.2rem 0.5rem
        border 1px solid $color-button-theme
        border-radius 0.8rem
        background-color $color-button-theme
        color $color-theme-white
        margin-right 0.8rem
  .course-info .course-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 25%;
    /* min-height: 80%;   */
    display: inline-block;
  }

  .course-info .course-img .img{
    margin-top:0.75rem;
    margin-left:0.5rem;
    height: 2.05rem;
    width:4rem;
  }
  .course-info .course-img .lecturerInfo .imgurerName{
    margin-left:1.45rem;
    margin-top:0.75rem;
  }

  .about-course {
    margin-left:25%;
    padding-top:0.25rem;
    min-height:4rem;
    /* background-color:blueviolet;     */
    padding-left:0.3rem;
    /* margin-right:0.5rem; */
    width:60%;
    text-align: left;
    display: inline-block;
  }

  .about-course p {
    margin: 0.25rem 0;
  }

  .course-info .course-link .course-name {
    min-height: 1rem;
    max-height: 2rem;
    text-align: left;
    color: #333333;
  }

  .course-info .lecturerInfo,
  .course-info .promulgateTime,
  .course-info .videoInfo {
    min-height: 0.5rem;
    font-size: 0.6rem;
    color: #999999;
    text-align: left;
  }

  .lecturerInfo .lecturerName {
    margin-right: 0.25rem;
  }

  .videoInfo span {
    margin-right: 0.25rem;
    display: flex;
    flex-direction: row;
    width: 4.4rem;
    height: 0.7rem;
    line-height: 0.7rem;
  }
  .videoInfo .playNums img,
  .videoInfo .likesNums img,
  .videoInfo .commentNums img,
  .videoInfo .favoriteNums img{
    margin-right: 0.25rem;
    width: 0.7rem;
    height: 0.7rem;
    align-content: center;
  }
  .circle {
    display: inline-block;
    min-width: 1.5rem;
    background: #A57666;
    border-radius:50%;
    text-align: center;
    padding-left: 0.5em;
    padding-right: 0.3em;
    margin-top:0.25rem;
    margin-left:1.25rem;
    line-height: 1em;
    word-wrap: white-space;
    color: #fff;
    text-transform: uppercase;
    font-family: sans-serif;
    &:before, &:after {
      content: '';
      display: block;
      padding: 25%;
    }
  }
</style>
