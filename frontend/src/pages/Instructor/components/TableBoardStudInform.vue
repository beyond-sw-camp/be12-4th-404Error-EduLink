<script setup>
import { onMounted, ref, computed } from 'vue';
import { useInstructorStore } from '../../../stores/useInstructorStore';
import BoardDetail from './BoardDetail.vue';

const props = defineProps({
    boardType: {
        type: Number,
        required: true
    },
    userIdx: {
        type: Number,
        required: true
    }
});

const instructorStore = useInstructorStore();

const showPopup = ref(false);
const selectedRowData = ref(null);

const board_resp = ref([]);
const currentPage = ref(0);
const pageSize = 5;

const hasPrevious = computed(() => currentPage.value > 0);
const hasNext = computed(() => board_resp.value.totalPages > currentPage.value + 1);

const pageNumbers = computed(() => {
    const totalPages = board_resp.value.totalPages || 0;
    const startPage = Math.floor(currentPage.value / 5) * 5;
    return Array.from({ length: Math.min(5, totalPages - startPage) }, (_, i) => startPage + i);
});

const fetchBoardByUser = async () => {
    await instructorStore.fetchBoardByUser(props.userIdx, props.boardType, currentPage.value, pageSize);
    if (instructorStore.boardByUser_res.isSuccess) {
        board_resp.value = instructorStore.boardByUser_res.data;
    } else {
        console.log(instructorStore.boardByUser_res);
    }
};

const fetchDelete = async (boardIdx) => {
    await instructorStore.fetchDelete(boardIdx);
    if (instructorStore.delete_res.isSuccess) {
        fetchBoard();
    } else {
        console.log(instructorStore.delete_res);
    }
};

onMounted(fetchBoardByUser);

const openPopup = (row) => {
    selectedRowData.value = row;
    console.log(selectedRowData.value);
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};

const goToPage = (page) => {
    currentPage.value = page;
    fetchBoard();
};

const goToPreviousPage = () => {
    if (hasPrevious.value) {
        currentPage.value -= 1;
        fetchBoard();
    }
};

const goToNextPage = () => {
    if (hasNext.value) {
        currentPage.value += 1;
        fetchBoard();
    }
};
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="p-4" style="width: 5%;">
                        <div class="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3 text-center" style="width: 20%;">과제명</th>
                    <th scope="col" class="px-6 py-3 text-center" style="width: 30%;">파일명</th>
                    <th scope="col" class="px-3 py-3 text-center" style="width: 15%;">작성일</th>
                    <th scope="col" class="px-3 py-3 text-center" style="width: 15%;">작성자</th>
                    <th scope="col" class="px-3 py-3 text-center" style="width: 15%;">Comment</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="board in board_resp.boardList" :key="board.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="w-4 p-4" style="width: 5%;">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer text-center" @click="openPopup(board.idx)" style="width: 20%;">{{ board.title }}</th>
                    <td class="px-6 py-4 cursor-pointer text-center" @click="openPopup(board.idx)" style="width: 30%;">{{ board.fileName }}</td>
                    <td class="px-6 py-4 cursor-pointer text-center" @click="openPopup(board.idx)" style="width: 15%;">{{ new Date(board.createdDate).toLocaleDateString() }}</td>
                    <td class="px-6 py-4 cursor-pointer text-center" @click="openPopup(board.idx)" style="width: 15%;">{{ board.writer }}</td>
                    <td class="px-6 py-4 text-center" style="width: 15%;">
                        <a href="/board/boardform" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                            <svg class="w-4 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                            </svg>    
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-4" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">{{ currentPage * pageSize + 1 }}-{{ Math.min((currentPage + 1) * pageSize, board_resp.totalElements) }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ board_resp.totalElements }}</span></span>
            <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 mb-4">
            <li>
                <button @click="goToPreviousPage" :disabled="!hasPrevious" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
            </li>
            <li v-for="page in pageNumbers" :key="page">
                <button @click="goToPage(page)" :class="{'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === currentPage, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== currentPage}" class="flex items-center justify-center px-3 h-8 leading-tight">{{ page + 1 }}</button>
            </li>
            <li>
                <button @click="goToNextPage" :disabled="!hasNext" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
            </li>
            </ul>
        </nav>
        
        <!-- Popup Modal -->
        <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="flex flex-col mb-6 bg-white rounded-lg p-4 shadow-md">
                <div class="mb-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">과제명: </h2>
                    <button @click="closePopup">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1-18 0Z"/>
                        </svg>
                    </button>
                </div>
                <BoardDetail :boardIdx="selectedRowData"></BoardDetail>
            </div>
        </div>
    </div>
</template>

<style scoped></style>