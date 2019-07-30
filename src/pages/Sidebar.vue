<template>
    <div id="Siderbar" ref="wrapper">
        <div class="blank" :style="{height:wrapperHeight + 'px'}" @click="closeSidebar"></div>
        <div class="sidebar-content" :style="{height:wrapperHeight + 'px'}">
            <div class="sidebar-list">
                <div class="filtrate">
                    <!--<img src="../../static/images/filter1.svg" alt="">-->
                    <img src="../../static/images/icon_time.svg" alt="" class="iconTime"/>
                    <!--<span>分类</span>-->
                    <div class="timeChoose">
                      <div id="all" @click="chooseTime($event,this)" class="myselected1">
                        <button :class="{selected:isSelected}" class="sub-item">全部</button>
                      </div>
                       <div id="week" @click="chooseTime($event,this)">
                           <button :class="{selected:isSelected}" class="sub-item" style="margin-left: 0.3rem">本周</button>
                        </div>
                       <div id="month" @click="chooseTime($event,this)">
                            <button :class="{selected:isSelected}" class="sub-item" style="margin-left: 0.3rem">本月</button>
                        </div>
                    </div>
                    <!--<button class="all-course" @click="allCourse">全部课程</button>-->
                </div>
                <div class="scroll" :style="{height:(wrapperHeight-100) + 'px'}">
                  <div id="all-name" class="myselected" @click="allCourse" style="border-bottom: 1px solid #f5f5f5">
                    <img src="../../static/images/icon_1.svg" alt="" class="all-img">
                    <button class="all-item" :class="{selected:isSelected}">全部分类</button>
                    <!--<button :class="{selected:isSelected}" class="sub-item">全部分类</button>-->
                  </div>
                  <ul>
                      <li v-for="(item,index) in sidebarList" :key="index" v-if="item.name!='未分类'">
                          <div class="filtrate-name">
                              <img src="../../static/images/icon_1.svg" alt="">
                              <span class="bigtitle">{{item.name}}</span>
                              <!-- <span>(</span>
                              <span>{{item.courseNum}}</span>
                              <span>)</span> -->
                          </div>
                          <ul class="sub">
                            <div class="all-title" @click.stop="selectAll($event)">全部</div>
                              <li v-for="(subitem,index) in item.sublist" :key="index" :id="subitem.id" @click.stop="choose($event)">
                                  <button :class="{selected:isSelected}" class="sub-item">{{subitem.name}}</button>
                              </li>
                          </ul>
                      </li>
                  </ul>
                </div>
                <div class="checkbtn" style="background: white;padding-top: 0.25rem">
                    <a class="cancel" @click="closeSidebar">取消</a>
                    <a class="confirm" @click="searchCourse(selectedCourseId)">完成</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Header, Button } from 'mint-ui';
import {toggleClass} from '../common/api/api'
export default {
    props: ['sidebarList'],
    data() {
        return {
            wrapperHeight: 0,
            isSelected: false,
            selectedCourseId: '',
            selecteTimeId:'',
            ids:[],
            currentCourse:''
        }
    },
    created() {
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight;
    },
    methods: {
        closeSidebar: function () {
            this.$emit('closeit');
        },
      //是否包含某个样式
       hasClass(el,className) {

          let classList = el.className.split(' ')
          if (classList.indexOf(className) !== -1){
                  return true
             }else {
                   return false
               }
           },
      //点击全部按钮
      selectAll(event){
           toggleClass(event.target,'selectAll')
           let names = event.target.className.split(' ')
        var lis = event.target.parentElement.querySelectorAll('li')
        if (this.hasClass(event.target,'selectAll')){
          if (lis){
            for (var i = 0;i < lis.length;i++){
              lis[i].setAttribute("class","myselected")
            }
          }
        }else {
          for (var i = 0;i < lis.length;i++){
            lis[i].removeAttribute("class","myselected")
          }
        }

        var myAll = document.getElementsByClassName("all-item")[0];
        myAll.parentElement.removeAttribute("class", "myselected");
      },

      //判断子项目是否全部选中
      isContainAll(els,className){
        var showSelectAll = true
        for (var i = 0;i < els.length;i++){
           if (!this.hasClass(els[i],className))
               showSelectAll = false

        }
        return showSelectAll
      },
        choose: function (event) {
          toggleClass(event.target.parentElement,'myselected')
          var lis = event.target.parentElement.parentElement.querySelectorAll('li')
          var all = event.target.parentElement.parentElement.querySelectorAll('div')
          let names = all[0].className.split(' ')
          if (lis.length == 1){

            if (this.hasClass(event.target.parentElement,'myselected')){
              names.push('selectAll')
            }else {
              delete names[names.length-1]
            }
            all[0].className = names.join(' ')
            //去掉全部分类选中
            var myAll = document.getElementsByClassName("all-item")[0];
            myAll.parentElement.removeAttribute("class", "myselected");

            return
          }

          if (this.isContainAll(lis,"myselected")){
            if (this.hasClass(event.target.parentElement,'myselected')){
              names.push('selectAll')
            }else {
                console.log(names)
              if (names.indexOf('selectAll')!== -1){
                delete names[names.length-1]
              }
            }
            all[0].className = names.join(' ')
          }else {
            if (names.indexOf('selectAll')!== -1){
              delete names[names.length-1]
            }

            all[0].className = names.join(' ')
          }
          //去掉全部分类选中
          var myAll = document.getElementsByClassName("all-item")[0];
          myAll.parentElement.removeAttribute("class", "myselected");

        },
        getIds(){
            var lis = document.getElementsByClassName("myselected");
            delete lis[0]

            if (lis.length > 0) {
                for (var i = 0; i < lis.length; i++) {
                   if (i == 0) continue
                  this.ids.push(lis[i].id)
                }
            }
//            var id = event.target.parentElement.id;
//            this.selectedCourseId = id;
//            this.currentCourse = event.target.innerText;
//            document.getElementById(id).setAttribute("class", "myselected");

        },
        chooseTime:function(){
           var lis = document.getElementsByClassName("myselected1");
            if (lis.length > 0) {
                for (var i = 0; i < lis.length; i++) {
                    lis[i].removeAttribute("class", "myselected1");
                }
            }
            var id = event.target.parentElement.id;
            this.selecteTimeId = id;
            document.getElementById(id).setAttribute("class", "myselected1");
        },
        allCourse: function () {
            //this.$emit('lookAllCourse',this.selecteTimeId);
          //去掉按钮选中
          var lis = document.getElementsByClassName("myselected");
          var lisNum = lis.length;
          if (lis.length > 0) {
            for (var i = 0; i < lisNum; i++) {
              lis[0].removeAttribute("class", "myselected");
            }
          }
          //去掉全部选中
          var lisAll = document.getElementsByClassName("selectAll");
          var lisAllNum = lisAll.length;
          if (lisAll.length > 0) {
            for (var i = 0; i < lisAllNum; i++) {
              toggleClass(lisAll[0],'selectAll');
            }
          }
          var id = event.target.parentElement.id;
          this.selectedCourseId = "";
          this.currentCourse="全部课程";
          document.getElementById(id).setAttribute("class", "myselected");
        },
        searchCourse: function () {

               this.getIds()
               this.selectedCourseId = this.ids.join(',')
              console.log(this.selectedCourseId)
            this.$emit('searchCourse', this.selectedCourseId,this.selecteTimeId,this.currentCourse);
        }
    },
    components: {
        'mt-button': Button
    }
}
</script>
<style scoped>

.iconTime{
    margin-top: 0.3rem;
 }
.timeChoose{
    margin-left:5rem;
}
.timeChoose,.timeChoose div{
    display: inline-block;
}
.timeChoose div button{
    text-align: center;
    color: #fff8dc;
    border:0.05rem solid #fff;
    background-color: rgba(0,0,0,0);
    width:2rem;
    height: 1.25rem;
    border-radius: 0.75rem;
    outline: none;
}


.selectAll{
  color: #fff !important;
  background-color: #06CF86 !important;
}

.myselected button {
    color: #fff !important;
    background-color: #06CF86 !important;
}
.myselected1 button {
    color: #87c74a !important;
    background-color: #fff !important;
}

#Siderbar {
    position:fixed;
    z-index:999;
    width: 100%;
    /* background-color: #b5b5b5; */
}


.blank {
    width:15%;
    display: inline-block;
    background-color:#5a5a5a;
    filter:Alpha(Opacity=60);
    opacity:0.6;
}

.sidebar-content {
    position: relative;
    float: right;
    width: 85%;
    background-color: #fff;
}

.filtrate {
    position: relative;
    background-color: #87c74a;
    line-height: 2.5rem;
    height: 2.5rem;
    text-align: left;
    padding: 0.25rem 0.5rem;
}

.filtrate img {
    top: 0.5rem;
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
}

.filtrate span {
    color: #fff;
    font-size: 1rem;
    margin-left: 1.75rem;
}

.filtrate .all-course {
    outline: none;
    text-align: center;
    color: #06CF86;
    border: 0;
    background-color: #fff;
    float: right;
    margin-top: 0.625rem;
    width: 3.5rem;
    height: 1.25rem;
    border-radius: 0.75rem;
}

.scroll {
    overflow: auto;
}

.sidebar-list .scroll>ul>li {
    list-style: none;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #f5f5f5;
}
#all-name{
  height: 1rem;
  line-height: 1rem;
  position: relative;
  text-align: left;
  margin-left: 0.5rem;
  padding-bottom:1.2rem ;
  padding-top: 0.7rem;
}
.all-img{
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.1rem;
}
.all-item{
  color: #656b79;
  background-color: #f6f8fa;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.75rem;
  border: 0;
  box-sizing: border-box;
  display: inline-block;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  margin-left: 1.5rem;
  font-size: 0.5rem;
  padding:0.25rem;
  min-height: 1.5rem;
}
.filtrate-name {
    height: 1.25rem;
    line-height: 1.25rem;
    position: relative;
    text-align: left;
    margin-left: 0.5rem;
    padding: 0.5rem 0;
}

.filtrate-name img {
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
}

.filtrate-name span {
    color: #87c74a;
    font-size: 0.8rem;
}

.filtrate-name .bigtitle {
    margin-left: 1.5rem;
}

.sidebar-list .sub {
    list-style: none;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    padding-left: 0.5rem;
}

.sidebar-list .sub li {
    display: inline-block;
}

.sidebar-list .sub  .all-title{
  color: #656b79;
  background-color: #f6f8fa;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 2rem;
  border-radius: 0.75rem;
  border: 0;
  box-sizing: border-box;
  display: block;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.5rem;
  /* width: 3.5rem; */
  padding:0.35rem;

  height: 1.5rem;
}
.sidebar-list .sub li .sub-item {
    color: #656b79;
    background-color: #f6f8fa;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.75rem;
    border: 0;
    box-sizing: border-box;
    display: block;
    outline: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.5rem;
    /* width: 3.5rem; */
    padding:0.25rem;
    min-height: 1.5rem;
}
.sidebar-list .sub li .all-select{
  color: #06CF86;
  background-color: #FFFFFF;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.75rem;
  border: 0;
  box-sizing: border-box;
  display: block;
  outline: 0;
  overflow: hidden;
  position: relative;
  text-align: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.5rem;
  /* width: 3.5rem; */
  padding:0.25rem;
  min-height: 1.5rem;
}
.checkbtn {
    z-index: 99;
    margin-bottom: 0.25rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #d5d5d5;
}

.checkbtn .cancel {
    height: 1.5rem;
    line-height: 1.5rem;
    width: 42%;
    border-radius: 0.75rem;
    display: inline-block;
    background-color: #f6f8fa;
}

.checkbtn .confirm {
    color: #fff;
    display: inline-block;
    line-height: 1.5rem;
    border-radius: 0.75rem;
    width: 42%;
    height: 1.5rem;
    background-color: #06CF86;
}
</style>
