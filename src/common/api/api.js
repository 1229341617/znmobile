/**
 * Created by libo on 2018/1/16.
 */
import axios from 'axios'

//点击收藏
export function saveFavroite(params) {
  var url = global.API + '/Favroite/saveFavroite'
  return axios.get(url,{ params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}


//获取评论
export  function getDetail(params) {
  var url = global.API + '/comment/list'
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//点赞接口
export function likeClick(params) {
  var url = global.API + '/Course/CourseBehavior'
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//提交评论接口
export function commitComment(params) {
  var url = global.API +"/comment/save"
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//我的学习
export function getLearned(params) {
  var url = global.API + "/Course/searchPlayHistory"
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}


//热门学习
export function hotlearn(params) {
  var url = global.API + "/Chapter/SearchHotPlay"
  return axios.get(url,{params:params}).then((res)=> {
    return Promise.resolve(res.data)
  })
}

export function saveRecoder(params) {
  var url = global.API + "/Course/CourseBehavior"
  return axios.get(url,{params:params}).then((res)=> {
    return Promise.resolve(res.data)
  })
}


//获取用户信息
export function getUserInfo(params) {
  var url = global.API + "/user/getCurrentUserInfo"
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}




//我的收藏
export  function getCollect(params) {
  var url = global.API + "/Course/searchMyFavorite"
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//热门收藏
export function getHotCollect(params) {
  var url = global.API + "/Course/searchHotFavoriteCourse"
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}



//通过章节id获取课程信息
export function getCourseByChapterId(params) {
  var url = global.API + "/Course/SearchCourseByChapterId"
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//获取问题类型
export function getQuestionType(param) {
  var url = global.API + "/questiontype/list"
  return axios.get(url,{params:param}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getMyFeedback(param) {
  var url = global.API + "/feedback/searchmyfeedback"
  return axios.get(url,{params:param}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//分类问题
export function getSortQuestion(params) {
  var url = global.API + "/feedback/SearchFeedback"
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}
//搜索
export function getSearch(params) {
  var url = global.API + "/search/search"
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}

//提交反馈
export function commitFeedBack(params) {
  var url = global.API + '/feedback/save'
  return axios.get(url,{params:params}).then((res)=>{
    return Promise.resolve(res.data)
  })
}
export function toggleClass(el,className) {
  let newClass = el.className.split(' ')

  if (haseClass(el,className)) {
    removeByValue(newClass,className)
  }else {
    newClass.push(className)
  }
  el.className = newClass.join(' ')

}
function haseClass(el,className) {
  // let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
  // return reg.test(el,className)

  let classList = el.className.split(' ')
  if (classList.indexOf(className) !== -1){
    return true
  }else {
    return false
  }
}

function removeByValue(arr,val) {
  for (let i=0;i <arr.length;i++){
    if (arr[i] == val){
      arr.splice(i,1)
      break;
    }
  }
  return arr
}
