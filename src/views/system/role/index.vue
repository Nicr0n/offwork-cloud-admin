<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        />
        <el-table-column
          prop="roleId"
          label="角色ID"
          width="80"
        />
        <el-table-column
          prop="name"
          label="角色名"
        />
        <el-table-column
          prop="code"
          label="权限码"
        />
        <el-table-column
          prop="description"
          label="角色描述"
        />
        <el-table-column
          label="角色状态"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="onSwitchChange(scope.row.status,scope.row.roleId)" /></template>
        </el-table-column>
        <el-table-column
          fixed:right
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onClickOpenRoleDetailDialog(scope.row.roleId)">查看</el-button>
            <el-button type="text" size="small" @click="onClickOpenRoleDetailUpdateDialog(scope.row.roleId)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagenation"
        layout="total, sizes, prev, pager, next"
        :page-sizes="pageChoice"
        :page-size="pageSize"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog title="查看角色详情" :visible.sync="roleDetailDialogVisiable">
      <el-form :model="roleDetail" label-width="100px">
        <el-form-item label="角色ID">
          <el-input :value="roleDetail.roleId" />
        </el-form-item>
        <el-form-item label="角色名">
          <el-input :value="roleDetail.name" />
        </el-form-item>
        <el-form-item label="权限码">
          <el-input :value="roleDetail.code" />
        </el-form-item>
        <el-form-item label="作用域">
          <el-input :value="roleDetail.scope" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input :value="roleDetail.sort" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input :value="roleDetail.description" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-switch v-model="roleDetail.status" :active-value="1" :inactive-value="0" :disabled="true" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDetailDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="roleDetailDialogVisiable = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改用户详情" :visible.sync="roleDetailUpdateDialogVisiable">
      <el-form :model="roleDetailUpdate" label-width="100px">
        <el-form-item label="角色ID">
          <el-input :value="roleDetailUpdate.roleId" />
        </el-form-item>
        <el-form-item label="角色名">
          <el-input :value="roleDetailUpdate.name" />
        </el-form-item>
        <el-form-item label="权限码">
          <el-input :value="roleDetailUpdate.code" />
        </el-form-item>
        <el-form-item label="作用域">
          <el-input :value="roleDetailUpdate.scope" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input :value="roleDetailUpdate.sort" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input :value="roleDetailUpdate.description" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-switch v-model="roleDetailUpdate.status" :active-value="1" :inactive-value="0" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDetailUpdateDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="UpdateRoleDetail()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolePage, getRoleInfo, updateRoleInfo } from '@/api/system/role'
export default {
  data() {
    return {
      // 表单数据
      tableData: [],
      // 总记录数
      total: 0,
      // 分页选择
      pageChoice: [5, 10, 15, 20],
      // 默认每页显示
      pageSize: 5,
      // 当前页数
      page: 1,
      // 用户详情显示标识
      roleDetailDialogVisiable: false,
      // 用户详情
      roleDetail: {},
      // 用户修改显示标识
      roleDetailUpdateDialogVisiable: false,
      // 用户更新对话框详情
      roleDetailUpdate: {},
      // 用户更新对话框角色列表
      roleDetailUpdateSelectorRoleList: [],
      roleDetailSelectorRoleList: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      const pageParam = {
        page: this.page,
        perPage: this.pageSize
      }
      getRolePage(pageParam).then(response => {
        const { records, total } = response.data
        this.tableData = records
        this.total = total
      })
    },
    // 修改每页获取的记录数
    handleSizeChange(val) {
      this.pageSize = val
      this.initData()
    },
    // 修改当前页数
    handleCurrentChange(val) {
      this.page = val
      this.initData()
    },
    // 打开角色详情对话框
    onClickOpenRoleDetailDialog(roleId) {
      getRoleInfo(roleId).then(response => {
        const { data } = response
        this.roleDetail = data
        this.roleDetailDialogVisiable = true
      })
    },
    // 打开用户更新对话框
    onClickOpenRoleDetailUpdateDialog(roleId) {
      getRoleInfo(roleId).then(response => {
        const { data } = response
        this.roleDetailUpdate = data
        this.roleDetailUpdateDialogVisiable = true
      })
    },
    UpdateRoleDetail() {
      const formData = {
        name: this.roleDetailUpdate.name,
        code: this.roleDetailUpdate.code,
        scope: this.roleDetailUpdate.scope,
        sort: this.roleDetailUpdate.sort,
        description: this.roleDetailUpdate.description,
        status: this.roleDetailUpdate.status
      }
      updateRoleInfo(this.roleDetailUpdate.roleId, formData).then(response => {
        console.log(response)
        this.initData()
        this.roleDetailUpdateDialogVisiable = false
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    },
    onSwitchChange(status, roleId) {
      const formData = {
        status: status
      }
      updateRoleInfo(roleId, formData).then(response => {
        this.initData()
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    },
    handleSelectionChange() {

    }
  }
}
</script>
