import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from 'component/page/login'
import Index from 'component/page/index'
import Profile from 'component/page/profile'

import Frame from 'component/frame/frame'

import AdminAcl from 'component/model/admin/acl'
import AdminRole from 'component/model/admin/role'
import AdminUser from 'component/model/admin/user'

import AssetBookmark from 'component/model/asset/bookmark'

import SyslogApi from 'component/model/syslog/api'
import SyslogMysql from 'component/model/syslog/mysql'
import SyslogMongo from 'component/model/syslog/mongo'
import SyslogPostgresql from 'component/model/syslog/postgresql'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            component: Login,
            path: '/login'
        },
        {
            component: Frame,
            path: '/',
            redirect: '/index',
            children: [
                { component: Index, path: 'index' },
                { component: Profile, path: 'profile' },
                { component: AdminAcl, path: 'admin/acl' },
                { component: AdminRole, path: 'admin/role' },
                { component: AdminUser, path: 'admin/user' },
                { component: AssetBookmark, path: 'asset/bookmark' },
                { component: SyslogApi, path: 'syslog/api' },
                { component: SyslogMysql, path: 'syslog/mysql' },
                { component: SyslogMongo, path: 'syslog/mongo' },
                { component: SyslogPostgresql, path: 'syslog/postgresql' }
            ]
        }
    ]
})
