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
          return !vm.hasPermissions('wallet.walletLog:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        show: false,
        disabled: () => {
          return !vm.hasPermissions('wallet.walletLog:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        show: false,
        disabled: () => {
          return !vm.hasPermissions('wallet.walletLog:del')
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
        title: '业务',
        key: 'business_type',
        sortable: true,
        type: 'select',
        search: {disabled:true},
        form: {},
        width: 80,
        dict: {
          data: [
            { value: 0, label: '系统' },
            { value: 1, label: '充值' },
            { value: 2, label: '提现' },
            { value: 3, label: '消费' },
          ]
        },
      },
      {
        title: '操作',
        key: 'operation_type',
        sortable: true,
        type: 'select',
        search: {disabled:true},
        form: {
          rules: [
          ],
        },
        width: 200, 
        dict: {
          data: [
            { value: 0, label: '减少' },
            { value: 1, label: '增加' },
          ]
        },       
      },
      {
        title: '金额类型',
        key: 'money_type',
        type: 'select',
        sortable: true,
        search: {disabled:true},
        form: {
          rules: [
          ],
        },
        width: 200, 
        dict: {
          data: [
            { value: 0, label: '常规' },
            { value: 1, label: '冻结' },
            { value: 2, label: '赠送' },
          ]
        },        
      },
      {
        title: '操作金额',
        key: 'operation_money',
        sortable: true,
        search: {disabled:true},
        form: {
          rules: [
          ],
        },
        width: 200,        
      }, 
      {
        title: '原始金额',
        key: 'original_money',
        sortable: true,
        search: {disabled:true},
        form: {
          rules: [
          ],
        },
        width: 200,        
      }, 
      {
        title: '最新金额',
        key: 'latest_money',
        sortable: true,
        search: {disabled:true},
        form: {
          rules: [
          ],
        },
        width: 200,        
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
