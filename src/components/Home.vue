<template>
   <div>
     Home 组件
     <hr>
     退出登陆
     <hr>
     <el-button type="info" @click="logout">退出登陆</el-button>
   </div>
</template>

<script>
export default {
  methods: {
    logout () {
      // 清空回话信息
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
