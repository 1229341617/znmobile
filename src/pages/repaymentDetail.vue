<template>
  <!-- 还款单 -->
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
    <!-- 主表数据 add -->
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
      <li class="entering-item">
        <div class="entering-left">
          <span class="entering-title">还款金额：</span>
          <span class="entering-input">{{hkybje}}</span>
        </div>
      </li>
      <li class="entering-item">
        <div class="entering-left">
          <span class="entering-title">还款人：</span>
          <span class="entering-input">{{jkbxr}}</span>
        </div>
      </li>
      <li class="entering-item">
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
          <span class="entering-title">冲借款金额：</span>
          <span class="entering-input">{{cjkbbje}}</span>
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
          <span class="entering-title">费用承担单位：</span>
          <span class="entering-input">{{fydwbm}}</span>
        </div>
      </li>
      <li class="entering-item">
        <div class="entering-left">
          <span class="entering-title">个人银行账户：</span>
          <span class="entering-input">{{skyhzh}}</span>
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
          <span class="entering-title">结算方式：</span>
          <span class="entering-input">{{jsfs}}</span>
        </div>
      </li>
    </ul>
      <div class="panel_bottom">
        <div>
        </div>
      </div>
    </div>
    <!--基本信息end-->
    <!-- 主表数据 end -->
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
    <!--意见 add -->
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
    <!--意见 end -->
    <!-- 子表还款信息数据 add -->
    <div class="panel"  >
      <div class="panelTitle" @click="openProject1(index$1)">
        <div class="titleLeft">还款信息</div>
        <div class="titleRight">
          <img src="./image/icon_close.svg" v-show="'show'+index$1 === isOpen1"/>
          <img src="./image/icon_open.svg" v-show="'show'+index$1 != isOpen1"/>
        </div>
      </div>
      <div class="panelBody" v-for="(item,index2) in itemvoList" v-show="'show'+index$1 === isOpen1">
        <ul class="entering">
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">借款单号:</span>
              <span class="entering-input">{{item.jkdjbh}}</span>
            </div>
          </li>
          <li class="entering-itemsub">
            <div class="entering-left">
              <span class="entering-title">借款人:</span>
              <span class="entering-input">{{item.jkbxr}}</span>
            </div>
          </li>
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">借款部门:</span>
              <span class="entering-input">{{item.deptid}}</span>
            </div>
          </li>
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">还款金额:</span>
              <span class="entering-input">{{item.hkybje}}</span>
            </div>
          </li>
          <li class="entering-itemsub">
            <div class="entering-left">
              <span class="entering-title">冲销日期:</span>
              <span class="entering-input">{{item.cxrq}}</span>
            </div>
          </li>
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">生效标志:</span>
              <span class="entering-input">{{item.sxbz}}</span>
            </div>
          </li>
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">生效日期:</span>
              <span class="entering-input">{{item.sxrq}}</span>
            </div>
          </li>
          <li class="entering-itemsub" >
            <div class="entering-left">
              <span class="entering-title">收支项目:</span>
              <span class="entering-input">{{item.szxmid}}</span>
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
    <!-- 子表还款信息数据 end -->
    <!-- 附件 add -->
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
    <!-- 附件 end -->
    <!-- 影像 add -->
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
    <!-- 影像 end -->
    <!--最下面的按钮挡住最后一个div,所以加一个空div把附件往上顶一个位置-->
    <div class="panel_bottom"  >
      <div >
      </div>
    </div>
      <div></div>
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
    <div class="panel_bottom">
      <div>
      </div>
    </div>
    <!--<div class="exam-bottom">
      <div class="exam-left">
        <button class="left-button"  @click="approveDetail">审批</button>
      </div>
      <div class="exam-right">
        <button class="right-button"   @click="rejectDetail">驳回</button>
      </div>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast,Indicator,Field} from 'mint-ui'
  import {formatDate} from '../common/js/date.js'
  import Vue from 'vue'
  import {getProjectList,getStageList,getTsakList,saveEnterData,getBillDetail,approval,getfilelist,getimagelist,downFile} from '../common/js/http.js';
  Vue.component(Field.name, Field);
  export default {
    data() {
      return {
        index$1:0,
        isOpen1:"show1", //项目开合标识 show:显示  hidden:隐藏
        openFlag1:0, //偶数展开，奇数合上
        ishavedata1:"show1",
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
        billtypeparam:'',//传递过来的pk
        billidparam:'',//传递过来的billid
        checkmanparam:'',//传递过来的checkman
        pk_flowparam:'',//传递过来的pk_flow
        mobilebilltypeparam:'',//传递过来的mobilebilltype
        workflowtypeparam:'',//传递过来的workflowtype
        checkNote:'',//办理意见
        djrq:'',
        djbh:'',
        hkybje:'',
        jkbxr:'',
        dwbm:'',
        deptid:'',
        cjkbbje:'',
        fydeptid:'',
        fydwbm:'',
        pk_payorg:'',
        skyhzh:'',
        jsfs:'',
        itemvoList:[],// 还款信息list
        attachmentList:[],// 附件
        imageList:[],
        repaymentData:[],
        imageurl:'',
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
        sheetVisible:false
      }
    },
    filters: {
      formatDate (time) {
        if(time === '' || time === undefined){
          return "";
        }
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
        if(!this.itemvoList[0]&&this.isOpen1!="hidden"){
          this.ishavedata1 = "show" + index
        }else{
          this.ishavedata1 = "hidden"
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
      //判断子项是否有值
      isHaveValues() {
        //是否有附件
        if(!this.attachmentList[0]){
          return true;
        }else{
          return false;
        }
      },
      //第一次根据报销单据pk获取单据所有信息
      initIteminfo(){
        var that = this;
        let params={
          checkman:that.checkmanparam,
          billtype:that.billtypeparam,
          billid:that.billidparam,
          mobilebilltype:that.mobilebilltypeparam
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        getBillDetail(params).then(res=>{
          Indicator.close();
          if (res.flag === "success"){
            that.repaymentData = res.billdata;
            if(that.repaymentData.length === 0){
              Toast("没有待审批数据");
              return;
            }
            that.djbh = res.billdata.djbh;
            that.djrq = res.billdata.djrq;
            that.hkybje = res.billdata.hkybje;
            that.jkbxr = res.billdata.jkbxr;
            that.deptid = res.billdata.deptid;
            that.dwbm = res.billdata.dwbm;
            that.cjkbbje = res.billdata.cjkbbje;
            that.fydwbm = res.billdata.fydwbm;
            that.fydeptid = res.billdata.fydeptid;
            that.pk_payorg = res.billdata.pk_payorg;
            that.skyhzh = res.billdata.skyhzh;
            that.jsfs = res.billdata.jsfs;
            that.itemvoList = res.billdata.repaymentsub.itemVOList;
            that._imgURL = res.billdata.repaymentsub.imgURL;
            that._attachmentList = res.billdata.repaymentsub.attachmentList;
            if(that._attachmentList === null || that._attachmentList.length === 0){
              that.fuCount = 0;
            }else{
              that.fuCount = this._attachmentList.length;
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
      //审批
      approveDetail() {
        var that = this;
        let params={
          billtype:that.billtypeparam,
          billid:that.billidparam,
          checkResult:'Y',//审批Y驳回R
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
            Toast(res.msg);
            Indicator.close();
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
      rejectDetail() {
        var that = this;
        if(that.checkNote === "" || that.checkNote === undefined || that.checkNote === null){
          Toast("驳回必须输入意见");
          return;
        }
        let params={
          billtype:that.billtypeparam,
          billid:that.billidparam,
          checkResult:'R',
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
  .panel_bottom
    background-color #f5f5f5
    margin-top 0.2rem
    border-radius 0.3rem
    margin-left 0.2rem
    margin-bottom 3rem
    margin-right 0.2rem
    font-family Microsoft Yahei
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
        margin-bottom 0.5rem*/
</style>
