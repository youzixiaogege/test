<template>
  <div>
    首页内容
    <H3> Msg </H3>
    <input type="text" v-model="text1" @keydown.enter="add" />
    <button @click="add">提交</button>
    <!--  -->
    <h6>留言内容</h6>
    <input type="text" v-model="text2" />
    <span :class="{ active: !subm }"> ({{ max }} / {{ min }} )</span>
    <hr />
    <H3> 未完成 ({{ NoList }} ) </H3>
    <ul>
      <li v-for="(item, index) in List" :key="index" v-show="!item.demo">
        <!-- 复选框 -->
        <input type="checkbox" @click="change(item, true)" />
        <!-- 主题 -->
        <span> {{ item.text1 }} </span>
        <!-- 留言 -->
        <span> {{ item.text2 }} </span>
        <!-- 时间 -->
        <span> {{ item.createTime | filtersTime }} </span>
        <!-- 点赞 -->
        <span @click="dian(index)"> 点赞: {{ str }} </span>

        <span @click="del(index)">× </span>
      </li>
    </ul>
    <hr />

    <H3> 已完成 ({{ YesList }}) </H3>
    <ul>
      <li v-for="(item, index) in List" :key="index" v-show="item.demo">
        <input type="checkbox" checked @click="change(item, false)" />
        <!-- 主题 -->
        <span> {{ item.text1 }} </span>
        <!-- 留言 -->
        <span> {{ item.text2 }} </span>
        <!-- 时间 -->
        <span> {{ item.createTime | filtersTime }} </span>
        <!-- 点赞 -->
        <span @click="dian(index)"> 点赞: {{ str }} </span>

        <span @click="del(index)">× </span>
      </li>
    </ul>
    <hr />
    <h3>筛选</h3>
    <select v-model="screen">
      <option value=""> 请选择</option>
      <option value="QQ">全部</option>
      <option value="No"> 未完成</option>
      <option value="Yes"> 已完成</option>
    </select>
    <ul>
      <li v-for="(item, index) in ShowList" :key="index">
        <span> {{ item.text1 }} </span>
        <span> {{ item.text2 }} </span>
      </li>
    </ul>

    <!-- 底部导航组件 -->
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from "@/components/FooterNav";
export default {
  data() {
    return {
      // 主题1
      text1: "",
      // 留言内容
      text2: "",
      // 操作的数组
      List: [],
      str: 0,
      // 小
      max: 0,
      min: 5,
      subm: true,
      screen: "",
      // 筛选过后的新数组
      ShowList: [],
    };
  },
  // 生命周期的创建前执行本地存储
  created() {
    let List = localStorage.List;
    if (List) {
      this.List = JSON.parse(List);
    }
    // 排序
    this.List.sort(function(a, b) {
      return b.createTime - a.createTime;
    });
  },
  // 监听器
  watch: {
    // 监听的字数
    text2(new1, new2) {
      this.max = new1.length;
      if (this.max > this.min) {
        this.subm = false;
      } else {
        this.subm = true;
      }
    },
    screen(new3) {
      switch (new3) {
        case "QQ":
          this.ShowList = this.List;
          break;
        case "No":
          this.List.map((item) => {
            if (!item.demo) {
              this.ShowList.push(item);
            }
          });
          break;
        case "Yes":
          this.List.map((item) => {
            if (item.demo) {
              this.ShowList.push(item);
            }
          });
          break;
      }
    },
  },
  // 计算属性
  computed: {
    // 未完成的条数
    YesList() {
      let num = 0;
      this.List.map((item) => {
        if (item.demo) {
          num++;
        }
      });
      return num;
    },
    // 已完成的条数
    NoList() {
      let num = 0;
      this.List.map((item) => {
        if (!item.demo) {
          num++;
        }
      });
      return num;
    },
  },
  // 过滤器
  filters: {
    filtersTime(msg) {
      let data = new Date();
      let now = data.setTime();
      let time = (now - msg) / 1000 / 60;
      let Str = "";
      if (time <= 1) {
        Str = "刚刚";
      } else if (time <= 2) {
        Str = "1分钟前";
      } else if (time <= 3) {
        Str = "2分钟前";
      } else {
        let data = new Date();
        data.setTime(msg);
        Str = `${data.getHours()}:${data.getMonth()}:${data.getSeconds()}`;
        return Str;
      }
    },
  },
  // 执行函数的方法
  methods: {
    // 添加的方法
    add() {
      if (!this.subm) {
        alert("!!!!");
        return;
      }
      this.List.push({
        text1: this.text1, // 主题
        text2: this.text2, // 留言内容
        demo: false,
        str: 0, // 点赞
        createTime: new Date().getTime(), // 时间戳
      });
      // 清空
      this.text1 = "";
      this.text2 = "";
      // 排序
      this.List.sort(function(a, b) {
        return b.createTime - a.createTime;
      });
      this.save();
    },
    // 切换
    change(item, checked) {
      if (checked) {
        item.demo = true;
      } else {
        item.demo = false;
      }
      // 保存
      this.save();
    },
    // 点赞
    dian(index) {
      this.str++;
      this.save();
    },
    // 删除执行的方法
    del(index) {
      this.List.splice(index, 1);
      this.save();
    },
    // 封装本地存储的方法
    save() {
      localStorage.List = JSON.stringify(this.List);
    },
  },
  components: {
    Nav,
  },
};
</script>

<style scoped>
.active {
  color: red;
}
</style>
