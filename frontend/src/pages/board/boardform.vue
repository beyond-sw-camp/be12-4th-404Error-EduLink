<template>
  <div style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
    <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div class="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 w-full">
        <div class="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800 p-8 space-y-8">
          <h2 class="text-3xl font-semibold text-center text-gray-900 dark:text-white">글 작성</h2>

          <form @submit.prevent="submitBoard" class="space-y-6">
            <div class="mb-5">
              <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                제목
              </label>
              <input type="text" id="large-input" v-model="boardForm.title" required
                class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="제목을 입력하세요." />
            </div>

            <div class="mb-5">
              <label for="file-upload" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                첨부파일
              </label>
              <input id="file-upload" name="files" type="file" multiple @change="handleFiles"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
            </div>

            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-900 dark:text-white">게시판 유형</label>
              <select v-model="boardType"
                class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
                <option value="1">일반 게시판</option>
                <option value="5">질의 응답</option>

                <option v-if="userRole === 'ROLE_INSTRUCTOR'" value="3">자료실</option>
                <option v-if="userRole === 'ROLE_INSTRUCTOR'" value="4">과제</option>

                <option v-if="userRole === 'ROLE_MANAGER'" value="0">공지 게시판</option>
                <option v-if="userRole === 'ROLE_MANAGER'" value="2">시험</option>
              </select>
            </div>


            <div>
              <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">글 내용</label>
              <textarea id="content" v-model="boardForm.content" minlength="5" required
                class="block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 focus:outline-none"
                placeholder="글을 작성해주세요..." rows="6">
        </textarea>
            </div>

            <div>
              <button type="submit"
                class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                게시
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBoardStore } from '@/stores/useBoardStore';
import { useMemberStore } from '@/stores/useMemberStore';
import { useRouter } from 'vue-router';

const boardStore = useBoardStore();
const memberStore = useMemberStore();
const router = useRouter();

const boardForm = ref({
  title: '',
  content: '',
  files: []
});

const userRole = computed(() => memberStore.role);
const boardType = ref(1);

const errorMessage = ref('');
const successMessage = ref('');

const handleFiles = (event) => {
  boardForm.value.files = Array.from(event.target.files).map(file => file.name);
};

const submitBoard = async () => {
  console.log("Submitting board:", boardForm.value);
  try {
    await boardStore.getRegister(boardType.value, boardForm.value);
    successMessage.value = "게시글이 성공적으로 생성되었습니다.";
    let redirectRoute = '';
    switch (boardType.value) {
      case 0:
        redirectRoute = '/board/notice';
        break;
      case 1:
        redirectRoute = '/board/freeboard';
        break;
      case 2:
        redirectRoute = '/manager/ExamList';
        break;
      case 3:
        redirectRoute = '/board/data';
        break;
      case 4:
        redirectRoute = '/board/project';
        break;
      case 5:
        redirectRoute = '/board/project';
        break;
      default:
        redirectRoute = '/board/question';
        break;
    }
    console.log("Redirecting to:", redirectRoute);
    router.push(redirectRoute);
  } catch (error) {
    console.error("Board creation error:", error.response ? error.response.data : error.message);
    errorMessage.value = "게시글 생성에 실패하였습니다.";
  }
};
</script>