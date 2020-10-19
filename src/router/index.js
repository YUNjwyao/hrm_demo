import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue"
import Face from "../components/Face/Face.vue"
import Home from "../components/Home.vue"
import Users from '../components/user.vue'
import UpdateUser from '../components/showUpdateUser.vue'
import AddUser from '../components/showAddUser.vue'
import AddDept from '../components/showAddDept.vue'
import UpdateDept from '../components/showUpdateDept.vue'
import AddJob from '../components/showAddJob.vue'
import UpdateJob from '../components/showUpdateJob.vue'
import EmployeeQuery from "../components/Employee/EmployeeQuery.vue";
import ShowAddEmployee from "../components/Employee/ShowAddEmployee.vue";
import ShowUpdateEmployee from "../components/Employee/ShowUpdateEmployee.vue";
import Notice from "../components/Notice/Notice.vue";
import UpdateNotice from "../components/Notice/ShowUpdateNotice.vue";
import AddNotice from "../components/Notice/ShowAddNotice.vue";
import Document from "../components/Document/Document.vue";
import UpdateDocument from "../components/Document/ShowUpdateDocument.vue";
import AddDocument from "../components/Document/ShowAddDocument.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: '/login',component: Login
  },
  { 
    path: '/home',
    component: Home,
    children: [
  {
    path: '/face',component: Face
  },
  {
    path: "/employee",
    component: EmployeeQuery,
  },
  {
    path: "/addEmployee",
    component: ShowAddEmployee,
  },
  {
    path: "/updateEmployee",
    component: ShowUpdateEmployee,
  },
  {
    path: "/notice",
    component: Notice,
  },
  {
    path: "/updateNotice",
    component: UpdateNotice,
  },
  {
    path: "/addNotice",
    component: AddNotice,
  },
  {
    path: "/document",
    component: Document,
  },
  {
    path: "/updateDocument",
    component: UpdateDocument,
  },
  {
    path: "/addDocument",
    component: AddDocument,
  },
  { path: '/users', component: Users },
      { path: '/updateuser', component: UpdateUser },
      { path: '/adduser', component: AddUser },
      { path: '/adddept', component: AddDept },
      { path: '/updatedept', component: UpdateDept },
      { path: '/updatejob', component: UpdateJob },
      { path: '/addjob', component: AddJob }
]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
