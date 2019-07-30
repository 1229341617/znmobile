<template>
  <div class="approvaldetails">
    <mt-header style="font-family: Microsoft Yahei" title="审批详情">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <!--总-->
    <ul class="list">
      <li class="list-item" v-for="(item,index) in unapprovaldetails">
        <div class="approvaldetail">
            <p class="name">审批人：{{item.checkman}}</p>
            <p class="dealdate">审批日期：{{item.dealdate}}</p>
            <p class="status">审批状态：{{item.approveStatus}}</p>
            <p class="icon">审批意见：{{item.checknote}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getUnApprovalDetails} from '../common/js/http.js'
  import {Indicator, Toast} from 'mint-ui'

  export default {
    name: 'approvalDetails',
    data() {
      return {
        billid: '',
        billtype: '',
        unapprovaldetails: {}
      }
    },
    mounted() {
      this.getUnApprovalDetails();
    },
    created() {
      this.billid = this.$route.query.billid;
      this.billtype = this.$route.query.billtype;
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      getUnApprovalDetails() {
        var that = this
        let params = {
          billid: that.billid,
          billtype: that.billtype
        }
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        })
        getUnApprovalDetails(params).then(res => {
          Indicator.close();
          if (res.flag === 'success') {
            console.log(res);
            this.unapprovaldetails = res.data;
          } else {
            Toast("获取失败！");
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list-item
    border-bottom: 1px solid #f5f5f5
    .approvaldetail
        padding-top: 10px
        padding-bottom: 10px
        padding-left: 25px
        width: 100%
        text-align: left
        font-size: 14px
        font-family: Microsoft Yahei
        /*.name
        .dealdate
        .status
        .icon*/
</style>
