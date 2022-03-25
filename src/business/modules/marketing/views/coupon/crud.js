/*
 * @Author: Alan Leung
 * @Description: 
 */
import { request } from '@/api/service'
export const crudOptions = (vm) => {
  return {
    options: {
        height: '100%', // 表格高度100%, 使用toolbar必须设置
        highlightCurrentRow: true,
        rowKey: 'id',
    },
    formOptions: { 
      labelWidth: '120px',
    },
    rowHandle: {
      view: {
        thin: true,
        text: null,
        disabled () {
          return !vm.hasPermissions('marketing:coupon:view')
        }
      },
      edit: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('marketing:coupon:edit')
        }
      },
      remove: {
        thin: true,
        text: null,
        disabled: () => {
          return !vm.hasPermissions('marketing:coupon:del')
        }
      },
      width: 180,
      fixed: 'right'
    },
    columns: [
      {
        title: 'Id',
        key: 'id',
        sortable: true,
        search: { disabled:true},
        form: {
            disabled:true
        },
        width: 60
      },
      {
        title: '名称',
        key: 'name',
        sortable: false,
        search: {
          disabled:false
        },
        width: 150,
        form: {
          rules: [{ required:true, message: '请输入正确的名称' }],
        },
      },
      {
        title: '描述',
        key: 'desc',
        show:false,
        sortable: true,
        search: {
          disabled:true
        },
        form: {
          disabled:false
        },
        width: 200,
      },
      {
        title: '订单最低金额',
        key: 'min_order_price',
        show:false,
        sortable: true,
        search: {
          disabled:true
        },
        form: {
          rules: [{ required:true, message: '请填写订单最低金额' }],
        },
        width: 200,
      },
      {
        title: '到期类型',
        key: 'expire_type',
        sortable: true,
        type: 'select',
        dict: {
          data: [
              { value: 0, label: '领取生效' }, { value: 1, label: '固定日期' }
          ]
        },
        search: {},
        form: {
          rules: [{ required:true, message: '请输入正确的到期类型' }],
        },
        width: 200,
      },
      {
        title: '有效小时',
        key: 'expire_hour',
        type: 'number',
        sortable: true,
        search: {
          disabled:true
        },
        show:false,
        form: {
          rules: [{ required:true, message: '请输入有效小时' }],
          component:{
            disabled:(context) => {
              if(context.form.expire_type == 0)
              {
                return false
              }
              return true
            },
            show:(context) => {
              if(context.form.expire_type == 0)
              {
                return true
              }
              return false
            },
          }
        },
        width: 200,
      },
      {
        title: '有效时间',
        key: 'expire_time',
        sortable: true,
        search: {
          disabled:true
        },
        type:'daterange',
        show:false,
        form: {
          rules: [{ required:true, message: '请选择有效时间' }],
          component:{
            // format:'timestamp',
            disabled:(context) => {
              if(context.form.expire_type == 1)
              {
                return false
              }
              return true
            },
            show:(context) => {
              if(context.form.expire_type == 1)
              {
                return true
              }
              return false
            },
          },
        },
        width: 200,
      },      
      {
        title: '类型',
        key: 'type',
        sortable: true,
        type: 'select',
        dict: {
          data: [
              { value: 0, label: '满减劵' }, { value: 1, label: '折扣劵' }
          ]
        },
        search: {},
        form: {
          rules: [{ required:true, message: '请输入正确的名称' }],
        },
        width: 200,
      },
      {
        title: '减免金额',
        key: 'value_price',
        sortable: true,
        show:false,
        search: {
          disabled:true
        },
        form: {
          rules: [{ required:true, message: '请输入减免金额' }],
          component:{            
            disabled:(context) => {
              if(context.form.type == 0)
              {
                return false
              }
              // return true
            },
            show:(context) => {
              if(context.form.type == 0)
              {
                return true
              }
              return false
            },
          }
        },
        width: 200,
      },
      {
        title: '折扣率',
        key: 'value_rate',
        sortable: true,
        show:false,
        search: {
          disabled:true
        },
        form: {
          rules: [{ required:true, message: '请输入折扣率' }],
          component:{
            disabled:(context) => {
              if(context.form.type == 1)
              {
                return false
              }
              // return true
            },
            show:(context) => {
              if(context.form.type == 1)
              {
                return true
              }
              return false
            },
          }
        },
        width: 200,
      },
      {
        title: '使用限制',
        key: 'apply_range',
        sortable: true,
        type: 'select',
        dict: {
          data: [
              { value: 0, label: '全场适用' }, { value: 1, label: '限定商品分类' }, { value: 2, label: '限定商品可用' }
          ]
        },
        search: {},
        form: {
          rules: [{ required:true, message: '请选择使用限制' }],
        },
        width: 200
      },
      {
        title: '分类指定',
        key: 'category_ids',
        type: 'tree-selector',
        dict: { 
            url: '/goods.category/tree', 
            isTree: true, value: 'id',
            value: 'id',
            label: 'name',
            getData: (url, dict) => {
                return request({ url: url,method: 'post',data: { is_enable : 1 } }).then(ret => { return ret.data })
            },
        },
        sortable: false,
        search: {disabled:true},
        form: {
            rules:[{ required:true, message: '请选择分类' }],
            component: {
              disabled:(context) => {
                if(context.form.apply_range == 1)
                {
                  return false
                }
                return true
              },
              show:(context) => {
                if(context.form.apply_range == 1)
                {
                  return true
                }
                return false
              },
              props: { ignoreFullCheckedChildren: false, leafOnly: true, includeHalfChecked: false }
            },
            disabled:false,
        },
        show:false
      },
      {
        title: '关联商品',
        key: 'goods_ids',
        type: 'transfer',
        show:false,
        form: {
          rules:[{ required:true, message: '请选择关联商品' }],
          component: { 
            disabled:(context) => {
              if(context.form.apply_range == 2)
              {
                return false
              }
              return true
            },
            show:(context) => {
              if(context.form.apply_range == 2)
              {
                return true
              }
              return false
            },
            span: 24,
            filterable:true,
            titles:['可选','已选'],
            data:[
            ],
          },
        },
        valueBuilder (row, col) {
          if (row[col.key] === '') {
            row[col.key] = null
          }          
        }  
      },
      {
        title: '优惠信息',
        key: 'discount_value',
        rowSlot: true,     
        width: 200,
        search: {
          disabled:true
        },
        form:{
          disabled:true,
        },
        sortable: false
      },
      {
        title: '发放数量',
        key: 'total_qty',   
        type: 'number',     
        search: { disabled: true },
        sortable: true,
        form: {
          disabled:false,
          rules: [
            { required: true, message: '请输入发放数量' },
            { type: 'number', message: '请输入正确的发放数量' },
          ],
          component: {
            value:0
          }
        },
        // width:200,
      },
      {
        title: '开放领取',
        key: 'is_user_receive',
        type: 'select',
        width: 80,
        search: {
          disabled: true,
        },
        dict: {
          data: [
              { value: false, label: '否' }, { value: true, label: '是' }
          ]
        },
        form: { // 表单配置
          component: {
            value:false
          }
        },
        sortable: false
      },
      {
        title: '注册发放',
        key: 'is_reg_send',
        type: 'select',
        width: 80,
        search: {
          disabled: true,
        },
        dict: {
          data: [
              { value: false, label: '否' }, { value: true, label: '是' }
          ]
        },
        form: { // 表单配置
          component: {
            value:false
          }
        },
        sortable: false
      },
      {
        title: '启用',
        key: 'is_enable',
        type: 'select',
        dict: {
            data: [
                { value: true, label: '是',color: 'success'  }, { value: false, label: '否',color:'danger'}
            ]
          },
        search: {
          disabled:true
        },
        form: {
          component:{
            value:false
          }
        },
        width:80
      },
      {
        title: '排序',
        key: 'sort',
        width: 200,
        search: {
          disabled:true
        },
        form:{
          disabled:false,
          component:{
            value:0
          }
        },
        show:false,
        sortable: true
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
    ]
  }
}
