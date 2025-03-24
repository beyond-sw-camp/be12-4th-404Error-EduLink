<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usebootcamp } from '../../stores/useBootcampStore';

const useboot = usebootcamp();

useboot.getBootcampcurry();


</script>







<template>
    <div style="background-color: whitesmoke;"
        class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
        <!-- 헤더 섹션 -->
        <section
            class="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
            <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        한화 부트캠프
                    </span>
                </h1>

                <br />

                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <div>
                        <p class="text-center text-lg text-white">
                            한화시스템의 현장 노하우와 플레이데이터의 체계적인 교육 경험을 바탕으로 만든
                        </p>
                        <p class="text-center text-lg text-white">
                            한화시스템 오프라인 백엔드 개발 부트캠프
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 강사 프로필 -->
        <section class="mt-8 px-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">강사 프로필</h2>
            <div class="flex items-center bg-white dark:bg-gray-700 shadow-lg rounded-lg p-4">
                <img src="https://cdn.pixabay.com/photo/2019/10/16/09/09/doraemon-4553920_1280.png" alt="강사 이미지"
                    class="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                <div class="ml-4">
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-white">
                        도라에몽 강사
                    </h3>
                    <ul class="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                        <li>- 한화 시스템 12기 강사</li>
                        <li>- 노진구학대 졸업</li>
                        <li>- 前 노진구보모</li>
                        <li>- 前 노진구 담당일진</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- 커리큘럼 -->
<section class="mt-8 px-4">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">커리큘럼</h2>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
        <li v-for="item in useboot.boot_camp_curry" :key="item.curriculumDay" class="mb-5 ml-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {{ item.curriculumDate }} <!-- Date of the curriculum -->
            </time>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ item.curriculumSubject }} <!-- Subject of the curriculum -->
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ item.content }} <!-- Content of the curriculum -->
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-300">
                시간 : {{ item.curriculumHours }} hours <!-- Hours of the curriculum -->
            </p>
        </li>
    </ol>
</section>

    </div>
</template>