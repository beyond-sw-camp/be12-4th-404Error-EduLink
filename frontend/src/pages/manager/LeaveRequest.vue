<template>
  <div
    style="background-color: whitesmoke"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
  >
    <div style="margin-top: 30px" class="leave-request-management">
      <h1 class="page-title">휴가 / 병가 / 예비군 처리</h1>

      <!-- 탭 -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: selectedTab === tab }"
          @click="selectedTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <!-- 신청 목록 -->
      <table class="custom-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>신청 유형</th>
            <th>신청 날짜</th>
            <th>처리 상태</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="request in filteredRequests"
            :key="request.id"
            @click="openModal(request)"
          >
            <td>{{ request.name }}</td>
            <td>{{ request.type }}</td>
            <td>{{ request.date }}</td>
            <td>{{ request.status }}</td>
          </tr>
        </tbody>
      </table>

      <!-- 모달 -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close-button" @click="closeModal">×</button>
          <h3 class="modal-title">{{ selectedRequest.name }}의 신청</h3>
          <p><strong>신청 유형:</strong> {{ selectedRequest.type }}</p>
          <p><strong>신청 날짜:</strong> {{ selectedRequest.date }}</p>
          <p><strong>사유:</strong> {{ selectedRequest.reason }}</p>
          <div v-if="selectedRequest.file">
            <strong>첨부파일:</strong>
            <a
              :href="selectedRequest.file"
              target="_blank"
              rel="noopener noreferrer"
            >
              첨부파일 열기
            </a>
          </div>
          <div
            v-if="selectedRequest.status === '대기 중'"
            class="modal-actions"
          >
            <textarea
              v-model="actionReason"
              placeholder="사유를 작성해주세요."
            ></textarea>
            <div class="button-group">
              <button class="approve-button" @click="processRequest('승인됨')">
                승인
              </button>
              <button class="reject-button" @click="processRequest('거부됨')">
                거부
              </button>
            </div>
          </div>

          <div v-else>
            <p><strong>처리 결과:</strong> {{ selectedRequest.status }}</p>
            <p>
              <strong>처리 사유:</strong> {{ selectedRequest.processReason }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: ["대기 중", "처리 완료"],
      selectedTab: "대기 중",
      leaveRequests: [
        {
          id: 1,
          name: "학생01",
          type: "휴가",
          date: "2024-12-10",
          status: "대기 중",
          reason: "가족 여행으로 인해 휴가 신청합니다.",
          file: "https://example.com/attachment1.pdf",
        },
        {
          id: 2,
          name: "학생02",
          type: "병가",
          date: "2024-12-11",
          status: "대기 중",
          reason: "병원 진료 예약으로 병가 신청합니다.",
          file: "https://example.com/attachment2.pdf",
        },
        {
          id: 3,
          name: "학생03",
          type: "예비군",
          date: "2024-12-12",
          status: "승인됨",
          processReason: "예비군 훈련 증빙 확인.",
          reason: "예비군 훈련으로 인해 신청합니다.",
          file: null,
        },
        {
          id: 4,
          name: "학생04",
          type: "휴가",
          date: "2024-12-13",
          status: "거부됨",
          processReason: "요청 사유 불충분.",
          reason: "개인 사유로 신청.",
          file: null,
        },
      ],
      showModal: false,
      selectedRequest: null,
      actionReason: "",
    };
  },
  computed: {
    filteredRequests() {
      return this.leaveRequests.filter(
        (request) =>
          (this.selectedTab === "대기 중" && request.status === "대기 중") ||
          (this.selectedTab === "처리 완료" &&
            (request.status === "승인됨" || request.status === "거부됨"))
      );
    },
  },
  methods: {
    openModal(request) {
      this.selectedRequest = request;
      this.showModal = true;
      this.actionReason = "";
    },
    closeModal() {
      this.showModal = false;
      this.selectedRequest = null;
    },
    processRequest(status) {
      if (!this.actionReason.trim()) {
        alert("사유를 작성해주세요.");
        return;
      }
      this.selectedRequest.status = status;
      this.selectedRequest.processReason = this.actionReason;
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* 기본 스타일 */
.leave-request-management {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #343a40;
}

.tabs {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.tabs button {
  flex: 1;
  padding: 12px;
  border: none;
  background-color: #e9ecef;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.tabs button.active {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
}

.tabs button:hover {
  background-color: #adb5bd;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-table th,
.custom-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
}

.custom-table th {
  background-color: #f1f3f5;
  font-weight: bold;
  color: #495057;
}

.custom-table tbody tr:hover {
  background-color: #e9ecef;
  cursor: pointer;
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
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-actions {
  margin-top: 20px;
}

.modal-actions textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

/* X 버튼 */
.modal-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #6c757d;
  cursor: pointer;
}

.modal-close-button:hover {
  color: #343a40;
}

.approve-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #28a745; /* 초록색 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.approve-button:hover {
  background-color: #218838; /* 더 어두운 초록색 */
}

.reject-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #dc3545; /* 빨간색 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.reject-button:hover {
  background-color: #c82333; /* 더 어두운 빨간색 */
}
</style>
