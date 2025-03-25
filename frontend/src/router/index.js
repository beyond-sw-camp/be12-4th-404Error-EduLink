import { createRouter, createWebHistory } from 'vue-router'
import { useMemberStore } from '@/stores/useMemberStore'

import LoginForm from '../pages/LoginForm.vue';

import Aside from '../pages/Aside.vue';
import FormsView from '../pages/FormsView.vue';
import SignupForm from '../pages/SignupForm.vue';

import UserinfoForm from '../pages/UserInformation.vue'; import { h } from 'vue';
import Studentdashboard from '../pages/Student/Studentdashboard.vue';
import BootcampInfo from '../pages/Student/BootcampInfo.vue';
import ManagerDashboard from '../pages/manager/ManagerDashboard.vue';
import StudentList from '../pages/manager/StudentList.vue';
import InstructorList from '../pages/manager/InstructorList.vue';
import ManagerList from '../pages/manager/ManagerList.vue';
import AttendanceManage from '../pages/manager/AttendanceManage.vue';

import InstructorDash from '../pages/Instructor/InstructorDash.vue';
import RegistCur from '../pages/Instructor/RegistCur.vue';

import ExamList from '../pages/manager/ExamList.vue';
import ExamDetails from '../pages/manager/ExamDetails.vue';
import LeaveRequest from '../pages/manager/LeaveRequest.vue';


import InstStudInform from '../pages/Instructor/InstStudInform.vue';
import StudentAside from '../pages/Student/StudentAside.vue';
import bootcampList from '../pages/bootcampList.vue';



import bbboard from '../pages/board/bbboard.vue';
import notice from '../pages/board/notice.vue';
import freeboard from '../pages/board/freeboard.vue';
import managerboard from '../pages/board/managerboard.vue';
import bbnoticeboard from '../pages/board/bbnoticeboard.vue';
import boardform from '../pages/board/boardform.vue';
import deleteboard from '../pages/board/deleteboard.vue';
import project from '../pages/board/project.vue';
import data from '../pages/board/data.vue';
import question from '../pages/board/question.vue';


import common from '../pages/commondashboard.vue';
import test from '../pages/test/Test.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/a', component: FormsView },
        { path: '/', component: LoginForm, meta: { hideAside: true, hideNav: true } },
        { path: '/Signup', component: SignupForm, meta: { hideAside: true, hideNav: true } },
        {
            path: '/studentdashboard',
            component: Studentdashboard,

            meta: { asideComponent: StudentAside, hideAside: false, requiresAuth: true }, // StudentAside를 항상 사용
        },

        { path: '/userinfo', component: UserinfoForm, meta: { requiresAuth: true }  },
        { path: '/inst/dashboard', component: InstructorDash, meta: { requiresAuth: true }  },
        { path: '/inst/studinform', component: InstStudInform, meta: { requiresAuth: true }  },
        { path: '/inst/studinform/:userIdx', component: InstStudInform, meta: { requiresAuth: true }  },
        { path: '/inst/registercur', component: RegistCur, meta: { requiresAuth: true }  },
        { path: '/inst/registercur/:courseIdx', component: RegistCur, meta: { requiresAuth: true }  },
        { path: '/manager/dashboard', component: ManagerDashboard, meta: { requiresAuth: true }  },
        { path: '/manager/studentList', component: StudentList, meta: { requiresAuth: true }  },
        { path: '/manager/instructorList', component: InstructorList, meta: { requiresAuth: true }  },
        { path: '/manager/managerList', component: ManagerList, meta: { requiresAuth: true }  },

        { path: '/manager/attendanceManage', component: AttendanceManage, meta: { requiresAuth: true }  },

        { path: '/manager/examList', component: ExamList, meta: { requiresAuth: true }  },
        { path: '/manager/examDetails', component: ExamDetails, meta: { requiresAuth: true }  },

        { path: '/manager/attendanceManage', component: AttendanceManage, meta: { requiresAuth: true }  },
        { path: '/manager/leave-request', component: LeaveRequest, meta: { requiresAuth: true }  },

        { path: '/bootcamp', component: bootcampList, meta: { requiresAuth: true }  },
        { path: '/board/comment/register', component: bbboard, meta: { requiresAuth: true }  , name: 'BoardComments'},
        { path: '/board/bbnoticeboard', component: bbnoticeboard, meta: { requiresAuth: true }  },
        { path: '/board/register', component: boardform, name:'boardregister', meta: { requiresAuth: true }  },
        { path: '/board/deleteboard', component: deleteboard, meta: { requiresAuth: true }  },
        { path: '/board/freeboard', component: freeboard, meta: { requiresAuth: true }  },
        { path: '/board/managerboard', component: managerboard, meta: { requiresAuth: true }  },
        { path: '/board/notice', component: notice, meta: { requiresAuth: true }  },
        { path: '/board/project', component: project, meta: { requiresAuth: true }  },


        { path: '/board/data', component: data, meta: { requiresAuth: true }  },

        { path: '/board/question', component: question, meta: { requiresAuth: true }  },

        { path: '/common', component: common, meta: { requiresAuth: true }  },
        { path: '/bootcampInfo', component: BootcampInfo, meta: { asideComponent: StudentAside,requiresAuth: true }  },
        { path: '/test', component: test, meta: { requiresAuth: true }},
        // { path: '/c', component: Create },
        // { path: '/d', component: Signup },
        // { path: '/e', component: Login },
        // { path: '/f', component: Create },
        // { path: '/g', component: Signup }

    ]
});

router.beforeEach((to, from, next) => {
    const memberStore = useMemberStore();

    if (to.meta.requiresAuth && !memberStore.token) {
        next({ path: '/' });
    } else {
        next();
    }
});

export default router;