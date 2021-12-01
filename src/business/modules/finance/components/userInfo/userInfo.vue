<template>
  <div>
      <!-- <div class="info">
        <div class="info-left">订单号：{{ this.scope.row.order_no }}</div>
        <div class="info-right">创建日期：{{ this.scope.row.create_time }}</div>
      </div> -->
      <div class="goods">
            <div class="items" v-if="this.scope.row.userInfo">
              <div class="items-left">
                <el-image
                style="width: 30px; height: 30px"
                :src="this.scope.row.userInfo.avatar">
                </el-image>
              </div>
              <div class="items-right">
                <div class="title">
                    {{ this.scope.row.userInfo.nickname }}
                </div>
                <div class="price-info">
                    <!-- 单价：{{ item.price }}  数量:{{ item.buy_number }}  -->
                </div>
              </div>
            </div>
            <div class="items anonymous" v-else>
                匿名用户
            </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
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
.info-left{width:50%; float: left;}
.info-right{width:50%; float: left;}
.goods{ width: 100%; padding:10px;display: block;}
.items-left{width:20%; float: left;}
.items-right{width:80%; float: left; line-height: 2;}
.items-right .title{ font-size: 12px; width: 100%;}
.items-right .price-info{ color: #c0c4cc; width: 100%;}
.anonymous{ color:#c0c4cc}
</style>