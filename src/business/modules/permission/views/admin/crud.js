import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 180,
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('auth.admin:list')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('auth.admin:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('auth.admin:del')
        }
      },
      custom: [
        // {
        //   thin: true,
        //   text: null,
        //   type: 'warning',
        //   size: 'small',
        //   emit: 'authz',
        //   icon: 'el-icon-s-flag',
        //   disabled () {
        //     return !vm.hasPermissions('auth.admin:authz')
        //   }
        // }
      ]
    },
    columns: [
      // {
      //   title: 'id',
      //   key: 'id',
      //   width: 70,
      //   form: { disabled: true },
      //   sortable: true,
      //   show:false,
      // },
      {
        title: '用户名',
        key: 'username',
        search: { disabled: false },
        form: {
          editDisabled: true,
          rules: [{ required: true, message: '请输入用户名' }]
        },
        width:300,
        sortable: true
      },
      {
        title: '昵称',
        key: 'nickname',
        search: { disabled: false },
        sortable: true
      },
      {
        title: '密码',
        key: 'password',
        form: {
          component: {
            props: {
              showPassword: true
            }
          },
          helper: '填写则修改密码'
        },
        disabled: true,
        sortable: true
      },
      {
        title: '性别',
        key: 'gender',
        type: 'radio',
        width: 70,
        dict: {
          data: [
            { value: 1, label: '男' }, { value: 2, label: '女', color: 'danger' },{ value: 0, label: '保密' }
          ]
        }, 
        sortable: true,
        show:false,
      },
      {
        title: '邮箱',
        key: 'email',
        search: { disabled: false },
        form: {
          rules: [{ type: 'email', message: '请输入正确的邮箱' }]
        },
        sortable: true,
        show:true
      },
      {
        title: '角色',
        key: 'role_id',
        type: 'select',
        width:300,
        dict: {
          url: '/auth.role/list',
          value: 'id',
          label: 'name',
          getData: (url, dict) => { // 配置此参数会覆盖全局的getRemoteDictFunc
            return request({ url: url }).then(ret => { return ret.data.records })
          }
        },
        search: { disabled: false },
        form: {
          disabled: false
        },
        sortable: true
      },
      {
        title: '状态',
        key: 'status',
        type: 'radio',
        width:300,
        dict: {
          data: [
            { value: 1, label: '正常' }, { value: 2, label: '禁止登录', color: 'danger' },{ value: 0, label: '未知' }
          ]
        }, 
        sortable: true,
        show:true,
      },
      {
        title: '创建时间',
        key: 'create_time',
        type: 'datetime',
        width: 140,
        form: { disabled: true },
        sortable: true,
        show:false
      },
      {
        title: '修改时间',
        key: 'update_time',
        type: 'datetime',
        width: 140,
        form: { disabled: true },
        sortable: true,
        show:false
      },
    ]
  }
}
