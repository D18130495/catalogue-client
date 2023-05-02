<template>
  <div class="home">
    <div class="pageContainer">
      <div id="productDetailContainer">
        <div id="selectContainer">
          <el-select
              v-model="value"
              size="large"
              clearable
              multiple
              filterable
              remote
              placeholder="Please enter a category"
              :remote-method="searchCategories"
              :loading="loading"
              @change="getCategoryProduct"
              style="width: 70%">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div id="cardsContainer">
          <div class="cards">
            <product-card
                v-for="(product, index) in products"
                :key="index"
                :id="product.id"
                :title="product.title"
                :price="product.price"
                :discountPercentage="product.discountPercentage"
                :rating="product.rating"
                :category="product.category"
                :thumbnail="product.thumbnail"
            />
          </div>
        </div>

        <div id="paginationContainer">
          <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :page-sizes="[8, 12]"
                :current-page.sync=current
                :page-size=limit
                :total=total
                :layout="paginationLayout">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard';
import productApi from '@/api/product';
import {Message} from "element-ui";


export default {
  name: "HomePage",
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      queryForm: {
        categories: []
      },
      current: 1,
      limit: 12,
      total: 0,
      options: [],
      value: [],
      loading: false,
      paginationLayout: 'total, sizes, prev, pager, next, jumper'
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  created() {
    this.initialPage()
    // this.getProductByProductId(1)
  },
  methods: {
    searchCategories(queryForm) {
      if(queryForm !== '') {
        this.loading = true;
        this.searchCategory(queryForm);

      } else {
        this.options = [];
      }
    },
    searchCategory(queryForm) {
      this.options = [];

      productApi.getProductCategoriesFuzzySearch(queryForm)
          .then(response => {
            this.loading = false;

            response.data.data.forEach(cat => {
              let option = {};
              option.value = cat;
              option.label = cat;
              this.options.push(option);
            });
          })
          .catch(error => {
            this.loading = false;
            console.log(error)
          })
    },
    getCategoryProduct() {
      this.current = 1
      this.total = 0
      this.queryForm.categories = Object.values(this.value)

      productApi.getProductPagination(this.current, this.limit, this.queryForm)
          .then(response => {
            this.products = response.data.data.products
            this.current = response.data.data.current
            this.limit = response.data.data.limit
            this.total = response.data.data.total

            // calculate the time difference
            const endTime = new Date()
            const startTime = response.config.metadata.startTime
            const duration = endTime - startTime

            // display the duration in milliseconds
            Message.success({
              message: `Search request took ${duration}ms to complete`,
              showClose: true,
              duration: 2500
            })
          })
          .catch(error => {
            console.log(error)
          })
    },
    handleSizeChange(val) {
      this.limit = val
      const totalPages = Math.ceil(this.total / this.limit)

      if (this.current > totalPages) {
        this.current = totalPages
      }

      this.getProductPagination(this.current, val, this.queryForm)
    },
    handleCurrentChange(val) {
      this.getProductPagination(val, this.limit, this.queryForm)
    },
    initialPage() {
      this.getProductPagination(this.current, this.limit, this.queryForm)
    },
    getProductPagination(current, limit, queryForm) {
      productApi.getProductPagination(current, limit, queryForm)
        .then(response => {
          this.products = response.data.data.products
          this.current = response.data.data.current
          this.limit = response.data.data.limit
          this.total = response.data.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleResize() {
      if (window.innerWidth < 700) {
        this.paginationLayout = 'prev, pager, next';
      } else {
        this.paginationLayout = 'total, sizes, prev, pager, next, jumper';
      }
    }
  }
}
</script>

<style scoped>

</style>
