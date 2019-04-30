<script>
export default {
    data () {
        return {
            uname: localStorage.uname,
            ctime: localStorage.ctime
        }
    },
    methods: {
        doLogout () {
            this.$http.post(this.$apiback.auth.logout, {}).then(
                response => {
                    if (response.data.code === 0) {
                        localStorage.token = null
                        localStorage.etime = null
                        localStorage.uname = null
                        localStorage.ctime = null
                        this.$router.push('/login')
                    } else {
                        this.$snotify.error(response.data.text)
                    }
                }
            )
        }
    }
}
</script>

<template>
    <header class="main-header">
        <a href="#" class="logo">
            <span class="logo-lg">后台系统</span>
        </a>
        <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button"></a>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="/static/img/user1-128x128.jpg" class="user-image">
                            <span class="hidden-xs">{{ uname }}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="user-header">
                                <img src="/static/img/user1-128x128.jpg" class="img-circle">
                                <p>
                                    {{ uname }}
                                    <small>{{ ctime | datetime }}</small>
                                </p>
                            </li>
                            <li class="user-body">
                                <div class="row">
                                    <div class="col-xs-4 text-center">
                                        <a href="#">关注</a>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <a href="#">粉丝</a>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <a href="#">好友</a>
                                    </div>
                                </div>
                            </li>
                            <li class="user-footer">
                                <div class="pull-left">
                                    <router-link to="/profile" class="btn btn-default btn-flat">信息</router-link>
                                </div>
                                <div class="pull-right"><span class="btn btn-default btn-flat" @click="doLogout">退出</span></div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
