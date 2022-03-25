<!--
 * @Author: Alan Leung
-->
<template>
  <div>
      <!-- <div class="info">
        创建日期：{{ this.scope.row.couponInfo.create_time }}
      </div> -->
      <div class="goods">
            <div class="items">
              <div class="items-left">
                <el-image
                style="width: 40px; height: 40px"
                :src="this.scope.row.couponInfo.recommended_images">
                </el-image>
              </div>
              <div class="items-right">
                <div class="title">
                    {{ this.scope.row.couponInfo.name }}
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
.info-left{width:30%; float: left;}
.info-right{width:70%; float: left;}
.goods{ width: 100%; padding:10px;display: block;}
.items-left{width:20%; float: left;}
.items-right{width:80%; float: left; line-height: 2;}
.items-right .title{ font-size: 14px!important; margin-left: 10px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
.items-right .price-info{ color: #c0c4cc; width: 100%;}
</style>