//登录与注册的模块
import { reqGetCode, reqLogOut, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { setToken,getToken,removeToken } from "@/utils/token"
const state={
    code:'',
    token:getToken('TOKEN'),
    userInfo:{}
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    // 清除本地数据
    CLEAR(state){
        state.userInfo=''
        state.token=''
        removeToken()
    }
}
const actions={
    //获取验证码
    async getCode({commit},phone){
       let result= await reqGetCode(phone)
       if(result.code==200){
           commit('GETCODE',result.data)
           return 'ok'
       }else{
           return Promise.reject(new Error('false'))
       }
    },
    //用户注册
    async userRegister({commit},user){
       let result= await reqUserRegister(user)
      if(result.code==200){
          return 'ok'
      }else{
          return Promise.reject(new Error('false'))
      }
    },
    //登录业务[token]
    async userLogin({commit},data){
        let result =await reqUserLogin(data)
        //服务器下发token,用户唯一标识符
        //前台通过token向后台要信息
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
        //用户持久化存储token
        setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('false'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result= await reqUserInfo()
            if(result.code==200) {
                commit('GETUSERINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('false'))
            }
    },
    //退出登录
    async userLogOut({commit}){
       let result= await reqLogOut()
       //action中不能操作state,提交mutation修改state
       if(result.code==200){
        commit('CLEAR')
        return 'ok'
       }else{
           return Promise.reject(new Error('false'))
       }
    }
}
const getters={}
export default{
    state,
    mutations,
    actions,
    getters
}