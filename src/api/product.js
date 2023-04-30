import request from '@/utils/request'

export default {
    getProductByProductId(productId) {
        return request({
            url: `/api/product/getProductByProductId/${productId}`,
            method: 'get'
        })
    }
}
