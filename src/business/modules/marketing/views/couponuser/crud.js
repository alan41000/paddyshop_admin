/*
 * @Author: Alan Leung
 */
import { request } from '@/api/service'
import couponItem from '@/business/modules/marketing/components/couponItem/couponItem'
import userItem from '@/business/modules/marketing/components/userItem/userItem'
export const crudOptions = (vm) => {
  return {
    options: {
        height: '100%', // 表格高度100%, 使用toolbar必须设置
        highlightCurrentRow: true,
        rowKey: 'id'
    },
    rowHandle: {
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('marketing:couponuser:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        show:false,
        disabled: true,
      },
      remove: {
        thin: true,
        text: null,
        show:false,
        disabled: true,
      },
      width: 180,
      fixed: 'right',
    },
    columns: [
      {
        title: 'ID',
        key: 'id',
        sortable: false,
        search: {
          disabled:true
        },
        width: 70,
        form:{
          disabled:true
        }
      },
      {
        title:'优惠券',
        key:'couponItem',
        sortable: false,
        width: 200,
        component: {
            name: couponItem,
        },
        form: {
            disabled:true
        },
      },
      {
        title:'会员',
        key:'userItem',
        sortable: false,
        width: 200,
        component: {
            name: userItem,
        },
        form: {
            disabled:true
        },
      },
      {
        title: '使用时间',
        key: 'use_time',
        show:true,
        disabled: false,
        search: { disabled: true },
        width: 200,
        form: {
          disabled:true
        }
      },
      {
        title: '领券时间',
        key: 'create_time',
        show:true,
        disabled: false,
        search: { disabled: true },
        width: 200,
        form: {
          disabled:true
        }
      },
    ]
  }
}
