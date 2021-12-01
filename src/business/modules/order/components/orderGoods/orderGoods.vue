<template>
  <div>
      <div class="info">
        <div class="info-left">订单号：{{ this.scope.row.order_no }}</div>
        <div class="info-right">创建日期：{{ this.scope.row.create_time }}</div>
      </div>
      <div class="goods">
            <div v-for="(item) in this.scope.row.orderDetail" :key="item.id" class="items">
              <div class="items-left">
                <el-image
                style="width: 80px; height: 80px"
                :src="item.images">
                </el-image>
              </div>
              <div class="items-right">
                <div class="title">
                    {{ item.title }}
                </div>
                <div class="price-info" v-if="item.sku !== ''">
                    规格：{{ item.sku }}
                </div>
                <div class="price-info">
                    单价：{{ item.price }}  数量:{{ item.qty }} 
                </div>
              </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
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
.items{ width: 100%; float: left;}
.items-left{width:13%; float: left;}
.items-right{width:80%; float: left; line-height: 2;}
.items-right .title{ font-size: 16px; width: 100%;}
.items-right .price-info{  width: 100%;}
</style>