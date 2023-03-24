<template>
    <div class="page"  :style="{filter:`blur(${blur})`}">
    
        <div class="home">
            <img src="../static/pic.png" />
        </div>

        
        <div class="mon" :style="{top:top}">
            <div class="text1"><p>药物</p><p style="color:rgb(240, 178, 9);margin-left: 50px;">安全</p></div>
            <div class="text2"><p>关乎</p><p style="color:rgb(240, 178, 9);margin-left: 50px;">你我</p></div>
            <img src="../static/logo.png" style="position: absolute;top: 25%;right: 15%;height: 400px;">
            <div class="search">
                
                <input type="search" v-model="text"  :placeholder="placeholder" style="position: absolute;height: 70%;width: 70%;font-size: 45px;outline: none;border: none;letter-spacing: 1px;">
                <div class="searchBall" :style="{right:serchright,transform:`scale(${scale})`}">
                    <img src="../static/search.png" style="width: 60%;height: 60%;cursor: pointer;" @click="search"/>
                </div>
                
            </div>
        </div>

    </div>
    
</template>

<script>
import { ref } from 'vue'
import {  onMounted, watch } from '@vue/runtime-core'
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {store} from '@/store/index'
    export default {
        name:'HomePage',
        setup(){
            let isLogin=ref(store.isLogin)
            watch(
                ()=>store.clickLogin,
                (val)=>{
                    
                    if(val){
                        console.log(123)
                        clickLogin()
                    }else{
                        closeLogin()
                    }
                },
                {
                    deep:true
                }
            )


            let top=ref('-100%')
            let placeholder=ref('')
            let serchright=ref('10px')
            let scale=ref('1')
            let blur=ref('0')

            const clickLogin=()=>{
                blur.value='10px'
            }

            const closeLogin=()=>{
                blur.value='0'
            }


            let text=ref('')
            const router = useRouter()
            const search=()=>{
                router.push({ 
                    path:'/medicine', 
                    query: { 
                        mainSearch:text.value
                    }
                })
            }

            onMounted(()=>{
                setTimeout(()=>{
                    top.value='0'
                    setTimeout(()=>{
                        let count=0
                        let interval=setInterval(()=>{
                            if(count==0)
                                placeholder.value+='A'
                            else if(count==1)
                                placeholder.value+='m'
                            else if(count==2)
                                placeholder.value+='o'
                            else if(count==3)
                                placeholder.value+='x'
                            else if(count==4)
                                placeholder.value+='i'
                            else if(count==5)
                                placeholder.value+='c'
                            else if(count==6)
                                placeholder.value+='i'
                            else if(count==7)
                                placeholder.value+='l'
                            else if(count==8)
                                placeholder.value+='l'
                            else if(count==9)
                                placeholder.value+='i'
                            else if(count==10)
                                placeholder.value+='n'
                            else{
                                clearInterval(interval)
                                serchright.value='530px'
                                setTimeout(()=>{
                                    scale.value=0.5
                                    setTimeout(()=>{
                                        scale.value=1
                                    },300)
                                },750)
                            }
                            count++
                        },100)
                    },500)
                    
                },500)
            })

            

            return{
                top,
                placeholder,
                serchright,
                scale,
                isLogin,
                blur,
                clickLogin,
                closeLogin,
                search,
                text
            }
        }
    }
</script>

<style scoped>
    p{
        margin: 0;
    }

    .page{
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: all 1s;

    }

    .home{
        width: 100%;
        height: 100%;
    }

    .home > img{
        height: 100%;
        width: auto;
    }

    .mon{
        /* opacity: 0.6; */
        /* top: 0; */
        position: absolute;
        background-color: rgba(216, 118, 25, 0.85);
        width: 100%;
        height: 80%;
        font-size: 100px;
        font-weight: 900;
        letter-spacing: 2px;
        color: white;
        overflow: hidden;
        transition: all 1s;
    }

    .text1{
        position: relative;
        top: 20%;
        left: 10%;
        pointer-events: none;
        display: flex;
    }

    .text2{
        position: relative;
        top: 20%;
        left: 10%;
        margin-top: 50px;
        margin-left: 100px;
        pointer-events: none;
        display: flex;
    }

    .search{
        position: relative;
        top: 20%;
        left: 10%;
        width: 600px;
        height: 80px;
        border-radius: 40px;
        background-color: white;
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .searchBall{
        height: 60px;
        width: 60px;
        border-radius: 60px;
        background-color: rgb(200, 200, 200);
        position: absolute;
        top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: right .8s , transform .3s;
    }
</style>