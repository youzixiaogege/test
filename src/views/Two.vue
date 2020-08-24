<template>
  <div>
    <h3>
      分类内容
    </h3>
    <!--一级导航 -->
    <ul>
      <li
        v-for="(item, index) in Navs"
        :key="index"
        v-if="item.pid == 0"
        @click="Click_one(item.id)"
      >
        <p>{{ item.title }}</p>
      </li>
    </ul>
    <hr />
    <!-- 二级导航 -->
    <ul>
      <li v-for="(item, index) in Navs" :key="index" v-if="item.pid == sel">
        <p>{{ item.title }}</p>
      </li>
    </ul>

    <!-- --------------------------------------------/ -->
    <!-- 底部导航组件 -->
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from "@/components/FooterNav";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      Navs: [],
      sel: 1,
    };
  },
  created() {
    this.$axios
      .get("/api/Nav.json")
      .then((res) => {
        console.log(res.data.navs);
        this.Navs = res.data.navs;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    Click_one(id) {
      this.sel = id;
    },
  },
};
</script>

<style></style>
