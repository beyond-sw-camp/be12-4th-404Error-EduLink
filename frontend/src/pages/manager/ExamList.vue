<script setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores/useMemberStore';

const memberStore = useMemberStore();

const examData = ref([
  { id: 1, subject: "데이터베이스", date: "2024-11-30", participants: 26, total: 30 },
  { id: 2, subject: "Linux", date: "2024-12-01", participants: 25, total: 30 },
  { id: 3, subject: "HTML/CSS", date: "2024-12-10", participants: 28, total: 30 },
  { id: 4, subject: "Javascript", date: "2024-12-20", participants: 28, total: 30 },
  { id: 5, subject: "Vue.js", date: "2024-12-30", participants: 25, total: 30 },
]);

const showAddExamForm = ref(false);
const showEditExamForm = ref(false);
const editingExam = ref(null); 

const newExam = ref({
  id: null,
  subject: "",
  date: "",
  link: "",
  participants: 0,
  total: 30,
});

const addExam = () => {
  if (!newExam.value.subject || !newExam.value.date) {
    alert("모든 필드를 입력하세요.");
    return;
  }
  newExam.value.id = examData.value.length + 1; // ID 자동 증가
  examData.value.push({ ...newExam.value });
  resetForm();
  showAddExamForm.value = false;
};

const editExam = () => {
  const index = examData.value.findIndex((exam) => exam.id === editingExam.value.id);
  if (index !== -1) {
    examData.value[index] = { ...editingExam.value };
  }
  resetForm();
  showEditExamForm.value = false;
};

const openEditForm = (exam) => {
  editingExam.value = { ...exam };
  showEditExamForm.value = true;
};

const resetForm = () => {
  newExam.value = { id: null, subject: "", date: "", participants: 0, total: 30 };
};
</script>

<template>
  <div class="xl:pl-60 pt-14 min-h-screen w-full bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <div class="container">
      <div class="exam-list-header">
        <h1>전체 시험 리스트</h1>
        <button v-if="memberStore.role === 'ROLE_MANAGER'" class="add-button" @click="showAddExamForm = true">시험 추가</button>
      </div>
      <div class="exam-card-grid">
        <div v-for="exam in examData" :key="exam.id" class="exam-card">
          <div class="exam-header">
            <h3 class="exam-subject">{{ exam.subject }}</h3>
            <p class="exam-date">시험 날짜: {{ exam.date }}</p>
            <button class="edit-button" @click="openEditForm(exam)">수정</button>
          </div>
          <div class="exam-body">
            <p class="exam-participants">
              참여 인원: {{ exam.participants }} / {{ exam.total }}
            </p>
            <progress
              class="exam-progress"
              :value="exam.participants"
              :max="exam.total"
            ></progress>
          </div>
          <div class="exam-footer">
            <router-link to="/manager/examDetails">
              <button class="exam-button">상세보기</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 추가 모달 -->
    <div v-if="showAddExamForm" class="modal-overlay">
      <div class="modal">
        <h2>새 시험 추가</h2>
        <div class="form-group">
          <label for="subject">과목</label>
          <input id="subject" v-model="newExam.subject" type="text" placeholder="시험 과목" />
        </div>
        <div class="form-group">
          <label for="date">날짜</label>
          <input id="date" v-model="newExam.date" type="date" />
        </div>
        <div class="form-group">
          <label for="link">시험 링크</label>
          <input id="link" v-model="newExam.link" type="text" placeholder="링크" />
        </div>
        <div class="form-actions">
          <button class="submit-button" @click="addExam">추가</button>
          <button class="cancel-button" @click="showAddExamForm = false">취소</button>
        </div>
      </div>
    </div>

    <!-- 수정 모달 -->
    <div v-if="showEditExamForm" class="modal-overlay">
      <div class="modal">
        <h2>시험 수정</h2>
        <div class="form-group">
          <label for="edit-subject">과목</label>
          <input id="edit-subject" v-model="editingExam.subject" type="text" placeholder="시험 과목" />
        </div>
        <div class="form-group">
          <label for="edit-date">날짜</label>
          <input id="edit-date" v-model="editingExam.date" type="date" />
        </div>
        <div class="form-group">
          <label for="edit-link">시험 링크</label>
          <input id="edit-link" v-model="editingExam.link" type="text" placeholder="링크" />
        </div>
        <div class="form-actions">
          <button class="submit-button" @click="editExam">수정</button>
          <button class="cancel-button" @click="showEditExamForm = false">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.exam-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button, .edit-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.add-button:hover, .edit-button:hover {
  background-color: #45a049;
}

.exam-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  position: relative; /* 수정 버튼 위치를 쉽게 조정하기 위해 추가 */
}

.exam-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.add-button:hover {
  background-color: #45a049;
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

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.modal h2 {
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.submit-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-button:hover {
  background-color: #e53935;
}

.exam-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* 시험 카드 */
.exam-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.exam-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 시험 카드 헤더 */
.exam-header {
  padding: 16px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #eee;
}

.exam-subject {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.exam-date {
  font-size: 14px;
  color: #666;
}

/* 시험 카드 본문 */
.exam-body {
  padding: 16px;
}

.exam-participants {
  font-size: 16px;
  color: #444;
  margin-bottom: 8px;
}

.exam-progress {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: #e0e0e0;
  appearance: none;
  overflow: hidden;
}

.exam-progress::-webkit-progress-bar {
  background-color: #e0e0e0;
  border-radius: 4px;
}

.exam-progress::-webkit-progress-value {
  background-color: #4caf50;
  border-radius: 4px;
}

/* 시험 카드 푸터 */
.exam-footer {
  padding: 16px;
  background-color: #f7f7f7;
  text-align: center;
}

.exam-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.exam-button:hover {
  background-color: #45a049;
}
</style>
