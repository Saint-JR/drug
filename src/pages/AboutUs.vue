<template>
    <div style="min-height: 100%;"> 
        <!-- <div class="background"></div> -->
        <div style="position: relative;">
            <img src="../static/pic4.png" style="width: 100%;height: auto;">
            <div style="height: 99%;width: 100%;position: absolute;top: 0;background-color: rgba(0, 0, 0, 0.4);"></div>
            <div class="slogan" :style="{top:sloganTop,opacity:sloganOpa}">
                <div style="display: flex;"><p>关于</p><p style="color: rgb(240, 178, 9);">我们</p></div>
                <div style="font-size: 40px;font-weight: 400;letter-spacing: 1px;">我们团队的信息</div>
        
            </div>
        </div>

        <div class="content">
            <div style="display: flex;justify-content: center;">
                <p>在这里你可以查看我们团队的</p><p style="color: rgb(240, 178, 9);">所有信息</p>
                <!-- <p>，或者提交您在药物使用说明书上未发现的</p><p style="color: rgb(240, 178, 9);">不良反应</p>  -->
            </div>
            <div style="display: flex;justify-content: center;font-size: 20px;margin-top: 10px;color: rgba(0, 0, 0, 0.4);">*所有后续成员将会陆续添加</div>
        </div>

        <div style="margin-top: 80px;margin-bottom: 100px;display: flex;justify-content: center;">
            <div style="width: 60%;">
                <div class="title"><p>我们是谁？</p></div>
                <div class="text">
                    <p>团队成员：</p>团队成员共三人，均为四川大学计算机学院2020级本科生。团队具有较强技术实践能力与丰富成果转化经验，
                    团队成员荣膺数学建模/计算机程序设计/商业策划/通信技术成果转化等多项省国级荣誉。
                    <br/><br/>
                    <p>指导老师：</p>吴斌，四川大学华西药学院临床药学与药事管理学系兼职教师，现为四川大学华西医院副主任药师。
                    主要社会/学术任职：中国药理学会药源性疾病专业学委员会第三届药源性疾病防治联盟专家、
                    中国中西医结合学会临床药理与毒理专业委员会青年委员、
                    中国老年保健医学研究会老年合理用药分会青年委员等。研究方向：循证药学；药物应用评价研究。
                </div>
                <div class="title"><p>我们的目标？</p></div>
                <div class="text">
                    团队以2023届全国大学生计算机设计大赛省国级赛事为主要目标，可能衍生的成果如下：
                    “中国软件杯”大学生软件设计大赛、全国大学生信息安全竞赛、微信小程序应用开发赛、全国高校计算机能力挑战赛等国内顶级计算机能力赛事。
                    <br/><br/>
                    参加此类赛事，除了需要较强的计算机技术实践能力之外，对项目本身的社会意义、
                    应用场景等均有较高的需求。本项目立足于医药民生，并具有成熟的数据支撑与广泛的应用场景，在此类赛事中极具竞争力。
                </div>
                <div class="title"><p>我们的工作？</p></div>
                <div class="text">
                    <p>数据处理与分析。</p>团队具备数学建模竞赛经验与数据挖掘领域经验，持有建模大赛国家级奖项，具有较为深厚的知识储备。<br/><br/>
                    <p>项目成果转化。</p>本团队将基于医药项目研发一系列web、软件、小程序，并进行响应的数据库优化。
                </div>
                <div class="title"><p>我们的需求</p></div>
                <div class="text">
                    本团队将基于贵项目组提供的理论知识进行工程实现。故恳请贵项目组指导老师担当本团队指导老师之一，
                    希望获得贵项目组的数据集、应用成果，以进行前文提及竞赛范围内的软件开发项目，并作为项目的医学理论支持、应用场景背书。<br/><br/>
                    本团队成员可不占用贵项目组大创名额，如贵项目组有应用本团队成果参与互赛、挑战杯等竞赛的需求，本团队可提供软件开发技术支持人员以作成果背书。
                    
                </div>
                <div class="title"><p>我们对后续工作的设想</p></div>
                <div class="text">
                    本团队预计于学期结束后进行深度作品开发，目标是在春季学期前获得高度成熟的，基于医药项目提供的数据集与应用场景的web应用软件
                    （以下简称“软件”）。软件以实现应用场景需求为目标，以展示本团队成员技术储备为手段，提供一系列的业务支持。
                    设想业务示例如下：云端高并发数据库集群搭建与高可用增删改查实现、药品不良事件全库搜索（模糊搜索/精确搜索）、
                    用户亲历药品不良事件在线反馈、基于数据集信息的可视化界面搭建、用药医师与受药患者的信息登记与追踪溯源等等。
                    当然，本团队尚未与贵项目组深入交流，此类业务设想并非专业，后续可根据贵项目组需求提供对应业务实现。贵项目组的专业建议将会是我们十分珍贵的理论支撑。
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {reactive,toRefs,onMounted} from 'vue'
    let slogan=reactive({
        top:'55%',
        opa:0
    })
    onMounted(()=>{
        document.documentElement.scrollTop = 0;
        setTimeout(()=>{
            slogan.top='35%'
            slogan.opa=1
        },100)
    })
    const {top:sloganTop,opa:sloganOpa}=toRefs(slogan)
</script>

<style scoped>
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
        font-weight: 700;
        font-size: 30px;
        letter-spacing: 2px;
        color: rgba(0, 0, 0, 0.5);
        display: flex;
        margin-bottom: 40px;
    }

    .title>p{
        margin-bottom: 8px;
        border-bottom: 5px solid rgb(240, 178, 9);
    }

    .text{
        font-size: 25px;
        letter-spacing: 1px;
        color: rgba(0, 0, 0, 0.5);
        margin-bottom: 80px;
    }

    .text>p{
        font-weight: 700;
        color: rgb(240, 178, 9);
        display: inline;
    }
</style>