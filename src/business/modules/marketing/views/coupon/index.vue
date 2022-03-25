<!--
 * @Author: Alan Leung
 * @Description: 
-->
<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
          
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners"
        >
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />
            <el-button slot="header" v-permission="'marketing:coupon:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>
            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>
          <template slot="discount_valueSlot" slot-scope="scope">
            <div>订单满{{scope.row['min_order_price']}}元</div>
            <div v-if="scope.row['type'] == 0">减 {{scope.row['value']}}元</div>
            <div v-if="scope.row['type'] == 1">{{scope.row['value']}}折</div>
          </template>
        </d2-crud-x>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { request } from '@/api/service'
import * as api from './api'
export default {
  name: 'Coupon',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
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
    doDialogOpened(context){
      
      request({ 
        url: '/marketing.coupon/goodsListForCoupon',
        method: 'post',
        data: { is_shelves : 1 }
      }).then(ret => {
        this.getD2Crud().getFormTemplate('goods_ids').component.data = ret.data;
        this.getD2Crud().getFormTemplate('goods_ids').component.props.data = ret.data;
        this.getD2Crud().getFormTemplate('goods_ids').component.titles = ['可选','已选'];
      });
      if(context.mode == 'edit'){
        if(context.row.expire_type == 1)
        {
          context.row.expire_time = [
            new Date(context.row.start_time),new Date(context.row.end_time)
          ];
          context.form.expire_time = [
            new Date(context.row.start_time),new Date(context.row.end_time)
          ];
        }
        if(context.row.type == 1){
          context.row.value_rate = context.row.value;
          context.form.value_rate = context.row.value;
        }
        if(context.row.type == 0){
          context.row.value_rate = context.row.value;
          context.form.value_price = context.row.value;
        }
        if(context.row.apply_range == 1){
          context.row.category_ids = context.row.apply_range_config;
          context.form.category_ids = context.row.apply_range_config;
        }
        if(context.row.apply_range == 2){
          context.row.goods_ids = context.row.apply_range_config;
          context.form.goods_ids = context.row.apply_range_config;
        }
      }     
    },
  }
}
</script>
