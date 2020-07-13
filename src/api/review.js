import axios from '@/utils/request'

const api = {
    getGoodsList: '/trade/goods',
    addGoodsEvaluate: '/goodsEvaluate/add'
}

export default api

export function getGoodsList (tid) {
    return axios({
        url: `${api.getGoodsList}/${tid}`,
        method: 'get'
    })
}
export function addGoodsEvaluate (data) {
    return axios({
        url: `${api.addGoodsEvaluate}`,
        method: 'post',
        data
    })
}
