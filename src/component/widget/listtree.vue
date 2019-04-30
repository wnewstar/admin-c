<script>
export default {
    name: 'ListTree',
    data () {
        return {
            bitmap: this.$constant.bitmap.model
        }
    },
    props: {
        bit: 0,
        page: null,
        size: null,
        list: null
    },
    methods: {
        mainRegain (item) {
            return this.$emit('mainRegain', item)
        },
        mainDelete (item) {
            return this.$emit('mainDelete', item)
        },
        mainModify (item) {
            return this.$emit('mainModify', item)
        },
        mainCreate (item) {
            return this.$emit('mainCreate', item)
        },
        mainAddSon (item) {
            return this.$emit('mainAddSon', item)
        }
    }
}
</script>

<style scoped>
table.table thead tr {
    height: 45px;
    background-color: #F2F2F2;
}
table.table tr th,
table.table tr td  {
    vertical-align: middle;
    border-bottom-width: 1px;
}
table.table-bordered,
table.table-bordered tr th,
table.table-bordered tr td {
    border: 1px solid #D2D6DE;
}
table.table-bordered tr td.center {
    text-align: center;
}
table.table-bordered tr th.number {
    width: 60px;
    text-align: center;
}
table.table-bordered tr.fnum-1 td.indent {
    padding-left: 8px;
}
table.table-bordered tr.fnum-2 td.indent {
    padding-left: 24px;
}
table.table-bordered tr.fnum-3 td.indent {
    padding-left: 40px;
}
table.table-bordered tr.fnum-4 td.indent {
    padding-left: 56px;
}
table.table-bordered tr.fnum-5 td.indent {
    padding-left: 72px;
}
table.table-bordered tr.fnum-6 td.indent {
    padding-left: 88px;
}
</style>

<template>
    <tbody>
        <template v-for="(item, i) in list">
            <tr :class="(bit & bitmap.bitTreeToList) == 0 ? 'fnum' : `fnum fnum-${item.fnum}`">
                <th v-if="(bit & bitmap.bitShowOrder) > 0" class="number">
                    {{ i + 1 + size * (page - 1) }}
                </th>
                <slot name="databody" :item="item"></slot>
                <td class="center">
                    <button
                        v-if="(bit & bitmap.bitRegain) > 0 && (item.status == 1)"
                        type="button" class="btn btn-flat btn-xs btn-danger" @click="mainRegain(item)">恢复</button>
                    <button
                        v-if="(bit & bitmap.bitDelete) > 0 && (item.status == 0)"
                        type="button" class="btn btn-flat btn-xs btn-warning" @click="mainDelete(item)">删除</button>
                    <button
                        v-if="(bit & bitmap.bitAddSon) > 0 && (item.status == 0)"
                        type="button" class="btn btn-flat btn-xs btn-success" @click="mainAddSon(item)">新增</button>
                    <button
                        v-if="(bit & bitmap.bitModify) > 0 && (item.status == 0)"
                        type="button" class="btn btn-flat btn-xs btn-primary" @click="mainModify(item)">修改</button>
                </td>
            </tr>
        </template>
    </tbody>
</template>
