import { defineStore } from "pinia";
import axios from "axios";

export const useInstructorStore = defineStore('instructor', {
    state: () => ({
        board_res: [],
        boardByUser_res: [],
        hw_res: [],
        dt_res: [],
        student_res: [],
        studentDetail_res: [],
        delete_res: [],
        detail_res: [],
        course_res: [],
        curr_res: []
    }),
    actions: {
        async fetchBoard(boardType, page = 0, size = 5) {
            const response = await axios.get(`/api/board/listByUser/${boardType}?page=${page}&size=${size}`);
            this.board_res = response.data;
        },
        async fetchBoardByUser(userIdx, boardType, page = 0, size = 5) {
            const response = await axios.get(`/api/board/listByUserIdx/${boardType}?userIdx=${userIdx}&page=${page}&size=${size}`);
            this.boardByUser_res = response.data;
        },
        async fetchHw(page = 0, size = 5) {
            const response = await axios.get(`/api/board/listByUser/4?page=${page}&size=${size}`);
            this.hw_res = response.data;
        },
        async fetchDt(page = 0, size = 5) {
            const response = await axios.get(`/api/board/listByUser/3?page=${page}&size=${size}`);
            this.dt_res = response.data;
        },
        async fetchStudent() {
            const response = await axios.get('/api/student/list?page=0&size=8');
            this.student_res = response.data;
        },
        async fetchStudentDetail(studentIdx) {
            const response = await axios.get(`/api/student/read/${studentIdx}`);
            this.studentDetail_res = response.data;
        },
        async fetchDelete(boardIdx) {
            const response = await axios.delete(`/api/board/delete/${boardIdx}`);
            this.delete_res = response.data;
        },
        async fetchDetail(boardIdx) {
            const response = await axios.get(`/api/board/read/${boardIdx}`);
            this.detail_res = response.data;
        },
        async fetchCourse(generation) {
            const response = await axios.get(`/api/course/${generation}`);
            this.course_res = response.data;
        },
        async fetchCurr(subject) {
            const response = await axios.get(`/api/course/curriculumRe?subject=${subject}`);
            this.curr_res = response.data;
        },
        async fetchRegisterCurr(curr_info) {
            const response = await axios.post(`/api/curriculum/register`, curr_info);
            return response.data;
        }
    }
});