// search模块的小仓库
import { reqGetSearchInfo } from "@/api"
const state = { searchList: {} }
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        //    params形参:是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
// 项目当中getters主要的作用是:简化仓库中的数据
const getters = {
    // 当前形参state是当前仓库中的state,并非大仓库中的state
    goodsList(state) {
        // 假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
        //计算属性的数组至少返回一个空数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[]
    },
    attrsList(state) {
        return state.searchList.attrsList||[]
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}