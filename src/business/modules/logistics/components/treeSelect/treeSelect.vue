<template>
  <div>
      <div>
         <div class="region">{{regionText}}</div>
         <div class="choose">
           <el-button type="primary" @click="regionSelect = true">选择</el-button>
         </div>
      </div>
      <el-dialog
        title="选择地区"
        :visible.sync="regionSelect"
        width="200"
        append-to-body>
        <el-tree
          ref="tree"
          :props="regionList"
          :load="loadNode"
          node-key="id"
          lazy
          show-checkbox
          check-strictly
          @check-change="handleNodeClick"
        >
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="regionSelect = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { request } from '@/api/service'
export default {
  data(){
    return{
      regionText:'',
      regionSelect:false,
      regionSelectId:0,
      nodeId:0,
      regionList: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
    }    
  },
  props: {
    value: {
      default: null
    },
    scope: {
      default: null
    },
    myProps: {
      default: null
    }
  },
  computed: {
  },
  mounted () {
    this.getParentRegionText();
  },
  methods: {
    confirm(){
      this.regionSelectId = this.$refs.tree.getCheckedKeys()[0] || 0;
      this.regionText = this.$refs.tree.getCheckedNodes()[0]['name'] || '';
      this.scope.form.parent_id = this.regionSelectId;
      this.regionSelect = false;
    },
    getParentRegionText(){      
      if(this.scope.form.parent_id == 0 || this.scope.form.parent_id == undefined){
        this.regionText = '根节点';
      }else{
        request({
          url: '/setting.region/getOne',
          method: 'post',
          data: { id: this.scope.form.parent_id }
        }).then(ret => {
          this.regionText = ret.data.name
        })
      }
    },
    loadNode(node, resolve) {
        if (node.level === 0) {
          request({
            url: '/setting.region/list',
            method: 'post',
            data: { parent_id: 0 }
          }).then(ret => {
            let data = {
              id:0,
              name:'根节点',
              hasChildren:false
            }
            ret.data.records.unshift(data)
            resolve(ret.data.records);
          })
        }
        if (node.level > 0){
          request({
            url: '/setting.region/list',
            method: 'post',
            data: { parent_id: node.data.id }
          }).then(ret => {
            resolve(ret.data.records);
          })
        };
    },
    handleNodeClick(data,checked,node){
      if(checked === true){
        this.regionSelectId = data.id
        this.$refs.tree.setCheckedKeys([data.id])
        this.regionText = data.name
      }else{
        if(this.regionSelectId == data.id){
          this.$refs.tree.setCheckedKeys([data.id])
        }
      }
    }
  }
  
}
</script>
<style>
.choose{
  cursor: pointer;
  float: left;
  width: 50%;
}
.region{
  width: 50%;
  float: left;
}
</style>