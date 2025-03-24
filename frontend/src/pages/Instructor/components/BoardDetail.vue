<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useInstructorStore } from '../../../stores/useInstructorStore';

const props = defineProps({
    boardIdx: {
        type: Number,
        required: true
    }
});

const instructorStore = useInstructorStore();
const boardDetail = ref(null);
const isLoading = ref(false);

const fetchBoardDetail = async () => {
    isLoading.value = true;
    await instructorStore.fetchDetail(props.boardIdx);
    if (instructorStore.detail_res.isSuccess) {
        boardDetail.value = instructorStore.detail_res.data;
        console.log(instructorStore.detail_res);
    } else {
        console.log(instructorStore.detail_res);
    }
};

watch(() => props.boardIdx, fetchBoardDetail);

onMounted(fetchBoardDetail);
</script>

<template>
    <div v-if="isLoading" class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 w-full">
            <!-- 제목 입력 필드 -->
            <div class="mb-5" style="height: 10vh;">
                <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">제목</label>
                {{ boardDetail.title }}
            </div>

            <!-- 파일 업로드 필드 -->
            <div class="mb-5" style="height: 10vh;">
                <label for="user_avatar" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">첨부파일</label>
            </div>

            <!-- 게시글 내용 -->
            <div class="mb-5" style="height: 20vh;">
                <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">글 내용</label>
                {{ boardDetail.content }}
            </div>
        </div>
    </div>
</template>

<style scoped></style>