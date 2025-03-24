<template>
  <div
    style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
  >
    <div style="margin-top: 30px;" class="student-list-container">
      <h1 class="page-title">학생 관리</h1>

      <!-- 수강 신청한 학생 테이블 -->
      <div class="table-section">
        <h2 class="table-title">수강 신청한 학생</h2>
        <table class="custom-table">
          <thead>
            <tr>
              <th>학생 이름</th>
              <th>연락처</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in appliedStudents" :key="student.id">
              <td>{{ student.name }}</td>
              <td>{{ student.contact }}</td>
              <td>
                <button @click.stop="showConfirmModal('approve', student)" class="approve-button">승인</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 현재 수강 중인 학생 테이블 -->
      <div class="table-section">
        <h2 class="table-title">현재 수강 중인 학생</h2>
        <table class="custom-table">
          <thead>
            <tr>
              <th>학생 이름</th>
              <th>연락처</th>
              <th>출석률</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in currentStudents" :key="student.id" @click="openModal(student)">
              <td>{{ student.name }}</td>
              <td>{{ student.contact }}</td>
              <td>{{ student.attendanceRate }}</td>
              <td>
                <button @click.stop="showConfirmModal('expel', student)" class="expel-button">제적 처리</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 학생 상세 정보 모달 -->
      <div v-if="selectedStudent" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">학생 상세 정보</h3>
            <button class="close-button" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>이름:</strong> {{ selectedStudent.name }}</p>
            <p><strong>생년월일:</strong> {{ selectedStudent.birthDate }}</p>
            <p><strong>이메일:</strong> {{ selectedStudent.email }}</p>
            <p><strong>연락처:</strong> {{ selectedStudent.contact }}</p>
            <p><strong>출석률:</strong> {{ selectedStudent.attendanceRate }}</p>
            <p><strong>전체 출석일:</strong> {{ selectedStudent.totalAttendanceDays }}</p>
            <p><strong>현재 출석일:</strong> {{ selectedStudent.currentAttendanceDays }}</p>
            <p><strong>결석일:</strong> {{ selectedStudent.absentDays }}</p>
            <p><strong>남은 휴가 수:</strong> {{ selectedStudent.remainingLeaves }}</p>
          </div>
          <div class="modal-footer">
            <button class="close-modal-button" @click="closeModal">닫기</button>
          </div>
        </div>
      </div>

      <!-- 확인 모달 -->
      <div v-if="confirmModal.visible" class="modal-overlay" @click="closeConfirmModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">확인</h3>
            <button class="close-button" @click="closeConfirmModal">&times;</button>
          </div>
          <div style="text-align: center;" class="modal-body">
            <p>
              정말로 <strong>{{ confirmModal.student.name }}</strong> 님의 {{ confirmModal.action === 'approve' ? '수강신청을 승인' : '제적 처리를 승인' }} 하시겠습니까?<br>
            </p>
          </div>
          <div class="modal-footer">
            <button class="approve-button" @click="confirmAction">확인</button>
            <button class="close-modal-button" @click="closeConfirmModal">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";

const currentStudents = ref([
  { id: 1, name: "학생01", email: "student01@example.com", contact: "010-1234-5678", birthDate: "1995-01-01", attendanceRate: "92%", totalAttendanceDays: 30, currentAttendanceDays: 27, absentDays: 2, remainingLeaves: 1 },
  { id: 2, name: "학생02", email: "student02@example.com", contact: "010-5678-1234", birthDate: "1996-02-13", attendanceRate: "85%", totalAttendanceDays: 30, currentAttendanceDays: 24, absentDays: 3, remainingLeaves: 0 },
  { id: 3, name: "학생03", email: "student03@example.com", contact: "010-8765-4321", birthDate: "1997-03-25", attendanceRate: "90%", totalAttendanceDays: 30, currentAttendanceDays: 26, absentDays: 1, remainingLeaves: 2 },
  { id: 4, name: "학생04", email: "student04@example.com", contact: "010-2345-6789", birthDate: "1994-07-11", attendanceRate: "87%", totalAttendanceDays: 30, currentAttendanceDays: 25, absentDays: 2, remainingLeaves: 1 },
  { id: 5, name: "학생05", email: "student05@example.com", contact: "010-8765-4321", birthDate: "1992-12-09", attendanceRate: "93%", totalAttendanceDays: 30, currentAttendanceDays: 28, absentDays: 1, remainingLeaves: 0 },
  { id: 6, name: "학생06", email: "student06@example.com", contact: "010-3333-4444", birthDate: "1998-01-29", attendanceRate: "95%", totalAttendanceDays: 30, currentAttendanceDays: 28, absentDays: 0, remainingLeaves: 2 },
  { id: 7, name: "학생07", email: "student07@example.com", contact: "010-5555-6666", birthDate: "1993-06-22", attendanceRate: "82%", totalAttendanceDays: 30, currentAttendanceDays: 23, absentDays: 2, remainingLeaves: 1 },
  { id: 8, name: "학생08", email: "student08@example.com", contact: "010-7777-8888", birthDate: "1999-11-14", attendanceRate: "88%", totalAttendanceDays: 30, currentAttendanceDays: 26, absentDays: 3, remainingLeaves: 0 },
  { id: 9, name: "학생09", email: "student09@example.com", contact: "010-9999-0000", birthDate: "1990-04-17", attendanceRate: "90%", totalAttendanceDays: 30, currentAttendanceDays: 27, absentDays: 2, remainingLeaves: 1 },
  { id: 10, name: "학생10", email: "student10@example.com", contact: "010-1111-2222", birthDate: "1996-02-23", attendanceRate: "89%", totalAttendanceDays: 30, currentAttendanceDays: 25, absentDays: 1, remainingLeaves: 2 },
  { id: 11, name: "학생11", email: "student11@example.com", contact: "010-5656-7878", birthDate: "1998-07-07", attendanceRate: "86%", totalAttendanceDays: 30, currentAttendanceDays: 24, absentDays: 3, remainingLeaves: 1 },
  { id: 12, name: "학생12", email: "student12@example.com", contact: "010-9898-7676", birthDate: "1992-08-19", attendanceRate: "83%", totalAttendanceDays: 30, currentAttendanceDays: 22, absentDays: 2, remainingLeaves: 0 },
  { id: 13, name: "학생13", email: "student13@example.com", contact: "010-3434-5656", birthDate: "1997-03-08", attendanceRate: "85%", totalAttendanceDays: 30, currentAttendanceDays: 23, absentDays: 3, remainingLeaves: 2 },
  { id: 14, name: "학생14", email: "student14@example.com", contact: "010-7878-9898", birthDate: "1995-12-25", attendanceRate: "88%", totalAttendanceDays: 30, currentAttendanceDays: 26, absentDays: 1, remainingLeaves: 1 },
  { id: 15, name: "학생15", email: "student15@example.com", contact: "010-1231-5678", birthDate: "1999-01-11", attendanceRate: "80%", totalAttendanceDays: 30, currentAttendanceDays: 21, absentDays: 3, remainingLeaves: 0 },
  { id: 16, name: "학생16", email: "student16@example.com", contact: "010-5672-8910", birthDate: "1994-09-05", attendanceRate: "95%", totalAttendanceDays: 30, currentAttendanceDays: 28, absentDays: 0, remainingLeaves: 1 },
  { id: 17, name: "학생17", email: "student17@example.com", contact: "010-0987-1234", birthDate: "1990-10-03", attendanceRate: "78%", totalAttendanceDays: 30, currentAttendanceDays: 20, absentDays: 2, remainingLeaves: 2 },
  { id: 18, name: "학생18", email: "student18@example.com", contact: "010-4567-8901", birthDate: "1993-11-16", attendanceRate: "87%", totalAttendanceDays: 30, currentAttendanceDays: 26, absentDays: 1, remainingLeaves: 1 },
  { id: 19, name: "학생19", email: "student19@example.com", contact: "010-7890-1234", birthDate: "1995-05-20", attendanceRate: "85%", totalAttendanceDays: 30, currentAttendanceDays: 25, absentDays: 2, remainingLeaves: 0 },
  { id: 20, name: "학생20", email: "student20@example.com", contact: "010-1010-2020", birthDate: "1991-12-12", attendanceRate: "88%", totalAttendanceDays: 30, currentAttendanceDays: 26, absentDays: 2, remainingLeaves: 1 },
  { id: 21, name: "학생21", email: "student21@example.com", contact: "010-3030-4040", birthDate: "1997-01-25", attendanceRate: "93%", totalAttendanceDays: 30, currentAttendanceDays: 28, absentDays: 0, remainingLeaves: 0 },
  { id: 22, name: "학생22", email: "student22@example.com", contact: "010-5050-6060", birthDate: "1996-02-15", attendanceRate: "89%", totalAttendanceDays: 30, currentAttendanceDays: 26, absentDays: 2, remainingLeaves: 2 },
  { id: 23, name: "학생23", email: "student23@example.com", contact: "010-7070-8080", birthDate: "1994-03-27", attendanceRate: "82%", totalAttendanceDays: 30, currentAttendanceDays: 22, absentDays: 3, remainingLeaves: 1 },
  { id: 24, name: "학생24", email: "student24@example.com", contact: "010-9090-0101", birthDate: "1999-10-14", attendanceRate: "91%", totalAttendanceDays: 30, currentAttendanceDays: 27, absentDays: 1, remainingLeaves: 0 },
  { id: 25, name: "학생25", email: "student25@example.com", contact: "010-2121-3232", birthDate: "1993-07-18", attendanceRate: "85%", totalAttendanceDays: 30, currentAttendanceDays: 24, absentDays: 2, remainingLeaves: 2 },
  { id: 26, name: "학생26", email: "student26@example.com", contact: "010-4343-5454", birthDate: "1992-08-30", attendanceRate: "86%", totalAttendanceDays: 30, currentAttendanceDays: 25, absentDays: 3, remainingLeaves: 1 },
]); // 기존 데이터
const appliedStudents = ref([
        { id: 4, name: "학생27", contact: "010-9876-5432" },
        { id: 5, name: "학생28", contact: "010-1234-8765" },
      ]); // 기존 데이터

      const selectedStudent = ref(null);
const confirmModal = ref({
  visible: false,
  action: "",
  student: null,
});

const openModal = (student) => {
  selectedStudent.value = student;
};

const closeModal = () => {
  selectedStudent.value = null;
};

const showConfirmModal = (action, student) => {
  confirmModal.value = { visible: true, action, student };
};

const closeConfirmModal = () => {
  confirmModal.value = { visible: false, action: "", student: null };
};

const confirmAction = () => {
  const { action, student } = confirmModal.value;
  if (action === "approve") {
    currentStudents.value.push({
      ...student,
      attendanceRate: "0%",
      totalAttendanceDays: 0,
      currentAttendanceDays: 0,
      absentDays: 0,
      remainingLeaves: 0,
    });
    appliedStudents.value = appliedStudents.value.filter((s) => s.id !== student.id);
    alert(`${student.name} 학생의 수강 신청이 승인되었습니다.`);
  } else if (action === "expel") {
    currentStudents.value = currentStudents.value.filter((s) => s.id !== student.id);
    alert(`${student.name} 학생이 제적 처리되었습니다.`);
  }
  closeConfirmModal();
};
</script>


<style scoped>
/* 공통 스타일 */
.student-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #444;
}

.table-section {
  margin-bottom: 40px;
}

.table-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #555;
}

/* 테이블 스타일 */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.custom-table th, .custom-table td {
  text-align: center;
  padding: 12px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
}

.custom-table th {
  background-color: #f7f7f7;
  font-weight: bold;
}

.custom-table tr:hover {
  background-color: #f9f9f9;
}

.custom-table tr {
  cursor: pointer;
}

.expel-button, .approve-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}

.expel-button {
  background-color: #e74c3c;
}

.approve-button {
  background-color: #2ecc71;
}

.expel-button:hover {
  background-color: #c0392b;
}

.approve-button:hover {
  background-color: #27ae60;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #555;
  cursor: pointer;
}

.close-button:hover {
  color: #000;
}

.modal-body {
  padding: 16px;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

.modal-footer {
  padding: 16px;
  text-align: right;
  background-color: #f7f7f7;
  border-top: 1px solid #ddd;
 
  display: flex;
  justify-content: space-between;
  padding: 16px;

}

.close-modal-button {
  padding: 8px 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.close-modal-button:hover {
  background-color: #2980b9;
}
</style>
