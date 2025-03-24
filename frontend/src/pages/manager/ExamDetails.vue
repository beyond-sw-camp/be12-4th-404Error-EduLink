<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const examId = route.params.id;

const examDetails = ref({
  subject: "Vue.js",
  participants: 26,
  total: 30,
  average: 75,
  failed: 5,
  students: [
  {"id": 1, "name": "학생 01", "score": 66, "submissionTime": "2024-12-30 17:08:14", "isPassed" : "N"},
  {"id": 2, "name": "학생 02", "score": 70, "submissionTime": "2024-12-30 17:40:07" , "isPassed" : "Y"},
  {"id": 3, "name": "학생 03", "score": 78, "submissionTime": "2024-12-30 17:33:55" , "isPassed" : "Y"},
  {"id": 4, "name": "학생 04", "score": 70, "submissionTime": "2024-12-30 17:20:27" , "isPassed" : "Y"},
  {"id": 5, "name": "학생 05", "score": 77, "submissionTime": "2024-12-30 17:29:04" , "isPassed" : "Y"},
  {"id": 6, "name": "학생 06", "score": 73, "submissionTime": "2024-12-30 17:12:47" , "isPassed" : "Y"},
  {"id": 7, "name": "학생 07", "score": 68, "submissionTime": "2024-12-30 17:28:58" , "isPassed" : "N"},
  {"id": 8, "name": "학생 08", "score": 75, "submissionTime": "2024-12-30 17:07:48" , "isPassed" : "Y"},
  {"id": 9, "name": "학생 09", "score": 69, "submissionTime": "2024-12-30 17:38:26" , "isPassed" : "N"},
  {"id": 10, "name": "학생 10", "score": 73, "submissionTime": "2024-12-30 17:48:25" , "isPassed" : "Y"},
  {"id": 11, "name": "학생 11", "score": 70, "submissionTime": "2024-12-30 17:16:02" , "isPassed" : "Y"},
  {"id": 12, "name": "학생 12", "score": 82, "submissionTime": "2024-12-30 17:19:25" , "isPassed" : "Y"},
  {"id": 13, "name": "학생 13", "score": 71, "submissionTime": "2024-12-30 17:39:01" , "isPassed" : "Y"},
  {"id": 14, "name": "학생 14", "score": 77, "submissionTime": "2024-12-30 17:42:32" , "isPassed" : "Y"},
  {"id": 15, "name": "학생 15", "score": 72, "submissionTime": "2024-12-30 17:19:18" , "isPassed" : "Y"},
  {"id": 16, "name": "학생 16", "score": 75, "submissionTime": "2024-12-30 17:43:09" , "isPassed" : "Y"},
  {"id": 17, "name": "학생 17", "score": 69, "submissionTime": "2024-12-30 17:23:56" , "isPassed" : "N"},
  {"id": 18, "name": "학생 18", "score": 70, "submissionTime": "2024-12-30 17:48:26" , "isPassed" : "Y"},
  {"id": 19, "name": "학생 19", "score": 82, "submissionTime": "2024-12-30 17:46:10" , "isPassed" : "Y"},
  {"id": 20, "name": "학생 20", "score": 69, "submissionTime": "2024-12-30 17:02:17" , "isPassed" : "N"},
  {"id": 21, "name": "학생 21", "score": 78, "submissionTime": "2024-12-30 17:22:44" , "isPassed" : "Y"},
  {"id": 22, "name": "학생 22", "score": 75, "submissionTime": "2024-12-30 17:32:21" , "isPassed" : "Y"},
  {"id": 23, "name": "학생 23", "score": 77, "submissionTime": "2024-12-30 17:31:36" , "isPassed" : "Y"},
  {"id": 24, "name": "학생 24", "score": 78, "submissionTime": "2024-12-30 17:48:37" , "isPassed" : "Y"},
  {"id": 25, "name": "학생 25", "score": 74, "submissionTime": "2024-12-30 17:27:45" , "isPassed" : "Y"},
  {"id": 26, "name": "학생 26", "score": 81, "submissionTime": "2024-12-30 17:14:59" , "isPassed" : "Y"},
 ],
});
/* */
</script>


<template>
    <div style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    
    <div class="container">
      <h1 class="exam-title">{{ examDetails.subject }} 시험 정보</h1>
      <div class="exam-stats">
        <div class="stat">
          <span class="stat-label">응시 인원:</span>
          <span class="stat-value">{{ examDetails.participants }} / {{ examDetails.total }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">평균 점수:</span>
          <span class="stat-value">{{ examDetails.average }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">탈락자:</span>
          <span class="stat-value">{{ examDetails.failed }}</span>
        </div>
      </div>
      <table class="custom-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>학생 이름</th>
            <th>점수</th>
            <th>제출 시간</th>
            <th>통과 여부</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in examDetails.students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.score }}</td>
            <td>{{ student.submissionTime }}</td>
            <td>{{ student.isPassed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </template>
  
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    color: #2d3436;
    line-height: 1.6;
  }
  
  /* 제목 스타일 */
  .exam-title {
    font-size: 28px;
    font-weight: bold;
    color: #34495e; /* 다크 블루 */
    margin-bottom: 24px;
    text-align: center;
    border-bottom: 2px solid #5dade2; /* 밝은 블루 */
    padding-bottom: 8px;
  }
  
  /* 통계 정보 */
  .exam-stats {
    display: flex;
    justify-content: space-between;
    background: #f4f6f7; /* 밝은 회색 */
    border: 1px solid #d6dbdf; /* 중간 회색 */
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
  }
  
  .stat {
    text-align: center;
  }
  
  .stat-label {
    display: block;
    font-size: 16px;
    color: #7b7d7d; /* 소프트 그레이 */
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .stat-value {
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50; /* 다크 블루 */
  }
  
  /* 테이블 스타일 */
  .custom-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  }
  
  .custom-table th,
  .custom-table td {
    padding: 12px 16px;
    text-align: left;
  }
  
  .custom-table th {
    background-color: #5dade2; /* 밝은 블루 */
    color: #ffffff; /* 흰색 글자 */
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 2px solid #2e86c1; /* 진한 블루 */
  }
  
  .custom-table td {
    font-size: 15px;
    color: #34495e; /* 다크 블루 */
    border-bottom: 1px solid #d5d8dc; /* 라이트 그레이 */
  }
  
  .custom-table tr:hover {
    background-color: #ebf5fb; /* 밝은 블루 톤의 강조 */
  }
  
  .custom-table tr:last-child td {
    border-bottom: none;
  }
  
  .custom-table th:first-child,
  .custom-table td:first-child {
    border-left: none;
  }
  
  .custom-table th:last-child,
  .custom-table td:last-child {
    border-right: none;
  }
  </style>
  