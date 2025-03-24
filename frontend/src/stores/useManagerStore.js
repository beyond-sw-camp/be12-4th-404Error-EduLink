import { defineStore } from "pinia";
import axios from "axios";
// 수강생 등록, 거부
// 수강생 조회 O
// 수강생 제적
// 수업 등록 O
// 강사 등록, 해제 O
// 매니저 추가, 삭제 O
// 출결 관리 O
// 시험 등록 삭제

export const useManagerStore = defineStore("manager", {
  state: () => ({
    managers: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    // 강사 목록 관련 상태 추가
    instructors: [],
    currentInstructorPage: 0,
    totalInstructorPages: 0,
    totalInstructorElements: 0,
    // 학생 목록 관련 상태 추가
    students: [],
    currentStudentPage: 0,
    totalStudentPages: 0,
    totalStudentElements: 0,
    studentInfo: null,
    notices: [],
  }),
  actions: {
    // 수강 신청한 학생들 목록을 가져오는 함수 (페이지네이션 적용)
    async getStudents(page = 0, size = 5) {
      try {
        const response = await axios.get("/api/student/list", {
          params: { page, size },
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          // 실제 학생 목록은 data.content에 있다고 가정
          this.students = data.studentList;
          this.currentStudentPage = data.page;
          this.totalStudentPages = data.totalPages;
          this.totalStudentElements = data.totalElements;
          console.log(data);
        } else {
          console.error("학생 목록 요청 실패:", response.data.message);
        }
      } catch (error) {
        console.error("학생 목록 API 호출 중 오류 발생:", error);
      }
    },

    // 수강 신청한 학생의 상세 정보를 가져오는 함수
    async getStudentInfo(studentIdx) {
      try {
        const response = await axios.get(`학생 상세 정보 url/${studentIdx}`);
        if (response.data.isSuccess) {
          this.studentInfo = response.data.data;
        } else {
          console.error("학생 상세 정보 요청 실패:", response.data.message);
        }
      } catch (error) {
        console.error("학생 상세 정보 API 호출 중 오류 발생:", error);
      }
    },

    // 강사들 목록을 가져오는 함수 
    async getInstructors(page = 0, size = 5) {
      try {
        const response = await axios.get("/api/manager/instructor/list", {
          params: { page, size },
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          // 실제 강사 목록은 data.content에 있다고 가정
          this.instructors = data.content;
          // 페이징 정보 저장
          this.currentInstructorPage = data.currentPage;
          this.totalInstructorPages = data.totalPages;
          this.totalInstructorElements = data.totalElements;
        } else {
          console.error("강사 목록 요청 실패:", response.data.message);
        }
      } catch (error) {
        console.error("강사 목록 API 호출 중 오류 발생:", error);
      }
    },

    // 강사의 상세 정보를 가져오는 함수
    async getInstructorInfo() {
      const response = await axios.get("강사 상세 정보 url/강사idx");
      this.instructorInfo = response.data;
    },

    async getManagers(page = 0, size = 5) {
      try {
        // page와 size를 쿼리 파라미터로 전송
        const response = await axios.get("/api/manager/list", {
          params: { page, size },
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          // 실제 매니저 목록은 data.content에 있음
          this.managers = data.content;
          // 페이징 정보 저장
          this.currentPage = data.currentPage;
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
        } else {
          console.error("API 요청 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    },

    // 매니저의 상세 정보를 가져오는 함수
    async getManagerInfo() {
      const response = await axios.get("매니저 상세 정보 url/매니저idx");
      this.managerInfo = response.data;
    },



    // 출석 목록을 가져오는 함수
    async getAttendances() {
      const response = await axios.get("출석 목록 url");
      this.attendances = response.data;
    },

    // 출석 상세 정보를 가져오는 함수
    async getAttendanceInfo() {
      const response = await axios.get("출석 상세 정보 url/출석idx");
      this.attendanceInfo = response.data;
    },
    // 시험 등록 함수 추가
    async registerTest(testData) {
    try {
      const response = await axios.post("/api/manager/test/register", testData);
      if (response.data.isSuccess) {
        console.log("시험 등록 성공:", response.data.data);
        return response.data.data; // 등록된 시험 데이터 반환
      } else {
        console.error("시험 등록 실패:", response.data.message);
      }
    } catch (error) {
      console.error("시험 등록 API 호출 중 오류 발생:", error);
    }
  },
  

    // 시험 목록을 가져오는 함수
    async getTests() {
      const response = await axios.get("시험 목록 url");
      this.tests = response.data;
    },

    // 시험 상세 정보를 가져오는 함수
    async getTestInfo() {
      const response = await axios.get("시험 상세 정보 url/시험idx");
      this.testInfo = response.data;
    },

    // 최신 공지목록 3개 가져오는 함수ㅡ
    // 최신 공지사항 3개만 가져오는 함수 (페이지네이션 필요 없음)
    async getNotice() {
        try {
          const response = await axios.get("/api/board/list/1", {
            params: { page: 0, size: 3 },
          });
          if (response.data.isSuccess) {
            const data = response.data.data;
            // 실제 공지사항 목록은 data.boardList에 있음
            this.notices = data.boardList;
          } else {
            console.error("공지사항 요청 실패:", response.data);
          }
        } catch (error) {
          console.error("공지사항 API 호출 중 오류 발생:", error);
        }
      },
      
  },
});
