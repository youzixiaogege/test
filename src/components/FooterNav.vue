<template>
  <div>
    <!-- 底部导航组件 -->
    <van-tabbar
      route
      active-color="red"
      inactive-color="#888989"
      v-model="active"
    >
      <van-tabbar-item icon="home-o" to="/">我们</van-tabbar-item>
      <van-tabbar-item icon="search" to="/two">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="user">我们</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
    };
  },
};
</script>

<style></style>
