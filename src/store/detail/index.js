import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
//封装临时身份游客模块uuid--->生成一个随机字符串(不能更改)
import{getUUID} from'@/utils/uuid_token'
const state={
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    },

}
const actions={
    //获取产品信息的action
   async getGoodInfo({commit},skuid){
        let result= await reqGoodsInfo(skuid)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车后,前台将参数带给服务器,服务器写入数据成功,并没有返回其他的数据,只是返回code=200代表操作成功
        //因为服务器没有返回数据,所以此处不需要存储数据
        let result =await reqAddOrUpdateShopCart(skuId,skuNum)
        // 当前的这个函数如果执行返回promise
        //代表服务器加入购物车成功
        if(result.code==200){
            
            return "OK"
        }else{
            //代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
        
    }
}
//为简化数据而生
const getters={
    //路径导航简化的数据
    categoryView(state){
        //当前计算出来的属性值至少是一个空对象
        return state.goodInfo.categoryView||{}
    },
    //简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}