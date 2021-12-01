import { request } from '@/api/service'
import userInfo from '@/business/modules/finance/components/userInfo/userInfo'

export const crudOptions = (vm) => {
  return {
    options: {
        height: '100%', // 表格高度100%, 使用toolbar必须设置
        highlightCurrentRow: true,
        rowKey: 'id'
    },
    components: {
      userInfo
    },
    rowHandle: false,
    columns: [
      {
        title: '会员',
        key: 'userInfo',
        sortable: true,
        search: {disabled:true},
        width: 150,
        component: {
          name: userInfo,
      },
        form: {
            disabled:true
        },
      },
      // {
      //   title: '订单编号',
      //   key: 'order_id',
      //   sortable: false,
      //   width: 50,
      //   form: {
      //       disabled:true
      //   },
      // },
      {
        title: '支付平台交易号',
        key: 'trade_no',
        sortable: false,
        search: { disabled:false},
        width: 150,
        form: {
            disabled:true
        },
      },
      {
        title: '支付平台用户帐号',
        key: 'buyer_user',
        sortable: false,
        search: { disabled:false},
        width: 150,
        form: {
            disabled:true
        },
      },
      {
        title: '支付金额',
        key: 'pay_price',
        sortable: false,
        width: 100,
        form: {
            disabled:true
        },
      },
      {
        title: '订单实际金额',
        key: 'total_price',
        sortable: false,
        width: 100,
        form: {
            disabled:true
        },
      },
      {
        title: '订单名称',
        key: 'subject',
        sortable: false,
        width: 100,
        form: {
            disabled:true
        },
      },
      {
        title: '支付方式',
        key: 'payment_id',
        sortable: false,
        type: 'select',
        width: 50,
        dict: {
            data: [
                { value: 0, label: '未知' },
                { value: 1, label: '微信'},
                { value: 2, label: '钱包'},
            ]
        },
        search: { disabled:false},
        form: {},
        width: 100
      },
      {
        title: '支付时间',
        key: 'create_time',
        sortable: false,
        width: 100,
        form: {
            disabled:true
        },
      },
    ]
  }
}
