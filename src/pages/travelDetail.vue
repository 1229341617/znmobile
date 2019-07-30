<template>
  <!--项目-项目的录入-->
  <div style="overflow: hidden">
    <!--协同详情、返回-->
    <mt-header class="my-header" title="协同详情" style="width:100%;position:fixed;top:0;left:0;z-index:999">
      <div slot="left" @click="goBack()">
        <mt-button icon="back" class="top-Header">返回</mt-button>
      </div>
    </mt-header>
    <!--协同详情、返回end-->
    <!--头部报销类型、姓名、时间-->
    <div class="title_header">
      <ul class="belowheader">
        <li class="belowheader-item">
          <div class="belowheader-left">
            <span class="belowheader-title" style="font-size:18px;">{{billtypename}}</span>
          </div>
        </li>
        <li class="belowheader-item">
          <div class="belowheader-left">
            <span class="belowheader-title" style="font-size:14px;">{{jkbxr}}</span>
            <span class="belowheader-input" style="font-size:14px;">{{djrq}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!--头部报销类型、姓名、时间end-->
    <!--基本信息-->
    <div class="bx_content" v-show="flags">
      <ul class="entering">
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">说明：</span>
            <span class="entering-input">审批记录请点击处理左侧按钮查看</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">编号：</span>
            <span class="entering-input">{{djbh}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">日期：</span>
            <span class="entering-input">{{djrq}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">报销人：</span>
            <span class="entering-input">{{jkbxr}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">金额：</span>
            <span class="entering-input">{{bbje}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">报销人单位：</span>
            <span class="entering-input">{{pk_org}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">报销人部门：</span>
            <span class="entering-input">{{deptid}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">费用承担单位：</span>
            <span class="entering-input">{{fydw}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">费用承担部门：</span>
            <span class="entering-input">{{fydwbm}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">报销事由：</span>
            <span class="entering-input">{{zyx5}}</span></div>
        </li>
      </ul>
      <div class="panel_bottom">
        <div>
        </div>
      </div>
    </div>
    <!--基本信息end-->
    <!--<div class="panel_bottom">
      <div>
      </div>
    </div>-->
    <!--关闭附件-->
    <div class="fujian_close" v-show="flags2">
      <div class="fu_look" @click="closeFu">
        <div class="ful">
          <img class="img_fu" src="./image/icon_detail.svg">
        </div>
        <div class="fum">
          <span>详细</span>
        </div>
        <div class="fur">
          <img class="img_arrows_down" src="./image/icon_arrows_down.svg">
        </div>
      </div>
      <!--意见-->
      <!--<div class="panel">
        <div class="panelTitle" @click="openProject7(index$7)">
          <div class="titleLeft">交通费意见</div>
          <div class="titleRight">
            <img src="./image/icon_close.svg" v-show="'show'+index$7 === isOpen7"/>
            <img src="./image/icon_open.svg" v-show="'show'+index$7 !== isOpen7"/>
          </div>
        </div>
        <div class="panelBody" v-show="'show'+index$7 === isOpen7">
          <ul class="enteringchecknote">
            <li class="entering-checknotesub" >
              <div >
               <mt-field label="" placeholder="填写意见" type="textarea" rows="2" v-model="checkNote"></mt-field>
              </div>
            </li>
          </ul>
        </div>
      </div>-->
      <!--交通费-->
      <div class="panel">
        <div class="panelTitle" @click="openProject1(index$1)">
          <div class="titleLeft"><span>交通费</span></div>
          <div class="titleRight">
            <img src="./image/icon_close.svg" v-show="'show'+index$1 === isOpen1"/>
            <img src="./image/icon_open.svg" v-show="'show'+index$1 != isOpen1"/>
          </div>
        </div>
        <div class="panelBody" v-for="(item,index2) in trafficItemList" v-show="'show'+index$1 === isOpen1">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">交通费金额:</span>
                <span class="entering-input">{{item.trafficamount}}</span>
              </div>
            </li>
            <li class="entering-itemsub" @click="selectStage">
              <div class="entering-left">
                <span class="entering-title">出发日期:</span>
                <span class="entering-input">{{item.startdate}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">出发地点:</span>
                <span class="entering-input">{{item.startplace}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">到达日期:</span>
                <span class="entering-input">{{item.arrivedate}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">到达地点:</span>
                <span class="entering-input">{{item.arriveplace}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="panelBody" v-show="'show'+index$1 === ishavedata1">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">无数据</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--住宿费-->
      <div class="panel">
        <div class="panelTitle" @click="openProject2(index$2)">
          <div class="titleLeft"><span>住宿费</span></div>
          <div class="titleRight">
            <img src="./image/icon_close.svg" v-show="'show'+index$2 === isOpen2"/>
            <img src="./image/icon_open.svg" v-show="'show'+index$2 != isOpen2"/>
          </div>
        </div>
        <div class="panelBody" v-for="(item,index3) in hotelItemList" v-show="'show'+index$2 === isOpen2">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">住宿费用金额:</span>
                <span class="entering-input">{{item.hotelamount}}</span>
              </div>
            </li>
            <li class="entering-itemsub" @click="selectStage">
              <div class="entering-left">
                <span class="entering-title">入住时间:</span>
                <span class="entering-input">{{item.arrivedate}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">离开时间:</span>
                <span class="entering-input">{{item.leavedate}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">住宿天数:</span>
                <span class="entering-input">{{item.ndays}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="panelBody" v-show="'show'+index$2 === ishavedata2">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">无数据</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--补贴费-->
      <div class="panel">
        <div class="panelTitle" @click="openProject3(index$3)">
          <div class="titleLeft"><span>补贴费</span></div>
          <div class="titleRight">
            <img src="./image/icon_close.svg" v-show="'show'+index$3 === isOpen3"/>
            <img src="./image/icon_open.svg" v-show="'show'+index$3 != isOpen3"/>
          </div>
        </div>
        <div class="panelBody" v-for="(item,index4) in allowanceItemVOList" v-show="'show'+index$3 === isOpen3">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">补助金额:</span>
                <span class="entering-input">{{item.allowanceamount}}</span>
              </div>
            </li>
            <li class="entering-itemsub" @click="selectStage">
              <div class="entering-left">
                <span class="entering-title">出差天数:</span>
                <span class="entering-input">{{item.allowancedays}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">出差补贴标准:</span>
                <span class="entering-input">{{item.allowancerule}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="panelBody" v-show="'show'+index$3 === ishavedata3">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">无数据</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--冲销金额-->
      <div class="panel">
        <div class="panelTitle" @click="openProject4(index$4)">
          <div class="titleLeft"><span>冲销金额</span></div>
          <div class="titleRight">
            <img src="./image/icon_close.svg" v-show="'show'+index$4 === isOpen4"/>
            <img src="./image/icon_open.svg" v-show="'show'+index$4 != isOpen4"/>
          </div>
        </div>
        <div class="panelBody" v-for="(item,index5) in writeoffList" v-show="'show'+index$4 === isOpen4">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">借款单号:</span>
                <span class="entering-input">{{item.jkdjbh}}</span>
              </div>
            </li>
            <li class="entering-itemsub" @click="selectStage">
              <div class="entering-left">
                <span class="entering-title">借款人:</span>
                <span class="entering-input">{{item.psnname}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">借款部门:</span>
                <span class="entering-input">{{item.deptname}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">冲销金额:</span>
                <span class="entering-input">{{item.cjkybje}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">冲销日期:</span>
                <span class="entering-input">{{item.cxrq}}</span>
              </div>
            </li>
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">生效日期:</span>
                <span class="entering-input">{{item.sxrq}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="panelBody" v-show="'show'+index$4 === ishavedata4">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">无数据</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--附件-->
      <div class="panel">
        <div class="panelTitle" @click="openProject5(index$5)">
          <div class="titleLeft"><span>附件</span></div>
          <div class="titleRight">
            <img src="./image/icon_close.svg" v-show="'show'+index$5 === isOpen5"/>
            <img src="./image/icon_open.svg" v-show="'show'+index$5 != isOpen5"/>
          </div>
        </div>
        <div class="panelBody" v-for="(item,index5) in attachmentList" v-show="'show'+index$5 === isOpen5">
          <a id="fileHref" style="display: none" target="_blank"><span id="downSpan">下载附件</span></a>
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                  <span class="entering-input" @click="openFile(item.pk)">{{item.filename}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="panelBody" v-show="'show'+index$5 === ishavedata5">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <span class="entering-title">无数据</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--影像-->
      <div class="panel">
        <div class="panelTitle" @click="openProject6(index$6)">
          <div class="titleLeft">影像</div>
          <div class="titleRight">
            <img src="./image/icon_close.svg" v-show="'show'+index$6 === isOpen6"/>
            <img src="./image/icon_open.svg" v-show="'show'+index$6 != isOpen6"/>
          </div>
        </div>
        <div class="panelBody" v-show="'show'+index$6 === isOpen6">
          <ul class="entering">
            <li class="entering-itemsub">
              <div class="entering-left">
                <!--<a :href="this.imgURL">-->
                <router-link :to="{name:'ImageDetail',query:{imgURL:imgURL}}">
                  <span class="entering-input" style="background-color: #f5f5f5">查看影像</span>
                </router-link>
                <!--</a>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="panel_bottom">
        <div>
        </div>
      </div>
      <div>
      </div>
    </div>

    <!--关闭附件end-->
    <!--处理、打开附件-->
    <div class="btn">
      <!--打开附件-->
      <span class="fu_splite_1" v-if="flags"></span>
      <div v-if="flags" class="fu_look" @click="openFu()">
        <div class="ful">
          <img class="img_fu" src="./image/icon_detail.svg">
        </div>
        <div class="fum">
          <span>详细</span>
        </div>
        <div class="fur">
          <img class="img_arrows_up" src="./image/icon_arrows_up.svg">
        </div>
      </div>
      <div class="fu_splite_2" v-if="flags"></div>
      <!--打开附件end-->
      <img class="morebtnl" src="./image/icon_edit.svg" @click="approvehistoryinfo">
      <mt-button class="popupbtn" @click="deal">处理</mt-button>
      <img class="morebtnr" src="./image/icon_dot.svg" @click="showSheetVisible">
    </div>
    <!--处理、打开附件end-->
    <mt-actionsheet v-model="sheetVisible" cancel-text="取消">1</mt-actionsheet>
    <div class="panel_bottom">
      <div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Toast, Indicator, Header, Button, Popup,Actionsheet} from 'mint-ui'

  Vue.component(Popup.name, Popup);
  Vue.component(Button.name, Button);
  import {formatDate} from '../common/js/date.js'
  import Vue from 'vue'
  //Vue.use(InfiniteScroll) //滚动
  import {
    getProjectList,
    getStageList,
    getTsakList,
    saveEnterData,
    getBillDetail,
    approval,
    getfilelist,
    getimagelist,
    downFile
  } from '../common/js/http.js';

  Vue.component(Header.name, Header);
  export default {
    props: {
      ispro: true, //项目：true 假期：false
    },
    data() {
      return {
        msg: '组件',
        popupVisible: false,
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            pider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot3',
            textAlign: 'left'
          }
        ],
        index$1: 0,
        isOpen1: "show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag1: 0, //偶数展开，奇数合上
        ishavedata1:"show1",
        index$2: 0,
        isOpen2: "show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag2: 0, //偶数展开，奇数合上
        ishavedata2:"show1",
        index$3: 0,
        isOpen3: "show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag3: 0, //偶数展开，奇数合上
        ishavedata3:"show1",
        index$4: 0,
        isOpen4: "show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag4: 0, //偶数展开，奇数合上
        ishavedata4: "show1",//是否有数据
        index$5: 0,
        isOpen5: "show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag5: 0, //偶数展开，奇数合上
        ishavedata5: "show1",//是否有数据
        index$6: 0,
        isOpen6: "show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag6: 0, //偶数展开，奇数合上
        index$7: 1,
        isOpen7: "show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag7: 1, //偶数展开，奇数合上
        isArrow: "show0", //阶段开合标识 show:显示  hidden:隐藏
        arrowLast: 0, // 记录上一次点击的项目index
        arrowFlag: 1, //偶数展开，奇数合上
        isDelay: 'hidden',  //延期开合标识 show:显示  hidden:隐藏
        checkData: [], //上一次选中的数据
        last: 0, // 记录上一次点击的项目index
        flag: 0, //偶数展开，奇数合上
        billtypeparam: '',//传递过来的pk
        billidparam: '',//传递过来的billid
        checkmanparam: '',//传递过来的checkman
        pk_flowparam: '',//传递过来的pk_flow
        mobilebilltypeparam: '',//传递过来的mobilebilltype
        workflowtypeparam: '',//传递过来的workflowtype
        checkNote: '',//办理意见
        djbh: '',
        djrq: '',
        jkbxr: '',
        bbje: '',
        pk_org: '',
        deptid: '',
        fydw: '',
        fydwbm: '',
        zyx5: '',
        trafficItemList: [],
        hotelItemList: [],
        allowanceItemVOList: [],
        writeoffList: [],
        attachmentList: [],
        imageList: [],
        noexamineData: [],
        imageurl: '',
        workDate: [],  //日期
        projectName: '', //项目
        projectCode: '',
        projectId: '',
        stageName: '',  //阶段
        stageCode: '',
        startTime: '08:00', //开始时间
        endTime: '17:00',  //结束时间
        workTime: '8',  //工作时长
        isToAway: 1,
        isAwayUrl: '../../static/images/icon_no-10.svg',
        isAwayText: '否',  //是否出差
        placeText: '',  //地点
        taskName: '',   //任务描述
        projectData: [],
        stageData: [],
        taskData: [],
        timeData: [
          "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00",
          "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
          "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
          "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
          "22:00", "22:30", "23:00", "23:30"
        ],
        timeFlag: "", //默认为空，选择开始时间为start，结束时间为end
        id: '',
        requestFlag: 'true', //true:可以请求  false:不可以请求
        siteimg: '../../static/images/icon_site-11.svg',
        billtypename: '',
        flags: true,
        flags1: true,
        flags2: false,
        fuCount: 1,
        checkValue: '同意',//同意、不同意
        loading: false,
        scrollY: 0,
        imgURL:'',
        _imgURL:'',
        _attachmentList:[],
        trafficCount:1,
        hotelCount:1,
        allowanceCount:1,
        writeoffCount:1,
        sheetVisible:false
      }
    },
    filters: {
      formatDate(time) {
        if (time === '' || time === undefined) {
          return "";
        }
        let a = time.replace(/\s+/g, 'T');
        let date = new Date(a);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    mounted() {
      this.initIteminfo();
    },
    created() {
      this.billtypeparam = this.$route.query.billtype; //从待办列表传递过来的参数
      this.billidparam = this.$route.query.billid; //从待办列表传递过来的参数
      this.checkmanparam = this.$route.query.checkman; //从待办列表传递过来的参数
      this.pk_flowparam = this.$route.query.pk_flow; //从待办列表传递过来的参数
      this.mobilebilltypeparam = this.$route.query.mobilebilltype; //从待办列表传递过来的参数
      this.workflowtypeparam = this.$route.query.workflowtype;
      this.billtypename = this.$route.query.billtypename;
    },
    methods: {
      //打开附件
      openFile(pk) {
        console.log("aa" + pk);
        downFile(pk).then(res => {
          var a = document.getElementById("fileHref");
          a.href =  global.Base+ res.path;
          var span = document.getElementById("downSpan");
          setTimeout(() => {
            a.click();
            span.click();
          }, 10);
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      showSheetVisible(){
        this.sheetVisible = true;
      },
      //查看审批信息
      approvehistoryinfo() {
        this.$router.push({path: '/ApprovalDetails',query:{
          billid: this.billidparam,
          billtype: this.billtypeparam,
        }});
      },
      //处理
      deal() {
        this.$router.push({path: '/DealDetail',query:{
            billid:this.billidparam,
            billtype:this.billtypeparam,
            checknote:this.checkmanparam,
            pk_flow:this.pk_flowparam,
            workflowtype:this.workflowtypeparam,
            checkman:this.checkmanparam
          }});
      },
      //获得单选值
      getCheckValue() {
        console.log(this.checkValue);
        if (this.checkValue === "同意") {
          this.approveDetail();
        } else {
          this.rejectDetail();
        }
      },
      //返回
      goBack() {
        this.$router.go(-1);
      },
      //打开附件
      openFu() {
        this.flags = false;
        this.flags1 = false;
        this.flags2 = true;
        //console.log(this.flags1);
      },
      //关闭附件
      closeFu() {
        this.flags2 = false;
        this.flags1 = true;
        this.flags = true;
      },
      handleClick: function () {
        this.popupVisible = true
      },// edit by chenchong
      backhome() {
        this.$router.push('/');
      },
      //项目展开收缩
      openProject1(index) {
        if (this.openFlag1 % 2 === 0) {
          this.isOpen1 = "show" + index;
        }else {
          this.isOpen1 = "hidden";
        }
        this.openFlag1 = this.openFlag1 + 1;
        if(!this.trafficItemList[0] && this.isOpen1!="hidden"){
          this.ishavedata1 = "show" + index;
        }else{
          this.ishavedata1 = "hidden";
        }
      },
      openProject2(index) {
        if (this.openFlag2 % 2 === 0) {
          this.isOpen2 = "show" + index
        }
        else {
          this.isOpen2 = "hidden"
        }
        this.openFlag2 = this.openFlag2 + 1;
        if(!this.hotelItemList[0] && this.isOpen2!="hidden"){
          this.ishavedata2 = "show" + index;
        }else{
          this.ishavedata2 = "hidden";
        }
      },
      openProject3(index) {
        if (this.openFlag3 % 2 === 0) {
          this.isOpen3 = "show" + index
        }
        else {
          this.isOpen3 = "hidden"
        }
        this.openFlag3 = this.openFlag3 + 1;
        if(!this.allowanceItemVOList[0] && this.isOpen3!="hidden"){
          this.ishavedata3 = "show" + index;
        }else{
          this.ishavedata3 = "hidden";
        }
      },
      openProject4(index) {
        if (this.openFlag4 % 2 === 0) {
          this.isOpen4 = "show" + index
        }
        else {
          this.isOpen4 = "hidden"
        }
        this.openFlag4 = this.openFlag4 + 1;
        if (!this.writeoffList[0] && this.isOpen4 != "hidden") {
          this.ishavedata4 = "show" + index
        } else {
          this.ishavedata4 = "hidden"
        }
      },
      openProject5(index) {
        if (this.openFlag5 % 2 === 0) {
          this.isOpen5 = "show" + index
        }
        else {
          this.isOpen5 = "hidden"
        }
        if (this.openFlag5 === 0) {
          if(this.fuCount > 0){
            this.attachmentList = this._attachmentList;
          }else{
            Toast("获取失败,暂无附件");
          }

          //this.getfilelist();
        }
        this.openFlag5 = this.openFlag5 + 1;
        if (!this.attachmentList[0] && this.isOpen5 != "hidden") {
          this.ishavedata5 = "show" + index
        } else {
          this.ishavedata5 = "hidden"
        }
      },
      openProject6(index) {
        if (this.openFlag6 % 2 === 0) {
          this.isOpen6 = "show" + index
        }
        else {
          this.isOpen6 = "hidden"
        }
        if (this.openFlag6 === 0) {
          this.imgURL = this._imgURL;
          console.log(this.imgURL);
          //this.getimagelist();
        }
        this.openFlag6 = this.openFlag6 + 1;
      },
      openProject7(index) {
        if (this.openFlag7 % 2 === 0) {
          this.isOpen7 = "show" + index
        }
        else {
          this.isOpen7 = "hidden"
        }
        this.openFlag7 = this.openFlag7 + 1;
      },
      //判断每个子项是否有值
      /*trafficItemList:[],
      hotelItemList:[],
      allowanceItemVOList:[],
      writeoffList:[],
      attachmentList:[],*/
      isHaveValues() {
        /*if(index=='4'){//是否有冲销款
          if(!this.writeoffList[0]){
            return true;
          }else{
            return false;
          }
        }*/
        //是否有附件
        if (!this.attachmentList[0]) {
          return true;
        } else {
          return false;
        }
      },
      //第一次根据pk获取所有信息
      initIteminfo() {
        var that = this;
        let params = {
          checkman:that.checkmanparam,
          billtype: that.billtypeparam,
          billid: that.billidparam,
          mobilebilltype: that.mobilebilltypeparam
        };
        console.log(params);
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getBillDetail(params).then(res => {
          Indicator.close();
          if (res.flag === "success") {
            console.log(res);
            that.noexamineData = res.billdata;
            that.djbh = res.billdata.djbh;
            that.djrq = res.billdata.djrq;
            that.jkbxr = res.billdata.jkbxr;
            that.bbje = res.billdata.bbje;
            that.pk_org = res.billdata.pk_org;
            that.deptid = res.billdata.deptid;
            that.fydw = res.billdata.fydw;
            that.fydwbm = res.billdata.fydwbm;
            that.zyx5 = res.billdata.zyx5;
            that.trafficItemList = res.billdata.billsubItemVO.trafficItemList;
            that.hotelItemList = res.billdata.billsubItemVO.hotelItemList;
            that.allowanceItemVOList = res.billdata.billsubItemVO.allowanceItemVOList;
            that.writeoffList = res.billdata.billsubItemVO.writeoffList;
            that._imgURL = res.billdata.billsubItemVO.imgURL;
            that._attachmentList = res.billdata.billsubItemVO.attachmentList;
            if(that.trafficItemList === null || that.trafficItemList.length === 0){
              that.trafficCount = 0;
            }else{
              that.trafficCount = that.trafficItemList.length;
            }
            if(that.hotelItemList === null || that.hotelItemList.length === 0){
              that.hotelCount = 0;
            }else{
              that.hotelCount = that.hotelItemList.length;
            }
            if(that.allowanceItemVOList === null || that.allowanceItemVOList.length === 0){
              that.allowanceCount = 0;
            }else{
              that.allowanceCount = that.allowanceItemVOList.length;
            }
            if(that.writeoffList === null || that.writeoffList.length === 0){
              that.writeoffCount = 0;
            }else{
              that.writeoffCount = that.writeoffList.length;
            }
            if(that._attachmentList === null || that._attachmentList.length === 0){
              that.fuCount = 0;
            }else{
              that.fuCount = this._attachmentList.length;
            }

            //console.log(that.imgUrl);
            //this._initScroll();
            if (that.noexamineData.length === 0) {
              Toast("没有待审批数据");
            }
          } else {
            Toast("获取失败," + res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      //根据billid获取附件
        getfilelist() {
        var that = this;
        let params = {
          billid: that.billidparam
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getfilelist(params).then(res => {
          Indicator.close();
          if (res.flag === "success") {
            that.attachmentList = res.data;
            if (this.attachmentList.length > 0) {
              this.fuCount = that.attachmentList.length;
            } else {
              this.fuCount = 0;
            }
          } else {
            Toast("获取失败," + res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      //获取影像
      getimagelist() {
        var that = this;
        let params = {
          billid: that.billidparam,
          pk_billtype: that.billtypeparam,
          checkman: that.checkmanparam
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getimagelist(params).then(res => {
          Indicator.close();
          if (res.flag === "success") {
            that.imageurl = res.data;
          } else {
            Toast("获取失败," + res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      //转义字符
      convertSpecialCharacter(imageurl) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        return imageurl.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
          return arrEntities[t];
        });
      },
      //打开影像
      openimage(imageurl) {
        return imageurl;
        //window.open(imageurl);
        //window.open(imageurl);
        //console.log(imageurl);
        //return this.convertSpecialCharacter(imageurl);

      },
      //阶段
      selectStage() {
        if (this.projectName === '' || this.projectName === undefined) {
          Toast({
            message: "请先选择项目",
            duration: 1500
          });
          return
        }
        let params = {
          code: global.code,
          userId: global.user_id,
          projectcode: this.projectCode
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getStageList(params).then(res => {
          Indicator.close();
          if (res.flag === "success") {
            if (res.data == "") {
              Toast({
                message: "此项目没有阶段",
                duration: 1500
              });
              return
            }
            this.stageData = res.data;
            this.$refs.enterstage.show()
          } else {
            Toast("获取阶段失败," + res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      confirm(value) {
        this.projectName = value.name;  //子组件传来的数据
        this.projectCode = value.code;
        this.projectId = value.projectid;
        var project = {
          code: value.code,
          name: value.name,
          projectid: value.projectid
        }
        window.localStorage.setItem(global.user_id + 'project', JSON.stringify(project))
        window.localStorage.removeItem(global.user_id + 'stage')
        this.stageName = "";
        this.stageCode = "";
      },
      confirmStage(value) {
        this.stageName = value.name;  //子组件传来的数据
        this.stageCode = value.code;
        var stage = {
          code: value.code,
          name: value.name
        }
        window.localStorage.setItem(global.user_id + 'stage', JSON.stringify(stage))
      },
      // 时间组件
      selectStartTime() {
        this.timeFlag = "start";
        this.$refs.entertime.TimeShow()//调用子组件的方法
      },
      //审批
      approveDetail() {
        var that = this;
        let params = {
          billtype: that.billtypeparam,
          billid: that.billidparam,
          checkResult: 'Y',//审批Y驳回R
          checkman: that.checkmanparam,
          checkNote: that.checkNote,//意见
          pk_flow: that.pk_flowparam,//
          workflowtype: that.workflowtypeparam
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        approval(params).then(res => {
          console.log(res);
          if (res.flag === "success") {
            Toast(res.msg);
            //console.log(res);
            Indicator.close();
            // this.$router.push('/');
          } else {
            // console.log(res);
            Indicator.close();
            Toast("审批失败," + res.msg);
            //this.$router.push('/');
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      //驳回
      rejectDetail() {
        var that = this;
        if (that.checkNote === "" || that.checkNote === undefined || that.checkNote === null) {
          Toast("驳回必须输入意见");
          return;
        }
        let params = {
          billtype: that.billtypeparam,
          billid: that.billidparam,
          checkResult: 'R',
          checkman: that.checkmanparam,
          checkNote: that.checkNote,//意见
          pk_flow: that.pk_flowparam,//
          workflowtype: that.workflowtypeparam
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        approval(params).then(res => {
          if (res.flag === "success") {
            Indicator.close();
            Toast(res.msg);
            this.$router.push('/');
          } else {
            Indicator.close();
            Toast("驳回失败," + res.msg);
            this.$router.push('/');
          }
        }).catch(function (error) {
          console.log(error);
        });

      },
      selectEndTime() {
        this.timeFlag = "end";
        this.$refs.entertime.TimeShow()//调用子组件的方法
      },
      TimeConfirm(value) {
        if (this.timeFlag === "start") {
          if (this.timeCompare(value, this.endTime)) {
            this.startTime = value
          }
        }
        if (this.timeFlag === "end") {
          if (this.timeCompare(this.startTime, value)) {
            this.endTime = value
          }
        }
      },
      //出差
      isAway() {
        this.isToAway = this.isToAway + 1;
        if (this.isToAway % 2 == 0) {
          this.isAwayUrl = "../../static/images/icon_yes-09.svg"
          this.isAwayText = "是"
        } else {
          this.isAwayUrl = "../../static/images/icon_no-10.svg"
          this.isAwayText = "否"
        }
      },
      //任务描述
      taskConfirm(value) {
        this.taskName = value
      },
      selectTask() {
        if (this.projectName === '' || this.projectName === undefined) {
          Toast({
            message: "请先选择项目",
            duration: 1500
          });
          return
        }
        let params = {
          code: global.code,
          userId: global.user_id,
          projectcode: this.projectCode
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getTsakList(params).then(res => {
          Indicator.close();
          if (res.flag === "success") {
            if (res.data == "") {
              Toast({
                message: "没有任何数据",
                duration: 1500
              });
            }
            this.taskData = res.data;
            this.$refs.entertask.taskShow()
          } else {
            Toast("获取任务描述失败," + res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });

      },
      //提交数据
      addEnterData() {
        if (this.requestFlag === 'true') {
          this.requestFlag = 'false';
          if (this.projectName === "" || this.projectName === undefined) {
            Toast({
              message: "请选择项目",
              duration: 1500
            });
            return
          }
          let params = {
            code: global.code,
            userId: global.user_id,
            id: this.id,
            projectCode: this.projectCode,
            projectId: this.projectId,
            stageCode: this.stageCode,
            workDate: this.workDate,
            startTime: this.startTime,
            endTime: this.endTime,
            workTime: this.workTime,
            isAwayText: this.isAwayText,
            placeText: this.placeText,
            taskName: this.taskName
          };
          Indicator.open({
            text: '提交校验中...',
            spinnerType: 'snake'
          });
          saveEnterData(params).then(res => {
            Indicator.close();
            this.requestFlag = 'true';
            if (res.flag === "success") {
              Toast({
                message: "提交成功",
                duration: 1500
              });
              history.go(-1)
            } else {
              Toast("提交失败," + res.msg);
            }
          }).catch(function (error) {
            Indicator.close();
            this.requestFlag = 'true';
            console.log(error);
          });
        }
      },
      //开始时间和结束时间的比较以及时长计算
      timeCompare(startTime, endTime) {
        if (startTime <= endTime) {
          let startDate = new Date("2017/10/20 " + startTime).getTime();
          let endDate = new Date("2017/10/20 " + endTime).getTime();
          this.workTime = (endDate - startDate) / 3600000;
          return true
        } else {
          Toast({
            message: "开始时间不能大于结束时间",
            duration: 1500
          });
          return false
        }
      },

      //获取地图
      getMyLocation() {
        this.siteimg = '../../static/images/location.gif';
        var that = this;
        this.placeText = '';
        var geolocation;
        var map = new AMap.Map('container', {
          resizeEnable: true
        });
        //加载地图，调用浏览器定位服务
        map.plugin('AMap.Geolocation', function () {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
          AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });

        //解析定位结果
        function onComplete(data) {
          that.placeText = data.formattedAddress;
          that.siteimg = '../../static/images/icon_site-11.svg';
          if (data.accuracy) {
          }
        };

        function onError(data) {
          that.placeText = '无法定位';
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/detail"
  .fujian {
    margin-top: 1.0rem;
  }
</style>
