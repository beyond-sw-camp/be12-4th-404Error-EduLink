<template>
  <div
    style="background-color: whitesmoke"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
  >
    <div style="margin-top: 30px" class="attendance-management">
      
      <h1 class="page-title">출석 관리</h1>
      <div class="action-buttons">
        <router-link to="/manager/leave-request" class="process-button">
          출석 처리
        </router-link>
      </div>

      <!-- 카테고리 탭 -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: selectedTab === tab }"
          @click="selectTab(tab)"
        >
          {{ tab }}
        </button>
      </div>

      <!-- 전체 출석률 -->
      <div v-if="selectedTab === '전체'">
        <h2>전체 출석률</h2>
        <p>기간: {{ formatDate(startDate) }} ~ {{ formatDate(endDate) }}</p>
        <table class="custom-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>전체 출석률</th>
              <th>당일 출석 상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.name }}</td>
              <td>{{ student.attendanceRate }}%</td>
              <td>{{ student.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 월별 출석률 -->
      <div v-if="selectedTab === '월별'">
        <h2>월별 출석률</h2>
        <label for="month">월 선택:</label>
        <select
          id="month"
          v-model="selectedMonth"
          @change="filterMonthlyAttendance"
        >
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}월
          </option>
        </select>

        <table style="text-align: center" class="custom-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>월별 출석률</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredMonthlyAttendance" :key="student.id">
              <td>{{ student.name }}</td>
              <td>{{ student.attendanceRate }}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 일별 출석여부 -->
      <div v-if="selectedTab === '일별'">
        <h2>일별 출석여부</h2>
        <label for="date">날짜 선택:</label>
        <input
          type="date"
          id="date"
          v-model="selectedDate"
          @change="filterDailyAttendance"
        />

        <table class="custom-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>출석 여부</th>
              <th>출석 상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredDailyAttendance" :key="student.id">
              <td>{{ student.name }}</td>
              <td>{{ student.isPresent }}</td>
              <!-- Y 또는 N -->
              <td>{{ student.status }}</td>
              <!-- 출석, 지각, 조퇴, 결석, 병가 -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const startDate = new Date("2024-11-20");
    const endDate = new Date("2025-05-16");

    const tabs = ["전체", "월별", "일별"];
    const selectedTab = ref("전체");

    const students = ref([
      { id: 1, name: "학생01", attendanceRate: 85, status: "Y" },
      { id: 2, name: "학생02", attendanceRate: 90, status: "Y" },
      { id: 3, name: "학생03", attendanceRate: 75, status: "Y" },
      { id: 4, name: "학생04", attendanceRate: 88, status: "Y" },
      { id: 5, name: "학생05", attendanceRate: 79, status: "N" },
      { id: 6, name: "학생06", attendanceRate: 95, status: "Y" },
      { id: 7, name: "학생07", attendanceRate: 81, status: "Y" },
      { id: 8, name: "학생08", attendanceRate: 89, status: "Y" },
      { id: 9, name: "학생09", attendanceRate: 100, status: "Y" },
      { id: 10, name: "학생10", attendanceRate: 73, status: "Y" },
      { id: 11, name: "학생11", attendanceRate: 93, status: "Y" },
      { id: 12, name: "학생12", attendanceRate: 97, status: "Y" },
      { id: 13, name: "학생13", attendanceRate: 98, status: "Y" },
      { id: 14, name: "학생14", attendanceRate: 93, status: "Y" },
      { id: 15, name: "학생15", attendanceRate: 95, status: "Y" },
      { id: 16, name: "학생16", attendanceRate: 82, status: "N" },
      { id: 17, name: "학생17", attendanceRate: 70, status: "N" },
      { id: 18, name: "학생18", attendanceRate: 81, status: "Y" },
      { id: 19, name: "학생19", attendanceRate: 82, status: "Y" },
      { id: 20, name: "학생20", attendanceRate: 85, status: "Y" },
      { id: 21, name: "학생21", attendanceRate: 98, status: "N" },
      { id: 22, name: "학생22", attendanceRate: 87, status: "Y" },
      { id: 23, name: "학생23", attendanceRate: 93, status: "Y" },
      { id: 24, name: "학생24", attendanceRate: 87, status: "Y" },
      { id: 25, name: "학생25", attendanceRate: 94, status: "Y" },
      { id: 26, name: "학생26", attendanceRate: 87, status: "Y" },
    ]);


    const selectedMonth = ref("2024.12");
    const selectedDate = ref("2024-12-31");

    const months = computed(() => {
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      const monthList = [];

      for (let year = startYear; year <= endYear; year++) {
        const start = year === startYear ? startDate.getMonth() + 1 : 1;
        const end = year === endYear ? endDate.getMonth() + 1 : 12;
        for (let month = start; month <= end; month++) {
          monthList.push(`${year}.${month.toString().padStart(2, "0")}`);
        }
      }
      return monthList;
    });

    const filteredMonthlyAttendance = ref([]);
    const filteredDailyAttendance = ref([]);

    const filterMonthlyAttendance = () => {
      filteredMonthlyAttendance.value = students.value.map((student) => {
        return {
          ...student,
          attendanceRate: Math.floor(Math.random() * 31) + 70, // 70 ~ 100
        };
      });
    };

    const filterDailyAttendance = () => {
      const totalStudents = students.value.length;
      const presentCount = 20; // 출석(Y) 학생 수
      const absentCount = totalStudents - presentCount; // 결석(N) 학생 수

      // 출석 여부 배열 생성
      const attendanceStatuses = [
        ...Array(presentCount).fill("Y"),
        ...Array(absentCount).fill("N"),
      ];

      // 배열을 확실히 섞기 (Fisher-Yates 알고리즘 사용)
      for (let i = attendanceStatuses.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [attendanceStatuses[i], attendanceStatuses[randomIndex]] = [
          attendanceStatuses[randomIndex],
          attendanceStatuses[i],
        ];
      }

      // 상태 매핑 (Y는 출석, 지각, 조퇴 / N은 결석, 병가만 가능)
      const statusMapping = {
        Y: ["출석", "지각", "조퇴"],
        N: ["결석", "병가"],
      };

      // 새로운 배열 생성 및 상태 매핑
      const updatedAttendance = students.value.map((student, index) => {
        const isPresent = attendanceStatuses[index]; // Y 또는 N
        const possibleStatuses = statusMapping[isPresent];
        const randomStatus =
          possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)];

        return {
          ...student,
          isPresent, // Y 또는 N
          status: randomStatus, // 상태 매핑
        };
      });

      // 배열을 새로 할당하여 Vue 반응성을 보장
      filteredDailyAttendance.value = [...updatedAttendance];
    };

    const selectTab = (tab) => {
      selectedTab.value = tab;
      if (tab === "월별") filterMonthlyAttendance();
      if (tab === "일별") filterDailyAttendance();
    };

    const formatDate = (date) => {
      return `${date.getFullYear()}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
    };

    return {
      tabs,
      selectedTab,
      students,
      startDate,
      endDate,
      months,
      selectedMonth,
      selectedDate,
      filteredMonthlyAttendance,
      filteredDailyAttendance,
      selectTab,
      filterMonthlyAttendance,
      filterDailyAttendance,
      formatDate,
    };
  },
};
</script>

<style scoped>
.custom-table > thead > tr > th {
  text-align: center;
}
.custom-table > tbody > tr > td {
  text-align: center;
}
.attendance-management {
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
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #495057;
}

select,
input[type="date"] {
  margin-left: 10px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.process-button {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s ease-in-out;
}

.process-button:hover {
  background-color: #218838;
}

.action-buttons {
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽 끝으로 정렬 */
  margin-bottom: 20px;
}
</style>
