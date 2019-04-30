<script>
export default {
    data () {
        return {
            warn: { text: null, show: false },
            login: { item: { username: null, password: null } }
        }
    },
    methods: {
        doLogin () {
            var data = this.login.item
            this.$http.post(this.$apiback.auth.login, data).then(
                response => {
                    localStorage.token = null
                    if (response.data.code === 0) {
                        var data = response.data.data
                        localStorage.token = data.auth.token
                        localStorage.etime = data.auth.etime
                        localStorage.uname = data.user.uname
                        localStorage.ctime = data.user.ctime
                        this.$router.push('/index')
                    } else {
                        this.$snotify.error(response.data.text)
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
.login-box {
    background: #fff;
    padding: 50px;
    width: 30%;
    min-width: 500px;
}
</style>

<template>
    <div class="login-box">
        <div class="login-logo">
            <b>后台系统</b>
        </div>
        <div class="login-box-body">
            <form>
                <div class="form-group has-feedback">
                    <input
                        placeholder="账号"
                        class="form-control"
                        type="text"
                        v-model="login.item.username">
                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                </div>
                <div class="form-group has-feedback">
                    <input
                        placeholder="密码"
                        class="form-control"
                        type="password"
                        v-model="login.item.password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div class="row">
                    <div class="col-md-12"><button type="button" class="btn btn-primary btn-block btn-flat" @click="doLogin">登录</button></div>
                </div>
            </form>
        </div>
    </div>
</template>
