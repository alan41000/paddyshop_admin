import { request } from '@/api/service'
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
          return !vm.hasPermissions('wallet.wallet:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('wallet.wallet:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        show: false,
        disabled: () => {
          return !vm.hasPermissions('wallet.wallet:del')
        }
      },
      width: 180,
      fixed: 'right'
    },
    columns: [
      {
        title: '会员',
        key: 'user_id',
        type: 'select',
        width: 200,
        dict: {
            url: '/user.user/getAll', 
            value: 'id',
            label: 'nickname',
            getData: (url, dict) => {
              return request({ url: url, method: 'post'}).then(ret => {                
                return ret.data
             })
          },
        },
        sortable: false,
        search: {disabled:false},
        form: {
            disabled:true,
        },
        show:true
      },
      {
        title: '有效金额',
        key: 'normal_money',
        sortable: true,
        search: {disabled:true},
        form: {},
        width: 200,
        form: {
        },
      },
      {
        title: '冻结金额',
        key: 'frozen_money',
        sortable: true,
        search: {disabled:true},
        form: {
          rules: [
          ],
        },
        width: 200,        
      },
      {
        title: '赠送金额',
        key: 'give_money',
        sortable: true,
        search: {disabled:true},
        form: {
          rules: [
          ],
        },
        width: 200,        
      },      
      {
        title: '状态',
        key: 'status',
        sortable: true,
        type: 'select',
        dict: {
            data: [
                { value: 0, label: '正常' }, { value: 1, label: '异常' }, { value: 2, label: '已注销', color: 'danger' },
            ]
          },
        search: {},
        form: {
          value:0
        },
        width: 100
      },
      {
        title: '创建时间',
        key: 'create_time',
        show:false,
        disabled: true,
        search: { disabled: true },
        form: {
            disabled:true
        }
      },
      {
        title: '更新时间',
        key: 'update_time',
        show:false,
        disabled: true,
        search: { disabled: true },
        form: {
            disabled:true
        }
      },
    ]
  }
}
