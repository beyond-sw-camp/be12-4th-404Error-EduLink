import { defineStore } from 'pinia';
import axios from 'axios';

export const useStudentStore = defineStore('student', {
  state: () => ({
    curriculum: [],
    get_Student: {
        
          idx: null,
          address: '',
          testStatus: false,
          perception: 0,
          attendance: 0,
          leaveEarly: 0,
          outing: 0,
          vacationLeft: 0
      },
      examData : []
   }),
  actions: {
    async get_dashboard() {
      try {
        const response = await axios.get(`/api/student/getStudentcheck`, {
          withCredentials: true
        });
        
        this.get_Student = response.data.data; 
        
        console.log("대시보드 데이터:", this.get_Student);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    },

    async get_curriculum(subject) {

        const encodedSubject = encodeURIComponent(subject);  // subject 값을 URL 인코딩
        console.log('encodedSubject:', encodedSubject);
        try {
          const response = await axios.get(`/api/course/curriculum?subject=${encodedSubject}`, {

            withCredentials: true
          });
          this.curriculum = response.data.data;   
          console.log('Curriculum data:', this.curriculum);
        } catch (error) {
          console.error('Error fetching curriculum:', error);
        }
      }


      ,async attendanceCheck(actions) {
        try{
            axios.post(`/api/attend/update/batch/${actions}`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
                .then(response => {
                  console.log('응답 데이터:', response.data);
                })
                .catch(error => {
                  console.error('에러 발생:', error.response ? error.response.data : error.message);
                });
        }catch (error) {

      }

     



      
  }
}
});