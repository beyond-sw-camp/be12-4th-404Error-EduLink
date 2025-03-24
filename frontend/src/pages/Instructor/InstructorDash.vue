<script setup>
import { ref, computed, onMounted } from 'vue';
import CourseCard from './components/CourseCard.vue';
import TableHw from './components/TableHw.vue';
import TableBoard from './components/TableBoard.vue';
import UserCard2 from './components/UserCard2.vue';
import { useInstructorStore } from '../../stores/useInstructorStore';

const instructorStore = useInstructorStore();

const boardTypeList = ref({
    noti: 0,
    comm: 1,
    test: 2,
    data: 3,
    hw: 4,
    qa: 5
});

const student_resp = ref([]);
const course_resp = ref([]);
const isLoading = ref(false);
const courseLoaded = ref(false);

const uniqueSubjects = computed(() => {
    const subjects = course_resp.value?.curriculumList?.map(item => item.curriculumSubject) || [];
    return [...new Set(subjects)];
});

onMounted(async () => {
    isLoading.value = true;
    try {
        // fetchStudent 호출
        await instructorStore.fetchStudent().then(() => {
            if (instructorStore.student_res.isSuccess) {
                student_resp.value = instructorStore.student_res.data;
            } else {
                console.log(instructorStore.student_res);
            }
        });

        // fetchCourse 호출
        await instructorStore.fetchCourse(6).then(() => {
            if (instructorStore.course_res.isSuccess) {
                course_resp.value = instructorStore.course_res.data;
                courseLoaded.value = true; // 성공 시 courseLoaded를 true로 설정
                console.log(course_resp.value);
                console.log(courseLoaded.value);
            } else {
                console.log(instructorStore.course_res);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div style="background-color: whitesmoke;"
    class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
        <section class="p-6 xl:max-w-6xl xl:mx-auto">
            <div class="flex flex-col mb-6 bg-white rounded-lg p-4 shadow-md">
                <div class="mb-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">커리큘럼</h2>
                    <a href="/inst/registercur" type="button" class="text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-300 focus:outline-none dark:focus:ring-blue-600 flex items-center">
                        Create
                        <svg class="w-4 h-4 text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1-18 0Z"/>
                        </svg>
                    </a>
                </div>
                <div class="flex flex-wrap gap-4">
                    <CourseCard v-for="subject in uniqueSubjects" :key="subject" :subject="subject" class="mb-4"></CourseCard>
                </div>
            </div>
            <div class="flex flex-col mb-6 bg-white rounded-lg p-4 shadow-md">
                <div class="mb-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">과제 목록</h2>
                    <a href="/board/boardform" type="button" class="text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-300 focus:outline-none dark:focus:ring-blue-600 flex items-center">
                    Create
                    <svg class="w-4 h-4 text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    </a>
                </div>
                <TableBoard :boardType="boardTypeList.hw"></TableBoard>  
            </div>
            <div class="flex flex-col mb-6 bg-white rounded-lg p-4 shadow-md">
                <div class="mb-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">자료 목록</h2>
                    <a href="/board/boardform" type="button" class="text-white bg-blue-500 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-300 focus:outline-none dark:focus:ring-blue-600 flex items-center">
                    Create
                    <svg class="w-4 h-4 text-white ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1-18 0Z"/>
                    </svg>
                    </a>
                </div>
                <TableBoard :boardType="boardTypeList.data"></TableBoard>
            </div>
            <div class="flex flex-col mb-6 bg-white rounded-lg p-4 shadow-md">
                <div class="mb-4 flex justify-between items-center">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">학생 목록</h2>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-4 bg-white rounded-lg p-2 shadow-md">
                    <UserCard2
                        v-for="student in student_resp.studentList"
                        :key="student.id"
                        :student="student"
                    ></UserCard2>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>