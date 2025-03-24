<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '../stores/useMemberStore';

const memberStore = useMemberStore()
const router = useRouter();
const loginUser = ref({
    email: '',
    password: '',
});
const userRole = ref('student');

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const result = await memberStore.login(loginUser.value);
        if (result.isSuccess) {
            console.log('로그인 성공');
            console.log(result.role);
            login(result.role);
        }
        else {
            console.log('로그인 실패');
        }
    }
    catch (error) {
        console.error('Login failed: ', error);
    }
    finally {
    }
};

const login = (role) => {
    let dashboardUrl = '';
    switch (role) {
        case 'ROLE_STUDENT':
            dashboardUrl = '/studentdashboard';
            break;
        case 'ROLE_INSTRUCTOR':
            dashboardUrl = '/inst/dashboard';
            break;
        case 'ROLE_MANAGER':
            dashboardUrl = '/manager/dashboard';
            break;
    }
    router.push(dashboardUrl);
};
</script>

<template>
    <div class="bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
        <div
            class="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500">
            <form @submit="handleSubmit"
                class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                <div class="flex-1 p-6">
                    <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">E-Mail</label>
                        <div class="">
                            <div class="relative">
                                <input v-model="loginUser.email" name="email" autocomplete="email" type="text"
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
                        <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">Please enter your email</div>
                    </div>
                    <div class="mb-6 last:mb-0">
                        <label class="block font-bold mb-2">Password</label>
                        <div class="">
                            <div class="relative"><input v-model="loginUser.password" name="password"
                                    autocomplete="current-password" type="password"
                                    class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10">
                                <span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400">
                                    <svg viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">Please enter your password</div>
                    </div>
                    <label class="checkbox">
                        <input type="checkbox" name="remember" value="true">
                        <span class="check"></span>
                        <span class="pl-2">Remember</span>
                    </label>
                </div>
                <footer class="p-6">
                    <div class="flex items-center justify-start flex-wrap -mb-3">
                        <button
                            class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3 mr-3 last:mr-0 mb-3"
                            type="submit" @click="handleSubmit">
                            <span class="px-2">로그인</span>
                        </button>
                        <a href="/Signup"
                            class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 text-blue-600 dark:text-blue-500 hover:bg-blue-600 hover:text-white hover:dark:text-white hover:dark:border-blue-600 py-2 px-3 mr-3 last:mr-0 mb-3"
                            disabled="false">
                            <span class="px-2">회원가입</span>
                        </a>
                    </div>
                </footer>
            </form>
        </div>
    </div>
</template>