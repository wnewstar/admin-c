<script>
export default {
    data () {
        return {
            sizeC: 0,
            pageC: 0,
            pageS: [10, 20, 50, 100, 500]
        }
    },
    props: {
        page: 0,
        size: 0,
        type: 0,
        total: 0,
        number: 0
    },
    watch: {
        pageC: function () {
            this.isChange() ? this.$emit('change', this.sizeC, this.pageC) : null
        },
        sizeC: function () {
            var t = this.pageTotal
            var c = this.pageC
            this.pageC = (t > c ? c : t)
            this.isChange() ? this.$emit('change', this.sizeC, this.pageC) : null
        }
    },
    created () {
        this.sizeC = this.size
        this.pageC = this.page
        this.number > 0 ? null : this.number = 5
    },
    methods: {
        setPage (p) {
            this.pageC = p
        },
        isChange () {
            return this.pageC !== this.page || this.sizeC !== this.size
        }
    },
    computed: {
        pageB () {
            var page = 0
            var half = parseInt(this.number / 2)
            if (this.pageC < (half + 1)) {
                page = 1
            } else if (this.pageTotal < (half * 2 + 1)) {
                page = 1
            } else if (this.pageTotal > (this.pageC + half)) {
                page = this.pageC - half
            } else if (this.pageTotal <= (this.pageC + half)) {
                page = this.pageTotal - half * 2
            }

            return page
        },
        pageE () {
            var page = 0
            var half = parseInt(this.number / 2)
            if (this.pageTotal < (half * 2 + 1)) {
                page = this.pageTotal
            } else if (this.pageC < (half + 1)) {
                page = 1 + half * 2
            } else if (this.pageTotal < (this.pageC + half)) {
                page = this.pageTotal
            } else if (this.pageTotal >= (this.pageC + half)) {
                page = this.pageC + half
            }

            return page
        },
        sizeSet () {
            this.pageS.indexOf(this.size) >= 0 ? null : this.pageS.unshift(this.size)

            return this.pageS
        },
        pageSet () {
            var b = this.pageB
            var e = this.pageE
            var diff = e - b + 1

            return Array.from({length: diff}, (x, i) => i + b)
        },
        pagePrev () {
            return this.pageC === 1 ? 0 : this.pageC - 1
        },
        pageNext () {
            return this.pageTotal === this.pageC ? 0 : this.pageC + 1
        },
        pageHead () {
            return this.pageC === 1 ? 0 : 1
        },
        pageFoot () {
            return this.pageC === this.pageTotal ? 0 : this.pageTotal
        },
        pageTotal () {
            return this.total === 0 || this.sizeC === 0 ? 0 : Math.ceil(this.total / this.sizeC)
        }
    }
}
</script>

<style scoped>
.star-pagination ul.pagination {
    padding: 10px;
    padding-right: 0;
    border-radius: 0;
    display: table-cell;
    vertical-align: middle;
}
.star-pagination ul.pagination li a,
.star-pagination ul.pagination li span {
    cursor: pointer;
    border-radius: 0;
}
.star-pagination ul.pagination li select {
    height: 34px;
    outline-style: none;
}
</style>

<template>
    <div class="star-pagination">
        <ul v-if="type & 32 && pageSet.length" class="pagination">
            <li>
                <select v-model="sizeC" class="form-control">
                    <option v-for="s in sizeSet" :value="s">{{ s }}</option>
                </select>
            </li>
        </ul>

        <ul v-if="type & 16 && pageSet.length" class="pagination">
            <li><span>每页 {{ sizeC }} 条</span></li>
            <li><span>共 {{ total }} 条</span></li>
            <li><span>共 {{ pageTotal }} 页</span></li>
        </ul>
        
        <ul class="pagination">
            <li v-if="(type & 1) && (pageHead > 0)"><span @click="setPage(pageHead)">首页</span></li>
            <li v-if="(type & 4) && (pagePrev > 0)"><span @click="setPage(pagePrev)">上页</span></li>
            <li v-if="pageSet.length" 
                v-for="p in pageSet" :class="{active: p == pageC}">
                <span @click="setPage(p)">{{ p }}</span>
            </li>
            <li v-if="(type & 8) && (pageNext > 0)"><span @click="setPage(pageNext)">下页</span></li>
            <li v-if="(type & 2) && (pageFoot > 0)"><span @click="setPage(pageFoot)">末页</span></li>
        </ul>
    </div>
</template>
