<template>
    <div class="navi">
        <div class="sma_mon" :style="{left:left}">
            <img src="../static/login.png" @click="clickLogin"/>
            <div>
                <router-link to="/" class="homebutton">Home</router-link>
                <router-link to="/chart" class="chart">Chart</router-link>
                <router-link to="/medicine" class="medicine">Medicine</router-link>
                <div class="about">AboutUs</div>
            </div>

        </div>
        <div class="brand" :style="{right:left}">
            <div>
                <div class="brandIcon"></div>
                <div>MGS</div>
            </div>

        </div>
    </div>

    <div style="width: 100%;display: flex;justify-content: center;position: fixed;transition: all 1s;height: 680px;" :style="{top:loginTop}">
        <div v-if="!isLogin" class="login">
            <img src="../static/close.png" @click="closeLogin">
            <div class="loginBrand">
                    <div></div>
                    <div>MGS</div>
            </div>
            <div class="input">
                <div>
                    <input placeholder="Username">
                </div>
                <div>
                    <input placeholder="Password">
                </div>
            </div>
            <div style="display: flex;justify-content: center;align-items: center;font-size: 40px;color: rgba(0,0,0,0.6);font-weight: 700;letter-spacing: 2px;">
                <p style="padding-bottom: 10px;border-bottom: 5px solid rgb(240, 178, 9);cursor: pointer;">登录</p>
            </div>
        </div>
    </div>
    
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import {store} from '@/store/index'
export default {
    name:'MainNavi',
    setup(){
        let isLogin=ref(store.isLogin)
        let left=ref('-100%')
        let loginTop=ref('-100%')

        const clickLogin=()=>{
            store.clickLogin=true
            loginTop.value='15%'
        }

        const closeLogin=()=>{
            store.clickLogin=false
            loginTop.value='-100%'
        }

        onMounted(()=>{
            setTimeout(()=>{
                left.value='0'
            },500)
        })
        
        return{
            left,
            isLogin,
            clickLogin,
            closeLogin,
            loginTop
        }
    }
}
</script>

<style scoped>
    p{
        margin: 0;
    }

    .navi{
        position: fixed;
        top: 50px;
        height: 80px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        /* align-items: flex-start;
        border: 2px solid red; */
    
    }

    .brand{
        position: relative;
        width: 15%;
        height: 100%;
        background-color: rgb(240, 178, 9);
        display: flex;
        align-items: center;
        /* justify-content: center; */
        transition: all 1s;
    }

    .brand>div{
        /* margin-left: 20px;
        margin-top: 5px; */
        font-size: 35px;
        font-weight: 900;
        color: white;
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .brandIcon{
        height: 25px;
        width: 25px;
        border-radius: 25px;
        border: 10px solid white;
        margin-right: 10px;
    }

    .sma_mon{
        position: relative;
        height: 100%;
        width: 80%;
        background-color: rgba(30, 30, 30,0.4);
        transition: all 1s;
        font-size: 40px;
        font-weight: 900;
        display: flex;
        align-items: center;
        /* justify-content: center; */

    }

    .sma_mon>img{
        position: absolute;
        height: 60px;
        width: 60px;
        top: 10px;
        right: 70px;
        cursor: pointer;
    }

    .sma_mon > div{
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        left: 200px;
    }

    .homebutton,.chart,.medicine,.about{
        text-decoration-line: none;
        cursor: pointer;
        color: white;
    }

    .homebutton:hover,.chart:hover,.medicine:hover,.about:hover{
        color: rgb(240, 178, 9);
    }

    .login{
        width: 30%;
        height: 100%;
        border-radius: 50px;
        position: relative;
        transition: all 1s;
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(240, 178, 9,0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
    
    }

    .login>img{
        height: 40px;
        width: 40px;
        position: absolute;
        right: 50px;
        top: 30px;
        cursor: pointer;
    }

    .loginBrand{
        width: 200px;
        height: 80px;
        background-color: rgb(240, 178, 9);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        font-weight: 900;
        color: white;
    }

    .loginBrand:nth-child(1){
        height: 25px;
        width: 25px;
        border-radius: 25px;
        border: 10px solid white;
        margin-right: 10px;
    }

    .input{
        width: 100%;
        height: 50%;
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
    }

    .input>div{
        background-color: white;
        height: 80px;
        width: 70%;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .input>div>input{
        height: 60px;
        width: 80%;
        font-size: 35px;
        font-weight: 700;
        outline: none;
        border: none;
    }
</style>