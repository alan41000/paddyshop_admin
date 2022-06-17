<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @delivery="delivery"
                @orderDetailShow="orderDetailShow"
        >
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>
        </d2-crud-x>

        <el-dialog title="发货操作" width="30%" :visible.sync="dialogFormVisible">
            <el-form ref="deliveryForm" :model="dialogForm">
                <el-form-item label="快递公司" :label-width="formLabelWidth">
                    <el-select v-model="dialogForm.express_id" placeholder="请选择快递公司">
                        <el-option v-for="(item,index) in deliveryData" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递单号" :label-width="formLabelWidth">
                    <el-input v-model="dialogForm.express_number" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="deliveryCancle('deliveryForm')">取 消</el-button>
                <el-button type="primary" @click="deliveryConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="订单详情" width="80%" :visible.sync="dialogOrderDetail">
            <el-row>
                <el-col :span="12">
                    <div>
                        订单详情
                    </div>
                    <div class="pd20">
                        <el-form ref="form" v-if="orderDetail.row" :model="orderDetail.row" label-width="80px">
                            <el-form-item label="订单号">
                                <el-input v-model="orderDetail.row.order_no"></el-input>
                            </el-form-item>
                            <el-form-item label="买家" v-if="orderDetail.row.userInfo">
                                <el-input v-model="orderDetail.row.userInfo['nickname']"></el-input>
                            </el-form-item>                            
                            <el-form-item label="收货人" v-if="orderDetail.row.addressInfo">
                                <el-input v-model="orderDetail.row.addressInfo.name"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" v-if="orderDetail.row.addressInfo">
                                <el-input v-model="orderDetail.row.addressInfo.tel"></el-input>
                            </el-form-item>
                            <el-form-item label="收货地址" v-if="orderDetail.row.addressInfo">
                                <el-input v-model="orderDetailAddress"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="orderDetail.row.user_note"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div>
                        订单状态
                    </div>
                    <div class="pd20" v-if="orderDetail.row">
                        <div>
                            <el-steps :space="200" :active="orderDetail.row.status" finish-status="success">
                                <el-step title="待付款"></el-step>
                                <el-step title="待发货"></el-step>
                                <el-step title="已发货"></el-step>
                                <el-step title="已完成"></el-step>
                            </el-steps>
                        </div>
                        <div class="mt20">
                            <el-button size="small" @click="delivery(orderDetail)" v-if="hasPermissions('order.order:delivery') && orderDetail.row.status == 2">发货</el-button>
                            <el-button size="small" v-if="orderDetail.row.status == 0 || orderDetail.row.status == 1">关闭订单</el-button>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12" v-if="orderDetail.hasOwnProperty('row') && orderDetail.row.extension_data">
                    <div>
                        其他信息
                    </div>
                    <div class="pd20">
                        <div v-for="(item,index) in JSON.parse(orderDetail.row.extension_data)">
                            {{item.name}} ： {{item.tips}}
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div>
                        商品清单
                    </div>
                    <div class="pd20" v-if="this.orderDetail.row">
                        <!-- <div class="order-item"> -->
                            <el-row>
                                <el-col :span="12">
                                    商品名称
                                </el-col>
                                <el-col :span="4">
                                    单价
                                </el-col>
                                <el-col :span="4">
                                    数量
                                </el-col>
                                <el-col :span="4">
                                    小计
                                </el-col>
                            </el-row>
                            <el-row v-for="(item) in this.orderDetail.row.orderDetail" :key="item.id">
                                <el-col :span="12">
                                    <div class="fl">
                                        <el-image
                                        style="width: 60px; height: 60px"
                                        :src="item.images">
                                        </el-image>
                                    </div>
                                    <div class="fl title">{{item.title}}</div>
                                </el-col>
                                <el-col :span="4">
                                    {{item.price}}
                                </el-col>
                                <el-col :span="4">
                                    {{item.qty}}
                                </el-col>
                                <el-col :span="4">
                                    {{item.total_price}}
                                </el-col>
                            </el-row>
                    </div>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogOrderDetail = false">关 闭</el-button>
            </div>
        </el-dialog>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
import { request } from '@/api/service'

export default {
  name: 'Order',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
        dialogOrderDetail: false,
        orderDetail:{},
        orderDetailAddress:'',
        dialogFormVisible: false,
        dialogForm: {
            express_number:'',
            express_id:'',
            express_name:'',
        },
        dialogFormOrderId:0,
        dialogFormUserId:0,
        formLabelWidth: '80px',
        deliveryData:[],
    }
  },
  created(){
      this.getDeliveryData();
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return api.GetList(query)
    },
    addRequest (row) {
      return api.AddObj(row)
    },
    updateRequest (row) {
      return api.UpdateObj(row)
    },
    delRequest (row) {
      return api.DelObj(row.id)
    },
    infoRequest (row) {
      return api.GetObj(row.id)
    },
    // 获取配送方式
    getDeliveryData(){
        request({ url: '/setting.delivery/getAll',method: 'post', }).then(ret => {
            if(ret.code !== 200)
            {
                this.$message.error(ret.msg);
            }else{
                this.deliveryData = ret.data
            }
        })
    },
    orderDetailShow(row){
        this.dialogOrderDetail = true;
        this.orderDetail = row;
        this.orderDetailAddress = row.row.addressInfo.province_name + row.row.addressInfo.city_name + row.row.addressInfo.county_name + row.row.addressInfo.address
    },
    delivery(row){
        this.dialogFormVisible = true;
        this.dialogFormOrderId = row.row.id;
        this.dialogFormUserId = row.row.user_id;
    },
    deliveryConfirm(){
        var express_id = this.$refs.deliveryForm.model.express_id;
        var express_number = this.$refs.deliveryForm.model.express_number;
        var data = {
            express_id:express_id,
            express_number:express_number,
            order_id:this.dialogFormOrderId,
            user_id:this.dialogFormUserId,
        };
        api.Delivery(data).then(res=>{
            if(res.code == 200)
            {
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
                this.doRefresh();
                this.dialogFormVisible = false;
                this.dialogOrderDetail = false;
                this.dialogForm = {
                    express_number:'',
                    express_id:'',
                    express_name:'',
                };
            }
        });
    },
    deliveryCancle(deliveryForm){
        this.dialogFormVisible = false;
        this.dialogForm = {
            express_number:'',
            express_id:'',
            express_name:'',
        }
        this.$nextTick(()=>{
            this.$refs['deliveryForm'].resetFields();
        })
    },
  }
}
</script>
<style>
.pd20{
    padding: 20px;
}
.mt20{
    margin-top: 20px;
}
.fl{
    float:left;
}
.title{
    font-size: 16px;
    margin-left: 10px;
    width: 80%;
}
</style>