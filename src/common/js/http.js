import axios from 'axios'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill(); //使用polyfill()执行es6代码
//模块化，一个export就是一个模块
export function appCreat(params) {    //app初始化
  var url = global.API + '/Znmobile/getTokenInfo'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)//异步操作执行成功后的回调函数
  })
}
export function getNumbers(params) {    //获得消息数
  var url = global.API + '/app/getUnapprotalNum'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
export function getFreeze(params) {  //获得当前用户工时填报情况
  var url = global.API + '/app/freeze/getfreezedate'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
export function getCondition(params) {  //获得当前用户工时显示情况
  var url = global.API + '/app/workhour/getappcwh'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
export function getProjectList(params) {  //获得项目列表
  var url = global.API + '/app/project/getmyproject'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
export function getStageList(params) {   //获得阶段列表
  var url = global.API + '/app/project/getmethod'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
export function getTsakList(params) {   //获得描述信息列表
  var url = global.API + '/app/project/task'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function saveEnterData(params) {    //项目填报提交
  var url = global.API + '/app/workhour/save'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getUnExamineList(params) {   //得到待审批列表
  var url = global.API + '/Znmobile/getunapproval'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getBillDetail(params) {   //得到待审批列表点某一项后,进去后的详细信息
  var url = global.API + '/Znmobile/getBillDetail'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getfilelist(params) {   //获取附件
  var url = global.API + '/Znmobile/getfilelist'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getimagelist(params) {   //获取影像
  var url = global.API + '/Znmobile/getimagelist'
  return axios.get(url,{
    params:params
  },{

    headers:{

      'Content-Type': 'application/x-www-form-urlencoded'

    },withCredentials : true

  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function approval(params) {   //办理
  var url = global.API + '/Znmobile/approval'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getExamineList(params) {   //得到已审批列表
  var url = global.API + '/app/workhour/getapprovaled'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getUnApprovalDetails(params) {
  var url = global.API + "/Znmobile/getUnApprovalDetails"
  return axios.get(url, {
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data);
  })
}

export function downFile(params) {
  var url = global.API+"/znerpmobile/downFile/"+params
  return axios.get(url, {
  }).then((res)=>{
    console.log(res.data);
    return Promise.resolve(res.data);
  })
}

//
// export function approval(params) {   //审批3，驳回1，弃审/未审批2
//   var url = global.API + '/app/workhour/approval'
//   return axios.post(url,{
//     params:params
//   }).then((res)=>{
//     return Promise.resolve(res.data)
//   })
// }
/*export function approval(json) {
  var url  = global.API + "/app/workhour/approval"
  return axios.post(url,json).then((res)=>{
    return Promise.resolve(res.data)
  })
}*/

export function addDelay(params) {   //提交延迟原因
  var url = global.API + '/app/defer/save'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getDelayList(params) {   //查看延迟原因
  var url = global.API + '/app/defer/query'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getMineList(params) {   //得到我的项目列表
  var url = global.API + '/app/workhour/query'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function delMineList(params) {   //删除我的项目列表
  var url = global.API + '/app/workhour/del'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function editMineList(params) {   //编辑我的项目列表
  var url = global.API + '/app/workhour/querybyid'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
//假期
export function getHolidayType(params) {   //假期类型
  var url = global.API + '/app/vacation/type'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function saveHolidayData(params) {   //保存我的假期数据
  var url = global.API + '/app/vacation/save'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getHolidayData(params) {   //假期-我的
  var url = global.API + '/app/vacation/query'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function editHolidayData(params) {   //假期-编辑我的
  var url = global.API + '/app/vacation/querybyid'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function delHolidayData(params) {   //假期-删除我的
  var url = global.API + '/app/vacation/del'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getHolidayUnExamine(params) {   //得到假期待审批列表
  var url = global.API + '/app/vacation/getunapproval'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function getHolidayExamine(params) {   //得到假期已审批列表
  var url = global.API + '/app/vacation/getapprovaled'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

export function holidayApproval(params) {   //审批1，驳回2，弃审3
  var url = global.API + '/app/vacation/approval'
  return axios.get(url,{
    params:params
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}



