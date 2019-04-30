<script>
import BaseModel from 'component/model/basemodel'

export default {
    components: { BaseModel },
    data () {
        return {
            bit: 0,
            api: null,
            colspan: 9,
            modelname: 'PostgreSQL日志'
        }
    },
    created () {
        var constant = this.$constant
        var bitmap = constant.bitmap

        this.api = this.$apiback.syslog.postgresql
        this.bit = 0 +
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
        <template slot="search" slot-scope="base">
            <div class="form-group">
                <label class="col-md-2 control-label">内容</label>
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="base.that.search.item.text">
                </div>
            </div>
        </template>
        <template slot="datahead" slot-scope="base">
            <th>编号</th>
            <th>耗时</th>
            <th>HOST</th><th>PORT</th><th style="width: 50%;">SQL</th><th>创建时间</th>
        </template>
        <template slot="databody" slot-scope="base">
            <td class="center">{{ base.item.id }}</td>
            <td>{{ base.item.ms }}</td>
            <td>{{ base.item.host }}</td><td>{{ base.item.port }}</td><td>{{ base.item.text }}</td><td>{{ base.item.time_create | datetime }}</td>
        </template>
    </base-model>
</template>
