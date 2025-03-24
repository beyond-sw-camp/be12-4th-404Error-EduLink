<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useMemberStore } from '@/stores/useMemberStore';
import { useRouter } from 'vue-router';

const userInfo = ref({});
const studentDetail = ref({});
const instructorDetail = ref({});
const loading = ref(true);
const errorMessage = ref("");
const memberStore = useMemberStore();
const router = useRouter();
const updateMessage = ref('');

const form = ref({
    birth: '',
    password: '',
    profileUrl: '',
    address: '',
    portfolio: '',
    record: ''
});

const selectedProfileImage = ref(null);

const updateUserInfo = async () => {
    console.log("Form data to update:", form.value);
    try {
        const response = await axios.post('/user/update', form.value, { withCredentials: true });
        console.log("Update successful:", response.data);
        updateMessage.value = '회원정보가 성공적으로 수정되었습니다.';
    } catch (error) {
        console.error("Update failed:", error);
        updateMessage.value = '회원정보 수정에 실패했습니다.';
    }
};

const onProfileImageSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    selectedProfileImage.value = file;

    try {
        const response = await axios.post('', {
            fileName: file.name,
            contentType: file.type
        }, { withCredentials: true });

        const { preSignedUrl, fileKey } = response.data;

        await axios.put(preSignedUrl, file, {
            headers: {
                "Content-Type": file.type
            }
        });

        form.value.profileUrl = fileKey;
        console.log("Profile image uploaded successfully:", fileKey);
    } catch (error) {
        console.error("Error uploading profile image", error);
    }
};

const getUserInfo = async () => {
    try {
        const response = await axios.get("/user/info", { withCredentials: true });
        userInfo.value = response.data.data;

        if (userInfo.value.role === 'ROLE_STUDENT') {
            studentDetail.value = userInfo.value.studentDetail ? { ...userInfo.value.studentDetail } : {};
            form.value.address = studentDetail.value.address || '';
        } else if (userInfo.value.role === 'ROLE_INSTRUCTOR') {
            instructorDetail.value = userInfo.value.instructor
                ? { ...userInfo.value.instructor }
                : {};
            form.value.portfolio = instructorDetail.value.portfolio || '';
            form.value.record = instructorDetail.value.record || '';
        }

        form.value.birth = userInfo.value.birth || '';

        console.log("Fetched studentDetail:", userInfo.value);
        console.log("Fetched studentDetail:", userInfo.value.portfolio);
    } catch (error) {
        console.error("Error fetching user info:", error);
        errorMessage.value = "회원 정보를 불러오지 못했습니다.";
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getUserInfo();
});

</script>

<template>
    <section class="p-6 xl:max-w-6xl xl:mx-auto pt-20 pl-64">
        <section class="mb-6 flex items-center justify-between">
            <div class="flex items-center justify-start"><span
                    class="inline-flex justify-center items-center w-12 h-12 rounded-full bg-white text-black dark:bg-slate-900/70 dark:text-white mr-3"><svg
                        viewBox="0 0 24 24" width="24" height="24" class="inline-block">
                        <path fill="currentColor"
                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                        </path>
                    </svg></span>
                <h1 class="text-3xl leading-tight">회원 정보</h1>
            </div>
        </section>
        <div class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex mb-6">
            <div class="flex-1 p-6">
                <div class="justify-around lg:justify-center items-center block md:flex">
                    <div class="flex items-center justify-center mb-6 md:mb-0">
                        <div class="lg:mx-12">
                            <img :src="userInfo.profileUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=doe-doe-doe-example-com'"
                                alt="John Doe"
                                class="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800" />
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <div class="space-y-3 text-center md:text-left lg:mx-12">
                            <div class="flex justify-center md:block"><label class="switch"><span
                                        class="check"></span></label></div>
                            <h1 class="text-2xl"> 안녕하세요, <b>{{ userInfo.name }}</b>님! </h1>

                        </div>
                    </div>
                </div>
            </div><!---->
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" @submit.prevent="updateUserInfo">
            <form class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
                <div class="flex-1 p-6">
                    <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">프로필 사진</label>
                        <div class="">
                            <div class="flex items-stretch justify-start relative"><label class="inline-flex"><a
                                        class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3"
                                        disabled="false">
                                        <span class="inline-flex justify-center items-center w-6 h-6"><svg
                                                viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                                <path fill="currentColor"
                                                    d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z"></path>
                                            </svg>
                                        </span>
                                        <span class="px-2">Upload</span>
                                    </a>
                                    <input type="file" @change="onProfileImageSelected" class="absolute top-0 left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-1"></label><!---->
                            </div>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">Max 500kb</div>
                    </div>
                    <div v-if="loading">정보를 불러오는 중...</div>
                    <div v-else-if="userInfo" class="mb-6 last:mb-0"><label class="block font-bold mb-2">이름</label>
                        <div class="">
                            <div class="relative">
                                <span
                                    class="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-gray-200 dark:bg-slate-800 pl-10 inline-block">{{
                                        userInfo.name }}</span>
                                <span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-if="userInfo.email" class="mb-6 last:mb-0"><label class="block font-bold mb-2">E-mail</label>
                        <div class="">
                            <div class="relative">
                                <span
                                    class="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-gray-200 dark:bg-slate-800 pl-10 inline-block">{{
                                        userInfo.email }}</span>
                                <span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                        viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M17,17H7V15H17M17,13H7V11H17M20,9H17V6H20">
                                        </path>
                                    </svg></span>
                            </div>
                        </div>
                    </div>
                    <div v-if="userInfo.birth" class="mb-6 last:mb-0">
                        <label class="block font-bold mb-2">생년월일</label>
                        <div class="">
                            <div class="relative">
                                <input name="birth" autocomplete="birth" type="date" :value="userInfo.birth"
                                    class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10">
                                <span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="memberStore.role === 'ROLE_STUDENT'"
                    class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
                    <div class="flex-1 p-6">
                        <div class="mb-6 last:mb-0">
                            <label class="block font-bold mb-2">주소</label>
                            <div class="">
                                <div class="relative">
                                    <input name="address" autocomplete="address" type="text" v-model="form.address"
                                        :placeholder="userInfo.studentDetail?.address || '주소 입력'"
                                        class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10" />

                                    <span
                                        class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                            viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                            <path fill="currentColor"
                                                d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z">
                                            </path>
                                        </svg></span>
                                </div>
                            </div>
                        </div>

                        <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">출석일수</label>
                            <div class="">
                                <div class="relative">
                                    <span
                                        class="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-gray-200 dark:bg-slate-800 pl-10 inline-block">
                                        {{ userInfo.studentDetail?.attendance || '' }}
                                    </span>
                                    <span
                                        class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                            viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                            <path fill="currentColor"
                                                d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z">
                                            </path>
                                        </svg></span>
                                </div>
                            </div>
                        </div>
                        <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">조퇴일수</label>
                            <div class="">
                                <div class="relative">
                                    <span
                                        class="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-gray-200 dark:bg-slate-800 pl-10 inline-block">
                                        {{ userInfo.studentDetail?.leaveEarly || '' }}
                                    </span>
                                    <span
                                        class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                            viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                            <path fill="currentColor"
                                                d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z">
                                            </path>
                                        </svg></span>
                                </div>
                            </div>
                        </div>
                        <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">지각일수</label>
                            <div class="">
                                <div class="relative">
                                    <span
                                        class="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-gray-200 dark:bg-slate-800 pl-10 inline-block">
                                        {{ userInfo.studentDetail?.perception || '' }}
                                    </span>
                                    <span
                                        class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                            viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                            <path fill="currentColor"
                                                d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z">
                                            </path>
                                        </svg></span>
                                </div>
                            </div>
                        </div>
                        <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">외출일수</label>
                            <div class="">
                                <div class="relative">
                                    <span
                                        class="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-gray-200 dark:bg-slate-800 pl-10 inline-block">
                                        {{ userInfo.studentDetail?.outing || '' }}
                                    </span>
                                    <span
                                        class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                            viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                            <path fill="currentColor"
                                                d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z">
                                            </path>
                                        </svg></span>
                                </div>
                            </div>
                        </div>
                        <div class="mb-6 last:mb-0">
                            <label class="block font-bold mb-2">남은 휴가 일수</label>
                            <div class="">
                                <div class="relative">
                                    <span
                                        class="px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-gray-200 dark:bg-slate-800 pl-10 inline-block">
                                        {{ userInfo.studentDetail?.vacationLeft || '' }}
                                    </span>

                                    <span
                                        class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                                        <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                            <path fill="currentColor"
                                                d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z">
                                            </path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
                <div v-else-if="memberStore.role === 'ROLE_INSTRUCTOR'"
                    class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex">
                    <div class="flex-1 p-6">
                        <div class="mb-6 last:mb-0">
                            <label class="block font-bold mb-2">포트폴리오</label>
                            <div class="">
                                <div class="relative">
                                    <input name="portfolio" autocomplete="portfolio" type="text"
                                        v-model="form.portfolio" :placeholder="userInfo?.portfolio || '포트폴리오 입력'"
                                        class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10"><span
                                        class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                            viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                            <path fill="currentColor"
                                                d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z">
                                            </path>
                                        </svg></span>
                                </div>
                            </div>
                        </div>

                        <hr class="my-6 -mx-6 dark:border-slate-800 border-t border-gray-100">
                        <div class="mb-6 last:mb-0">
                            <label class="block font-bold mb-2">경력</label>
                            <div class="">
                                <div class="relative">
                                    <input name="record" autocomplete="record" type="text" v-model="form.record"
                                        :placeholder="userInfo?.record || '경력 입력'"
                                        class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10"><span
                                        class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                            viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                            <path fill="currentColor"
                                                d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20M8.5,12A1.5,1.5 0 0,0 7,10.5A1.5,1.5 0 0,0 5.5,12A1.5,1.5 0 0,0 7,13.5A1.5,1.5 0 0,0 8.5,12M13,10.89C12.39,10.33 11.44,10.38 10.88,11C10.32,11.6 10.37,12.55 11,13.11C11.55,13.63 12.43,13.63 13,13.11V10.89Z">
                                            </path>
                                        </svg></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <footer class="p-6">
                    <div class="flex items-center justify-start flex-wrap -mb-3">
                        <button type="submit"
                            class="inline-flex justify-center items-center whitespace-nowrap transition-colors duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3 mr-3 mb-3">
                            <span class="px-2">Submit</span>
                        </button>
                        <button type="button"
                            class="inline-flex justify-center items-center whitespace-nowrap transition-colors duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 text-blue-600 dark:text-blue-500 hover:bg-blue-600 hover:text-white hover:dark:text-white hover:dark:border-blue-600 py-2 px-3 mr-3 mb-3">
                            <span class="px-2">Options</span>
                        </button>
                    </div>
                </footer>
            </form>
        </div>

    </section>
</template>