<template>
    <div style="min-height: 100%;"> 
        <!-- <div class="background"></div> -->
        <div style="position: relative;">
            <img src="../static/pic3(1).png" style="width: 100%;height: auto;">
            <div style="height: 99%;width: 100%;position: absolute;top: 0;background-color: rgba(0, 0, 0, 0.4);"></div>
            <div class="slogan" :style="{top:sloganTop,opacity:sloganOpa}">
                <div style="display: flex;"><p>查询或提交</p><p style="color: rgb(240, 178, 9);">不良反应</p></div>
                <div style="font-size: 40px;font-weight: 400;letter-spacing: 1px;">我们专注于药品安全</div>
        
            </div>
        </div>

        <div ref="main" style="width: 100%;height: 800px;position: relative;top: 80px;border: 2px solid red;">

        </div>
        <div style="position: relative;bottom: 5%;" @click="change">Change</div>
        
    </div>
</template>

<script>
import * as echarts from "echarts";
import 'echarts-wordcloud';
import {getCurrentInstance, onUnmounted,reactive,toRefs} from 'vue'
import {ref,onMounted} from 'vue'
export default {
    name:'MedChart',
    setup(){
        
        const currentInstance = getCurrentInstance()
        const {$http}= currentInstance.appContext.config.globalProperties

        const main=ref()
        let slogan=reactive({
            top:'55%',
            opa:0
        })
        
        let myChart;

        function wordcloud(){
            // let myChart=echarts.init(main.value)
            myChart.clear()
            $http({
                url:'http://120.24.194.69:88/data/list1/list?page=1&limit=500',
            }).then((res)=>{
                let data=res.data.page.list

                var option = {
                    // title: {
                    //     text: '不良反应'
                    // },
                    tooltip: {},
                    // legend: {},
                    xAxis: {
                        axisLine: {
                            show: false,//不显示坐标轴线
                        },
                        axisLabel: {
                            show: false,//不显示坐标轴上的文字
                        },
                        splitLine:{
                            show:false//不显示网格线
                        },
                    },
                    yAxis: {
                        axisLine: {
                            show: false,//不显示坐标轴线
                        },
                        axisLabel: {
                            show: false,//不显示坐标轴上的文字
                        },
                        splitLine:{
                            show:false//不显示网格线
                        },
                    },
                    series: [{
                        name: '不良反应症状',
                        type: 'wordCloud',
                        gridSize: 5, // 字之间的间隔大小
                        // sizeRange: [12, 50], // 最小字体和最大字体
                        sizeRange: [12, 100], // 最小字体和最大字体 必须写一个范围不能直接写sizeRange: 14，
                        rotationRange: [0,90], // 字体旋转角度的范围，这里水平
                        rotationStep:45,
                        width:'80%',
                        height:'90%',
                        shape: 'smooth', // 形状

                        textStyle: {
                            color: function() {
                                return `rgb(${[
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    ].join(',')})`;
                            },
                        },
                        data: data
                    }]
                };

                myChart.setOption(option);

            }).catch((err)=>{
                console.log(err)
            })
        }


        let interval;

        function scatter(){
            myChart.clear()
            // let myChart=echarts.init(main.value)
            $http({
                url:'http://120.24.194.69:88/data/data2/getFemaleData'
            }).then((response)=>{
                const femaleData=response.data.data.list

                const averageFemale=response.data.data.avgAge

                $http({
                    url:'http://120.24.194.69:88/data/data2/getMaleData'
                }).then((res)=>{
                    console.log(res)
                    const maleData=res.data.data.list

                    const averageMale=res.data.data.avgAge
                    
                    var option;

                    const scatterOption = (option = {
                        xAxis: {
                            scale: true,
                            type:'time',
                            // min:'2009'
                        },
                        yAxis: {
                            scale: true
                        },
                        series: [
                            {
                                type: 'scatter',
                                id: 'female',
                                dataGroupId: 'female',
                                universalTransition: {
                                    enabled: true,
                                    delay: function () {
                                        return Math.random() * 400;
                                    }
                                },
                                itemStyle:{
                                    normal: {
                                        color: '#A7D691',
                                    }
                                },
                                data: femaleData
                            },
                            {
                                type: 'scatter',
                                id: 'male',
                                dataGroupId: 'male',
                                universalTransition: {
                                    enabled: true,
                                    delay: function () {
                                        return Math.random() * 400;
                                    }
                                },
                                itemStyle:{
                                    normal: {
                                        color: '#758AC8',
                                    }
                                },
                                data: maleData
                            }
                        ]
                    });
                    const barOption = {
                        xAxis: {
                            type: 'category',
                            data: ['Female', 'Male']
                        },
                        yAxis: {},
                        series: [
                            {
                                type: 'bar',
                                id: 'total',
                                data: [
                                    {
                                        value: averageMale,
                                        groupId: 'male'
                                    },
                                    {
                                        value: averageFemale,
                                        groupId: 'female'
                                    }
                                ],
                                itemStyle: {
                                    normal: {
                                        // color: ['#A7D691','#758AC8']
                                        color: function (params){
                                            var colorList = ['#A7D691','#758AC8'];
                                            return colorList[params.dataIndex];
                                        }
                                    }
                                    
                                },

                                universalTransition: {
                                    enabled: true,
                                    seriesKey: ['female', 'male'],
                                    delay: function () {
                                        return Math.random() * 400;
                                    }
                                }
                            }
                        ]
                    };
                    let currentOption = scatterOption;
                    interval=setInterval(function () {
                        currentOption = currentOption === scatterOption ? barOption : scatterOption;
                        myChart.setOption(currentOption, true);
                    }, 5000);
                    // myChart.setOption(currentOption, true);

                    option && myChart.setOption(option);

                    
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }


        let bool=false

        function change(){
            if(bool)
                scatter()
            else{
                clearInterval(interval)
                wordcloud()
            } 
            bool=!bool
        }


        onMounted(()=>{
            myChart=echarts.init(main.value)
            scatter()
            setTimeout(()=>{
                slogan.top='35%'
                slogan.opa=1
                // sloganTop.value='35%'
                // sloganOpa.value=1
            },100)
        })

        onUnmounted(()=>{
            clearInterval(interval)
        })

        const {top:sloganTop,opa:sloganOpa}=toRefs(slogan)

        return{
            sloganTop,
            sloganOpa,
            main,
            change
        }
    }
}
</script>

<style scoped>
    /* .background{
        position: absolute;
        width: 100%;
        height: 2000px;
        filter: blur(10px);
        overflow: hidden;
        background-color: rgba(233, 182, 42, 0.219);;
    } */

    p{
        margin: 0;
    }

    .slogan{
        position: absolute;
        left: 10%;
        font-weight: 900;
        font-size: 80px;
        letter-spacing: 5px;
        color: white;
        transition: all 1s;
        /* display: flex;
        justify-content: center;
        align-items: center; */
    }
</style>