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
            <span class="entering-title">单据编号：</span>
            <span class="entering-input">{{djbh}}</span>
          </div>
        </li>
        <li class="entering-item" >
          <div class="entering-left">
            <span class="entering-title">单据日期：</span>
            <span class="entering-input">{{djrq}}</span>
          </div>
        </li>
        <li class="entering-item" >
          <div class="entering-left">
            <span class="entering-title">交易类型：</span>
            <span class="entering-input">{{djrq}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">合计金额：</span>
            <span class="entering-input">{{total}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">报销人：</span>
            <span class="entering-input">{{jkbxr}}</span>
          </div>
        </li>
        <li class="entering-item" >
          <div class="entering-left">
            <span class="entering-title">手机：</span>
            <span class="entering-input">{{mobile}}</span>
          </div>
        </li>
        <li class="entering-item" >
          <div class="entering-left">
            <span class="entering-title">个人银行账户：</span>
            <span class="entering-input">{{bankcode}}</span>
          </div>
        </li>
        <li class="entering-item" >
          <div class="entering-left">
            <span class="entering-title">报销人单位：</span>
            <span class="entering-input">{{dwbm}}</span>
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
            <span class="entering-input">{{fydwbm}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">费用承担部门：</span>
            <span class="entering-input">{{fydeptid}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">结算方式：</span>
            <span class="entering-input">{{jsfs}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">银行现金账户：</span>
            <span class="entering-input">{{fkyhzh}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">支付单位：</span>
            <span class="entering-input">{{pk_payorg}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">项目：</span>
            <span class="entering-input">{{project_name}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">支付对象：</span>
            <span class="entering-input">{{paytarget}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">供应商：</span>
            <span class="entering-input">{{hbbm}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">备注：</span>
            <span class="entering-input">{{zyx29}}</span>
          </div>
        </li>
        <li class="entering-item">
          <div class="entering-left">
            <span class="entering-title">供应商银行账户：</span>
            <span class="entering-input">{{custacccount}}</span>
          </div>
        </li>
        <li class="entering-item" style="border: none">
          <div class="entering-left">
            <span class="entering-title">事由</span>
            <span class="entering-input">{{zyx19}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!--基本信息end-->
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

    <!--关闭附件end-->

    <!--意见-->
    <!--<div class="panel"  >
      <div class="panelTitle" @click="openProject7(index$7)">
        <div class="titleLeft">意见</div>
        <div class="titleRight">
          <img src="./image/icon_close.svg" v-show="'show'+index$7 === isOpen7"/>
          <img src="./image/icon_open.svg" v-show="'show'+index$7 != isOpen7"/>
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
   <!-- 子表数据-->
    <div class="panel"  >
      <div class="panelTitle" @click="openProject1(index$1)">
        <div class="titleLeft">招待费明细(页签一)</div>
        <div class="titleRight">
          <img src="./image/icon_close.svg" v-show="'show'+index$1 === isOpen1"/>
          <img src="./image/icon_open.svg" v-show="'show'+index$1 != isOpen1"/>
        </div>
      </div>
      <div class="panelBody" v-for="(item,index2) in detailoneList" v-show="'show'+index$1 === isOpen1">
        <ul class="entering">
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">收支项目:</span>
              <span class="entering-input">{{item.szxmid}}</span>
            </div>
          </li>
          <li class="entering-itemsub" @click="selectStage">
            <div class="entering-left">
              <span class="entering-title">招待日期:</span>
              <span class="entering-input">{{item.defitem1}}</span>
            </div>
          </li>
          <li class="entering-itemsub">
            <div class="entering-left">
              <span class="entering-title">报销金额:</span>
              <span class="entering-input">{{item.vat_amount}}</span>
            </div>
          </li>
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">产业类别:</span>
              <span class="entering-input">{{item.defitem20}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="panelBody" v-show="'show'+index$1 === ishavedata1">
        <ul class="entering">
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">无数据</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 子表数据-->
    <div class="panel"  >
      <div class="panelTitle" @click="openProject2(index$2)">
        <div class="titleLeft">招待费明细(页签二)</div>
        <div class="titleRight">
          <img src="./image/icon_close.svg" v-show="'show'+index$2 === isOpen2"/>
          <img src="./image/icon_open.svg" v-show="'show'+index$2 != isOpen2"/>
        </div>
      </div>
      <div class="panelBody" v-for="(item,index2) in detailtwoList" v-show="'show'+index$2 === isOpen2">
        <ul class="entering">
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">招待对象:</span>
              <span class="entering-input">{{item.defitem10}}</span>
            </div>
          </li>
          <li class="entering-itemsub" @click="selectStage">
            <div class="entering-left">
              <span class="entering-title">客人人数:</span>
              <span class="entering-input">{{item.defitem11}}</span>
            </div>
          </li>
          <li class="entering-itemsub">
            <div class="entering-left">
              <span class="entering-title">陪同人数:</span>
              <span class="entering-input">{{item.defitem12}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="panelBody" v-show="'show'+index$2 === ishavedata2">
        <ul class="entering">
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">无数据</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--冲销金额-->
    <div class="panel"  >
      <div class="panelTitle" @click="openProject4(index$4)">
        <div class="titleLeft">冲销明细</div>
        <div class="titleRight">
          <img src="./image/icon_close.svg" v-show="'show'+index$4 === isOpen4"/>
          <img src="./image/icon_open.svg" v-show="'show'+index$4 != isOpen4"/>
        </div>
      </div>
      <div class="panelBody"  v-for="(item,index5) in writeoffList" v-show="'show'+index$4 === isOpen4">
        <ul class="entering">
          <li class="entering-itemsub" >
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
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">冲销金额:</span>
              <span class="entering-input">{{item.cjkybje}}</span>
            </div>
          </li>
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">冲销日期:</span>
              <span class="entering-input">{{item.cxrq}}</span>
            </div>
          </li>
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">生效日期:</span>
              <span class="entering-input">{{item.sxrq}}</span>
            </div>
          </li>
        </ul>
        <div class="panel_bottom">
          <div>
          </div>
        </div>
      </div>
      <div class="panelBody" v-show="'show'+index$4 === ishavedata4">
        <ul class="entering">
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">无数据</span>
            </div>
          </li>
        </ul>
      </div>

    <!--  <div class="panelBody" v-show="'show'+index$4 === ishavedata4">
        <ul class="entering">
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">无数据</span>
            </div>
          </li>
        </ul>
      </div>-->

    </div>
    <!--附件-->
    <div class="panel"  >
      <div class="panelTitle" @click="openProject5(index$5)">
        <div class="titleLeft">附件</div>
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
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">无数据</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--影像-->
    <div class="panel"  >
      <div class="panelTitle" @click="openProject6(index$6)">
        <div class="titleLeft">影像</div>
        <div class="titleRight">
          <img src="./image/icon_close.svg" v-show="'show'+index$6 === isOpen6"/>
          <img src="./image/icon_open.svg" v-show="'show'+index$6 != isOpen6"/>
        </div>
      </div>
      <div class="panelBody"  v-show="'show'+index$6 === isOpen6">
        <ul class="entering">
          <li class="entering-itemsub" >
            <div class="entering-left">
              <!--<a :href="imgURL">-->
              <router-link :to="{path:'/ImageDetail',query:{imgURL:imgURL}}">
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
      <img class="morebtnl" src="./image/icon_edit.svg" @click="approvehistoryinfo"><!--margin-left:0.5rem;float:left;margin-top:1.1rem;-->
      <mt-button class="popupbtn" @click="deal">处理</mt-button><!--float:left;margin-left:1.0rem;margin-bottom:0.5rem;-->
      <img class="morebtnr" src="./image/icon_dot.svg" @click="showSheetVisible"><!--float:right;margin-top:1.0rem;margin-right:0.5rem;-->
    </div>
    <!--处理、打开附件end-->
    <mt-actionsheet v-model="sheetVisible" cancel-text="取消"></mt-actionsheet>
    <!--最下面的按钮挡住最后一个div,所以加一个空div把附件往上顶一个位置-->
    <div class="panel_bottom"  >
      <div >
      </div>
    </div>
    <!--<div class="exam-bottom">
      <div class="exam-left">
        <button class="left-button"  @click="approveProject">审批</button>
      </div>
      <div class="exam-right">
        <button class="right-button"   @click="rejectProject">驳回</button>
      </div>
    </div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import {Toast,Indicator,Actionsheet} from 'mint-ui'
  import {formatDate} from '../common/js/date.js'
  import {getProjectList,getStageList,getTsakList,saveEnterData,getBillDetail,approval,getfilelist,getimagelist,downFile} from '../common/js/http.js'
  export default {
    props:{
      ispro:true, //项目：true 假期：false
    },
    data() {
      return {
        index$1:0,
        isOpen1:"show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag1:0, //偶数展开，奇数合上
        ishavedata1:"show1",
        index$2:0,
        isOpen2:"show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag2:0, //偶数展开，奇数合上
        ishavedata2:"show1",
        index$3:0,
        isOpen3:"show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag3:0, //偶数展开，奇数合上
        index$4:0,
        isOpen4:"show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag4:0, //偶数展开，奇数合上
        ishavedata4:"show1",//是否有数据
        index$5:0,
        isOpen5:"show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag5:0, //偶数展开，奇数合上
        ishavedata5:"show1",//是否有数据
        index$6:0,
        isOpen6:"show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag6:0, //偶数展开，奇数合上
        index$7:0,
        isOpen7:"show0", //项目开合标识 show:显示  hidden:隐藏
        openFlag7:0, //偶数展开，奇数合上
        isArrow:"show0", //阶段开合标识 show:显示  hidden:隐藏
        arrowLast:0, // 记录上一次点击的项目index
        arrowFlag:1, //偶数展开，奇数合上
        isDelay:'hidden',  //延期开合标识 show:显示  hidden:隐藏
        checkData:[], //上一次选中的数据
        last:0, // 记录上一次点击的项目index
        flag:0, //偶数展开，奇数合上
        billtypeparam:'',//传递过来的pk
        billidparam:'',//传递过来的billid
        checkmanparam:'',//传递过来的checkman
        pk_flowparam:'',//传递过来的pk_flow
        mobilebilltypeparam:'',//传递过来的mobilebilltype
        workflowtypeparam:'',//传递过来的workflowtype
        checkNote:'',//办理意见
        djbh:'',//单据编号
        djrq:'',//日期
        total:'',//招待费合计金额
        jkbxr:'',// 报销人
        mobile:'',// 手机
        bankcode:'',//个人银行账户
        dwbm:'',//通用类和招待费报销人单位
        deptid:'',//报销人部门
        fydwbm:'',//费用承担单位
        fydeptid:'',//通用类和招待费费用承担部门
        jsfs:'',//结算方式
        fkyhzh:'',//单位银行账户pk_payorg
        pk_payorg:'',//支付单位
        project_name:'',//项目
        paytarget:'',//支付对象hbbm  zyx29  custacccount  zyx19
        hbbm:'',//供应商
        zyx29:'',//备注
        custacccount:'',//供应商银行账户
        zyx19:'',//事由
        detailoneList:[],
        detailtwoList:[],
        writeoffList:[],
        attachmentList:[],
        imageList:[],
        allData:[],
        imageurl:'',
        workDate:[],  //日期
        projectName:'', //项目
        projectCode:'',
        projectId:'',
        stageName:'',  //阶段
        stageCode:'',
        startTime:'08:00', //开始时间
        endTime:'17:00',  //结束时间
        workTime:'8',  //工作时长
        isToAway:1,
        isAwayUrl:'../../static/images/icon_no-10.svg',
        isAwayText:'否',  //是否出差
        placeText:'',  //地点
        taskName:'',   //任务描述
        billtypename:'',
        projectData:[],
        stageData:[],
        taskData:[],
        timeData:[
          "00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00",
          "05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30",
          "11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00",
          "16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30",
          "22:00","22:30","23:00","23:30"
        ],
        timeFlag:"", //默认为空，选择开始时间为start，结束时间为end
        id:'',
        requestFlag:'true', //true:可以请求  false:不可以请求
        siteimg:'../../static/images/icon_site-11.svg',
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
        sheetVisible:false
      }
    },
    filters: {
      formatDate (time) {
        let a=time.replace(/\s+/g,'T');
        let date = new Date(a)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    mounted(){
      this.initIteminfo();
    },
    created(){
      this.billtypeparam = this.$route.query.billtype; //从待办列表传递过来的参数
      this.billidparam = this.$route.query.billid; //从待办列表传递过来的参数
      this.checkmanparam = this.$route.query.checkman; //从待办列表传递过来的参数
      this.pk_flowparam = this.$route.query.pk_flow; //从待办列表传递过来的参数
      this.mobilebilltypeparam = this.$route.query.mobilebilltype; //从待办列表传递过来的参数
      this.workflowtypeparam = this.$route.query.workflowtype;
      this.billtypename = this.$route.query.billtypename;
    },
    components:{

    },
    methods:{
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
      //项目展开收缩
      openProject1(index) {
        if(this.openFlag1 % 2 === 0){
          this.isOpen1 = "show" + index
        }else{
          this.isOpen1 = "hidden";
        }
        this.openFlag1 = this.openFlag1 + 1;
        if(!this.detailoneList[0]&&this.isOpen1!="hidden"){
          this.ishavedata1 = "show" + index
        }else{
          this.ishavedata1 = "hidden"
        }
      },
      openProject2(index) {
        if(this.openFlag2 % 2 === 0){
          this.isOpen2 = "show" + index
        }
        else{
          this.isOpen2 = "hidden"
        }
        this.openFlag2 = this.openFlag2 + 1;
        if(!this.detailtwoList[0]&&this.isOpen2!="hidden"){
          this.ishavedata2 = "show" + index
        }else{
          this.ishavedata2 = "hidden"
        }
      },
      openProject3(index) {
        if(this.openFlag3 % 2 === 0){
          this.isOpen3 = "show" + index
        }
        else{
          this.isOpen3 = "hidden"
        }
        this.openFlag3 = this.openFlag3 + 1;
      },
      openProject4(index) {
        if(this.openFlag4 % 2 === 0){
          this.isOpen4 = "show" + index
        }
        else{
          this.isOpen4 = "hidden"
        }
        this.openFlag4 = this.openFlag4 + 1;
        if(!this.writeoffList[0]&&this.isOpen4!="hidden"){
          this.ishavedata4 = "show" + index
        }else{
          this.ishavedata4 = "hidden"
        }
      },
      openProject5(index) {
        if(this.openFlag5 % 2 === 0){
          this.isOpen5 = "show" + index
        }
        else{
          this.isOpen5 = "hidden"
        }
        if(this.openFlag5  === 0){
          //this.getfilelist();
          if(this.fuCount > 0){
            this.attachmentList = this._attachmentList;
          }else{
            Toast("获取失败,暂无附件");
          }

        }
        this.openFlag5 = this.openFlag5 + 1;
        if(!this.attachmentList[0]&&this.isOpen5!="hidden"){
          this.ishavedata5 = "show" + index
        }else{
          this.ishavedata5 = "hidden"
        }
      },
      openProject6(index) {
        if(this.openFlag6 % 2 === 0){
          this.isOpen6 = "show" + index
        }
        else{
          this.isOpen6 = "hidden"
        }
        if(this.openFlag6  === 0){
          this.imgURL = this._imgURL;
          //this.getimagelist();
        }
        this.openFlag6 = this.openFlag6 + 1;
      },
      openProject7(index) {
        if(this.openFlag7 % 2 === 0){
          this.isOpen7 = "show" + index
        }
        else{
          this.isOpen7 = "hidden"
        }
        this.openFlag7 = this.openFlag7 + 1;
      },
      //判断每个子项是否有值
      isHaveValues() {
        //是否有附件
        if(!this.attachmentList[0]){
          return true;
        }else{
          return false;
        }
      },
      //第一次根据pk获取所有信息
      initIteminfo(){
        var that = this;
        let params={
          checkman:that.checkmanparam,
          billtype:that.billtypeparam,
          billid:that.billidparam,
          mobilebilltype:that.mobilebilltypeparam
        };
        //console.log(params);
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getBillDetail(params).then(res=>{
          Indicator.close();
          if (res.flag === "success"){
            //console.log(res);
            that.allData = res.billdata;
            if(that.allData.length === 0){
              Toast("没有待审批数据");
              return;
            }
            that.djbh= res.billdata.djbh//单据编号
            that.djrq= res.billdata.djrq//日期
            that.total= res.billdata.total//招待费合计金额
            that.jkbxr= res.billdata.jkbxr// 报销人
            that.mobile= res.billdata.mobile// 手机
            that.bankcode= res.billdata.bankcode//个人银行账户
            that.dwbm= res.billdata.dwbm//通用类和招待费报销人单位
            that.deptid= res.billdata.deptid//报销人部门
            that.fydwbm= res.billdata.fydwbm//费用承担单位
            that.fydeptid= res.billdata.fydeptid//通用类和招待费费用承担部门
            that.jsfs= res.billdata.jsfs//结算方式
            that.fkyhzh= res.billdata.fkyhzh//单位银行账户pk_payorg
            that.pk_payorg= res.billdata.pk_payorg//支付单位
            that.project_name= res.billdata.project_name//项目
            that.paytarget= res.billdata.paytarget//支付对象hbbm  zyx29  custacccount  zyx19
            that.hbbm= res.billdata.hbbm//供应商
            that.zyx29= res.billdata.zyx29//备注
            that.custacccount= res.billdata.custacccount//供应商银行账户
            that.zyx19= res.billdata.zyx19//事由
            that.detailoneList= res.billdata.entertainmentSub.detailoneList;
            that.detailtwoList= res.billdata.entertainmentSub.detailtwoList;
            that.writeoffList= res.billdata.entertainmentSub.writeoffList;
            that._attachmentList= res.billdata.entertainmentSub.attachmentList;
            that._imgURL = res.billdata.entertainmentSub.imgURL;
            console.log(that._attachmentList);
            if(that._attachmentList === null || that._attachmentList.length === 0){
              that.fuCount = 0;
            }else{
              that.fuCount = that._attachmentList.length;
            }

          }else {
            Toast("获取失败,"+res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      //根据billid获取附件
      getfilelist(){
        var that = this;
        let params={
          billid:that.billidparam
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getfilelist(params).then(res=>{
          Indicator.close();
          if (res.flag === "success"){
            that.attachmentList= res.data;
            if(that.attachmentList.length > 0){
              this.fuCount = that.attachmentList.length;
            }else{
              this.fuCount = 0;
            }
          }else {
            Toast("获取失败,"+res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      //打开附件
      openfile(pk_lfwfile){
        console.log("附件地址1"+global.fileurl);
        console.log("附件地址1"+pk_lfwfile);
        return global.fileurl+pk_lfwfile;
      },
      //获取影像
      getimagelist(){
        var that = this;
        let params={
          billid:that.billidparam,
          pk_billtype:that.billtypeparam,
          checkman:that.checkmanparam
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getimagelist(params).then(res=>{
          Indicator.close();
          if (res.flag === "success"){
            that.imageurl= res.data;
          }else {
            Toast("获取失败,"+res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      //转义字符
      convertSpecialCharacter(imageurl){
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return imageurl.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
      },
      //打开影像
      openimage(imageurl){
        return this.convertSpecialCharacter(imageurl);
      },
      //阶段
      selectStage(){
        if (this.projectName === '' || this.projectName === undefined){
          Toast({
            message:"请先选择项目",
            duration:1500
          });
          return
        }
        let params = {
          code:global.code,
          userId:global.user_id,
          projectcode:this.projectCode
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getStageList(params).then(res=>{
          Indicator.close();
          if (res.flag === "success"){
            if(res.data == ""){
              Toast({
                message:"此项目没有阶段",
                duration:1500
              });
              return
            }
            this.stageData = res.data;
            this.$refs.enterstage.show()
          }else {
            Toast("获取阶段失败,"+res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });
      },
      confirm(value){
        this.projectName = value.name;  //子组件传来的数据
        this.projectCode = value.code;
        this.projectId = value.projectid;
        var project = {
          code:value.code,
          name:value.name,
          projectid:value.projectid
        }
        window.localStorage.setItem(global.user_id+'project',JSON.stringify(project))
        window.localStorage.removeItem(global.user_id+'stage')
        this.stageName = "";
        this.stageCode = "";
      },
      confirmStage(value){
        this.stageName = value.name;  //子组件传来的数据
        this.stageCode = value.code;
        var stage = {
          code:value.code,
          name:value.name
        }
        window.localStorage.setItem(global.user_id+'stage',JSON.stringify(stage))
      },
      // 时间组件
      selectStartTime(){
        this.timeFlag = "start";
        this.$refs.entertime.TimeShow()//调用子组件的方法
      },
      //审批
      approveProject() {
        var that = this;
        let params={
          billtype:that.billtypeparam,
          billid:that.billidparam,
          checkResult:'Y',//审批
          checkman:that.checkmanparam,
          checkNote:that.checkNote,//意见
          pk_flow:that.pk_flowparam,//
          workflowtype:that.workflowtypeparam
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
            Toast("审批失败," + res.msg);
            this.$router.push('/');
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      //驳回
      rejectProject() {
        var that = this;
        if(that.checkNote === "" || that.checkNote === undefined || that.checkNote === null){
          Toast("驳回必须输入意见");
          return;
        }
        let params={
          billtype:that.billtypeparam,
          billid:that.billidparam,
          checkResult:'R',//审批意见
          checkman:that.checkmanparam,
          checkNote:that.checkNote,//意见
          pk_flow:that.pk_flowparam,//
          workflowtype:that.workflowtypeparam
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
      selectEndTime(){
        this.timeFlag = "end";
        this.$refs.entertime.TimeShow()//调用子组件的方法
      },
      TimeConfirm(value){
        if(this.timeFlag === "start"){
          if(this.timeCompare(value,this.endTime)){
            this.startTime = value
          }
        }
        if(this.timeFlag === "end"){
          if(this.timeCompare(this.startTime,value)){
            this.endTime = value
          }
        }
      },
      //出差
      isAway(){
        this.isToAway = this.isToAway +1;
        if(this.isToAway % 2 == 0){
          this.isAwayUrl="../../static/images/icon_yes-09.svg"
          this.isAwayText="是"
        }else {
          this.isAwayUrl="../../static/images/icon_no-10.svg"
          this.isAwayText="否"
        }
      },
      //任务描述
      taskConfirm(value){
        this.taskName = value
      },
      selectTask(){
        if (this.projectName === ''|| this.projectName === undefined){
          Toast({
            message:"请先选择项目",
            duration:1500
          });
          return
        }
        let params = {
          code:global.code,
          userId:global.user_id,
          projectcode:this.projectCode
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getTsakList(params).then(res=>{
          Indicator.close();
          if (res.flag === "success"){
            if(res.data == ""){
              Toast({
                message:"没有任何数据",
                duration:1500
              });
            }
            this.taskData = res.data;
            this.$refs.entertask.taskShow()
          }else {
            Toast("获取任务描述失败,"+res.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
        });

      },
      //提交数据
      addEnterData(){
        if(this.requestFlag === 'true') {
          this.requestFlag = 'false';
          if (this.projectName === "" || this.projectName === undefined) {
            Toast({
              message: "请选择项目",
              duration: 1500
            });
            return
          }
          //      if(this.stageName === "" || this.stageName === undefined){
          //        Toast({
          //          message:"请选择阶段",
          //          duration:1500
          //        });
          //        return
          //      }
          let params = {
            code:global.code,
            userId:global.user_id,
            id: this.id,
            projectCode: this.projectCode,
            projectId:this.projectId,
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
      timeCompare(startTime,endTime){
        if(startTime <= endTime ){
          let startDate=new Date("2017/10/20 " + startTime).getTime();
          let endDate=new Date("2017/10/20 " + endTime).getTime();
          this.workTime = (endDate-startDate)/3600000;
          return true
        }else {
          Toast({
            message:"开始时间不能大于结束时间",
            duration:1500
          });
          return false
        }
      },

      //获取地图
      getMyLocation(){
        this.siteimg = '../../static/images/location.gif';
        var that = this;
        this.placeText = '';
        var geolocation;
        var map = new AMap.Map('container',{
          resizeEnable: true
        });
        //加载地图，调用浏览器定位服务
        map.plugin('AMap.Geolocation', function() {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
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
          if(data.accuracy){}
        };
        function onError(data) {
          that.placeText = '无法定位';
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/variable"
  @import "../common/stylus/detail"
  /*.entering
    z-index -1
    width 100%
    margin-top 0.2rem
    margin-bottom 1rem
    display flex
    flex-direction column
    align-items center
    .entering-item
      width 90%
      height 2.0rem
      border-bottom 1px solid $color-line
      display flex
      flex-direction row
    .entering-itemsub
      width 90%
      height 1.6rem
      border-bottom 1px solid $color-line
      display flex
      flex-direction row
      .entering-left
        width 100%
        display flex
        align-items center
        justify-content flex-start
        .entering-title
          display flex
          justify-content flex-start
          width 30%
          font-size $font-size-medium
        .entering-input
          outline none
          margin-left 0.2rem
          width:70%
          padding-bottom 0.1rem
          background-color #FFFFFF
          font-size $font-size-medium
        .areasite
          border-style none
          border-color #FFFFFF
          outline none
          overflow auto
          resize none
          width 70%
          height 1.5rem
          margin-top 0.4rem
        .areatask
          border-style none
          border-color #FFFFFF
          outline none
          overflow auto
          resize none
          width 70%
          height 1.5rem
          margin-top 0.5rem
          padding-top 0.2rem
      .entering-right
        width 20%
        display flex
        justify-content center
        .entering-icon
          width 1rem
        .location-icon
          width 1.5rem
          height 1.5rem
          margin-top 0.3rem
  .enteringchecknote
    z-index -1
    width 100%
    margin-top 0.2rem
    margin-bottom 0.5rem
    display flex
    flex-direction column
    align-items center
    .entering-checknotesub
      width 90%
      height 3.0rem
      border-bottom 1px solid $color-line
      display flex
      .entering-checknotzeinput
        outline none
        margin-left 0.2rem
        width:100%
        padding-bottom 0.1rem
        background-color #FFFFFF
        font-size $font-size-medium
  .entering-sub
    position fixed
    bottom 0
    left 0
    width 100%
    height 2rem
    background-color $color-button-theme
    display flex
    justify-content center
    align-items center
    .entering-add
      width 2rem
      height 2rem
  .exam-bottom
    position fixed
    bottom 0
    left 0
    right 0
    top 92%
    width 100%
    height 3rem
    background-color $color-theme
    display flex
    .exam-left
      width:50%
      display flex
      align-items center
      justify-content flex-start
      .left-button
        padding 0.2rem 0.5rem
        border 1px solid $color-button-theme
        border-radius 0.8rem
        background-color $color-button-theme
        color $color-theme-white
        margin-left 1rem
        margin-right 1rem
        margin-bottom 0.5rem
    .exam-right
      width:50%
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
        margin-bottom 0.5rem

  .entershare
    position fixed
    left 0
    top 0
    bottom 0
    right 0
  .enterstage
    position fixed
    left 0
    top 0
    bottom 0
    right 0
  .entertask
    position fixed
    left 0
    top 0
    bottom 0
    right 0
  .entertime
    position fixed
    left 0
    top 0
    bottom 0
    right 0
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
  .panel
    background-color #f5f5f5
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
        background-color $color-theme-white
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
            background-color $color-theme-white
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
  .panel_bottom
    background-color #f5f5f5
    margin-top 0.2rem
    border-radius 0.3rem
    margin-left 0.2rem
    margin-bottom 3rem
    margin-right 0.2rem
    font-family Microsoft Yahei

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
            color $color-theme*/
</style>
