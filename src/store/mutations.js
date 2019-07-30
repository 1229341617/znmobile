/**
 * Created by libo on 2018/1/15.
 */
import * as types from './mutation-types'

var mutations = {
  [types.SET_TIME](state,obj){
    state.selectTime = obj
  },

  [types.SET_HOME](state,obj){
    state.isHome = obj
  },
  [types.SET_TYPES](state,obj){
    state.questionType = obj
  }
}


export default mutations
