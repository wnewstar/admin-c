import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store(
    {
        state: {
            menus: null,
            navtabs: {
                '/index': { url: '/index', icon: 'home', name: '首页', remove: false }
            }
        },
        mutations: {
            navtabRemove (state, menu) {
                Vue.delete(state.navtabs, menu.url)
            },
            navtabInsert (state, menu) {
                if (state.navtabs[menu.url] === undefined) {
                    Vue.set(state.navtabs, menu.url, { url: menu.url, icon: menu.icon, name: menu.name, remove: menu.url !== '/index' })
                }
            }
        }
    }
)
