<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
           <div class="avatar_box">
               <img src="../assets/images/icon.png" alt="">
           </div>
           <!-- 登录表单区域 -->
           <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
               <!-- 用户名 -->
              <el-form-item prop="username">
                 <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                 <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
              </el-form-item>
              <el-form-item class="btns">
                  <!-- 登录 -->
                  <el-button type="primary" @click="login">登录</el-button>
                  <!-- 刷脸登录 -->
                     <el-button type="info" @click="resetForm">重置</el-button>
              </el-form-item>
           </el-form>
        </div>
    </div>
</template>

<script>
export default {
     data () {
         return {
          // 这是登录表单的数据绑定对象
         loginForm: {
                username: '',
                password: ''
            },
            // 这是登录表单验证的规则对象
         loginFormRules: {
             // 验证用户名是否合法
             username: [
              { required: true, message: '请输入登录名称', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
             // 验证密码是否合法
             password: [
             { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]
         }
      }    
    },
    methods: {
        //点击重置按钮，重置登录表单
       async login () {
        // 表单预验证
        // this.$refs.loginFormRef.validate(async valid => {
        //   if (!valid) return;
        const res =await this.$http.post('/api/user/login',{
                  "loginName":"test1",
                  "password":"123456"  
         }
          );
          console.log(res)
        //   if (res.meta.status !== 200) return this.$message.error('登录失败');
        //   this.$message.success('登录成功');
        //   // 1. 将登录成功之后的token,保存到客户端的sessionStorage 中
        //   //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        //    window.sessionStorage.setItem('token',res.data.token);
          // 2.通过编程式导航跳转到后台主页，路由地址是 /home
          this.$router.push('/home')
        // });
        }
    }
}
</script>

<style lang="less" scoped>
 .login_container {
     background-color: rgb(91, 176, 209);
     height: 100%;
     position: relative;
 }
 .login_box {
    height: 400px;
    width: 500px;
    border-radius: 3px;
    background-color: rgb(194, 57, 228);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
 }
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
         width: 100px;
         width: 100px;
         border-radius: 50%;
     }
 }
 .btns {
     display: flex;
     justify-content: flex-end;
 }
 .login_form {
     position: absolute;
     bottom: 20px;
     width: 100%;
     padding: 20px;
     box-sizing: border-box;
 }
</style>
