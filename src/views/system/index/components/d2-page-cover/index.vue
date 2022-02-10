<template>
  <div>
    <div>
      <el-row>
        <el-col :span="24">
          PaddyShop 全网多平台免费开源电商系统
        </el-col>
      </el-row>
      <el-row class="mt20">
        <el-col :span="24">
          <div class="box">
            <el-row>
              <el-col :span="24">
                今日概况
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="number">{{shopData.todayInfo.orderCount}}</div>
                <div>订单数</div>
              </el-col>
              <el-col :span="4">
                <div class="number">{{shopData.todayInfo.faveCount}}</div>
                <div>收藏量</div>
              </el-col>
              <el-col :span="4">
                <div class="number">{{shopData.todayInfo.newUser}}</div>
                <div>新增会员</div>
              </el-col>
              <el-col :span="4">
                <div class="number">{{shopData.todayInfo.afterSale}}</div>
                <div>售后</div>
              </el-col>
              <el-col :span="4">
                <div class="number">{{shopData.todayInfo.withdraw}}</div>
                <div>提现</div>
              </el-col>
              <el-col :span="4">
                <div class="number">{{shopData.todayInfo.comments}}</div>
                <div>评价</div>
              </el-col>
            </el-row>            
          </div>
        </el-col>
      </el-row>
      <el-row class="mt20" :gutter="20">
        <el-col :span="14">
          <div class="box">
            <el-row>
              <el-col :span="24">
                订单状态
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="number">{{shopData.orders.notPay}}</div>
                <div>待付款</div>
              </el-col>
              <el-col :span="6">
                <div class="number">{{shopData.orders.toBeDelivered}}</div>
                <div>待发货</div>
              </el-col>
              <el-col :span="6">
                <div class="number">{{shopData.orders.delivered}}</div>
                <div>已发货</div>
              </el-col>
              <el-col :span="6">
                <div class="number">{{shopData.orders.finish}}</div>
                <div>已完成</div>
              </el-col>
            </el-row> 
          </div>
        </el-col>
        <el-col :span="10">
          <div class="box">
            <el-row>
              <el-col :span="24">
                快捷入口
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-button @click="$open('https://www.paddyshop.net')">官方网站</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="$message('敬请期待')">文档中心</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="$open('https://github.com/alan41000/paddyshop')">github</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="$open('https://gitee.com/alan410/paddyshop')">gitee</el-button>
              </el-col>
            </el-row> 
          </div>
        </el-col>
      </el-row>
      <el-row class="mt20" :gutter="20">
        <el-col :span="14">
          <div class="box">
            <el-row>
              <el-col :span="24">
                热销商品
              </el-col>
            </el-row>
            <el-row>
              <el-table
                :data="hotGoods"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="index"
                  label="排名"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="title"
                  label="商品">
                </el-table-column>
                <el-table-column
                  prop="sales_count"
                  label="销量"
                  width="100">
                </el-table-column>
              </el-table>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="box">
            <el-row>
              <el-col :span="24">
                销售统计
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" align="middle">
              <el-col :span="8">
                <div style="text-align:center">昨日销量</div>
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="24">
                    <div>订单量：{{shopData.sales.yesterday.count}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div>销售额：{{shopData.sales.yesterday.sales}}</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" align="middle">
              <el-col :span="8">
                <div style="text-align:center">本周销量</div>
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="24">
                    <div>订单量：{{shopData.sales.week.count}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div>销售额：{{shopData.sales.week.sales}}</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around" align="middle">
              <el-col :span="8">
                <div style="text-align:center">本月销量</div>
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="24">
                    <div>订单量：{{shopData.sales.month.count}}</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div>销售额：{{shopData.sales.month.sales}}</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      
    </div>
  </div>
</template>
<script>
import { request } from '@/api/service'
export default {
  data () {
    return {
      hotGoods:[],
      shopData:{
        hotGoods:[],
        orders:{},
        todayInfo:{},
        sales:{
          yesterday:{count:0,sales:0},
          week:{count:0,sales:0},
          month:{count:0,sales:0}
        },
      },
    }
  },
  mounted(){
    this.getShopData()
  },
  methods:{
    getShopData(){
      request({ url: '/store.ShopData/shopData',method: 'post',data: [] }).then(ret => {
        if(ret.code == 200)
        {
          this.shopData = ret.data;
          this.hotGoods = ret.data.hotGoods;
          this.hotGoods.forEach(function(value,index,array){
            value.index = index + 1
      　　})
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.box{
  border: 1px solid #dcdfe6;
  padding: 15px 20px;
}
.number{
  font-size: 18px;
}
.mt20{
  margin-top: 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
  border: 1px solid #dcdfe6;
}
</style>
