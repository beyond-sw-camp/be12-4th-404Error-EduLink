<script setup>

const menuToggle = document.getElementById('menu-toggle');
const aside = document.getElementById('aside');

// 버튼 클릭 이벤트 추가
menuToggle.addEventListener('click', () => {
  aside.classList.toggle('hidden'); // 'hidden' 클래스를 토글하여 보이기/숨기기
});

</script>

<template>
  <aside id="aside"
        class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden -left-60 lg:left-0 lg:hidden xl:flex">
        <div class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900">
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="py-4 px-6 bg-gray-100 dark:bg-slate-900">
        <a href="/studentdashboard"  class="text-lg font-bold text-gray-800 dark:text-gray-100">Student Menu</a>
      </div>

      <!-- Menu Items -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <a
          href="/bootcamp"
          class="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white">
          부트캠프
        </a>
        <a
          href="/bootcampInfo"
          class="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white">
          부트캠프info
        </a>
        <a
          href="/student-assignments"
          class="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white">
          Assignments
        </a>
        <a
          href="/student-grades"
          class="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white">
          Grades
        </a>
        <a
            data-modal-target="popup-modal" data-modal-toggle="popup-modal"
          class="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white">
          출석하기
        </a><a
            data-modal-target="popup-modal1" data-modal-toggle="popup-modal1"
          class="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white">
          퇴실하기
        </a><a
            data-modal-target="popup-modal2" data-modal-toggle="popup-modal2"
          class="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white">
          휴가 신청
        </a><a
            data-modal-target="popup-modal3" data-modal-toggle="popup-modal3"
          class="block py-2 px-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-slate-700 dark:hover:text-white">
          조퇴 신청
        </a>


 
            
      </nav>

      <!-- Footer -->
      <div class="py-4 px-6 bg-gray-100 dark:bg-slate-900">
        <button
          class="w-full py-2 px-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600">
          Log Out
        </button>
      </div>
    </div>
    </div>
  </aside>
</template>
