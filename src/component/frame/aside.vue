<script>
export default {
    data () {
        return {
            tree: {},
            menus: {},
            currentu: null,
            indexmenu: { id: 0, url: '/index', name: '首页' }
        }
    },
    created () {
        this.init()
        this.getMenuTree()
    },
    mounted () {
        this.$jquery(window).trigger('load')
        this.$jquery(window).trigger('resize')
    },
    watch: {
        $route () {
            this.init()
            this.toggle()
        }
    },
    methods: {
        init () {
            this.currentu = this.$route.path
        },
        insert (menu) {
            this.menus[menu.id] = menu
        },
        select (menu) {
            if (menu.url !== this.currentu) {
                this.currentu = menu.url
                this.toggle()
                this.$router.push(menu.url)
                this.$store.commit('navtabInsert', menu)
            }
        },
        toggle () {
            var currentu = this.$route.path
            var selector = `#menutree li[data-url='${currentu}']`
            var currentd = this.$jquery(selector).first()

            currentu = (currentd.length === 0 ? '/index' : currentu)
            selector = `#menutree li[data-url='${currentu}']`
            currentd = this.$jquery(selector).first()

            this.$jquery('#menutree li.treeleaf').removeClass('active')
            this.$jquery('#menutree li.treeview').removeClass('active menu-open')
            this.$jquery('.treeview-menu', this.$jquery('#menutree li.treeview')).hide()
            this.$jquery('.treeview-menu', currentd.parents('#menutree li.treeview')).show()
            currentd.addClass('active').parents('#menutree li.treeview').addClass('active menu-open')
            currentd.length === 0 ? null : this.$store.commit('navtabInsert', this.menus[currentd.data('id')])
        },
        doSort (tree) {
            var data = []
            for (var i in tree) {
                data.push(tree[i])
            }
            return data.sort((a, b) => { return (a.sort - b.sort) })
        },
        getMenuTree (param = {}) {
            this.$http.post(this.$apiback.admin.acl.menu, {}).then(
                response => {
                    response.data.code !== 0 ? null : (this.tree = response.data.data, this.$nextTick(this.toggle))
                }
            )
        }
    }
}
</script>

<template>
    <aside class="main-sidebar">
        <section class="sidebar">
            <ul id="menutree" class="sidebar-menu tree" data-widget="tree">
                <li class="treeview" :data-id="indexmenu.id" :data-url="indexmenu.url">
                    <a href="javascript:;" :abc="insert(indexmenu)" @click="select(indexmenu)">
                        <i class="fa fa-home"></i> <span>{{ indexmenu.name }}</span>
                    </a>
                </li>
                <li v-for="item in doSort(tree)" class="treeview" :data-id="item.id">
                    <a href="javascript:;" :abc="insert(item)">
                        <i :class="`fa fa-${item.icon}`"></i>
                        <span>{{ item.name }}</span>
                    </a>
                    <ul class="treeview-menu">
                        <li v-for="menu in doSort(item.list)" class="treeleaf" :data-id="menu.id" :data-url="menu.url">
                            <a href="javascript:;" :abc="insert(menu)" @click="select(menu)"><i :class="`fa fa-${menu.icon}`"></i>{{ menu.name }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    </aside>
</template>
