import SListTree from 'component/widget/listtree'
import SPagination from 'component/widget/pagination'

export default {
    components: { SListTree, SPagination },
    data () {
        return {
            bitmap: this.$constant.bitmap.model,
            create: { flag: 0, item: {} },
            modify: { flag: 0, item: {} },
            search: { flag: 0, page: 1, size: 10, item: {}, total: 0, items: [] }
        }
    },
    mounted () {
        this.mainSelect()
        this.$nextTick(() => {
            this.$jquery(window).trigger('load')
        })
    },
    methods: {
        mainQuit () {
            this.create.flag = 0
            this.create.item = {}
            this.modify.flag = 0
            this.modify.item = {}
            this.$jquery('#modal-item').modal('toggle')
        },
        mainChange (s, p) {
            this.search.size = s
            this.search.page = p
            this.mainSearch({ size: s, page: p })
        },
        mainAddSon (item) {
            this.$jquery('#modal-item').modal('toggle')
            this.create.flag = 1
            this.create.item.pid = item.id
            this.create.item.path = `${item.path}-${item.id}`
        },
        mainCreate () {
            this.create.flag = 1
            this.$jquery('#modal-item').modal('toggle')
        },
        mainInsert () {
            var data = this.create.item
            this.$http.post(this.api.insert, data, {}).then(
                response => {
                    var data = response.data
                    if (data.code === 0) {
                        this.mainSearch()
                        this.create.flag = 0
                        this.$jquery('#modal-item').modal('toggle')
                    }
                    data.code === 0 ? this.$snotify.success(data.text) : this.$snotify.error(data.text)
                }
            )
        },
        mainModify (item) {
            var data = { id: item.id }
            this.$http.post(this.api.detail, data, {}).then(
                response => {
                    if (response.data.code === 0) {
                        this.$jquery('#modal-item').modal('toggle')
                        this.modify.flag = 1, this.modify.item = response.data.data
                    }
                }
            )
        },
        mainUpdate () {
            var data = this.modify.item
            this.$http.post(this.api.update, data, {}).then(
                response => {
                    var data = response.data
                    if (data.code === 0) {
                        this.mainSearch()
                        this.modify.flag = 0
                        this.$jquery('#modal-item').modal('toggle')
                    }
                    data.code === 0 ? this.$snotify.success(data.text) : this.$snotify.error(data.text)
                }
            )
        },
        mainDelete (item) {
            var data = { id: item.id }
            this.$http.post(this.api.delete, data, {}).then(
                response => {
                    var data = response.data
                    if (data.code === 0) {
                        this.mainSearch()
                    }
                    data.code === 0 ? this.$snotify.success(data.text) : this.$snotify.error(data.text)
                }
            )
        },
        mainRegain (item) {
            var data = { id: item.id }
            this.$http.post(this.api.regain, data, {}).then(
                response => {
                    var data = response.data
                    if (data.code === 0) {
                        this.mainSearch()
                    }
                    data.code === 0 ? this.$snotify.success(data.text) : this.$snotify.error(data.text)
                }
            )
        },
        mainSelect () {
            this.search.page = 1
            this.mainSearch()
        },
        mainSearch (param = {}) {
            if (this.$listeners.mainSearch !== undefined) {
                return this.$emit('mainSearch', param, this)
            }
            var data = {
                page: this.search.page,
                size: this.search.size
            }
            data = Object.assign(data, param, this.search.item)
            this.$http.post(this.api.search, data, {}).then(
                response => {
                    if (response.data.code !== 0) {
                        this.$snotify.error(data.text)
                    } else {
                        this.search.flag = 1
                        this.search.total = response.data.data.total, this.search.items = response.data.data.items
                    }
                }
            )
        }
    }
}
