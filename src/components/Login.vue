
<template>
  <div class="login_container">
    <vue-particles
      id="particles-js"
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
    
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/images/cqupt.jpg" alt="" />
      </div>
      <body>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
        >
          <h1>Login</h1>
          <!-- 用户名 -->
          <el-form-item prop="loginName">
            <div class="txtb">
              <input
                type="text"
                v-model="loginForm.loginName"
                class="el-input-i"
              ><span data-placehoder="Username"></span>
              
              
            </div>
          </el-form-item>
          <!--  -->
          <el-form-item prop="password">
            <div class="txtb">
              <input v-model="loginForm.password" type="password" class="el-input-i">
              <span data-placehoder="Password"></span>
            </div>
          </el-form-item>
          <el-form-item class="btns">
            <!-- 登录 -->
            <el-button
              type="submit"
              class="logbtn"
              value="Login"
              @click="login"
            >
              Login
            </el-button>
            <!-- 重置 -->
            <el-button
              type="submit"
              class="logbtn"
              value="Reset"
              @click="resetForm"
            >
              Reset
            </el-button>
            
          </el-form-item>
        </el-form>
      </body>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
// src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" charset="utf-8"

export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        loginName: "",
        password: "",
      },
      // 这是登录表单验证的规则对象
      loginFormRules: {
        // 验证用户名是否合法
        loginName: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created(){
    $(function() {
      $(".txtb input").on("focus", function () {
        $(this).addClass("focus");
      });
      $(".txtb input").on("blur", function () {
        if ($(this).val() == "") $(this).removeClass("focus");
      });
    });
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    async login() {
      // 表单预验证
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;

        const { data: res } = await this.$http.post(
          "/api/user/login",
          this.loginForm
        );
        console.log(res);
        if (res.operationResult !== "SUCCESS") return;
        //    this.$message.error('登录失败');
        //   this.$message.success('登录成功');
        //   // 1. 将登录成功之后的token,保存到客户端的sessionStorage 中
        //   //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        //    window.sessionStorage.setItem('token',res.data.token);
        // 2.通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: rgb(91, 176, 209);
  height: 100%;
  position: relative;
}
/* .login_box {
       height: 400px;
       width: 500px;
       border-radius: 3px;
       background-color: rgb(194, 57, 228);
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
    } */
.avatar_box {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  border-radius: 50%;
  padding: 10px;
  margin: -50px auto 0;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 120px;
    width: 120px;
    border-radius: 50%;
    margin-left: -10px;
    margin-top: -8px;
  }
}
/* .btns {
        display: flex;
        justify-content: flex-end;
    } */
.login_form {
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: montserrat;
}
// body {
//   min-height: 100vh;
//   background-image: linear-gradient(120deg, #3498db, #8e44ad);
// }
.login_form {
  width: 360px;
  background: #f1f1f1;
  height: 580px;
  padding: 80px 40px;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form h1 {
  text-align: center;
  margin-bottom: 60px;
}
.txtb {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 30px 0;
}
.txtb input{
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  background: none;
  padding: 0 5px;
  height: 40px;
}
.txtb span::before {
  content: attr(data-placehoder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  z-index: -1;
  transition: 0.5s;
}
.txtb span::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  background: linear-gradient(120deg, #3498db, #8e44ad);
  transition: 0.5s;
}
.focus + span::before {
  top: -5px;
}
.focus + span::after {
  width: 100%;
}

.logbtn {
  display: block;
  margin:0 0 10px 0;
  width: 100%;
  height: 50px;
  border: none;
  background: linear-gradient(120deg, #3498db, #8e44ad, #3498db);
  background-size: 200%;
  color: #fff;
  outline: none;
  cursor: pointer;
  transition: 0.5s;
}
.el-button + .el-button{
  margin:0;
}
.loginbtn:hover {
  background-position: right;
}
.bottom-text {
  margin-top: 60px;
  text-align: center;
  font-size: 13px;
}
</style>