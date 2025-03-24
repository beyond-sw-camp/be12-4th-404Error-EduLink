<template>
  <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
    <li class="w-full focus-within:z-10">
      <router-link
        to="/board/notice"
        class="inline-block w-full p-4"
        :class="{
          'text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:text-white': selectedTab === 'notice',
          'bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700': selectedTab !== 'notice',
        }"
        @click="updateSelectedTab('notice')"
      >
        공지사항
      </router-link>
    </li>
    <li class="w-full focus-within:z-10">
      <router-link
        to="/board/freeboard"
        class="inline-block w-full p-4"
        :class="{
          'text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:text-white': selectedTab === 'freeboard',
          'bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700': selectedTab !== 'freeboard',
        }"
        @click="updateSelectedTab('freeboard')"
      >
        자유
      </router-link>
    </li>

    <li class="w-full focus-within:z-10">
      <router-link
        to="/manager/examList"
        class="inline-block w-full p-4"
        :class="{
          'text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:text-white': selectedTab === 'notice',
          'bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700': selectedTab !== 'notice',
        }"
      >
        시험
      </router-link>
    </li>
    <li class="w-full focus-within:z-10">
      <router-link
        to="/board/data"
        class="inline-block w-full p-4"
        :class="{
          'text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:text-white': selectedTab === 'freeboard',
          'bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700': selectedTab !== 'freeboard',
        }"
        @click="updateSelectedTab('data')"
      >
        자료실
      </router-link>
    </li>
    <li class="w-full focus-within:z-10">
      <router-link
        to="/board/project"
        class="inline-block w-full p-4"
        :class="{
          'text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:text-white': selectedTab === 'notice',
          'bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700': selectedTab !== 'notice',
        }"
        @click="updateSelectedTab('project')"
      >
        과제
      </router-link>
    </li>
    <li class="w-full focus-within:z-10">
      <router-link
        to="/board/question"
        class="inline-block w-full p-4"
        :class="{
          'text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:text-white': selectedTab === 'freeboard',
          'bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700': selectedTab !== 'freeboard',
        }"
        @click="updateSelectedTab('question')"
      >
        질의응답
      </router-link>
    </li>
    </ul>
  </template>
  
  <script >
  export default {
  props: {
    selectedTab: {
      type: String,
      required: true
    }
  },
  methods: {
    updateSelectedTab(tab) {
      // 클릭된 탭을 selectedTab에 할당하여 스타일이 변경되도록 합니다.
      this.$emit('update:selectedTab', tab);
    }
  }
};
  </script>
  
  <style scoped>
  </style>