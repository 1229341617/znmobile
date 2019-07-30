/**
 * Created by libo on 2018/1/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

var debug = process.env.NODE_ENV !== 'production'

export default  new Vuex.Store({
  getters,
  state,
  mutations,
  strict:debug,
  plugins:debug ? [createLogger()] : []
})
