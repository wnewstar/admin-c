<script>
export default {
    data () {
        return {
            uname: localStorage.uname,
            ctime: localStorage.ctime
        }
    }
}
</script>

<template>
    <div class="box box-primary">
        <div class="box-body box-profile">
            <img class="profile-user-img img-responsive img-circle" src="/static/img/user4-128x128.jpg">
            <h3 class="profile-username text-center">{{ uname }}</h3>
            <p class="text-muted text-center">{{ ctime | datetime }}</p>
            <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                    <b>关注</b> <a class="pull-right">1,322</a>
                </li>
                <li class="list-group-item">
                    <b>粉丝</b> <a class="pull-right">543</a>
                </li>
                <li class="list-group-item">
                    <b>好友</b> <a class="pull-right">13,287</a>
                </li>
            </ul>
            <a href="#" class="btn btn-flat btn-primary btn-block"><b>Follow</b></a>
        </div>
    </div>
</template>
