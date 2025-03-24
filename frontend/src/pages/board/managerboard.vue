<template>
  <div class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <BoardNav :selectedTab="'Profile'" />

    <section class="w-full max-w-7xl mx-auto">
      <header class="mb-6 flex items-center justify-between">
        <div class="flex items-center">
          <div class="icon text-black rounded-full w-12 h-12 flex justify-center items-center mr-3">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023" />
            </svg>
          </div>
          <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">자유 게시판</h1>
        </div>
      </header>

      <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <router-link to="/board/register"
          class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded-md border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-6 text-sm font-medium">
          글쓰기
        </router-link>

        <div class="overflow-x-auto mt-6">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs">
              <tr>
                <th scope="col" class="px-6 py-4">번호</th>
                <th scope="col" class="px-6 py-4">글쓴이</th>
                <th scope="col" class="px-6 py-4">제목</th>
                <th scope="col" class="px-6 py-4">작성 일자</th>
                <th scope="col" class="px-6 py-4">삭제</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in posts" :key="post.idx" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td class="px-6 py-4">{{ index + 1 }}</td>
                <td class="px-6 py-4">{{ post.writer }}</td>
                <td class="px-6 py-4">
                  <router-link :to="`/board/bbboard/${post.idx}`">
                    {{ post.title }}
                  </router-link>
                </td>
                <td class="px-6 py-4">{{ post.Date }}</td>
                <td class="px-6 py-4 text-center">
                  <button @click="deletePost(post.idx)" class="inline-flex justify-center items-center bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 px-3 py-1">
                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block mr-1">
                      <path fill="currentColor" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <PageNav :pages="[1, 2, 3, 4, 5]" :modelValue="currentPage" :currentPage="currentPage" v-model="currentPage"
        @update:modelValue="val => currentPage = val" />
    </section>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/stores/useBoardStore';
import { useMemberStore } from "@/stores/useMemberStore";
import BoardNav from './components/BoardNav.vue';
import PageNav from './components/PageNav.vue';

const router = useRouter();
const boardStore = useBoardStore();
const memberStore = useMemberStore();

const posts = computed(() => {
  return boardStore.BoardList && boardStore.BoardList.boardList
    ? boardStore.BoardList.boardList
    : [];
});

const currentPage = ref(1);
const pageSize = 20;

// 게시물 삭제 함수
const deletePost = async (id) => {
  try {
    
    // 삭제가 완료되면 바로 deleteboard 페이지로 이동
    router.push('/board/deleteboard');  
  } catch (error) {
    console.error('게시물 삭제 실패:', error);
    alert("게시물 삭제에 실패했습니다.");
  }
};

onMounted(() => {
  boardStore.getBoardList(1, currentPage.value - 1, pageSize);
});

watch(currentPage, (newVal) => {
  boardStore.getBoardList(1, newVal, pageSize);
});
</script>

  
  <style scoped>
/* 타이틀과 버튼에 스타일을 추가 */
h1 {
  font-size: 2rem;
  color: #2d3748;
  font-weight: 600;
}

/* 글쓰기 버튼 */
.router-link {
  border-radius: 0.375rem;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  background-color: #3182ce;
  color: white;
  transition: background-color 0.3s ease;
}

.router-link:hover {
  background-color: #2b6cb0;
  border-color: #2b6cb0;
}

/* 테이블 스타일 */
table {
  border-collapse: collapse;
  width: 100%;
}

table th, table td {
  padding: 1rem;
  text-align: left;
}

table th {
  background-color: #edf2f7;
}

table tr:hover {
  background-color: #f7fafc;
}

table td {
  border-bottom: 1px solid #e2e8f0;
}

/* 배경과 테두리 개선 */
.bg-gray-50 {
  background-color: #f7fafc;
}

.dark:bg-slate-800 {
  background-color: #2d3748;
}
</style>