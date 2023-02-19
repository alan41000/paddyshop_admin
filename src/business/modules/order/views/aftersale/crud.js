import { request } from '@/api/service'
import AftersaleGoods from '@/business/modules/order/components/aftersaleGoods/aftersaleGoods'
import AftersaleInfo from '@/business/modules/order/components/aftersaleInfo/aftersaleInfo'

export const crudOptions = (vm) => {
  return {
    options: {
        height: '100%', // 表格高度100%, 使用toolbar必须设置
        highlightCurrentRow: true,
        rowKey: 'id'
    },
    components: {
        AftersaleGoods,
        AftersaleInfo
    },
    rowHandle: {
        custom: [
            {
              text: '审核',
              type: 'primary',
              size: 'small',
              emit: 'audit',
              icon: 'el-icon-s-flag',
              disabled () {
                  return !vm.hasPermissions('order.aftersale:audit')
              },
              show:(index,row)=>{
                return row.status == 2
              }
            },
            {
              text: '确认',
              type: 'primary',
              size: 'small',
              emit: 'confirm',
              icon: 'el-icon-s-flag',
              disabled () {
                  return !vm.hasPermissions('order.aftersale:confirm')
              },
              show:(index,row)=>{
                return row.status == 0
              }
            },
            {
              text: '拒绝',
              type: '',
              size: 'small',
              emit: 'refuse',
              icon: 'el-icon-s-flag',
              disabled () {
                  return !vm.hasPermissions('order.aftersale:refuse')
              },
              show:(index,row)=>{
                  return row.status == 0
              }
            },
        ],
      view: {
        thin: true,
        text: null,
        show:false,
        disabled:true
      },
      edit: {
        thin: true,
        text: null,
        show:false,
        disabled: true
      },
      remove: {
        thin: true,
        text: null,
        show:false,
        disabled: true
      },
      width: 180,
    },
    columns: [
      {
        title: '商品信息',
        key: 'items',
        sortable: false,
        width: 400,
        component: {
            name: AftersaleGoods,
        },
        form: {
            disabled:true
        },
      },
      {
        title: '退款信息',
        key: 'aftersaleInfo',
        sortable: false,
        width: 150,
        component:{
          name:AftersaleInfo,
        },
        form: {
            disabled:true
        },
      },
      {
        title: '买家',
        key: 'userInfo.nickname',
        sortable: true,
        search: {disabled:true},
        width: 80,
        form: {
            disabled:true
        },
      },
      {
        title: '交易状态',
        key: 'status',
        sortable: true,
        type: 'select',
        width: 40,
        dict: {
            data: [
                { value: 0, label: '待确认'},
                { value: 1, label: '待退货'},
                { value: 2, label: '待审核'},
                { value: 3, label: '已完成'},
                { value: 4, label: '已拒绝'},
                { value: 5, label: '已取消'}
            ]
          },
          search: { disabled:false},
        form: {},
        width: 100
      },
      {
        title: '订单号',
        key: 'order_no',
        sortable: true,
        search: {},
        width: 100,
        form: {
            disabled:true
        },
        show:false,
      },
    ]
  }
}
