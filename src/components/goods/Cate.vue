<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!-- 一行 -->
      <el-row>
        <!-- 一列 -->
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
        <!-- 表格 -->
      </el-row>
      <tree-table :data="cateList"
                  :columns="columns"
                  :selection-type="false"
                  :expand-type="false"
                  :show-index="true"
                  :index-text='`#`'
                  border
      ></tree-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表
      cateList: [],
      // 数据总条数
      total: 0,
      // 为table设置列的数据
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        }
      ]
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 获取商品分类数据
    async getCateList () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类信息失败')
      }
      console.log(res)
      this.cateList = res.data.result
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>

</style>
