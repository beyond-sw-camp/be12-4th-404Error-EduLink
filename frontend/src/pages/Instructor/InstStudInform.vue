<script setup>
import TableBoard from './components/TableBoard.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useInstructorStore } from '../../stores/useInstructorStore';
import TableBoardStudInform from './components/TableBoardStudInform.vue';

const route = useRoute();
const instructorStore = useInstructorStore();

const userIdx = ref(route.params.userIdx);
const studentDetail_resp = ref([]);
console.log(userIdx.value);
const isLoading = ref(false);

const boardTypeList = ref({
    noti: 0,
    comm: 1,
    test: 2,
    data: 3,
    hw: 4,
    qa: 5
});

watch(() => route.params.userIdx, (newVal) => {
    userIdx.value = newVal;
});

const fetchStudentDetail = async () => {
    isLoading.value = true;
    await instructorStore.fetchStudentDetail(userIdx.value)
    if (instructorStore.studentDetail_res.isSuccess==true) {
        studentDetail_resp.value = instructorStore.studentDetail_res.data
        console.log(studentDetail_resp.value);
    } else {
        console.log(instructorStore.studentDetail_res);
    }
}

onMounted(fetchStudentDetail);
</script>

<template>
    <div style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
        <section class="p-6 xl:max-w-6xl xl:mx-auto bg-gray-100 dark:bg-gray-900">
            <div class="flex">
                <!-- Card 0 -->
                <div class="w-full md:w-1/2 p-4 flex flex-col">
                    <div class="flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 flex-grow">
                        <img class="w-16 h-16 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Student Image">
                        <div>
                        <p v-if="isLoading" class="text-xl font-bold text-gray-800 dark:text-gray-100">{{studentDetail_resp.name}}</p>
                        <p v-if="isLoading" class="text-sm text-gray-500 dark:text-gray-400">{{studentDetail_resp.email}}</p>
                        <p v-if="isLoading" class="text-sm text-gray-500 dark:text-gray-400">{{studentDetail_resp.birth}}</p>
                        <p v-if="isLoading" class="text-sm text-gray-500 dark:text-gray-400">{{studentDetail_resp.studentDetail.address}}</p>
                    </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 w-1/2 p-4 bg-gray-100 dark:bg-gray-900">
                    <!-- Card 1 -->
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                        <p class="text-sm font-medium text-gray-500">출석</p>
                        <p v-if="isLoading" class="text-2xl font-bold text-gray-800">{{studentDetail_resp.studentDetail.attendance}}</p>
                        </div>
                        <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10 text-primary dark:text-accent" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                        <p class="text-sm font-medium text-gray-500">남은 휴가</p>
                        <p v-if="isLoading" class="text-2xl font-bold text-gray-800">{{studentDetail_resp.studentDetail.vacationLeft}}</p>
                        </div>
                        <div class="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
                        </svg>
                        </div>
                    </div>

                    <!-- Card 3 -->
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                        <p class="text-sm font-medium text-gray-500">지각</p>
                        <p v-if="isLoading" class="text-2xl font-bold text-gray-800">{{studentDetail_resp.studentDetail.perception}}</p>
                        </div>
                        <div class="flex items-center justify-center w-10 h-10 bg-pink-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
                        </svg>
                        </div>
                    </div>

                    <!-- Card 4 -->
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                        <p class="text-sm font-medium text-gray-500">조퇴</p>
                        <p v-if="isLoading" class="text-2xl font-bold text-gray-800">{{studentDetail_resp.studentDetail.leaveEarly}}</p>
                        </div>
                        <div class="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
                        </svg>
                        </div>
                    </div>

                    <!-- Card 5 -->
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                        <p class="text-sm font-medium text-gray-500">외출</p>
                        <p v-if="isLoading" class="text-2xl font-bold text-gray-800">{{studentDetail_resp.studentDetail.outing}}</p>
                        </div>
                        <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
                        </svg>
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                        <div>
                        <p class="text-sm font-medium text-gray-500">조퇴</p>
                        <p v-if="isLoading" class="text-2xl font-bold text-gray-800">{{studentDetail_resp.studentDetail.attendance}}</p>
                        </div>
                        <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
                        </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col mb-6 bg-white rounded-lg p-4 shadow-md">
                <div class="mb-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">게시판 목록</h2>
                </div>
                <TableBoardStudInform :boardType="boardTypeList.comm" :userIdx="userIdx"></TableBoardStudInform>  
            </div>
            <div class="flex flex-col mb-6 bg-white rounded-lg p-4 shadow-md">
                <div class="mb-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">과제 현황</h2>
                </div>
                <TableBoardStudInform :boardType="boardTypeList.hw" :userIdx="userIdx"></TableBoardStudInform>  
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>