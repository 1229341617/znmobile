<template>
    <div style="margin:0;padding:0;width:100%;height:100%;overflow: auto">
     <mt-header class="my-header" title="协同详情" style="width:100%;position:fixed;top:0;left:0;z-index:999">
        <div slot="left" @click="goBack()">
          <mt-button icon="back" class="top-Header">返回</mt-button>
        </div>
      </mt-header>
      <div style="position:fixed;top:2.0rem;left:0;width:100%;height:100%;overflow: auto;">
        <iframe ref="iframe" id="bdIframe"  :src="imgURL" frameborder="0" scrolling="auto"></iframe>
     </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import {Indicator} from 'mint-ui'
    export default {
        name: "imgDetail",
      data(){
          return{
            imgURL:'',
            message:""
          }
      },
      mounted(){
          var that = this;
          this.imgURL = that.$route.query.imgURL;
          console.log(this.imgURL);

          var oIframe = document.getElementById("bdIframe");
          var deviceWidth = document.documentElement.clientWidth;
          var deviceHeight = document.documentElement.clientHeight;
          oIframe.style.width = (Number(deviceWidth))+ 'px';
          oIframe.style.height = (Number(deviceHeight)-80) + 'px';
      },
      created(){
        /*this.$nextTick(() => {
          this.getCode();
        })*/
      },
      methods:{
          goBack(){
            this.$router.go(-1);
          },
        changeFrameHeight(){
            //console.log(document.getElementById("myiframe").style.height);
            //var ifm = document.getElementById("myiframe");
            //ifm.style.height = document.documentElement.clientHeight;
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/detail"
  #Veiw2
    width 20%;
    position fixed
    top 3.0rem
    left 0
</style>
