<script>
export default {
    data () {
        return {
            tabnavs: null
        }
    },
    created () {
        this.tabnavs = this.$store.state.navtabs
    },
    methods: {
        getActive (menu) {
            var isexist = this.tabnavs[this.$route.path] !== undefined

            return menu.url === (!isexist ? '/index' : this.$route.path)
        },
        switchNavtab (menu) {
            this.$store.commit('navtabInsert', menu)
            menu.url === this.$route.path ? null : this.$router.push(menu.url)
        },
        removeNavtab (menu) {
            this.$store.commit('navtabRemove', menu)
            menu.url !== this.$route.path ? null : this.$router.push(Object.keys(this.tabnavs).pop())
        }
    }
}
</script>

<style scoped>
.nav.nav-tabs {
    border: none;
}
.nav.nav-tabs li,
.nav.nav-tabs li a {
    margin: 0;
    border: none;
}
.nav.nav-tabs li a:hover {
    color: #3C8DBC;
    background: #EEEEEE;
}
.nav.nav-tabs li.active,
.nav.nav-tabs li.active a {
    margin: 0;
    border: none;
    display: block;
    background: #DDDDDD;
}
.nav.nav-tabs li a span.name {
    cursor: pointer;
    margin: 0px 20px 0px 5px;
}
</style>

<template>
    <ul class="nav nav-tabs">
        <li v-for="(menu, key) in tabnavs" :key="key" :data-index="menu.id" :class="{ active: getActive(menu) }">
            <a data-toggle="tab" @click="switchNavtab(menu)">
                <i :class="`fa fa-${menu.icon}`"></i>
                <span class="name">{{ menu.name }}</span><span v-if="menu.remove" @click.stop="removeNavtab(menu)"><i class="fa fa-times"></i></span>
            </a>
        </li>
    </ul>
</template>
