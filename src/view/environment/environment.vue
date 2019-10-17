<template>
<div class="box" @click="HiddenDetail">
    <h1 class="env_title">蚕室环境检测与控制系统</h1>
    <div class="env">
        <div class="region" v-for="(item,index) in general" :key="index"  :class="{['region_'+(index+1)]:true}" @click.stop="Detail(index)">
            <span class="region_title">园区{{index+1}}</span>
            <div class="check_box">
                <span class="check_title">温度:</span>
                <span class="check_result" v-if="item.tem>=20 && item.tem<=30" :style="{backgroundColor:'rgb(47, 121, 47)'}"></span>
                <span class="check_result check_result_warning" v-else :style="{backgroundColor:'rgb(165, 70, 70)'}"></span>
                <div class="check">
                    <span class="check_value">{{item.tem}}℃</span>
                    <div class="check_num check_tmp" :style="{width:(item.tem/40)*100+'%'}"></div>
                </div>
            </div>
            <div class="check_box">
                <span class="check_title">湿度:</span>
                <span class="check_result" v-if="item.hum>=65 && item.hum<=90" :style="{backgroundColor:'rgb(47, 121, 47)'}"></span>
                <span class="check_result check_result_warning" v-else :style="{backgroundColor:'rgb(165, 70, 70)'}"></span>
                <div class="check">
                    <span class="check_value">{{item.hum}}%</span>
                    <div class="check_num check_hum"  :style="{width:(item.hum/100)*100+'%'}"></div>
                </div>
            </div>
            <div class="check_box">
                <span class="check_title">光照:</span>
                <span class="check_result" v-if="(item.sun/100)*100>=30 && (item.sun/100)*100<=50" :style="{backgroundColor:'rgb(47, 121, 47)'}"></span>
                <span class="check_result check_result_warning" v-else :style="{backgroundColor:'rgb(165, 70, 70)'}"></span>
                <div class="check">
                    <span class="check_value">{{item.sun}}lm</span>
                    <div class="check_num check_sun"  :style="{width:(item.sun/100)*100+'%'}"></div>
                </div>
            </div>
        </div>
    </div>
    <transition name="detail">
        <div class="detail" v-if="detailDisplay" @click.stop>
            <h1 class="detail_title">园区{{thisDetail.index}}</h1>
            <p class="detail_ul_title">环境与数据概况表</p>
            <ul class="detail_ul">
                <!-- <li>
                    <span>蚕总量(万盒)</span>
                    <span>生产的蚕茧数量(t)</span>
                    <span>成活率</span>
                    <span>所占全国蚕茧总量</span>
                    <span>目标达成率</span>
                </li>
                <li>
                    <span>{{thisDetail.total}}万盒</span>
                    <span>{{thisDetail.weight}}吨</span>
                    <span>{{thisDetail.survivalRate}}%</span>
                    <span>{{thisDetail.totalOutputRate}}%</span>
                    <span>{{thisDetail.complianceRate}}%</span>
                </li> -->
                <li style="background: linear-gradient(to right, #5fa6a9 , #9de2ec);">
                    <p>蚕总量(万盒)</p>
                    <p>{{thisDetail.total}}万盒</p>
                </li>
                <li style="background: linear-gradient(to right, #71c68a , #9ac5af);">
                    <p>生产的蚕茧数量(t)</p>
                    <p>{{thisDetail.weight}}吨</p>
                </li>
                <li style="background: linear-gradient(to right, #d1d34b , #eae7a8);">
                    <p>成活率</p>
                    <p>{{thisDetail.survivalRate}}%</p>
                </li>
                <li style="background: linear-gradient(to right, #d4425d , #d56769);">
                    <p>所占全国蚕茧总量</p>
                    <p>{{thisDetail.totalOutputRate}}%</p>
                </li>
                <li style="background: linear-gradient(to right, #6083fb , #7793f0);">
                    <p>目标达成率</p>
                    <p>{{thisDetail.complianceRate}}%</p>
                </li>
            </ul>
            <div class="detail_chart">
                <div class="num_chart">
                    <chart class="chart" ref="temchart" :options="temOption"></chart>
                    <div class="num_control">
                        <p class="control_title">当前平均温度</p>
                        <div class="control">
                            <div class="control_last">-</div>
                            <div class="control_value">
                                <input type="text" class="control_value_input" value="37">
                                <span class="control_value_unit">℃</span>
                            </div>
                            <div class="control_next">+</div>
                        </div>
                    </div>
                </div>
                <div class="num_chart">
                    <chart class="chart" ref="humchart" :options="humOption"></chart>
                    <div class="num_control">
                        <p class="control_title">当前平均湿度</p>
                        <div class="control">
                            <div class="control_last">-</div>
                            <div class="control_value">
                                <input type="text" class="control_value_input" value="37">
                                <span class="control_value_unit">%</span>
                            </div>
                            <div class="control_next">+</div>
                        </div>
                    </div>
                </div>
                <div class="num_chart">
                    <chart class="chart" ref="sunchart" :options="sunOption"></chart>
                    <div class="num_control">
                        <p class="control_title">当前平均光照</p>
                        <div class="control">
                            <div class="control_last">-</div>
                            <div class="control_value">
                                <input type="text" class="control_value_input" value="37">
                                <span class="control_value_unit">lm</span>
                            </div>
                            <div class="control_next">+</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>
<script>
export default {
    data() {
        return {
            detailDisplay:false,
            general:[
                {
                    tem:28,
                    hum:56,
                    sun:77,
                },
                {
                    tem:35,
                    hum:48,
                    sun:47,
                },
                {
                    tem:50,
                    hum:16,
                    sun:28,
                },
                {
                    tem:45,
                    hum:22,
                    sun:7,
                }
            ],
            thisDetail:{},
            detail:[
                {
                    index:1,
                    total:0,
                    weight:0,
                    survivalRate:0,
                    totalOutputRate:0,
                    complianceRate:0,
                    tem:[120, 132, 101, 134, 90, 230, 210],
                    hum:[120, 234, 5, 382, 90, 230, 210],
                    sun:[120, 132, 200, 134, 277, 230, 210]
                },
                {
                    index:2,
                    total:0,
                    weight:0,
                    survivalRate:0,
                    totalOutputRate:0,
                    complianceRate:0,
                    tem:[0, 132, 278, 134, 18, 230, 20],
                    hum:[29, 382, 5, 382, 90, 230, 210],
                    sun:[120, 128, 200, 134, 384, 230, 210]
                },
                {
                    index:3,
                    total:25233,
                    weight:0,
                    survivalRate:0,
                    totalOutputRate:0,
                    complianceRate:0,
                    tem:[120, 29, 101, 134, 129, 230, 210],
                    hum:[120, 234, 5, 382, 90, 333, 210],
                    sun:[120, 294, 200, 184, 277, 230, 210]
                },
                {
                    index:4,
                    total:0,
                    weight:0,
                    survivalRate:0,
                    totalOutputRate:0,
                    complianceRate:0,
                    tem:[120, 382, 101, 134, 90, 230, 210],
                    hum:[120, 234, 5, 382, 90, 728, 210],
                    sun:[120, 132, 200, 134, 739, 230, 210]
                }
            ],
            temOption:{
                title: {
                    left: 'center',
                    text: '温度检测图',
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
                        name:'温度',
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
                                color:'#8ec6ad'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#8ec6ad'
                                }, {
                                    offset: 1,
                                    color: '#ffe'
                                }])
                            }
                        },
                        data:[120, 132, 101, 134, 90, 230, 210]
                    }
                ]
            },
            humOption:{
                title: {
                    left: 'center',
                    text: '湿度检测图',
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
                        name:'湿度',
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
                                color:'#6161ea'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#6161ea'
                                }, {
                                    offset: 1,
                                    color: '#ffe'
                                }])
                            }
                        },
                        data:[120, 132, 101, 134, 90, 230, 210]
                    }
                ]
            },
            sunOption:{
                title: {
                    left: 'center',
                    text: '光照检测图',
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
                        name:'光照强度',
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
                                color:'#b8b874'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#b8b874'
                                }, {
                                    offset: 1,
                                    color: '#ffe'
                                }])
                            }
                        },
                        data:[120, 132, 101, 134, 90, 230, 210]
                    }
                ]
            }
        }
    },
    mounted() {
        this.mockDataChange();
    },
    methods: {
        mockDataChange(){
            setInterval(()=>{
                this.general.forEach(e => {
                    e.tem=parseInt(Math.random()*20+20);
                    e.hum=parseInt(Math.random()*100);
                    e.sun=parseInt(Math.random()*100);
                });
            },1000);
        },
        Detail(i){
            this.detailDisplay=true;
            this.thisDetail=this.detail[i];
            this.temOption.series[0].data=this.thisDetail.tem;
            this.humOption.series[0].data=this.thisDetail.hum;
            this.sunOption.series[0].data=this.thisDetail.sun;
        },
        HiddenDetail(){
            if(this.detailDisplay){
                this.detailDisplay=false;
            }
        }
    },
}
</script>
<style scoped>
@import url('./environment.css');
</style>