<script>
import BaseModel from 'component/model/basemodel'

export default {
    components: { BaseModel },
    data () {
        return {
            bit: 0,
            api: null,
            colspan: 9,
            modelname: '资源'
        }
    },
    created () {
        var constant = this.$constant
        var bitmap = constant.bitmap

        this.api = this.$apiback.admin.acl
        this.bit = 0 +
            bitmap.model.bitModal +
            bitmap.model.bitAddSon +
            bitmap.model.bitCreate +
            bitmap.model.bitModify +
            bitmap.model.bitSelect +
            bitmap.model.bitDelete +
            bitmap.model.bitRegain +
            bitmap.model.bitShowData + bitmap.model.bitTreeToList
    },
    methods: {
        prepText (num) {
            return Array(num).fill('─').join(String())
        },
        mainSearch (param, that) {
            var data = {
                page: that.search.page,
                size: that.search.size
            }
            data = Object.assign(data, param, that.search.item)
            that.$http.post(that.api.tree, data, {}).then(
                response => {
                    if (response.data.code === 0) {
                        that.search.flag = 1
                        that.search.total = 1
                        that.search.items = that.objToArr(response.data.data)
                    }
                }
            )
        }
    }
}
</script>

<template>
    <base-model
        :api="api"
        :bit="bit"
        :colspan="colspan"
        :modelname="modelname"
        @mainSearch="mainSearch">
        <template slot="create" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">上级</label>
                <div class="col-md-8">{{ base.that.create.item.pid }}</div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">路径</label>
                <div class="col-md-8">{{ base.that.create.item.path }}</div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">URL</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.url">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">MCA</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.mca">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">名称</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">序号</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.sort">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">图标</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.icon">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">设为菜单</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.menu">
                </div>
            </div>
        </template>
        <template slot="modify" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">上级</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.pid">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">路径</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.path">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">URL</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.url">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">MCA</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.mca">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">名称</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">序号</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.sort">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">图标</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.icon">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">设为菜单</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.menu">
                </div>
            </div>
        </template>
        <template slot="search" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">上级</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.search.item.pid">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">URL</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.search.item.url">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">名称</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.search.item.name">
                </div>
            </div>
        </template>
        <template slot="datahead" slot-scope="base">
            <th>名称</th>
            <th>编号</th>
            <th>上级</th>
            <th>路径</th>
            <th>排序</th>
            <th>地址</th>
            <th>创建时间</th>
            <th>是否菜单</th>
        </template>
        <template slot="databody" slot-scope="base">
            <td class="indent">└─{{ base.item.name }}</td>
            <td class="center">{{ base.item.id }}</td>
            <td class="center">{{ base.item.pid }}</td>
            <td>{{ base.item.path }}</td>
            <td class="center">{{ base.item.sort }}</td>
            <td>{{ base.item.url }}</td>
            <td class="center">{{ base.item.time_create | date }}</td>
            <td class="center">{{ base.item.menu == 1 ? 'Yes' : 'No' }}</td>
        </template>
    </base-model>
</template>
