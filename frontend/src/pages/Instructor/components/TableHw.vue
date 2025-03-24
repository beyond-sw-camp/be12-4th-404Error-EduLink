<script setup>
import { onMounted, ref, computed } from 'vue';
import { useInstructorStore } from '../../../stores/useInstructorStore';
import BoardDetail from './BoardDetail.vue';

const instructorStore = useInstructorStore();

const showPopup = ref(false);
const selectedRowData = ref(null);
const showPopup2 = ref(false);
const selectedRowData2 = ref(null);

const hw_resp = ref([]);
const currentPage = ref(0);
const pageSize = 5;

const hasPrevious = computed(() => currentPage.value > 0);
const hasNext = computed(() => hw_resp.value.totalPages > currentPage.value + 1);

const pageNumbers = computed(() => {
    const totalPages = hw_resp.value.totalPages || 0;
    const startPage = Math.floor(currentPage.value / 5) * 5;
    return Array.from({ length: Math.min(5, totalPages - startPage) }, (_, i) => startPage + i);
});

const fetchHw = async () => {
    await instructorStore.fetchHw(currentPage.value, pageSize);
    if (instructorStore.hw_res.isSuccess) {
        hw_resp.value = instructorStore.hw_res.data;
    } else {
        console.log(instructorStore.hw_res);
    }
};

const fetchDelete = async (boardIdx) => {
    await instructorStore.fetchDelete(boardIdx);
    if (instructorStore.delete_res.isSuccess) {
        fetchHw();
    } else {
        console.log(instructorStore.delete_res);
    }
};

onMounted(fetchHw);

const openPopup = (row) => {
    selectedRowData.value = row;
    console.log(selectedRowData.value);
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};

const openPopup2 = (row) => {
    selectedRowData2.value = row;
    showPopup2.value = true;
};

const closePopup2 = () => {
    showPopup2.value = false;
};

const goToPage = (page) => {
    currentPage.value = page;
    fetchHw();
};

const goToPreviousPage = () => {
    if (hasPrevious.value) {
        currentPage.value -= 1;
        fetchHw();
    }
};

const goToNextPage = () => {
    if (hasNext.value) {
        currentPage.value += 1;
        fetchHw();
    }
};

const deleteBoard = () => {
    fetchDelete(selectedRowData2.value);
    closePopup2();
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
                    <th scope="col" class="px-3 py-3 text-center" style="width: 15%;">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="hw in hw_resp.boardList" :key="hw.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="w-4 p-4" style="width: 5%;">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer text-center" @click="openPopup(hw.idx)" style="width: 20%;">{{ hw.title }}</th>
                    <td class="px-6 py-4 cursor-pointer text-center" @click="openPopup(hw.idx)" style="width: 30%;">{{ hw.fileName }}</td>
                    <td class="px-6 py-4 cursor-pointer text-center" @click="openPopup(hw.idx)" style="width: 15%;">{{ new Date(hw.createdDate).toLocaleDateString() }}</td>
                    <td class="px-6 py-4 cursor-pointer text-center" @click="openPopup(hw.idx)" style="width: 15%;">{{ hw.writer }}</td>
                    <td class="px-6 py-4 text-center" style="width: 15%;">
                        <a href="/board/boardform" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                            <svg class="w-4 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                            </svg>    
                        </a>
                        <button @click="openPopup2(hw.idx)" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                            <svg class="w-4 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 px-4" aria-label="Table navigation">
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">{{ currentPage * pageSize + 1 }}-{{ Math.min((currentPage + 1) * pageSize, hw_resp.totalElements) }}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{ hw_resp.totalElements }}</span></span>
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

    <!-- 삭제 팝업 -->
    <div v-if="showPopup2" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" @click="closePopup2" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1-18 0Z"/>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this homework?</h3>
                    <button type="button" @click="deleteBoard" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                        Yes, I'm sure
                    </button>
                    <button type="button" @click="closePopup2" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>