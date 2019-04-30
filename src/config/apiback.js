export default {
    auth: {
        login: '/back/auth/login',
        logout: '/back/auth/logout'
    },
    index: {
        getdata: '/back/index/getdata'
    },
    admin: {
        acl: {
            tree: '/back/admin/acl/tree',
            menu: '/back/admin/acl/menu',
            insert: '/back/admin/acl/insert',
            detail: '/back/admin/acl/detail',
            update: '/back/admin/acl/update',
            delete: '/back/admin/acl/delete',
            regain: '/back/admin/acl/regain',
            search: '/back/admin/acl/search'
        },
        role: {
            insert: '/back/admin/role/insert',
            detail: '/back/admin/role/detail',
            update: '/back/admin/role/update',
            delete: '/back/admin/role/delete',
            regain: '/back/admin/role/regain',
            search: '/back/admin/role/search'
        },
        user: {
            insert: '/back/admin/user/insert',
            detail: '/back/admin/user/detail',
            update: '/back/admin/user/update',
            delete: '/back/admin/user/delete',
            regain: '/back/admin/user/regain',
            search: '/back/admin/user/search'
        }
    },
    asset: {
        bookmark: {
            insert: '/back/asset/bookmark/insert',
            detail: '/back/asset/bookmark/detail',
            update: '/back/asset/bookmark/update',
            delete: '/back/asset/bookmark/delete',
            regain: '/back/asset/bookmark/regain',
            search: '/back/asset/bookmark/search'
        }
    },
    syslog: {
    	api: {
            search: '/back/syslog/api/search'
        },
        mysql: {
            search: '/back/syslog/mysql/search'
        },
        mongo: {
            search: '/back/syslog/mongo/search'
        },
        postgresql: {
            search: '/back/syslog/postgresql/search'
        }
    }
}
