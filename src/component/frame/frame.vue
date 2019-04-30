<script>
import SHeader from 'component/frame/header'
import SNavtab from 'component/frame/navtab'
import SAside from 'component/frame/aside'

export default {
    components: { SNavtab, SHeader, SAside },
    data () {
        return {}
    },
    created () {
        this.$jquery(window).on('resize', this.initContentHeight)
    },
    mounted () {
        this.$jquery(window).trigger('load')
        this.$jquery(window).trigger('resize')
    },
    methods: {
        initContentHeight () {
            var top = this.$jquery('.content-wrapper').css('padding-top')
            this.$jquery('section.content').css('max-height', this.$jquery(window).height() - parseInt(top) - 45)
            this.$jquery('section.content').slimScroll({'height': this.$jquery(window).height() - parseInt(top) - 45})
        }
    }
}
</script>

<style scoped>
.content {
    padding: 5px;
    background: #DDD;
    overflow-y: auto;
    overflow-x: hidden;
}
.content-wrapper .nav-tabs-custom {
    box-shadow: none;
    border-radius: 0px;
    margin-bottom: 0px;
    border-bottom: 3px solid #DDD;
}
</style>

<template>
    <div class="wrapper">
        <vue-snotify></vue-snotify>
        <s-header></s-header>
        <s-aside></s-aside>
        <div class="content-wrapper">
            <div class="nav-tabs-custom"><s-navtab></s-navtab></div><section class="content"><router-view></router-view></section>
        </div>
    </div>
</template>
