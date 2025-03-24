<template>
  <div style="background-color: whitesmoke;" class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <BoardNav :selectedTab="'Profile'" />
    <div>
      <!-- 오버레이 -->
      <div class="flex z-30 items-center flex-col justify-center overflow-hidden fixed inset-0" v-show="isOverlayVisible">
        <div class="overlay absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700"></div>
      </div>

      <!-- 메인 콘텐츠 -->
      <section class="p-6 xl:max-w-6xl xl:mx-auto">
        <section class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">{{ post.title }}</h2>
            <div class="flex items-center space-x-2">
              <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">작성자: {{ post.writer }}<br>{{ post.date }}</p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="pb-4">
              <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">{{ post.title }}</h3>
              <p class="text-lg">{{ post.content }}</p>
            </div>
          </div>
        </section>

        <!-- 댓글 작성 섹션 -->
        <section class="mt-8">
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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/stores/useBoardStore';
import { useMemberStore } from '@/stores/useMemberStore';

export default {
  components: {
    BoardNav
  },
  data() {
    return {
      isOverlayVisible: false, 
      newComment: '', 
      comments: [], 
      post: {} 
    };
  },
  methods: {

     async fetchPost() {
      const route = useRoute();
      const boardIdx = route.params.id; 
      console.log('게시글 ID:', boardIdx); 
      const boardStore = useBoardStore();
      this.post = boardStore.Board; 
    },
    
    async submitComment() {
      if (this.newComment.trim()) {
        const memberStore = useMemberStore();
        const boardStore = useBoardStore();

        // 사용자 정보 가져오기
        const commentData = {
          author: memberStore.name || '사용자', 
          date: new Date().toISOString().split('T')[0], 
          
        };

      
        const boardIdx = this.post.id; 
        await boardStore.getBoardComments(boardIdx, commentData);

       
        this.comments.push(commentData); 
        this.newComment = '';
      }
    },
    async fetchPostAndComments() {
      const route = useRoute();
      const boardStore = useBoardStore();
      const postId = route.params.id; 

      await boardStore.getBoard(boardIdx); 
      this.post = post || {}; 

     
      await this.fetchComments(postId);
    },
    async fetchComments(boardIdx) {
      const boardStore = useBoardStore();
      await boardStore.getBoardComments(boardIdx); // 댓글 목록을 서버에서 가져옵니다.
      this.comments = boardStore.BoardComments || []; // 댓글 목록을 상태에 저장합니다.
    }
  },
  onMounted() {
    
    this.fetchPostAndComments();
  }
};
</script>

<style scoped>
/* 추가적인 스타일을 여기에 작성할 수 있습니다. */
</style>