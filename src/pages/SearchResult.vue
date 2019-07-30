<template>
  <div id="CourseIndex" ref="CourseIndex">
    <div class="course">
      <div class="my-header">
        <div class="top-Header">
          <div class="back" @click="backhome">
            <img src="../../static/images/back.svg" alt="">
          </div>
          <div class="mySearch">
            <i class="mintui mintui-search"></i>
            <input type="search" placeholder="请输入课件名称关键字查询" v-model="courseName" @focus="toSearch">
          </div>
          <span class="cancel" @click="toSearch">取消</span>
        </div>
      </div>
      <div class="course-list">
        <ul>
          <loadmore :autoFill='false' :bottom-method='loadBottom' @bottom-status-change='handleBottomChange' :bottom-all-loaded='allLoaded' ref='loadmore1'>
            <li v-for="(courseinfo,index) in allCourse" :key="index">
              <cou-info :coursePK='courseinfo.pkCourse' :src='geturl(courseinfo.courseIconUrl)' :courseName="courseinfo.courseName" :lecturerName="courseinfo.courseLecturer" :promulgator="courseinfo.coursePublisher" :favoriteCount="courseinfo.favoriteCount" :promulgateTime="courseinfo.coursePublishTime" :playNum="courseinfo.courseBroadcastNumber" :likesNum="courseinfo.courseLikeNumber" :commentNum="courseinfo.courseCommentNumber">
              </cou-info>
            </li>
            <div slot="bottom" class="mint-loadmore-bottom">
              <span v-show='bottomStatus === "pull"'>↑</span>
              <span v-show='bottomStatus === "drop"'>↓</span>
              <span class='fixed' v-show='bottomStatus === "loading" '>
                <spinner></spinner>
              </span>
            </div>
          </loadmore>
        </ul>
        <span class="tip" v-if="isnull">~~暂无相关课程~~</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Search, Button, Loadmore, Spinner, InfiniteScroll, Toast, Indicator } from 'mint-ui'
import Vue from 'vue'
Vue.use(InfiniteScroll)
import Header from '../components/Header'
import CourseInfo from '../components/CourseInfo'
import sidebar from './Sidebar'
import {mapGetters} from 'vuex'

export default {
  name: 'SearchResult',
  data() {
    return {
      isnull: false,
      //是否全部加载
      allLoaded: false,
      //底部状态（加载更多）
      bottomStatus: '',
      // 控制筛选侧边栏是否显示
      isClickFilter: false,
      // 页数
      pageIndex: 1,
      // 课程名（通过搜索课程名查询）
      courseName: '',
      //所选时间
      timeValue: '',
      //所选排序字段名
      field: '',
      //所选排序规则
      sortOrder: '',
      // 所有课程
      allCourse: []
    }
  },
  computed:{
    ...mapGetters([
      'selectTime'
    ])
  },
  //初始化页面
  mounted() {
      console.log(this.selectTime)
    var that = this;
    that.courseName = that.$route.query.coursename;
    that.timeValue = that.$route.query.time;

    that.field = that.$route.query.field;
    that.sortOrder = 'DESC';
    Indicator.open({
      text: '加载中...',
      spinnerType: 'snake'
    });
    if (this.selectTime.start === this.selectTime.endDate){
        this.selectTime.start = this.selectTime.endDate = ""
    }
    that.axios.get(API + '/Course/SearchCourse', {
      params: {
        code:code,
        coursepurposeid:global.bagPk,
        pageIndex: that.pageIndex,
        pageSize: 5,
        coursename: that.courseName,
        selecteTimeId: that.timeValue,
        startTime:this.selectTime.start,
        endTime:this.selectTime.endDate,
        field: that.field,
        sortOrder: that.sortOrder
      }
    })
      .then(function (response) {
        // console.log(response);
        // that.allCourse = response.data.detailMsg.data.content;
        // Indicator.close();
        // console.log(that.allCourse);

        if (response.data.success === "success") {
          var data = response.data.detailMsg.data.content;
          console.log(data)
          if (data.length > 0) {
            that.isnull = false;
            that.allCourse = data;
            Indicator.close();
          } else {
            that.allCourse = "";
            that.isnull = true;
            Indicator.close();
          }
        } else {
          Toast("查询失败");
          Indicator.close();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    geturl: function (data) {
      return BashImgUrl + data;
    },
    // 回到课程首页
    backhome: function () {
      this.$router.push('/CourseIndex');
    },
    // 搜索框获得焦点时，跳转新的页面搜索
    toSearch: function () {
      this.$router.push('/Search');
    },
     //上拉刷新
    loadBottom(id) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      var that = this;
      that.pageIndex++;
      setTimeout(() => {
        that.axios.get(API + '/Course/SearchCourse', {
          params: {
             code:code,
             coursepurposeid:global.bagPk,
             pageIndex: that.pageIndex,
             pageSize: 5,
             coursename: that.courseName,
             selecteTimeId: that.timeValue,
             field: that.field,
             sortOrder: that.sortOrder
          }
        })
          .then(function (response) {
            if (response.data.success === "success") {
              var allCourse = response.data.detailMsg.data.content;
              if (allCourse.length > 0) {
                that.allCourse.push(...allCourse);
                Indicator.close();
              } else {
                Indicator.close();
                let instance = Toast('无更多课程');
                setTimeout(() => {
                  instance.close();
                }, 1000)
                that.allLoaded = true;
              }
            } else {
              Toast("查询失败");
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      }, 1000)
      that.$refs.loadmore1.onBottomLoaded(id);
    },
    handleBottomChange(status) {
      this.bottomStatus = status
    },
  },
  components: {
    'my-header': Header,
    'mt-button': Button,
    'loadmore': Loadmore,
    'cou-info': CourseInfo,
    Spinner,
    Search,
    sidebar
  }
}
</script>

<style scoped>
.my-header {
  border-bottom: 0.05rem solid #e5e5e5;
  text-align: center;
  color: #fff;
  position: relative;
}

.my-header .top-Header {
  height: 2.5rem;
  text-align: left;
}

.my-header .top-Header .cancel {
   padding: 0.2rem;
  /* margin-left: 0.2rem; */
  color: #86c840;
}

.back {
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
  margin-top: 0.5rem;
  margin-left: 1.75rem;
  display: inline-block;
  width: 75%;
   height:1.5rem;
   line-height: 1.5rem;
  /* padding: 0.25rem 0.25rem; */
  border: 0.05rem solid #fff;
  border-radius: 1rem;
  background-color: #86c840;
}

.mySearch .mintui-search {
  position: absolute;
  margin-left: 0.5rem;
  color: #ffffff;
}

.mySearch input {
margin-left:1.5rem;
padding:0.25rem 0;
height:1rem;
  width: 80%;
  text-indent: 0;
  border: 0;
  background-color: #86c840;
  outline: none
  /* opacity: 0.2; */
}

.mySearch input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}

.mySearch input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}

.mySearch input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}

.mySearch input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #fff;
}

.course-list {
  margin-top: 0.25rem;
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
</style>
