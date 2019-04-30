import Vue from 'vue'

import Snotify, { SnotifyPosition } from 'vue-snotify'

import App from 'component/main'

import axios from 'axios'
import jquery from 'jquery'
import moment from 'moment'

import store from '@/store/index.js'

import router from '@/router/index.js'

import apiback from '@/config/apiback.js'
import constant from '@/config/constant.js'

import 'admin-lte.js'
import 'bootstrap.js'
import 'ionicons.css'
import 'bootstrap.css'
import 'admin-lte.css'
import 'vue-snotify.css'
import 'font-awesome.css'
import 'admin-lte-skin.css'
import 'jquery.slimscroll.js'

Vue.use(Snotify, { toast: { position: SnotifyPosition.rightTop } })

Vue.config.productionTip = false

Vue.filter('date', (time) => {
    return moment(time * 1000).format('YYYY-MM-DD')
})

Vue.filter('datetime', (time) => {
    return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
})

const http = axios.create({
    timeout: 5000,
    baseURL: process.env.API_ROOT
})

http.interceptors.request.use(
    config => {
        config.headers['TOKEN-ACCESS'] = localStorage.token

        return config
    }
)

router.beforeEach((to, from, next) => {
    var path = to.fullPath
    var data = localStorage
    var time = new Date().getTime() / 1000
    path === '/login' || (data.token && data.etime > time) ? next() : next('/login')
})

Vue.prototype.$http = http
Vue.prototype.$jquery = jquery
Vue.prototype.$apiback = apiback
Vue.prototype.$constant = constant

window.app = new Vue({ el: '#app', store, router, template: '<App/>', components: { App: App } })
