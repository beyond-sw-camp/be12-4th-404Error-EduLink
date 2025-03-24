<template>
  <div style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <div class="instructor-list-container">
      <h1 class="page-title">강사 관리</h1>

      <!-- 강사 테이블 -->
      <div class="table-section">
        <div class="table-header">
          <h2 class="table-title">강사 목록</h2>
          <button class="add-button green-button" @click="openRegisterModal">
            + 강사 등록
          </button>
        </div>
        <table class="custom-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>담당중인 수업</th>
              <th>담당 반</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="instructor in instructors" :key="instructor.id" @click="openDetailsModal(instructor)">
              <td>{{ instructor.name }}</td>
              <td>{{ instructor.contact }}</td>
              <td>{{ instructor.email }}</td>
              <td>{{ instructor.currentClasses }}</td>
              <td>{{ instructor.assignedClasses }}</td>
              <td>
                <button @click.stop="showConfirmModal(instructor)" class="delete-button">강사 삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 강사 상세 정보 모달 -->
      <div v-if="selectedInstructor" class="modal-overlay" @click="closeDetailsModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">강사 상세 정보</h3>
            <button class="close-button" @click="closeDetailsModal">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>이름:</strong> {{ selectedInstructor.name }}</p>
            <p><strong>연락처:</strong> {{ selectedInstructor.contact }}</p>
            <p><strong>이메일:</strong> {{ selectedInstructor.email }}</p>
            <p><strong>담당중인 수업:</strong> {{ selectedInstructor.currentClasses }}</p>
            <p><strong>담당 반:</strong> {{ selectedInstructor.assignedClasses }}</p>
            <p><strong>추가 정보:</strong> {{ selectedInstructor.details }}</p>
          </div>
          <div class="modal-footer">
            <button class="close-modal-button" @click="closeDetailsModal">닫기</button>
          </div>
        </div>
      </div>

      <!-- 강사 삭제 확인 모달 -->
      <div v-if="showDeleteConfirmModal" class="modal-overlay" @click="closeDeleteConfirmModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">강사 삭제</h3>
            <button class="close-button" @click="closeDeleteConfirmModal">&times;</button>
          </div>
          <div class="modal-body">
            <p>
              정말로 <strong>{{ instructorToDelete?.name }}</strong> 강사를 삭제하시겠습니까?<br>
            </p>
          </div>
          <div class="modal-footer">
            <button class="delete-button" @click="deleteInstructor(instructorToDelete)">확인</button>
            <button class="close-modal-button" @click="closeDeleteConfirmModal">취소</button>
          </div>
        </div>
      </div>

      <!-- 강사 등록 모달 -->
      <div v-if="showRegisterModal" class="modal-overlay" @click="closeRegisterModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">강사 등록</h3>
            <button class="close-button" @click="closeRegisterModal">&times;</button>
          </div>
          <form @submit.prevent="registerInstructor">
            <div class="modal-body">
              <div class="form-group">
                <label for="name">이름</label>
                <input v-model="newInstructor.name" id="name" type="text" required />
              </div>
              <div class="form-group">
                <label for="contact">연락처</label>
                <input v-model="newInstructor.contact" id="contact" type="text" required />
              </div>
              <div class="form-group">
                <label for="email">이메일</label>
                <input v-model="newInstructor.email" id="email" type="email" required />
              </div>
              <div class="form-group">
                <label for="classes">담당 수업</label>
                <input v-model="newInstructor.currentClasses" id="classes" type="text" required />
              </div>
              <div class="form-group">
                <label for="assigned-classes">담당 반</label>
                <input v-model="newInstructor.assignedClasses" id="assigned-classes" type="text" required />
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="submit-button">등록</button>
              <button type="button" class="close-modal-button" @click="closeRegisterModal">취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      instructors: [
        {
          id: 1,
          name: "이강사",
          contact: "010-1234-5678",
          email: "instructor1@example.com",
          currentClasses: "프로그래밍 기초",
          assignedClasses: "A반",
          details: "프로그래밍 기초 수업 강사",
        },
        {
          id: 2,
          name: "박강사",
          contact: "010-5678-1234",
          email: "instructor2@example.com",
          currentClasses: "웹 개발 입문",
          assignedClasses: "B반",
          details: "웹 개발 입문 수업 강사",
        },
        {
          id: 3,
          name: "김강사",
          contact: "010-5234-1234",
          email: "instructor3@example.com",
          currentClasses: "데이터 베이스 기초",
          assignedClasses: "C반",
          details: "MariaDB로 배우는 데이터 베이스 기초",
        },
        {
          id: 4,
          name: "최강사",
          contact: "010-5678-4124",
          email: "instructor4@example.com",
          currentClasses: "리눅스 기초",
          assignedClasses: "D반",
          details: "Ubuntu로 배우는 리눅스 기초 명령어",
        },
        {
          id: 5,
          name: "오강사",
          contact: "010-4128-5224",
          email: "instructor5@example.com",
          currentClasses: "백엔드 개발 입문",
          assignedClasses: "E반",
          details: "자바로 배우는 백엔드 개발 기초",
        },
      ],
      selectedInstructor: null,
      showRegisterModal: false,
      newInstructor: {
        name: "",
        contact: "",
        email: "",
        currentClasses: "",
        assignedClasses: "",
      },
      showDeleteConfirmModal: false,
      instructorToDelete: null,
    };
  },
  methods: {
    openDetailsModal(instructor) {
      this.selectedInstructor = instructor;
    },
    closeDetailsModal() {
      this.selectedInstructor = null;
    },
    openRegisterModal() {
      this.showRegisterModal = true;
    },
    closeRegisterModal() {
      this.showRegisterModal = false;
    },
    registerInstructor() {
      this.instructors.push({
        ...this.newInstructor,
        id: Date.now(),
        details: "새로 등록된 강사",
      });
      this.newInstructor = {
        name: "",
        contact: "",
        email: "",
        currentClasses: "",
        assignedClasses: "",
      };
      this.closeRegisterModal();
    },
    showConfirmModal(instructor) {
      this.instructorToDelete = instructor;
      this.showDeleteConfirmModal = true;
    },
    closeDeleteConfirmModal() {
      this.instructorToDelete = null;
      this.showDeleteConfirmModal = false;
    },
    deleteInstructor(instructor) {
      this.instructors = this.instructors.filter((i) => i.id !== instructor.id);
      this.closeDeleteConfirmModal();
      alert(`${instructor.name} 강사를 삭제했습니다.`);
    },
  },
};
</script>

<style scoped>
/* 공통 스타일 */
.instructor-list-container {
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

.delete-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  background-color: #e74c3c;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c0392b;
}

/* Input 스타일 수정 */
.form-group label {
  display: block;
  margin-bottom: 8px; /* Label과 Input 간격 추가 */
  font-weight: bold;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ccc; /* Input 테두리 명확하게 추가 */
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s ease-in-out;
}

/* Input에 포커스 시 스타일 */
.form-group input:focus {
  border-color: #4caf50; /* 포커스 시 초록색 테두리 */
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.4); /* 포커스 시 테두리 강조 */
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
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #f7f7f7;
  border-top: 1px solid #ddd;
}

.submit-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}

.close-modal-button {
  padding: 8px 16px;
  background-color: #ddd;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.close-modal-button:hover {
  background-color: #fff;
}

/* 강사 등록 버튼 스타일 */
.green-button {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;
}

.green-button:hover {
  background-color: #45a049;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

</style>

