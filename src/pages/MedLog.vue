<template>
    <div class="mainPage">
        <div style="position: relative;">
            <img src="../static/pic3(1).png" style="width: 100%;height: auto;">
            <div style="height: 99%;width: 100%;position: absolute;top: 0;background-color: rgba(0, 0, 0, 0.4);"></div>
            <div class="slogan" :style="{top:sloganTop,opacity:sloganOpa}">
                <div style="display: flex;"><p>查询或提交</p><p style="color: rgb(240, 178, 9);">不良反应</p></div>
                <div style="font-size: 40px;font-weight: 400;letter-spacing: 1px;">我们专注于药品安全</div>
        
            </div>
        </div>

        <div class="content">
            <div style="display: flex;justify-content: center;">
                <p>在这里查询您使用的药物所未登记的</p><p style="color: rgb(240, 178, 9);">不良反应</p>
                <p>，或者提交您在药物使用说明书上未发现的</p><p style="color: rgb(240, 178, 9);">不良反应</p> 
            </div>
            <div style="display: flex;justify-content: center;font-size: 20px;margin-top: 10px;color: rgba(0, 0, 0, 0.4);">*我们将会在收到反馈后的第一时间通知您</div>
        </div>

        <div class="choice">
            <div class="mon">
                <div class="border" :style="{left:borderLeft}"></div>
                <div style="cursor: pointer;" :style="{color:textRGB.rgb[0]}" @click="clickChoice(1)" @mouseover="msOver(1)" @mouseleave="msLeave(1)">查询</div>
                <div style="cursor: pointer;" :style="{color:textRGB.rgb[1]}" @click="clickChoice(2)" @mouseover="msOver(2)" @mouseleave="msLeave(2)">提交</div>
            </div>
            
        </div>
        <div class="query">
            <div class="searchdiv">
                <div class="search">
                    <input type="search"  placeholder="Omeprazole" v-model="input"
                    style="position: absolute;height: 70%;width: 70%;font-size: 35px;outline: none;border: none;letter-spacing: 1px;background-color: rgb(230, 230, 230);">
                    <div class="searchBall" @click="search">
                        <img src="../static/search.png" style="width: 60%;height: 60%;"/>
                    </div>

                </div>
            </div>

            <div class="resultdiv">
                <div class="page">
                    <div class="resultRow" v-for="index of queryList.rowNum" :key="index">
                        <div class="resultcard" v-for="(result,i) in queryList.list.slice(4*(index-1),4*(index))" :key="i">
                            <div class="result">
                                <div class="name">{{result.drugchinesename}}</div>
                                <div class="type">{{result.atccategory}}</div>
                                <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">不良反应症状名称</p></div>
                                <div class="context">{{result.eventchinesename}}</div>
                                <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">不良反应报告次数</p></div>
                                <div class="context">{{result.times}}</div>
                                <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">说明书外不良反应</p></div>
                                <div class="context">{{result.unexpected?result.unexpected:'未知'}}</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="pageNum">
                    <!-- <div v-for="(item,index) in queryList"></div> -->
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
import { onMounted,reactive,ref, toRefs,getCurrentInstance } from 'vue'
export default {
    name:'MegLog',
    setup(){

        const currentInstance = getCurrentInstance()
        const {$http}= currentInstance.appContext.config.globalProperties

        let slogan=reactive({
            top:'55%',
            opa:0
        })
        let textRGB=reactive({rgb:['rgba(240, 178, 9,1)','rgba(0, 0, 0, 0.4)']})
        let borderLeft=ref('0')
        let input=ref('')
        let queryList=reactive({
            currentPage:1,
            rowNum:0,
            list:[],
            totalPage:0,
            pageArr:[]
        })



        let model=1


        const clickChoice=(index)=>{
            if(index==1&&model==2){
                textRGB.rgb[0]='rgba(240, 178, 9,1)'
                textRGB.rgb[1]='rgba(0, 0, 0, 0.4)'
                borderLeft.value='0'
                model=1
            }else if(index==2&&model==1){
                textRGB.rgb[0]='rgba(0, 0, 0, 0.4)'
                textRGB.rgb[1]='rgba(240, 178, 9,1)'
                borderLeft.value='50%'
                model=2
            }
        }

        const msOver=(index)=>{
            if(index==1&&model==2){
                textRGB.rgb[0]='rgba(0, 0, 0, 0.8)'
            }else if(index==2&&model==1){
                textRGB.rgb[1]='rgba(0, 0, 0, 0.8)'
            }
        }

        const msLeave=(index)=>{
            if(index==1&&model==2){
                textRGB.rgb[0]='rgba(0, 0, 0, 0.4)'
            }else if(index==2&&model==1){
                textRGB.rgb[1]='rgba(0, 0, 0, 0.4)'
            }
        }

        const search=()=>{
            $http({
                url:`http://localhost:88/data/data1/search?name=${input.value}&page=1&limit=16`
            }).then((res)=>{
                queryList.currentPage=1
                queryList.list=res.data.page.list
                queryList.totalPage=res.data.page.totalPage
                queryList.rowNum=Math.ceil(queryList.list.length/4)
                console.log(queryList)
            }).catch((err)=>{
                console.log(err)
            })
        }

        const queryResult=(index)=>{
            $http({
                url:`http://localhost:88/data/data1/list?page=${index}&limit=16`
            }).then((res)=>{
                queryList.pageArr=[] //清空
                queryList.currentPage=index
                queryList.list=res.data.page.list
                queryList.totalPage=res.data.page.totalPage
                queryList.rowNum=Math.ceil(queryList.list.length/4)

                let sub=queryList.totalPage-index

                if(index<=4){  //比4小前面没有省略号
                    for (let i=1;i<=index;i++) {
                        queryList.pageArr.push(i)
                    }
                    if(sub<=3){ //差值小于等于3没有省略号
                        for (let i=index+1;i<=queryList.totalPage;i++) {
                            queryList.pageArr.push(i)
                        }
                    }else{  //差值大于3有省略号
                        queryList.pageArr.push(index+1,index+2,0,queryList.totalPage)
                    }
                }else if(index>4) { //比4大前面有省略号
                    queryList.pageArr.push(1,0,index-2,index-1,index)
                    if(sub<=3){ //差值小于等于3没有省略号
                        for (let i=index+1;i<=queryList.totalPage;i++) {
                            queryList.pageArr.push(i)
                        }
                    }else{  //差值大于3有省略号
                        queryList.pageArr.push(index+1,index+2,0,queryList.totalPage)
                    }
                }

                console.log(queryList)
            }).catch((err)=>{
                console.log(err)
            })
        }

        onMounted(()=>{
            setTimeout(()=>{
                slogan.top='35%'
                slogan.opa=1
                // sloganTop.value='35%'
                // sloganOpa.value=1
            },100)

            queryResult(1)
        })

        const {top:sloganTop,opa:sloganOpa}=toRefs(slogan)

        return{
            sloganTop,
            sloganOpa,
            textRGB,
            clickChoice,
            msOver,
            msLeave,
            borderLeft,
            queryList,
            queryResult,
            input,
            search
        }
    }

}
</script>

<style scoped>

    p{
        margin: 0;
    }
    .mainPage{
        width: 100%;
        min-height: 100%;
        /* background-color: rgba(233, 182, 42, 0.219); */
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

    .choice{
        /* position: absolute; */
        /* border: 2px solid red; */
        font-size: 30px;
        font-weight: 900;
        /* color: rgb(240, 178, 9); */
        /* color: rgba(0, 0, 0, 0.4); */
        width: 100%;
        margin-top: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .mon{
        position: relative;
        width: 40%;
        height: 100%;
        border-bottom: 4px solid rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .border{
        position: absolute;
        width: 50%;
        bottom: -4px;
        border-bottom: 4px solid rgb(240, 178, 9);
        transition: all .5s;
    }

    .query{
        margin-top: 80px;
        /* height: 2000px; */
        /* border: 2px solid red; */
    }

    .searchdiv{
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
    }

    .search{
        height: 100%;
        width: 40%;
        background-color: rgb(230, 230, 230);
        border-radius: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .searchBall{
        height: 60px;
        width: 60px;
        border-radius: 60px;
        background-color: white;
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .resultdiv{
        /* border: 2px solid red; */
        margin-top: 80px;
        display: flex;
        justify-content: center;
    }

    .page{
        width: 80%;
        /* border: 2px solid red; */
    }

    .resultRow{
        width: 100%;
        margin-bottom: 80px;
        display: flex;
    }

    .resultcard{
        width: 25%;
        display: flex;
        justify-content: center;

    }

    .result{
        width: 80%;
        height: 400px;
        background-color: rgba(240, 240, 240, 1);
        border-top: 3px solid rgb(240, 178, 9);
        border-bottom: 3px solid rgb(240, 178, 9);
        font-size: 20px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 500;
    }

    /* .result>div{
        margin: 10px;
        margin-top: 20px;
        margin-bottom: 20px;
    } */

    .name{
        color: rgb(240, 178, 9);
        display: flex;
        justify-content: center;
        font-weight: 700;
        font-size: 25px;
        margin-top: 20px;
        margin-bottom: 5px;
    }

    .type{
        color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        font-weight: 400;
        font-size: 15px;
        margin-bottom: 20px;
    }

    .title{
        color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        font-weight: 400;
        font-size: 20px;
        margin-bottom: 10px;
    }

    .context{
        color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 20px;
    }

    .pageNum{
        margin: 30px;
        height: 80px;
        display: flex;
        justify-content: center;
    }

</style>