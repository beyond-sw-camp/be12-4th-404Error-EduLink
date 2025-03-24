<template>
  <div style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">

    <BoardNav :selectedTab="'Profile'" />

    <div>
      <!-- 오버레이 -->
      <div class="flex z-30 items-center flex-col justify-center overflow-hidden fixed inset-0"
        v-show="isOverlayVisible">
        <div
          class="overlay absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700">
        </div>
      </div>

      <!-- 메인 콘텐츠 -->
      <section class="p-6 xl:max-w-6xl xl:mx-auto">
        <!-- 게시판 글 섹션 -->
        <section class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <!-- 제목과 작성자 -->
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">하하하핳핳</h2>


            <div class="flex items-center space-x-2"> <!-- 간격을 줄이기 위해 space-x-2 사용 -->
              <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
                  </path>
                </svg>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">작성자: 심강사<br>
                2025-02-06

              </p>
            </div>


          </div>

          <div class="space-y-6">
            <!-- 각 글 항목 -->
            <div class="pb-4">
              <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">1. 브랜치를 생성한다</h3>
              오늘의 수업은은<br>

              3시에 끝난다<br>
              이 글은 게시판에 등록된 세 번째 글입니다. 내용을 여기에 작성하세요.
            </div>
          </div>
        </section>

        <!-- 댓글 작성 섹션 -->



        <!-- 댓글 목록 섹션 -->
        <section class="mt-8">

          <!-- 댓글 목록 -->
          <label class="block font-bold text-gray-800 dark:text-gray-200 mb-4">댓글</label>
          <div class="flex items-center space-x-4 mb-6">
            <textarea id="comment" v-model="newComment"
              class="px-3 py-2 w-64 focus:ring focus:outline-none border-gray-700 rounded h-12 border bg-white dark:bg-slate-800 dark:border-gray-600 mb-4"
              placeholder="댓글을 작성해주세요..."></textarea>
            <button @click="submitComment"
              class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded-md border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-4 h-12 text-sm">
              댓글 등록
            </button>
          </div>
          <div class="space-y-6">
            <div v-for="(comment, index) in comments" :key="index"
              class="p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
              <div class="flex items-center justify-between mb-2">
                <p class="text-gray-800 font-semibold dark:text-gray-200">{{ comment.author }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ comment.date }}</p>
              </div>
              <p class="text-gray-700 dark:text-gray-300">{{ comment.text }}</p>
            </div>
          </div>
        </section>


      </section>
    </div>
  </div>

</template>

<script>
import BoardNav from './components/BoardNav.vue';

export default {
  components: {
    BoardNav
  },
  data() {
    return {
      isOverlayVisible: false, // 오버레이 표시 여부
      newComment: '', // 새 댓글 내용
      comments: [
        { author: '오건하', date: '2025-02-06', text: '좋은 정보 감사합니다!' },
        { author: '김유진', date: '2025-01-04', text: '브랜치 만드는 과정에 대해 더 알고 싶어요.' },
        { author: '김정엽', date: '2025-01-04', text: '깃 허브에 머지하는 방법을 알고싶어요' }
      ]
    };
  },
  methods: {
    submitComment() {
      // 새 댓글 제출
      if (this.newComment.trim()) {
        const newComment = {
          author: '사용자', // 동적으로 사용자 정보를 넣을 수 있음
          date: new Date().toISOString().split('T')[0], // 현재 날짜 (YYYY-MM-DD 형식)
          text: this.newComment
        };
        this.comments.push(newComment); // 댓글 배열에 새 댓글 추가
        this.newComment = ''; // 입력란 비우기
      }
    }
  }
};
</script>

<style scoped></style>
