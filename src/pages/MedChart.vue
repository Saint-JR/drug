<template>
    <div style="min-height: 100%;"> 
        <!-- <div class="background"></div> -->
        <div style="position: relative;">
            <img src="../static/pic3.png" style="width: 100%;height: auto;">
            <div style="height: 99%;width: 100%;position: absolute;top: 0;background-color: rgba(0, 0, 0, 0.4);"></div>
            <div class="slogan" :style="{top:sloganTop,opacity:sloganOpa}">
                <div style="display: flex;"><p>不良反应</p><p style="color: rgb(240, 178, 9);">图表</p></div>
                <div style="font-size: 40px;font-weight: 400;letter-spacing: 1px;">可视化不良反应程度</div>
        
            </div>
        </div>

        <div class="content">
            <div style="display: flex;justify-content: center;">
                <p>在这里查看所有登记的不良反应</p><p style="color: rgb(240, 178, 9);">可视化图表</p>
                <!-- <p>，或者提交您在药物使用说明书上未发现的</p><p style="color: rgb(240, 178, 9);">不良反应</p>  -->
            </div>
            <div style="display: flex;justify-content: center;font-size: 20px;margin-top: 10px;color: rgba(0, 0, 0, 0.4);">*记录不良反应后我们将会第一时间登记</div>
        </div>

        <div class="title">不良反应症状<p style="color: rgb(240, 178, 9);">词云</p></div>
        <div ref="wordCloud" style="width: 100%;height: 800px;position: relative;top: 20px;display: flex;justify-content: center;align-items: center;">
            <rotate-loader color="rgb(240, 178, 9)"></rotate-loader>
        </div>
        <div style="display: flex;justify-content: center;width: 100%;">
            <div style="display: flex;width: 70%;justify-content: space-around;align-items: center;">
                <div class="title">男女性报告时间-年龄
                    <p style="color: rgb(240, 178, 9);">散点图</p>
                    <div style="position: absolute;border: 4px solid rgb(240, 178, 9);bottom: -10px;transition: width 5s linear;" 
                    :style="{width:`${100-borderLength}%`,opacity:borderOpa}"></div>
                </div>
                <div class="title">男女性平均报告年龄
                    <p style="color: rgb(240, 178, 9);">柱状图</p>
                    <div style="position: absolute;border: 4px solid rgb(240, 178, 9);bottom: -10px;transition: width 5s linear;" 
                    :style="{width:`${borderLength}%`,opacity:1-borderOpa}"></div>
                </div>
            </div>
            
        </div>
        
        <div ref="scatterBar" style="width: 100%;height: 800px;position: relative;top: 80px;"></div>
        <!-- <div style="position: relative;bottom: 5%;" @click="change">Change</div> -->
        
    </div>
</template>

<script>
import * as echarts from "echarts";
import 'echarts-wordcloud';
import RotateLoader from 'vue-spinner/src/RotateLoader.vue'
import {getCurrentInstance, onUnmounted,reactive,toRefs} from 'vue'
import {ref,onMounted} from 'vue'
export default {
    name:'MedChart',
    components:{
        RotateLoader
    },
    setup(){
        
        const currentInstance = getCurrentInstance()
        const {$http}= currentInstance.appContext.config.globalProperties

        const wordCloud=ref()
        const scatterBar=ref()
        let slogan=reactive({
            top:'55%',
            opa:0
        })
        
        // let myChart;

        function wordcloud(){
            let myChart=echarts.init(wordCloud.value)

            $http({
                url:'http://localhost:3000/data/list1/list?page=1&limit=500',
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
                        sizeRange: [12, 100], // 最小字体和最大字体 必须写一个范围不能直接写sizeRange: 14，
                        rotationRange: [0,90], // 字体旋转角度的范围，这里水平
                        rotationStep:45,
                        width:'90%',
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
        let borderLength=ref(0)
        let borderOpa=ref(1)

        function scatter(){

            
            let myChart=echarts.init(scatterBar.value)
            $http({
                url:'http://localhost:3000/data/data2/getFemaleData'
            }).then((response)=>{
                const femaleData=response.data.data.list

                const averageFemale=response.data.data.avgAge

                $http({
                    url:'http://localhost:3000/data/data2/getMaleData'
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
                                    color: '#A7D691',
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
                                    color: '#758AC8',
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

                                    // color: ['#A7D691','#758AC8']
                                    color: function (params){
                                        var colorList = ['#A7D691','#758AC8'];
                                        return colorList[params.dataIndex];
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
                        borderLength.value=borderLength.value==100?0:100
                        borderOpa.value=borderOpa.value==1?0:1
                    }, 5000);
                    // myChart.setOption(currentOption, true);
                    borderLength.value=100
                    option && myChart.setOption(option);

                    
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }


        // let bool=false

        // function change(){
        //     if(bool)
        //         scatter()
        //     else{
        //         clearInterval(interval)
        //         wordcloud()
        //     } 
        //     bool=!bool
        // }


        onMounted(()=>{
            document.documentElement.scrollTop = 0;
            // myChart=echarts.init(main.value)
            setTimeout(()=>{
                wordcloud()
            },5000)
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
            wordCloud,
            scatterBar,
            borderLength,
            borderOpa
            // main,
            // change
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

    .content{
        
        font-weight: 400;
        font-size: 30px;
        letter-spacing: 2px;
        margin-top: 50px;

        color: rgba(0, 0, 0, 0.61);
    }

    .title{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: rgba(0, 0, 0, 0.4);
        font-weight: 700;
        margin-top: 100px;
        position: relative;

    }
</style>