<template>
<div class="box">
    <div class="hello">
        <p class="hello_1">Hello 李铭洋!</p>
        <p class="hello_2">欢迎来到智能管理平台</p>
    </div>
    <ul class="overview">
        <li v-for="(item,index) in overview" :key="index">
            <div class="over_title">
                <div class="over_i" :style="{backgroundColor:`rgba(${item.icon_color},0.2)`}">
                    <Icon :type="item.icon" :color="`rgb(${item.icon_color})`" size="18"/>
                </div>
                <p class="over_name">{{item.name}}</p>
            </div>
            <p class="over_value">{{item.value}}</p>
            <p class="over_intro">{{item.intro}}</p>
        </li>
        <div class="clear"></div>
    </ul>
    <div class="chart">
        <div class="cash_chart">
            <chart class="cashchart" ref="chart1" :options="cashData"></chart>
        </div>
        <div class="city_chart">
            <chart class="cashchart" ref="chart2" :options="cityData"></chart>
        </div>
    </div>
    <div class="info">
        <div class="info_list_box">
            <h1 class="info_title">日志</h1>
            <ul class="info_list">
                <li class="info_li_title">
                    <span class="info_li_span" style="text-align:center !important;">事件</span>
                    <span>时间</span>
                </li>
                <li v-for="(item,index) in infoList" :key="index"  class="info_li">
                    <span class="info_li_span">{{item.content}}</span>
                    <span>{{item.time}}</span>
                </li>
            </ul>
        </div>
        <div class="info_list_box2">
            <h1 class="info_title">交易明细表</h1>
            <ul class="info_list">
                <li class="info_li_title">
                    <span>城市</span>
                    <span>交易量</span>
                    <span>时间</span>
                    <span>结果</span>
                </li>
                <li v-for="(item,index) in tradeList" :key="index" class="info_li">
                    <span>{{item.city}}</span>
                    <span>{{item.num}} kg</span>
                    <span>{{item.time}}</span>
                    <span style="position:relative;">
                        <div class="res_success" v-if="item.result==1">成功</div>
                        <div class="res_fail" v-if="item.result==0">失败</div>
                        <div class="res_ing" v-if="item.result==2">正在处理中</div>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            infoList:[
                {
                    content:'李铭洋偷吃了一个蚕',
                    time:'1998-05-22'
                },
                {
                    content:'李铭洋又偷吃了一个蚕',
                    time:'1998-05-22'
                },
                {
                    content:'李铭洋偷吃了一个蚕',
                    time:'1998-05-22'
                },
                {
                    content:'李铭洋又偷吃了一个蚕',
                    time:'1998-05-22'
                },
                {
                    content:'李铭洋偷吃了一个蚕',
                    time:'1998-05-22'
                },
                {
                    content:'李铭洋又偷吃了一个蚕',
                    time:'1998-05-22'
                },
                {
                    content:'李铭洋偷吃了一个蚕',
                    time:'1998-05-22'
                },
            ],
            tradeList:[
                {
                    city:'成都',
                    num:'58',
                    time:'1998-05-12',
                    result:1
                },
                {
                    city:'重庆',
                    num:'588',
                    time:'1998-05-12',
                    result:0
                },
                {
                    city:'北京',
                    num:'58',
                    time:'1998-05-12',
                    result:1
                },
                {
                    city:'成都',
                    num:'58',
                    time:'1998-05-12',
                    result:1
                },
                {
                    city:'福建',
                    num:'8492',
                    time:'1998-05-12',
                    result:2
                },
                {
                    city:'成都',
                    num:'58',
                    time:'1998-05-12',
                    result:0
                },
                {
                    city:'广东',
                    num:'482',
                    time:'1998-05-12',
                    result:2
                }
            ],
            overview:[
                {
                    icon:'ios-locate',
                    icon_color:'156,109,239',
                    name:'蚕丝总重量',
                    value:'2758 kg',
                    intro:'蚕所生产的蚕丝总数量'
                },
                {
                    icon:'ios-heart',
                    icon_color:'25,190,107',
                    name:'健康状况',
                    value:'优',
                    intro:'每天生长率为:5%'
                },
                {
                    icon:'logo-usd',
                    icon_color:'189,0,32',
                    name:'本周净收入',
                    value:'-232758元',
                    intro:'每天生长率为:5%'
                },
                {
                    icon:'ios-people',
                    icon_color:'199,21,133',
                    name:'本周交易量',
                    value:'2758',
                    intro:'每天生长率为:5%'
                }
            ],
            cashData: {
                title: {
                    text: '蚕丝概况图',
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:['净支出','净收入']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'净支出',
                        type:'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:'#a10024aa'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#a10024aa'
                                }, {
                                    offset: 1,
                                    color: '#ffe'
                                }])
                            }
                        },
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'净收入',
                        type:'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:'#7badb5'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#7badb5'
                                }, {
                                    offset: 1,
                                    color: '#ffe'
                                }])
                            }
                        },
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            },
            cityData:{
                title: {
                    left: 'center',
                    text: '城市分布',
                    subtext: ''
                },
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data:[
                            {value:235, name:'福建'},
                            {value:274, name:'成都'},
                            {value:310, name:'重庆'},
                            {value:335, name:'广东'},
                            {value:400, name:'北京'}
                        ],
                        roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(0,0,0,0.8)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(0,0,0,0.8)'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#63afb7',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    },
    mounted() {
        this.CashAni();
    },
    methods: {
        CashAni(){
            setInterval(()=>{
                this.cashData.series[0].data.shift();
                this.cashData.series[0].data.push(parseInt(Math.random()*200));
            },5000);
        }
    },
}
</script>
<style scoped>
@import url('./index.css');
</style>