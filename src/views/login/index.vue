<template>
  <div class="login-container">
    <div class="login-container-left">
      <div class="title">
        <img src="@/assets/images/avatar.png">
        <span>后台管理系统</span>
      </div>
      <div class="banner">
        <div class="banner-content">
          <img src="@/assets/login-box-bg.svg" alt="">
          <span>欢迎使用本系统</span>
        </div>
      </div>
    </div>
    <div class="login-container-right">
      <div class="form-container">
        <h1 class="form-title">登录</h1>
        <el-form
            ref="ruleFormRef"
            class="form-rule"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            :size="formSize"
            status-icon
        >
          <el-form-item prop="username">
            <el-input
                v-model="ruleForm.username"
                style="width: 100%"
                size="large"
                placeholder="用户名"
                :prefix-icon="House"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="ruleForm.password"
                style="width: 100%"
                size="large"
                placeholder="密码"
                type="password"
                show-password
                :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="name1">
            <el-row justify="space-between" style="width: 100%">
              <el-col  :span="12">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox value="Online activities" name="type">
                    记住我
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
              <el-col :span="4">
                <el-link type="primary">忘记密码？</el-link>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;height: 40px" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { House, User } from '@element-plus/icons-vue'
import {tokenName, tokenValue} from "@/contants/token.ts";
import {ref, reactive} from "vue";
import {login} from "@/api/auth";
import {useRouter} from "vue-router";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();

const $router = useRouter()
const formSize = ref<ComponentSize>('default')

const ruleFormRef = ref<FormInstance>()

// 登录表单信息
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  source: 'pc'
})

// 登录表单规则
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '用户名必填', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码名必填', trigger: 'blur' },
  ]
})

/**
 * 登录
 * @param formEl
 */
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (!valid) {
      return
    }
    // 登录
    const loginRes = await login(ruleForm)
    // 保存令牌信息
    localStorage.setItem(tokenName, loginRes.data.tokenName)
    localStorage.setItem(tokenValue, loginRes.data.tokenValue)
    // 跳转 - 可能存在redirect路由
    let redirectUrl = ($router.currentRoute.value.query && $router.currentRoute.value.query.redirect) || '/'
    console.log('@@@', redirectUrl)
    $router.push(redirectUrl)
  })
}

</script>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    .login-container-left {
      background: #353E54;
      width: 50%;
      padding: 30px;
      .title {
        font-size: 0px;
        img {
          width: 48px;
          vertical-align: middle;
        }
        span {
          margin-left: 10px;
          font-weight: 700;
          font-size: 20px;
          color: white;
          vertical-align: middle;
          font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        }
      }
      .banner {
        width: 100%;
        height: calc(100% - 30px); ;
        display: flex;
        justify-content: center;
        .banner-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          img {
            width: 350px
          }
          span {
            color: #fff;
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
          }
        }
      }
    }
    .login-container-right {
      background: #FFFFFF;
      width: 50%;
      display: flex;
      justify-content: center;
      .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 500px;
        .form-title {
          font-weight: 700;
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        .form-rule {
          width: 100%;
          margin-top: 50px;
        }
      }
    }
  }

</style>