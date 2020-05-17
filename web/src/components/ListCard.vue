<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div 
        class="nav-item" 
        :class="{active: active === i}"
        v-for="(category, i) of categories"
        :key="category.name"
        @click="active = i">
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide 
          v-for="(category, i) of categories" 
          :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  name: "ListCard",
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0
    }
  }
};
</script>

<style lang="scss" scoped>
</style>