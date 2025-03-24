<template>
  <div style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <div class="manager-list-container">
      <h1 class="page-title">매니저 관리</h1>
      
      <!-- 매니저 테이블 -->
      <div class="table-section">
        <div class="table-header">
          <h2 class="table-title">매니저 목록</h2>
          <button class="add-button" @click="openRegisterModal">
            + 매니저 등록
          </button>
        </div>
        <table class="custom-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>담당 반</th>
              <th>권한 여부</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="manager in managers" :key="manager.id" @click="openDetailsModal(manager)">
              <td>{{ manager.name }}</td>
              <td>{{ manager.contact }}</td>
              <td>{{ manager.email }}</td>
              <td>{{ manager.assignedClasses }}</td>
              <td>
                <button
                  :class="['permission-button', manager.permission ? 'enabled' : 'disabled']"
                  @click.stop="togglePermission(manager)"
                >
                  {{ manager.permission ? "Yes" : "No" }}
                </button>
              </td>
              <td>
                <button @click.stop="showDeleteConfirmModal(manager)" class="delete-button">매니저 삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 매니저 상세 정보 모달 -->
      <div v-if="selectedManager" class="modal-overlay" @click="closeDetailsModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">매니저 상세 정보</h3>
            <button class="close-button" @click="closeDetailsModal">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>이름:</strong> {{ selectedManager.name }}</p>
            <p><strong>연락처:</strong> {{ selectedManager.contact }}</p>
            <p><strong>이메일:</strong> {{ selectedManager.email }}</p>
            <p><strong>담당 반:</strong> {{ selectedManager.assignedClasses }}</p>
            <p><strong>권한 여부:</strong> {{ selectedManager.permission ? "Yes" : "No" }}</p>
          </div>
          <div class="modal-footer">
            <button class="close-modal-button" @click="closeDetailsModal">닫기</button>
          </div>
        </div>
      </div>

      <!-- 매니저 등록 모달 -->
      <div v-if="showRegisterModal" class="modal-overlay" @click="closeRegisterModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">매니저 등록</h3>
            <button class="close-button" @click="closeRegisterModal">&times;</button>
          </div>
          <form @submit.prevent="registerManager">
            <div class="modal-body">
              <div class="form-group">
                <label for="name">이름</label>
                <input v-model="newManager.name" id="name" type="text" required />
              </div>
              <div class="form-group">
                <label for="contact">연락처</label>
                <input v-model="newManager.contact" id="contact" type="text" required />
              </div>
              <div class="form-group">
                <label for="email">이메일</label>
                <input v-model="newManager.email" id="email" type="email" required />
              </div>
              <div class="form-group">
                <label for="assigned-classes">담당 반</label>
                <input v-model="newManager.assignedClasses" id="assigned-classes" type="text" required />
              </div>
              <div class="form-group">
                <label for="permission">권한 여부</label>
                <select v-model="newManager.permission" id="permission" required>
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="submit-button">등록</button>
              <button type="button" class="close-modal-button" @click="closeRegisterModal">취소</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 매니저 삭제 확인 모달 -->
      <div v-if="showDeleteConfirmModalVisible" class="modal-overlay" @click="closeDeleteConfirmModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">삭제 확인</h3>
            <button class="close-button" @click="closeDeleteConfirmModal">&times;</button>
          </div>
          <div class="modal-body">
            <p>
              정말로 <strong>{{ managerToDelete?.name }}</strong> 매니저를 삭제하시겠습니까?
            </p>
          </div>
          <div class="modal-footer">
            <button class="delete-button" @click="deleteManager(managerToDelete)">확인</button>
            <button class="close-modal-button" @click="closeDeleteConfirmModal">취소</button>
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
      managers: [
        {
          id: 1,
          name: "김매니저",
          contact: "010-1234-5678",
          email: "manager1@example.com",
          assignedClasses: "A반",
          permission: true,
        },
        {
          id: 2,
          name: "박매니저",
          contact: "010-5678-1234",
          email: "manager2@example.com",
          assignedClasses: "B반",
          permission: false,
        },
        {
          id: 3,
          name: "최매니저",
          contact: "010-1236-5678",
          email: "manager3@example.com",
          assignedClasses: "C반",
          permission: true,
        },
      ],
      selectedManager: null,
      showRegisterModal: false,
      newManager: {
        name: "",
        contact: "",
        email: "",
        assignedClasses: "",
        permission: true,
      },
      showDeleteConfirmModalVisible: false,
      managerToDelete: null,
    };
  },
  methods: {
    openDetailsModal(manager) {
      this.selectedManager = manager;
    },
    closeDetailsModal() {
      this.selectedManager = null;
    },
    openRegisterModal() {
      this.showRegisterModal = true;
    },
    closeRegisterModal() {
      this.showRegisterModal = false;
    },
    registerManager() {
      this.managers.push({ ...this.newManager, id: Date.now() });
      this.newManager = {
        name: "",
        contact: "",
        email: "",
        assignedClasses: "",
        permission: true,
      };
      this.closeRegisterModal();
    },
    showDeleteConfirmModal(manager) {
      this.managerToDelete = manager;
      this.showDeleteConfirmModalVisible = true;
    },
    closeDeleteConfirmModal() {
      this.managerToDelete = null;
      this.showDeleteConfirmModalVisible = false;
    },
    deleteManager(manager) {
      this.managers = this.managers.filter((m) => m.id !== manager.id);
      this.closeDeleteConfirmModal();
      alert(`${manager.name} 매니저를 삭제했습니다.`);
    },
    togglePermission(manager) {
      manager.permission = !manager.permission;
    },
  },
};
</script>

<style scoped>
.manager-list-container {
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

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.table-title {
  font-size: 20px;
  font-weight: bold;
  color: #555;
}

.add-button {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.add-button:hover {
  background-color: #2980b9;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.custom-table th,
.custom-table td {
  text-align: left;
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

.permission-button {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.permission-button.enabled {
  background-color: #2ecc71;
}

.permission-button.disabled {
  background-color: #bdc3c7;
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
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
  position: relative;
}

.modal-body {
  padding: 16px;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px;
  background-color: #f7f7f7;
  border-top: 1px solid #ddd;
}

.submit-button {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2980b9;
}

.close-modal-button {
  padding: 10px 20px;
  font-size: 14px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-modal-button:hover {
  background-color: #c0392b;
}

.modal-body label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.modal-body input,
.modal-body select {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  font-size: 14px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.modal-body input:focus,
.modal-body select:focus {
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.4);
}
</style>
