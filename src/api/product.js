import request from '@/utils/request'

export default {
    getProductPagination(current, limit, queryForm) {
        return request({
            url: `/api/product/getProductPagination/${current}/${limit}`,
            method: 'get',
            params: queryForm
        })
    },
    getProductCategoriesFuzzySearch(queryForm) {
        return request({
            url: `/api/product/getProductCategoriesFuzzySearch/${queryForm}`,
            method: 'get'
        })
    },
    getProductByProductId(productId) {
        return request({
            url: `/api/product/getProductByProductId/${productId}`,
            method: 'get'
        })
    },
    addProduct(product) {
        return request({
            url: `/api/product/addProduct`,
            method: 'post',
            data: product
        })
    },
    editProductByProductId(product) {
        return request({
            url: `/api/product/editProductByProductId`,
            method: 'put',
            data: product
        })
    },
    deleteProductByProductId(productId) {
        return request({
            url: `/api/product/deleteProductByProductId/${productId}`,
            method: 'delete'
        })
    }
}
