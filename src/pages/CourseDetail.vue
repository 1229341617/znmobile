<template>
  <div id="coursedetail">
    <div  ref="video"  id="videoheight" style="height: 8.8rem;" v-show="showVideo"></div>
    <div class="content" style="position: relative">
      <bottom-page
        :pcCourse="courseId"
        :detailTitle="detailTitle"
        :info="info" :introduce="introduce"
        :chapters="chapters"
        @playClick="onPlayClick"
        @hideVideo="onHideVideo"
        @showVideo="showVideoPlay"></bottom-page>
    </div>
  </div>
</template>
<script scoped>
  import { Loadmore,Spinner,InfiniteScroll, Toast,Indicator } from 'mint-ui'
  import {saveRecoder} from "../common/api/api"
  import Vue from 'vue'
  Vue.use(InfiniteScroll)
  import Header from '../components/Header'
  import Detail from '../components/Detail'
  import BottomPage from '../components/BottomPage.vue'
  export default {
    name: 'CourseDetail',
    data() {
      return{
        isclickPlay:false,
        isClikLikes:false,
        //切换点赞图片地址
        likeImgSrc:'',
        courseId:'',
        chapters:[],
        info:{},
        showVideo:true,
        title:'1 使命',
        src:'',
        //点赞数
        likeNum:0,
        //课程标题
        detailTitle:'',
        //当前章节index
        chapterIndex:0,
        progress:0,
        //课程介绍
        introduce:'',
        commentNum:3,
        // 视频地址
        videoSrc:'',
        video: {
          sources: [{
            src: '',
            type: 'video/mp4'
          }],
          options: {
            autoplay: false,
            volume: 0.6,
            poster: ''
          },
          showVideo:true
        },
        allSection:[]
      }
    },
    mounted(){
      console.log("code="+global.code)
      this.registerWebViewJavascriptCallBack();
      var that = this;
      this.courseId=this.$route.query.courseId
      console.log("课程ID" + that.courseId)
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });

      // 查询课程详情
      that.axios.get(API + '/Course/SearchCourseById', {
        params: {
          code:code,
          courseId:that.courseId,
          useId:global.userId
        }
      })
      .then(function (response) {
        if (response.data.success === "success"){
            console.log(response.data.detailMsg.data)
          var data = response.data.detailMsg.data.result[0];
          that.chapters = response.data.detailMsg.data.chapters
          console.log(that.chapters)
        // 视频地址
//        that.video.sources[0].src=BashImgUrl+data.courseUrl;
          that.videoSrc=BashImgUrl+that.chapters[0].url;
        // 视频图片
        that.video.options.poster=BashImgUrl+data.courseIconUrl;
        //课程名
        that.detailTitle=that.chapters[0].name;
         //点赞数
        that.likeNum=data.courseLikeNumber;
        //课程介绍
        that.introduce=data.courseIntroduction;
        //是否点赞过
        that.isClikLikes=response.data.detailMsg.data.Likeflag;

        that.info.likeNum = that.likeNum
        that.info.Likeflag = response.data.detailMsg.data.Likeflag
        that.info.favroiteFlag = response.data.detailMsg.data.favroiteFlag
        that.info.courseCommentNumber = data.courseCommentNumber
        that.info.favoriteCount = data.favoriteCount
        if(that.isClikLikes){
            that.likeImgSrc='../../static/images/likes.svg';
             Indicator.close();
        }else{
           that.likeImgSrc='../../static/images/likes1.svg';
           Indicator.close();
        }
         that.playVideo(that,that.videoSrc,0,0)

        }else{
          Toast("查询失败");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    destroyed(){

      this.closeVideo()
     // console.log("退出")
    },
    methods:{
        onPlayClick(url,index){
           let position = this.progress*1000
          console.log(position)
           this.playVideo(this,url,index,position)
        },
      onHideVideo(){
       // this.showVideo = false
        this.closeVideo()
      },
      showVideoPlay(){
          console.log("showVideoPlay")
        console.log(this.progress)
        this.playVideo(this,this.videoSrc,this.chapterIndex,this.progress*1000)
      },
      closeVideo(){
        this.connectWebViewJavascriptBridge(function(YonYouJSBridge) {
          var data = {
            'function': 'closeVideoPlayer',
            'parameters': {
            }
          };
          YonYouJSBridge.send(JSON.stringify(data), function (responseData) {
             // console.log("关闭视频")
              //console.log(responseData);
          });
        });
      },
        playVideo(that,url,index,position){
          //  视频播放
          let _url = url.replace(/\\/g,"/");
          _url = encodeURI(_url);
          that.videoSrc = _url
          that.chapterIndex = index
          that.detailTitle = that.chapters[index].name
          var height = document.getElementById("videoheight").height;
          that.connectWebViewJavascriptBridge(function(YonYouJSBridge) {
            var data = {
              'function': 'showVideoPlayer',
              'parameters': {
                "width": -1, //视频窗⼝的宽度
                "height": height, //视频窗⼝的⾼度
                "top": 0, //视频窗⼝在屏幕的y轴坐标
                "left": 0, //视频窗⼝在屏幕的x轴坐标
                "id": that.courseId, //视频id
                "title": that.detailTitle, //视频标题
                "url": _url, //视频url
                "progress": position, //视频当前的播放进度（毫秒）
                "progressBarColor": "#ff6666", //进度条的⾊值
                "isFullScreen": false, //是否全屏
                "isAutoPlaying": false, //是否⾃动播放
                "needUploadProgress": true, //是否需要上传进度
                "canMoveProgress": true, //是否可以拖拽进度
                "jsMethod":"jscallback"
              }
            };
            YonYouJSBridge.send(JSON.stringify(data),null);
          });
        },

      registerWebViewJavascriptCallBack(){
        var that=this;
        window.WebViewJavascriptBridge.registerHandler('jscallback',function (data,jscallback) {
          that.jscallback(data)
        });
      },
      jscallback(data){
        var data = JSON.parse(data).data.progress;
        var progress = Math.ceil(data/1000);
        this.progress = progress

        if(progress>0 || data == -1){
         // console.log("以播放"+this.progress)
          this.countPlayNum(this.progress);
        }

        if (data == -1){
          this.chapterIndex ++

          if (this.chapterIndex < this.chapters.length){

            let url =BashImgUrl + this.chapters[this.chapterIndex].url
           // console.log("come "+ url)
            this.playVideo(this,url,this.chapterIndex,0)
          }
        }
      },
      //视频播放回调
      connectWebViewJavascriptBridge:function(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge);
          }, false);
        }
      },
      //点赞加1
      clickLikes:function(){
        var that = this;
        if(that.isClikLikes){
            return;
        }
        var id=that.$route.query.courseId;
        that.axios.get(API + '/Course/CourseBehavior', {
          params: {
            code:code,
            courseBehaviorType:'03',
            courseId:id,
            useId:global.userId
          }
        })
        .then(function (response) {
        //  console.log(response);
          if(response.data.detailMsg.data=="success"){
            that.likeImgSrc='../../static/images/likes.svg';
            that.likeNum++;
            that.isClikLikes=true;
          }else{
            Toast("操作失败");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      countPlayNum:function(progress){
        var that = this;
//        if(that.isclickPlay){
//          return
//        }
        var id=that.$route.query.courseId;
        let params = {
          code:code,
          courseBehaviorType:'02',
          courseId:id,
          chapterId:that.chapters[that.chapterIndex].pkChapter,
          userId:global.userId,
          progress:progress
        }
//        saveRecoder(params).then(res=>{
//
//            if (res.success == "success"){
//
//            }
//        })
        this.axios.get(API + '/Course/CourseBehavior', {
          params: {
            code:code,
            courseBehaviorType:'02',
            courseId:id,
            chapterId:that.chapters[that.chapterIndex].pkChapter,
            userId:global.userId,
            progress:progress
          }
        })
        .then(function (response) {
          console.log("======")
//          if(response.data.success == "success"){
//            that.isclickPlay=true;
//            console.log("进来了")
//            Toast("看了");
//          }else{
//            Toast("操作失败");
//          }
          console.log(response)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    components:{
      'v-head':Header,
      'v-detail':Detail,
      'loadmore':Loadmore,
      'bottom-page':BottomPage,
    }
  }
</script>

<style>
</style>
