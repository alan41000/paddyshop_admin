import { mobileValidator } from 'el-phone-number-input'
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
          return !vm.hasPermissions('user.user:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('user.user:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('user.user:del')
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
        //     return !vm.hasPermissions('usersphere.user:authz')
        //   }
        // }
      ]
    },
    columns: [
      {
        title: '头像',
        key: 'avatar',
        type: 'avatar-uploader',
        sortable: false,
        component: { props: { height: 50, width: 50 } },
      },
      // {
      //   title: '用户名',
      //   key: 'username',
      //   search: { disabled: false },
      //   form: {
      //     editDisabled: true,
      //     rules: [{ required: true, message: '请输入用户名' }]
      //   },
      //   sortable: 'custom'
      // },
      // {
      //   title: '密码',
      //   key: 'password',
      //   form: {
      //     component: {
      //       props: {
      //         showPassword: true
      //       }
      //     },
      //     helper: '填写则修改密码'
      //   },
      //   disabled: true,
      //   sortable: 'custom'
      // },
      {
        title: '昵称',
        key: 'nickname',
        search: { disabled: false },
        sortable: false,
      },
      {
        title: '手机号',
        key: 'mobile',
        form: {
          // rules: [{ validator: mobileValidator, message: '请输入正确的手机号' }]
        },
        search: { disabled: false }, // 开启查询
        sortable: false,
      },      
      {
        title: '性别',
        key: 'gender',
        type: 'radio',
        dict: {
          data: [
            { value: 0, label: '保密' }, { value: 1, label: '男' }, { value: 2, label: '女', color: 'danger' }
          ]
        },
        form:{
          component:{
            value:0
          }
        },
        sortable: false,
      },
      {
        title: '邮箱',
        key: 'email',
        search: { disabled: true },
        form: {
          rules: [{ type: 'email', message: '请输入正确的邮箱' }],
        },
        show:false,
      },
      {
        title: '省',
        key: 'province',
        search: { disabled: false },
        form: {
          
        },
        show:true,
      },
      {
        title: '城市',
        key: 'city',
        search: { disabled: false },
        form: {
          
        },
        show:true,
      },
      {
        title: '生日',
        key: 'birthday',
        search: { disabled: false },
        type: 'date',
        show:true,
      },
      {
        title: '状态',
        key: 'status',
        type:'select',
        search: { disabled: false },
        dict: {
          data: [
            { value: 0, label: '正常', color: 'success' }, { value: 1, label: '禁止登录', color: 'danger' }
          ]
        },
        form: {
          // rules: [{ required: false, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱' }]
          component:{
            value:0
          }
        },
        sortable: 'custom'
      },
      {
        title: '创建时间',
        key: 'create_time',
        type: 'datetime',
        width: 140,
        form: { disabled: true },
        show:false,
      },
      {
        title: '修改时间',
        key: 'update_time',
        type: 'datetime',
        width: 140,
        form: { disabled: true },
        show:false,
      },
    ]
  }
}
