<script setup>
import { ref } from "vue";

import { usebootcamp } from '../stores/useBootcampStore';


const useboot = usebootcamp();
useboot.getBootcamp();



// courses 데이터 정의
 
</script>



<template>
    <div style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <!-- 테이블 헤더 -->
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">과정</th>
            <th scope="col" class="px-6 py-3">카테고리</th>
            <th scope="col" class="px-6 py-3">상태</th>
            <th scope="col" class="px-6 py-3">비용</th>
            <th scope="col" class="px-6 py-3">운영 형태</th>
            <th scope="col" class="px-6 py-3">기간</th>
            <th scope="col" class="px-6 py-3">시간</th>
            <th scope="col" class="px-6 py-3">특이사항</th>
            <th scope="col" class="px-6 py-3">운영사</th    >
          </tr>
        </thead>
        <!-- 테이블 본문 -->
        <tbody>
          <tr v-for="(course, index) in useboot.boot_campList" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ course.title }}
            </th>
            <td class="px-6 py-4">{{ course.category }}</td>
            <td class="px-6 py-4">{{ course.status }}</td>
            <td class="px-6 py-4">{{ course.cost }}</td>
            <td class="px-6 py-4">{{ course.type }}</td>
            <td class="px-6 py-4">{{ course.duration }}</td>
            <td class="px-6 py-4">{{ course.time }}</td>
            <td class="px-6 py-4">
              <ul class="list-disc list-inside">
                <li v-for="(detail, i) in course.details" :key="i">{{ detail }}</li>
              </ul>
            </td>
            <td class="px-6 py-4">{{ course.organizer }}</td>
          </tr>
        </tbody>
      </table>
    </div>
        </div>
  </template>