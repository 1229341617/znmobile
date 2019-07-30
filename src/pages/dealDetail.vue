<template>
  <div>
    <!--头部处理-->
    <mt-header class="my-header" title="处理">
      <div slot="left" @click="goBack">
        <mt-button icon="back" class="top-Header">返回</mt-button>
      </div>
    </mt-header>
    <!--头部处理end-->
    <!--单选框-->
    <mt-radio v-model="checkValue" :options="['同意','驳回']" style="color:#3aadfb;width:100%;margin-top:0;" @click="getCheckValue">

    </mt-radio>
    <!--单选框end-->
    <hr class="hr0"/>
    <mt-field class="opinion" placeholder="请输入处理意见" type="textarea" rows="18" v-model="checkNote"></mt-field>
    <div class="btn">
      <img class="morebtnl" src="./image/icon_edit.svg"><!--margin-left:0.5rem;float:left;margin-top:1.1rem;-->
      <mt-button class="popupbtn" @click="getCheckValue">提交</mt-button>
      <!--float:left;margin-left:1.0rem;margin-bottom:0.5rem;-->
      <img class="morebtnr" src="./image/icon_dot.svg"><!--float:right;margin-top:1.0rem;margin-right:0.5rem;-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, Indicator, Header, Button, Popup} from 'mint-ui'

  Vue.component(Popup.name, Popup);
  Vue.component(Button.name, Button);
  import {formatDate} from '../common/js/date.js'
  import Vue from 'vue'
  import {
    getProjectList,
    getStageList,
    getTsakList,
    saveEnterData,
    getBillDetail,
    approval,
    getfilelist,
    getimagelist
  } from '../common/js/http.js';

  Vue.component(Header.name, Header);
  export default {
    name: "dealDetail",
    data() {
      return {
        billid:'',
        billtype:'',
        checkNote: '',
        checkResult:'',
        checkman:'',
        pk_flow:'',
        workflowtype:'',
        checkValue: '同意'
      }
    },
    created(){
      var that = this;
      this.billid = that.$route.query.billid;
      this.billtype = that.$route.query.billtype;
      this.checkman = that.$route.query.checkman;
      this.pk_flow = that.$route.query.pk_flow;
      this.workflowtype = that.$route.query.workflowtype;
    },
    methods: {
      //返回
      goBack() {
        this.$router.go(-1);
      },
      //同意/不同意
      getCheckValue() {
        console.log(this.checkValue);
        if (this.checkValue === "同意") {
          this.approveDetail();
        } else {
          this.rejectDetail();
        }
      },
      //审批
      approveDetail() {
        //this.$router.go(-1);
        var that = this;
        let params = {
          billtype: that.billtype,
          billid: that.billid,
          checkResult: 'Y',//审批Y驳回R
          checkman: that.checkman,
          checkNote: that.checkNote,//意见
          pk_flow: that.pk_flow,//
          workflowtype: that.workflowtype
        };
        console.log(params);
        /*Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });*/
        approval(params).then(res => {
          console.log(res);
          if (res.flag === "success") {
            //localStorage.setItem("dealDetail","已处理");
            Toast(res.msg);
            //console.log(res);
           // Indicator.close();
            Toast("审批成功");
            this.$router.go(-1);
            // this.$router.push('/');
          } else {
            console.log(res);
            //Indicator.close();
            Toast("审批失败," + res.msg);
            //this.$router.push('/');
          }
        }).catch(function (error) {
          Toast("审批失败!");
          //Indicator.close();
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
          billtype: that.billtype,
          billid: that.billid,
          checkResult: 'R',
          checkman: that.checkman,
          checkNote: that.checkNote,//意见
          pk_flow: that.pk_flow,//
          workflowtype: that.workflowtype
        };
        //console.log(params);
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        approval(params).then(res => {
          if (res.flag === "success") {
            Indicator.close();
            console.log(res);
            Toast(res.msg);
            this.$router.go(-1);
            //this.$router.push('/');
          } else {
            console.log(res);
            Indicator.close();
            Toast("驳回失败," + res.msg);
            //this.$router.push('/');
          }
        }).catch(function (error) {
          Toast("审批失败!");
          console.log(error);
        });
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/detail"
</style>
