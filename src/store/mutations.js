/*
* Vuex 对常量的操作
* const mutations 相当于对象
* state, singer提交的常量
* */
import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
