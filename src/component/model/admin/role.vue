<script>
import BaseModel from 'component/model/basemodel'

export default {
    components: { BaseModel },
    data () {
        return {
            bit: 0,
            api: null,
            colspan: 6,
            modelname: '角色'
        }
    },
    created () {
        var constant = this.$constant
        var bitmap = constant.bitmap

        this.api = this.$apiback.admin.role
        this.bit = 0 +
            bitmap.model.bitModal +
            bitmap.model.bitCreate +
            bitmap.model.bitModify +
            bitmap.model.bitDelete +
            bitmap.model.bitRegain +
            bitmap.model.bitSelect +
            bitmap.model.bitShowData +
            bitmap.model.bitShowPage + bitmap.model.bitShowOrder
    }
}
</script>

<template>
    <base-model
        :api="api"
        :bit="bit"
        :colspan="colspan"
        :modelname="modelname">
        <template slot="create" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">名称</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">类型</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.type">
                </div>
            </div>
        </template>
        <template slot="modify" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">名称</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">类型</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.type">
                </div>
            </div>
        </template>
        <template slot="search" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">名称</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.search.item.name">
                </div>
            </div>
        </template>
        <template slot="datahead" slot-scope="base">
            <th>编号</th>
            <th>名称</th><th>类型</th><th>创建时间</th>
        </template>
        <template slot="databody" slot-scope="base">
            <td class="center">{{ base.item.id }}</td>
            <td>{{ base.item.name }}</td><td>{{ base.item.type }}</td> <td>{{ base.item.time_create | datetime }}</td>
        </template>
    </base-model>
</template>
