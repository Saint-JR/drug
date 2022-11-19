import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import MedChart from '@/pages/MedChart.vue';
import MedLog from '@/pages/MedLog.vue'

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },{
    path: "/chart",
    name: "MedChart",
    component: MedChart,
  },{
    path:'/medicine',
    name:"MedLog",
    component:MedLog
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;