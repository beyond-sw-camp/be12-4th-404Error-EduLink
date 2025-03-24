<script setup>
import { onMounted, ref } from 'vue';
import { useInstructorStore } from '../../../stores/useInstructorStore';

const props = defineProps({
    subject: {
        type: String,
        required: true
    }
});

const instructorStore = useInstructorStore();
const curr_res = ref([]);
const showPopup = ref(false);

const fetchCurr = async () => {
    await instructorStore.fetchCurr(props.subject);
    if (instructorStore.curr_res.isSuccess) {
        curr_res.value = instructorStore.curr_res.data;
    } else {
        console.log(instructorStore.curr_res);
    }
};

const toggleDrawer = () => {
    showPopup.value = !showPopup.value;
    if (showPopup.value) {
        fetchCurr();
    }
};

</script>

<template>
    <!-- Card 1 -->
    <div class="rounded-lg shadow-md bg-white border-l-4 border-blue-500 p-4 flex flex-col justify-between min-w-[250px] max-w-[300px]">
        <h3 class="font-semibold text-lg text-slate-800"> {{props.subject}}</h3>
        <div class="mt-4 relative h-2 bg-gray-200 rounded">
            <div class="absolute top-0 left-0 h-full bg-blue-500 rounded" style="width: 25%;"></div>
        </div>
        <div class="flex justify-between items-center mt-2">
            <span class="text-blue-500 font-medium">Advanced</span>
            <a href="#" class="text-blue-500 hover:text-blue-600" @click="toggleDrawer">→</a>
        </div>
    </div>

    <!-- Popup Modal -->
    <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-4 shadow-md w-1/2">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-800">{{props.subject}}</h2>
                <button @click="toggleDrawer">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1-18 0Z"/>
                    </svg>
                </button>
            </div>
            <div v-if="curr_res.length">
                <table class="min-w-full bg-white border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="py-2 px-4 border">일수</th>
                            <th class="py-2 px-4 border">일자</th>
                            <th class="py-2 px-4 border">내용</th>
                            <th class="py-2 px-4 border">편성시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="curr in curr_res" :key="curr.idx" class="hover:bg-gray-50">
                            <td class="py-2 px-4 border text-center">{{ curr.curriculumDay }}</td>
                            <td class="py-2 px-4 border">{{ curr.curriculumDate }}</td>
                            <td class="py-2 px-4 border">{{ curr.content }}</td>
                            <td class="py-2 px-4 border text-center">{{ curr.curriculumHours }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <p>No curriculum details available.</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>