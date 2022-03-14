import { request } from '@/api/service'
import goodsItem from '@/business/modules/goods/components/goodsItem/goodsItem'

export const crudOptions = (vm) => {
  return {
    options: {
      height: '100%' // 表格高度100%, 使用toolbar必须设置
    },
    components: {
      goodsItem
    },
    formOptions: {
      width: '80%',
      // center: true // 标题与按钮居中布局
    },
    viewOptions: {
      componentType: 'form'
    },
    rowHandle: {
      // columnHeader: '操作',
      width: 180,
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('goods.goods:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('goods.goods:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('goods.goods:del')
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
        title:'商品',
        key:'goodsItem',
        sortable: false,
        width: 400,
        component: {
            name: goodsItem,
        },
        form: {
            disabled:true,
            show:false,
        },
      },
      {
        title: '首页推荐图',
        key: 'home_recommended_images',
        type:'image-uploader',
        component: { props: { height: 80, width: 80 } },
        width: 95,
        show:false,
        search: { disabled: true },
        form: {
            helper:'留空则默认取第一张主图',
            component: {
              props: {
                elProps:{limit:1},
              },
              span: 24,                  
            },
        },
        sortable: false
    },
    {
      title: '主图',
      key: 'images',
      type:'image-uploader',
      component: { props: { height: 80, width: 80 } },
      width: 95,
      search: { disabled: true },
      form: {
        rules: [{ required: true, message: '请上传商品主图' }],
        component: {
          span: 24
        },
      },
      show:false,
      sortable: false
    },
    {
      title: '短视频',
      key: 'video',
      type:'image-uploader',
      component: { props: { height: 80, width: 80 } },
      width: 95,
      show:false,
      search: { disabled: true },
      form: {    
          slot:true,  
          component: {
            span: 24
          },
      },
      show:false,
      sortable: false
    },
    {
      title: '商品名称',
      key: 'title',
      width: 400,          
      search: { disabled: false }, // 开启查询
      form: {
        rules: [{ required: true, message: '请填写商品名称' }],
        component: { span: 24 },
      },
      show:false,
      sortable: false
    },
    {
      title: '商品分类',
      key: 'category_id',
      type: 'tree-selector',
      dict: { 
        url: '/goods.category/tree', 
        isTree: true, 
        value: 'id',
        label: 'name',
        getData: (url, dict) => {
            return request({ url: url,method: 'post',data: { is_enable : 1 } }).then(ret => { return ret.data })
        },
      },
      sortable: false,
      search: {disabled:false},
      form: {
        rules: [{ required: true, message: '请选择商品分类' }],
        component: {
            props: { ignoreFullCheckedChildren: false, leafOnly: true, includeHalfChecked: false }
        },
        disabled:false,
      },
      show:false
    },
    {
      title: '售价',
      key: 'price',
      width: 150,
      search: {disabled:true},
      form: { // 表单配置            
          disabled :true
      },
      sortable: true
    },
    {
      title: '库存',
      key: 'inventory',
      width: 150,
      form: { // 表单配置
        disabled: true // 禁用表单编辑
        },
      sortable: true
    },
    {
      title: '总销量',
      key: 'sales_count',
      width: 150,
      form: { // 表单配置
        disabled: true// 禁用表单编辑
      },
      sortable: true
    },
    {
      title: '上下架',
      key: 'is_shelves',
      type: 'switch',
      width: 80,
      search: {
        disabled: true,
      },
      form: { // 表单配置
        component: {
          show (context) {
            return true
          }
        }
      },
      sortable: false
    },
    {
      title: '简述',
      key: 'simple_desc',
      sortable: false,
      search: {disabled:true},
      form: {
          disabled:false
      },
      show:false
    },
    {
      title: '型号',
      key: 'model',
      sortable: false,
      search: {disabled:true},
      form: {
          disabled:false
      },
      show:false
    },
    {
      title: '库存单位',
      key: 'inventory_unit',
      sortable: false,
      search: {disabled:true},
      form: {
        rules: [{ required: true, message: '请填写库存单位' }],
        disabled:false
      },
      show:false
    },
    {
      title: '购买赠送积分',
      key: 'give_integral',
      sortable: false,
      search: {disabled:true},
      form: {
          disabled:false
      },
      show:false
    },
    {
      title: '最少起订',
      key: 'buy_min_number',
      sortable: false,
      search: {disabled:true},
      form: {
          disabled:false,
          component:{
            placeholder:'该商品最低的起订量，默认为1',
          }
      },
      show:false
    },
    {
      title: '限购数量',
      key: 'buy_max_number',
      sortable: false,
      search: {disabled:true},
      form: {
          disabled:false,
          component:{
            placeholder:'同个账号下最多限购该商品的数量，0或空为不限制',
          }
      },
      show:false
    },
    {
      title: '规格',
      key: 'sku',
      type: 'select',
      show:false,
      form: {
        slot: true,
        rules: [{ required: false, message: '请填写规格信息' }],
        component: { span: 24 },
      }
    },
    {
      title: '详情内容',
      key: 'content',
      type:'editor-quill',
      sortable: false,
      search: {disabled:true},
      form: 
      {
        rules: [{ required: true, message: '请填写详情内容' }],
        component: {
          props: {
          },
          events: {
          },
          show: true
        }
      },
      show:false
    }, 
    ]
  }
}
