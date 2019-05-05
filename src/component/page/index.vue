<script>
export default {
    data () {
        return {
            data: {
                api: 0,
                user: 0,
                mysql: 0,
                bookmark: 0
            }
        }
    },
    created () {
        this.getData()
    },
    methods: {
        getData () {
            this.$http.get(this.$apiback.index.getdata).then(
                response => {
                    if (response.data.code === 0) {
                        this.data = response.data.data
                    } else {
                        this.$snotify.error(response.data.text)
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
div.box-primary {
    margin-bottom: 5px;
}
</style>

<template>
    <section>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">主页</h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body" style="height: 100%;">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-lg-3 col-xs-6">
                                        <div class="small-box bg-red">
                                            <div class="inner">
                                                <h3>{{ data.api }}</h3>
                                                <p>API请求次数</p>
                                            </div>
                                            <div class="icon"><i class="ion ion-pie-graph"></i></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-xs-6">
                                        <div class="small-box bg-aqua">
                                            <div class="inner">
                                                <h3>{{ data.user }}</h3>
                                                <p>用户数量</p>
                                            </div>
                                            <div class="icon"><i class="ion ion-person-add"></i></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-xs-6">
                                        <div class="small-box bg-green">
                                            <div class="inner">
                                                <h3>{{ data.mysql }}</h3>
                                                <p>MySQL操作次数</p>
                                            </div>
                                            <div class="icon"><i class="ion ion-bag"></i></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-xs-6">
                                        <div class="small-box bg-yellow">
                                            <div class="inner">
                                                <h3>{{ data.bookmark }}</h3>
                                                <p>书签数量</p>
                                            </div>
                                            <div class="icon"><i class="ion ion-stats-bars"></i></div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
