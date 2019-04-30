<script>
import BaseModel from 'component/common/basemodel'

export default {
    mixins: [BaseModel],
    props: {
        bit: 0,
        api: null,
        colspan: 0,
        modelname: null
    },
    methods: {
        initList (list) {
            var bit = this.bitmap.bitTreeToList

            return (this.bit & bit) ? this.treeToList(list, {}) : list
        },
        objToArr (obj) {
            var arr = []
            for (let i in obj) {
                arr.push(obj[i])
                if (obj[i]['list'] !== undefined) {
                    obj[i]['list'] = this.objToArr(obj[i]['list'])
                }
            }

            return arr
        },
        treeToList (list, temp = {}) {
            temp.data !== undefined ? null : (temp.data = [])
            temp.fnum !== undefined ? temp.fnum++ : (temp.fnum = 1)
            for (let i in list) {
                list[i].fnum = temp.fnum
                temp.data.push(list[i])

                list[i]['list'] === undefined ? null : this.treeToList(list[i]['list'], temp)
            }

            return temp.fnum--, temp.data
        }
    }
}
</script>

<style scoped>
.modal {
    margin-top: 100px;
}
div.box-primary {
    margin-bottom: 5px;
}
div.box-widget {
    border: 1px solid #D2D6DE;
    box-shadow: none;
}
table.table thead tr {
    height: 45px;
    background-color: #F2F2F2;
}
table.table tr th {
    text-align: center;
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
</style>

<template>
    <section>
        <div v-if="(bit & bitmap.bitModal) > 0" id="modal-item" class="modal">
            <div class="modal-dialog">
                <div v-if="(bit & (bitmap.bitCreate + bitmap.bitAddSon)) > 0" class="modal-content" v-show="create.flag">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ modelname }}新增</h4>
                    </div>
                    <div class="modal-body form-horizontal">
                        <slot name="create" :that="this"></slot>
                        <div class="form-group">
                            <div class="col-md-offset-2 col-md-8">
                                <button type="button" class="btn btn-flat btn-primary" @click="mainInsert">新增</button>
                                <button type="button" class="btn btn-flat btn-default pull-right" @click="mainQuit">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="(bit & bitmap.bitModify) > 0" class="modal-content" v-show="modify.flag">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ modelname }}修改</h4>
                    </div>
                    <div class="modal-body form-horizontal">
                        <slot name="modify" :that="this"></slot>
                        <div class="form-group">
                            <div class="col-md-offset-2 col-md-8">
                                <button type="button" class="btn btn-flat btn-primary" @click="mainUpdate">修改</button>
                                <button type="button" class="btn btn-flat btn-default pull-right" @click="mainQuit">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-solid box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">{{ modelname }}管理</h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-flat btn-box-tool" data-widget="collapse">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div v-if="(bit & bitmap.bitSelect) > 0" class="box box-widget collapsed-box">
                            <div class="box-header with-border">
                                <h3 class="box-title">{{ modelname }}查询</h3>
                                <div class="box-tools pull-right">
                                    <button type="button" class="btn btn-flat btn-box-tool" data-widget="collapse">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="form-horizontal">
                                    <slot name="search" :that="this"></slot>
                                    <div class="form-group">
                                        <div class="col-md-offset-2 col-md-8">
                                            <button
                                                type="button" class="btn btn-flat btn-primary" @click="mainSelect">查询</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="(bit & bitmap.bitShowData) > 0" class="box box-widget">
                            <div class="box-header with-border">
                                <h3 class="box-title">{{ modelname }}列表</h3>
                                <div class="box-tools pull-right">
                                    <button type="button" class="btn btn-flat btn-box-tool" data-widget="collapse">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <div class="row" style="margin-bottom: 10px;">
                                    <div class="col-md-12">
                                        <button
                                            v-if="(bit & bitmap.bitCreate) > 0"
                                            type="button" class="btn btn-flat btn-primary" @click="mainCreate">新增</button>
                                        <button
                                            type="button" class="btn btn-flat btn-primary pull-right" @click="mainSearch">刷新</button>
                                    </div>
                                </div>
                                <table class="table table-hover table-bordered" v-show="search.flag">
                                    <thead>
                                        <tr class="title">
                                            <th v-if="(bit & bitmap.bitShowOrder) > 0">序号</th>
                                            <slot name="datahead" :that="this"></slot>
                                            <th>数据操作</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="search.total > 0"
                                        is="s-list-tree"
                                        :bit="bit"
                                        :page="search.page"
                                        :size="search.size"
                                        :list="initList(search.items)"
                                        @mainRegain="mainRegain"
                                        @mainDelete="mainDelete"
                                        @mainModify="mainModify"
                                        @mainAddSon="mainAddSon">
                                        <template slot="databody" slot-scope="base">
                                            <slot name="databody" :that="this" :item="base.item"></slot>
                                        </template>
                                    </tbody>
                                    <tbody v-if="search.total == 0">
                                        <tr>
                                            <td style="text-align: center; color: orange;" :colspan="colspan">没有数据</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <s-pagination
                                    v-if="(bit & bitmap.bitShowPage) > 0 && (search.total > 0)"
                                    class="pull-right" :type="63" :page="search.page" :size="search.size" :total="search.total" :number="5" @change="mainChange"></s-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
