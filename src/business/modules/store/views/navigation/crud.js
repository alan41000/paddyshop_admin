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
          return !vm.hasPermissions('store.navigation:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('store.navigation:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('store.navigation:del')
        }
      },
      width: 180,
      fixed: 'right'
    },
    columns: [
      {
        title: '名称',
        key: 'name',
        sortable: false,
        search: {},
        form: {
          rules: [{ required: true, message: '请输入名称' }]
        },
      },
      {
        title: '图标',
        key: 'images_url',
        sortable: false,
        type:'avatar-uploader',
        component: { props: { height: 40, width: 40 } },
        form: {
          rules: [],
          component: {
            props: {
              uploader: {
                type: 'form',
                data:{path:'images/site'},
                action: '/admin/common.upload/save',
                successHandle(res){
                  return {url:res.data.url}
                }
              }
            },
            span: 24
          },
        },
      },
      {
        title: '平台',
        key: 'platform',
        sortable: false,
        width: 180,
        search: {
          disabled: false,
        },
        type: 'select',
        form: {
          rules: [{ required: true, message: '请选择平台' }],
          component: {
            props: {
              filterable: true,
              multiple: true,
              clearable: true
            }
          }
        },
        dict: {
          data: [
            { value:'h5',label:'H5',color:'success'},
            { value:'app-plus',label:'App',color:'success'},
            { value:'mp-weixin',label:'微信小程序',color:'success'},
            { value:'mp-alipay',label:'支付宝小程序',color:'success'},
            { value:'mp-baidu',label:'百度小程序',color:'success'},
            { value:'mp-toutiao',label:'头条小程序',color:'success'},
            { value:'mp-lark',label:'飞书小程序',color:'success'},
            { value:'mp-qq',label:'QQ小程序',color:'success'},
            { value:'mp-kuaishou',label:'快手小程序',color:'success'},
            { value:'mp-360',label:'360小程序',color:'success'},
          ]
        },
        component: { props: { color: 'auto' } } // 自动染色
      },
      {
        title: '事件类型',
        key: 'event_type',
        sortable: true,
        type: 'select',
        dict: {
            data: [
                { value:0, label:'WEB页面',color:'success'},
                { value:1, label:'内部页面(小程序或APP内部地址)',color:'success'},
                { value:2, label:'外部小程序(同一个主体下的小程序appid)',color:'success'},
                { value:3, label:'打开地图',color:'success'},
                { value:4, label:'拨打电话',color:'success'},
            ]
          },
        search: {
          disabled: false,
        },
        form: {
          rules: [{ required: true, message: '请选择事件类型' }]
        },
        show:false,
      },
      {
        title: '事件值',
        key: 'event_value',
        sortable: false,
        search: {
          disabled:true
        },
        form: {
          rules: [{ required: true, message: '请输入事件值' }]
        },
        show:false,
      },
      {
        title: '描述',
        key: 'desc',
        sortable: false,
        search: {
          disabled:true
        },
        form: {},
        show:false,
      },
      {
        title: '显示位置',
        key: 'position',
        sortable: true,
        type: 'select',
        dict: {
            data: [
                { value:'index',label:'首页导航',color:'success'},
                { value:'bottom',label:'底部导航',color:'success'},
                { value:'user',label:'会员中心菜单',color:'success'},
            ]
          },
        search: {},
        form: {
          rules: [{ required: true, message: '请选择显示位置' }]
        },
      },
      {
        title: '登录',
        key: 'is_need_login',
        sortable: true,
        type: 'select',
        dict: {
            data: [
              { value: true, label: '是',color: 'success'  }, { value: false, label: '否',color:'danger'}
            ]
          },
        search: {
          disabled: true,
        },
        form: {},
        show:false,
      },
      {
        title: '启用',
        key: 'is_enable',
        sortable: true,
        type: 'select',
        dict: {
            data: [
                { value: true, label: '是',color: 'success'  }, { value: false, label: '否',color:'danger'}
            ]
          },
        search: {
          disabled: true,
        },
        form: {},
      },
      {
        title: '排序',
        key: 'sort',
        type: 'number',
        search: { disabled: true },
        sortable: true
      },
    {
        title: '添加时间',
        key: 'create_time',
        form: {disabled: true, }, 
        disabled: true, 
        sortable: false
      },
      {
        title: '更新时间',
        key: 'update_time',
        form: {disabled: true, }, 
        disabled: true, 
        sortable: false
      },
    ]
  }
}
