<template>
    <div class="mainPage">
        <div style="position: relative;">
            <img src="../static/pic2.png" style="width: 100%;height: auto;">
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
                    <div class="searchBall" @click="search(false)">
                        <img src="../static/search.png" style="width: 60%;height: 60%;"/>
                    </div>

                </div>
                <div class="searchAll" @click="search(true)">搜索全部药物</div>
            </div>

            <div class="resultdiv">
                <div class="page">
                    <div class="resultRow" v-for="index of queryList.rowNum" :key="index">
                        <div class="resultcard" v-for="(result,i) in queryList.list.slice(4*(index-1),4*(index))" :key="i">
                            <div  @click="rotateCard(index,i)" :class="rotateBool.arr[4*(index-1)+i]?'result rotate180':'result rotate0'">
                                <div class="back">
                                    <div class="title" style="margin-top: 50px;"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">药物总报告次数</p></div>
                                    <div class="context">{{result.total}}</div>

                                    <div style="display: flex;justify-content: space-around;">
                                        <div style="display: flex;flex-direction: column;align-items: center;">
                                            <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">ROR值</p></div>
                                            <div class="context">{{result.rorvalue.toFixed(1)}}</div>
                                        </div>
                                        <div style="display: flex;flex-direction: column;align-items: center;">
                                            <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">上限</p></div>
                                            <div class="context">{{result.rorupperlimit.toFixed(1)}}</div>
                                        </div>
                                        <div style="display: flex;flex-direction: column;align-items: center;">
                                            <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">下限</p></div>
                                            <div class="context">{{result.rorlowerlimit.toFixed(1)}}</div>
                                        </div>
                                    </div>
                                    
                                    <div style="display: flex;justify-content: space-around;">
                                        <div style="display: flex;flex-direction: column;align-items: center;">
                                            <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">IC值</p></div>
                                    <div class="context">{{result.icvalue.toFixed(1)}}</div>
                                        </div>
                                        <div style="display: flex;flex-direction: column;align-items: center;">
                                            <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">上限</p></div>
                                            <div class="context">{{result.icupperlimit.toFixed(1)}}</div>
                                        </div>
                                        <div style="display: flex;flex-direction: column;align-items: center;">
                                            <div class="title"><p style="border-bottom: 3px solid rgba(0, 0, 0, 0.4);">下限</p></div>
                                            <div class="context">{{result.iclowerlimit.toFixed(1)}}</div>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                </div>
                                <div :class="rotateBool.arr[4*(index-1)+i]?'front zindex':'front'">
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
                    
                </div>
                <div class="pageNum">
                    <div v-for="(item,index) in queryList.pageArr" :key="index" :class="item!=0?(item==queryList.currentPage?'selected':'pageItem'):'ellipse'" @click="changePage(item)">
                        {{item!=0?item:'...'}}
                    </div>
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
        
        let queryList=reactive({
            currentPage:1,
            rowNum:0,
            list:[],
            totalPage:0,
            pageArr:[]
        })


        let model=1 //选择查询还是提交

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


        let input=ref('')   //双向绑定input value
        let searchText=''   //再点下搜索键后才将input值赋给searchText
        let isPartial=false //是否查询药名（也即部分查询）
        const search=(all)=>{
            if(all){
                isPartial=false
            }else{
                isPartial=true
                searchText=input.value
                console.log(searchText)
            }
            queryResult(1)
        }

        const queryResult=(index)=>{
            $http({
                url:`http://localhost:3000/data/data1/${isPartial?`search?name=${searchText}&`:'list?'}page=${index}&limit=16`
            }).then((res)=>{
                queryList.pageArr=[] //清空
                queryList.currentPage=index
                queryList.list=res.data.page.list
                queryList.totalPage=res.data.page.totalPage
                queryList.rowNum=Math.ceil(queryList.list.length/4)

                rotateBool.arr=new Array(queryList.list.length).fill(false)
                console.log(rotateBool)
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

                
            }).catch((err)=>{
                console.log(err)
            })
        }

        const changePage=(index)=>{
            if(index!=0&&index!=queryList.currentPage){
                queryResult(index)
            }
        }

        let rotateBool=reactive({
            arr:[]
        })
        const rotateCard=(row,column)=>{
            let bool=rotateBool.arr[4*(row-1)+column]
            rotateBool.arr.fill(false)
            rotateBool.arr[4*(row-1)+column]=!bool
        }

        onMounted(()=>{
            document.documentElement.scrollTop = 0;
            setTimeout(()=>{
                slogan.top='35%'
                slogan.opa=1
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
            search,
            changePage,
            rotateCard,
            rotateBool
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

    .searchAll{
        position: absolute;
        right: 15%;
        color: rgba(0, 0, 0, 0.4);
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 2px;
        border-bottom: 4px solid rgb(240, 178, 9);
        cursor: pointer;
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
        align-items: center;
        flex-direction: column;
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
        height: 400px;
        position: relative;
        perspective: 1000px;
    }

    .result{
        width: 80%;
        height: 400px;
        transform-origin: center center -150px;
        font-size: 20px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 500;
        cursor: pointer;
        position: absolute;
        transition: transform 0.6s cubic-bezier(.47,-0.42,.53,1.4),scale 0.5s;
        /* perspective: 1000px; */
        transform-style:preserve-3d
    }

    .result:hover{
        /* border-left: 3px solid rgb(240, 178, 9);
        border-right: 3px solid rgb(240, 178, 9); */
        scale: 1.1;
    }

    .rotate0{
        transform: rotateY(0deg);
    }

    .rotate180{
        transform: rotateY(-90deg);
    }

    .front{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(240, 240, 240, 1);
        border-top: 3px solid rgb(240, 178, 9);
        border-bottom: 3px solid rgb(240, 178, 9);
        z-index: 3;
    }

    .zindex{
        z-index: 1;
    }

    .back{
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(240, 240, 240, 1);
        border-top: 3px solid rgb(240, 178, 9);
        border-bottom: 3px solid rgb(240, 178, 9);
        transform: rotateY(90deg);
        transform-origin: center center -150px;
    }

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
        margin: 20px;
        margin-top: 0;
    }

    .pageNum{
        margin: 30px;
        margin-top: 0;
        height: 80px;
        display: flex;
        justify-content: center;
    }

    .pageItem,.selected,.ellipse{
        height: 40px;
        width: 40px;
        margin: 20px;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.6);
    }

    .pageItem{
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .pageItem:hover{
        background-color: rgba(0, 0, 0, 0.3);
    }

    .selected{
        background-color: rgb(240, 178, 9);
        color: white;
        cursor: pointer;
    }
</style>