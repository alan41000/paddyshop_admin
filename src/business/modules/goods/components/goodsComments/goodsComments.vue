<template>
  <div>
      <!-- <div class="info">
        <div class="info-left">商品型号：{{ this.value.model }}</div>
        <div class="info-right">创建日期：{{ this.value.create_time }}</div>
      </div> -->
      <div class="goods">
            <div class="items">
              <div class="items-left">
                <el-image
                style="width: 50px; height: 50px"
                :src="this.value.home_recommended_images">
                </el-image>
              </div>
              <div class="items-right">
                <div class="title">
                    {{ this.value.title }}
                </div>
                <!-- <div class="price-info">
                    单价：{{ item.price }}  数量:{{ item.buy_number }} 
                </div> -->
              </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: null
    },
    scope: {
      default: null
    },
    myProps: {
      default: null
    }
  },
  computed: {
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style>
.info{ width:100%; color: #c0c4cc; padding:10px;display: block;}
.info-left{width:30%; float: left;}
.info-right{width:70%; float: left;}
.goods{ width: 100%; padding:10px;display: block;}
.items-left{width:20%; float: left;}
.items-right{width:80%; float: left; line-height: 1.5;}
.items-right .title{ font-size: 14px;}
.items-right .price-info{ color: #c0c4cc; width: 100%;}
</style>