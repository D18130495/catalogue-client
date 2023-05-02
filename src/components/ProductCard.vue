<template>
    <a class="card" :href="`/product/${id}`">
      <div class="picture">
        <img :src="thumbnail" alt="Product Image" />
        <span class="category">{{ category }}</span>
      </div>

      <div class="label">
        <span class="title">{{ title }}</span>
        <span class="price" data-is-round-price="true">€ {{ price }}</span>
      </div>

      <div class="rating">
        <div>
          <el-rate
              v-model=$props.rating
              disabled
              show-score
              text-color="#ff9900">
          </el-rate>
        </div>
        <span class="discount"><font-awesome-icon :icon="['fas', 'down-long']" size="sm" /> {{ discountPercentage }}%</span>
      </div>
    </a>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    category: String,
    thumbnail: String
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
