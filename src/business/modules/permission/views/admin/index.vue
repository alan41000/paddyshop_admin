<template>
    <d2-container :class="{'page-compact':crud.pageOptions.compact}">
        <template slot="header">
        </template>
        <d2-crud-x
                ref="d2Crud"
                v-bind="_crudProps"
                v-on="_crudListeners"
                @authz="authzHandle">
          <div slot="header">
            <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch"  />

            <el-button slot="header" v-permission="'auth:admin:add'" size="small" type="primary" @click="addRow"><i class="el-icon-plus"/> 新增</el-button>

            <crud-toolbar :search.sync="crud.searchOptions.show"
                          :compact.sync="crud.pageOptions.compact"
                          :columns="crud.columns"
                          @refresh="doRefresh()"
                          @columns-filter-changed="handleColumnsFilterChanged"/>
          </div>

        </d2-crud-x>
        <!-- <el-dialog title="授予角色"
                   :visible.sync="dialogPermissionVisible">

          <el-checkbox-group v-model="checkedRoleIds">
            <el-checkbox class="d2-mb-10" v-for="option in roleList" :key="option.platform.id"  :label="option.platform.id" >{{option.platform.name}}</el-checkbox>
          </el-checkbox-group>

            <div slot="footer"
                 class="dialog-footer">
                <el-button type="primary"
                           @click="updatePermession(currentUserId)">确定
                </el-button>
            </div>
        </el-dialog> -->

        <el-dialog title="授予角色" :visible.sync="dialogPermissionVisible">
            <el-collapse v-model="activeNames" >
                <el-collapse-item v-for="group in roleList" :key="group.platform.id" :title="group.platform.name" :name="group.platform.id">
                    <el-checkbox-group v-model="group.checked">
                        <el-checkbox v-for="option in group.roles" :key="option.id" :label="option.id" >{{option.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-collapse-item>
            </el-collapse>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updatePermession(currentUserId)">确定</el-button>
            </div>
        </el-dialog>
    </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import * as api from './api'
export default {
  name: 'User',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      activeNames: [],
      roleList: [],
      checked: [],
      dialogPermissionVisible: false,
      currentUserId: undefined
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions(this)
    },
    pageRequest (query) {
      return api.GetList(query)
    },
    addRequest (row) {
      return api.AddObj(row)
    },
    updateRequest (row) {
      return api.UpdateObj(row)
    },
    delRequest (row) {
      return api.DelObj(row.id)
    },
    infoRequest (row) {
      return api.GetObj(row.id)
    },
    authzHandle (event) {
      api.GetAuthzData().then(ret => {
        const roleList = ret.data
        let userRoles = event.row.roles
        if (userRoles == null) {
          userRoles = []
        }
        this.activeNames.splice(0, this.activeNames.length)
        roleList.forEach(item => {
          item.checked = item.roles.map(item => item.id).filter(item => userRoles.indexOf(item) >= 0)
          this.activeNames.push(item.platform.id)
          console.log('checked', item.checked)
        })
        this.$set(this, 'roleList', roleList)
        this.currentUserId = event.row.id
        this.dialogPermissionVisible = true
      })
    },
    updatePermession (userId) {
      let checked = []
      for (const item of this.roleList) {
        checked = checked.concat(item.checked)
      }
      api.DoAuthz(userId, checked).then(ret => {
        this.dialogPermissionVisible = false
        this.doRefresh()
      })
    }
  }
}
</script>
