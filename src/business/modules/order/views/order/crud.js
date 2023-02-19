import { request } from '@/api/service'
import OrderGoods from '@/business/modules/order/components/orderGoods/orderGoods'
import OrderStatus from '@/business/modules/order/components/orderStatus/orderStatus'

export const crudOptions = (vm) => {
  return {
    options: {
        height: '100%', // 表格高度100%, 使用toolbar必须设置
        highlightCurrentRow: true,
        rowKey: 'id'
    },
    components: {
        OrderGoods,
        OrderStatus
    },
    rowHandle: {
        custom: [
            {
                text: '发货',
                type: 'warning',
                size: 'small',
                emit: 'delivery',
                icon: 'el-icon-s-flag',
                show:(index,row)=>{
                    return row.status === 2;
                },
                disabled () {
                    return !vm.hasPermissions('order.order:delivery')
                }
            },
            {
              text: '详情',
              type: 'primary',
              size: 'small',
              emit: 'orderDetailShow',
              icon: 'el-icon-s-flag',
              disabled () {
                  return !vm.hasPermissions('order.order:view')
              }
            },
            {
              text: '关闭',
              type: '',
              size: 'small',
              emit: 'closeOrder',
              icon: 'el-icon-s-flag',
              disabled () {
                  return !vm.hasPermissions('order.order:close')
              },
              show:(index,row)=>{
                  return row.status == 0 || row.status == 1
              }
            },
        ],
      view: {
        thin: true,
        text: null,
        show:false,
        disabled () {
          return !vm.hasPermissions('order.order:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        show:false,
        disabled: () => {
          return !vm.hasPermissions('order.order:update')
        }
      },
      remove: {
        thin: true,
        text: null,
        show:false,
        disabled: () => {
          return !vm.hasPermissions('order.order:delete')
        }
      },
      width: 180,
    },
    columns: [
      {
        title: '订单',
        key: 'items',
        sortable: false,
        width: 500,
        component: {
            name: OrderGoods,
        },
        form: {
            disabled:true
        },
      },
      {
        title: '订单金额',
        key: 'total_price',
        sortable: false,
        width: 100,
        form: {
            disabled:true
        },
      },
      {
        title: '买家',
        key: 'userInfo.nickname',
        sortable: true,
        search: {disabled:true},
        width: 100,
        form: {
            disabled:true
        },
      },
      {
        title: '交易状态',
        key: 'status',
        sortable: true,
        type: 'select',
        width: 100,
        component: {
          name: OrderStatus,
        },
        // dict: {
        //     data: [
        //         { value: 0, label: '待确认' },
        //         { value: 1, label: '待支付'},
        //         { value: 2, label: '待发货'},
        //         { value: 3, label: '已发货'},
        //         { value: 4, label: '已完成'},
        //         { value: 5, label: '已取消'},
        //         { value: 6, label: '已关闭'}
        //     ]
        //   },
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
