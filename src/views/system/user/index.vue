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
          prop="userId"
          label="用户ID"
          width="80"
        />
        <el-table-column
          prop="username"
          label="用户名"
        />
        <el-table-column
          prop="nickName"
          label="用户昵称"
        />
        <el-table-column
          prop="telephone"
          label="手机号码"
        />
        <el-table-column
          prop="email"
          label="邮箱地址"
        />
        <el-table-column
          label="账户状态"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" /></template>
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          label="上次登录时间"
        />
        <el-table-column
          fixed:right
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onClickOpenUserDetailDialog(scope.row.userId)">查看</el-button>
            <el-button type="text" size="small" @click="onClickOpenUserDetailUpdateDialog(scope.row.userId)">编辑</el-button>
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

    <el-dialog title="查看用户详情" :visible.sync="userDetailDialogVisiable">
      <el-form :model="userDetail" label-width="100px">
        <el-form-item label="用户ID">
          <el-input :value="userDetail.userId" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input :value="userDetail.username" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input :value="userDetail.nickName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input :value="userDetail.gender" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input :value="userDetail.telephone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input :value="userDetail.email" />
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="userDetail.birthday"
            type="date"
            placeholder=""
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="账户状态">
          <el-switch v-model="userDetail.status" :active-value="1" :inactive-value="0" :disabled="true" />
        </el-form-item>
        <el-form-item label="上次登录IP">
          <el-input :value="userDetail.lastLoginIp" />
        </el-form-item>
        <el-form-item label="上次登录时间">
          <el-input :value="userDetail.lastLoginTime" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDetailDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="userDetailDialogVisiable = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改用户详情" :visible.sync="userDetailUpdateDialogVisiable">
      <el-form :model="userDetailUpdate" label-width="100px">
        <el-form-item label="用户ID">
          <el-input :value="userDetailUpdate.userId" :disabled="true" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userDetailUpdate.username" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userDetailUpdate.nickName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="userDetailUpdate.gender" :label="1">男</el-radio>
          <el-radio v-model="userDetailUpdate.gender" :label="2">女</el-radio>
          <el-radio v-model="userDetailUpdate.gender" :label="3">保密</el-radio>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="userDetailUpdate.telephone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userDetailUpdate.email" />
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="userDetailUpdate.birthday"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="账户状态">
          <el-switch v-model="userDetailUpdate.status" :active-value="1" :inactive-value="0" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDetailUpdateDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="UpdateUserDetail()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserPage, getUserInfo } from '@/api/system/user'
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
      userDetailDialogVisiable: false,
      // 用户详情
      userDetail: {},
      // 用户修改显示标识
      userDetailUpdateDialogVisiable: false,
      userDetailUpdate: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 初始化数据
    fetchData() {
      const pageParam = {
        page: this.page,
        perPage: this.pageSize
      }
      getUserPage(pageParam).then(response => {
        const { records, total } = response.data
        this.tableData = records
        this.total = total
      })
    },
    // 修改每页获取的记录数
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    // 修改当前页数
    handleCurrentChange(val) {
      this.page = val
      this.fetchData()
    },
    // 打开用户详情对话框
    onClickOpenUserDetailDialog(userId) {
      getUserInfo(userId).then(response => {
        const { data } = response
        this.userDetail = data
        this.userDetailDialogVisiable = true
      })
    },
    // 打开用户更新对话框
    onClickOpenUserDetailUpdateDialog(userId) {
      getUserInfo(userId).then(response => {
        const { data } = response
        this.userDetailUpdate = data
        const formData = {
          username: data.username
        }
        console.log(formData)
        this.userDetailUpdateDialogVisiable = true
      })
    },
    UpdateUserDetail() {
      console.log(this.userDetailUpdate)
    },
    handleSelectionChange() {

    }
  }
}
</script>
