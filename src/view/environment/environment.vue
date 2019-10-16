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
                <li>
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
                </li>
            </ul>
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
                    tem:[],
                    hum:[],
                    sun:[]
                },
                {
                    index:2,
                    total:0,
                    weight:0,
                    survivalRate:0,
                    totalOutputRate:0,
                    complianceRate:0,
                    tem:[],
                    hum:[],
                    sun:[]
                },
                {
                    index:3,
                    total:25233,
                    weight:0,
                    survivalRate:0,
                    totalOutputRate:0,
                    complianceRate:0,
                    tem:[],
                    hum:[],
                    sun:[]
                },
                {
                    index:4,
                    total:0,
                    weight:0,
                    survivalRate:0,
                    totalOutputRate:0,
                    complianceRate:0,
                    tem:[],
                    hum:[],
                    sun:[]
                }
            ]
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