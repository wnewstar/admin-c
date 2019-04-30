<script>
import BaseModel from 'component/model/basemodel'

export default {
    components: { BaseModel },
    data () {
        return {
            bit: 0,
            api: null,
            colspan: 6,
            modelname: '用户'
        }
    },
    created () {
        var constant = this.$constant
        var bitmap = constant.bitmap

        this.api = this.$apiback.admin.user
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
                <label class="col-md-2 control-label">姓名</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.create.item.username">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">密码</label>
                <div class="col-md-8">
                    <input type="password" class="form-control" v-model="base.that.create.item.password">
                </div>
            </div>
        </template>
        <template slot="modify" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">姓名</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.modify.item.username">
                </div>
            </div>
            <div class="form-group">
                <label class="col-md-2 control-label">密码</label>
                <div class="col-md-8">
                    <input type="password" class="form-control" v-model="base.that.modify.item.password">
                </div>
            </div>
        </template>
        <template slot="search" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">姓名</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.search.item.username">
                </div>
            </div>
        </template>
        <template slot="datahead" slot-scope="base">
            <th>编号</th>
            <th>姓名</th><th>类型</th><th>创建时间</th>
        </template>
        <template slot="databody" slot-scope="base">
            <td class="center">{{ base.item.id }}</td>
            <td>{{ base.item.username }}</td><td>{{ base.item.type }}</td> <td>{{ base.item.time_create | datetime }}</td>
        </template>
    </base-model>
</template>
