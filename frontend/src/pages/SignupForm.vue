<script setup>
import { ref } from 'vue'
import { useMemberStore } from '../stores/useMemberStore';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const memberStore = useMemberStore()
const checkPassword = ref("");
const selectedRole = ref("STUDENT");
const signupuser = ref({
    email: "",
    password: "",
    name: "",
    birth: ""
})
const signup = async () => {
    console.log(signupuser.value);

    if (signupuser.value.password !== checkPassword.value) {
        showError("비밀번호가 일치하지 않습니다.");
        return;
    }
    try {
        const response = await memberStore.signup(signupuser.value, selectedRole.value);
        console.log("Signup success:", response);
        alert('회원가입이 완료되었습니다.');
        router.push("/");
    } catch (error) {
        if (error.response) {
            // 서버에서 반환한 에러 메시지 처리
            const errorMessage = error.response.data.errorMessage;
            showError(errorMessage);
        } else {
            // 네트워크 에러 또는 서버와의 연결 문제
            showError("서버와 연결할 수 없습니다. 다시 시도해주세요.");
        }
    }
}

const errorMessage = ref("");

function showError(message) {
    errorMessage.value = message;
}




</script>

<!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 
 일단 제 서버에 연결해서 회원가입 은 가능한디 
 try문 손대야함
 -->



<template>

    <div class="bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
        <div
            class="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500">
            <form
                class="rounded-2xl flex-col dark:bg-slate-900/70 bg-white flex w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
                <div class="flex-1 p-6">

                    <div v-if="errorMessage" class="p-4 mb-4 text-red-700 bg-red-100 border border-red-500 rounded">
                        {{ errorMessage }}
                    </div>

                    <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">이름</label>
                        <div class="">
                            <div class="relative"><input name="name" autocomplete="name" type="text"
                                    v-model="signupuser.name"
                                    class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10"><span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                        viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                                        </path>
                                    </svg></span></div>
                        </div>
                    </div>
                    <div class="mb-6 last:mb-0"><label class="block font-bold mb-2"> 아이디</label>
                        <div class="">
                            <div class="relative"><input name="email" autocomplete="email" type="text" required
                                    v-model="signupuser.email"
                                    class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10"><span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                        viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                                        </path>
                                    </svg></span></div>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">아이디를 입력해주세요</div>
                    </div>
                    <div class="mb-6 last:mb-0"><label class="block font-bold mb-2"> 생년월일</label>
                        <div class="">
                            <div class="relative"><input name="birth" autocomplete="birth" type="date" required
                                    v-model="signupuser.birth"
                                    class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10"><span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                        viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z">
                                        </path>
                                    </svg></span></div>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">생년월일을 입력해주세요</div>
                    </div>
                    <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">비밀번호</label>
                        <div class="">
                            <div class="relative"><input name="password" autocomplete="current-password" type="password"
                                    required v-model="signupuser.password"
                                    class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10"><span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                        viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z">
                                        </path>
                                    </svg></span></div>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">비밀번호를 입력해주세요.</div>
                    </div>
                    <div class="mb-6 last:mb-0"><label class="block font-bold mb-2">비밀번호 확인</label>
                        <div class="">
                            <div class="relative"><input name="confirm_password" autocomplete="current-password"
                                    v-model="checkPassword" type="password"
                                    class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800 pl-10"><span
                                    class="inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"><svg
                                        viewBox="0 0 24 24" width="16" height="16" class="inline-block">
                                        <path fill="currentColor"
                                            d="M21 13H14.4L19.1 17.7L17.7 19.1L13 14.4V21H11V14.3L6.3 19L4.9 17.6L9.4 13H3V11H9.6L4.9 6.3L6.3 4.9L11 9.6V3H13V9.4L17.6 4.8L19 6.3L14.3 11H21V13Z">
                                        </path>
                                    </svg></span></div>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-slate-400 mt-1">비밀번호 확인</div>
                    </div>

                    <!--추후 이메일 인증 방식으로 변경 예정-->
                    <select v-model="selectedRole" class="mr-3 border border-gray-300 rounded px-2 py-1">
                        <option value="STUDENT">학생</option>
                        <option value="INSTRUCTOR">강사</option>
                        <option value="MANAGER">관리자</option>
                    </select>



                    <label class="checkbox"><input type="checkbox" name="remember" value="true"><span
                            class="check"></span><span class="pl-2">가입 동의</span></label>
                </div>
                <footer class="p-6">
                    <div class="flex items-center justify-start flex-wrap -mb-3"><button @click="signup" type="button"
                            class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3 mr-3 last:mr-0 mb-3"><!--v-if--><span
                                class="px-2">회원가입</span></button><a href="/"
                            class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 text-blue-600 dark:text-blue-500 hover:bg-blue-600 hover:text-white hover:dark:text-white hover:dark:border-blue-600 py-2 px-3 mr-3 last:mr-0 mb-3"
                            disabled="false"><!--v-if--><span class="px-2">로그인</span></a></div>
                </footer>
            </form>
        </div>
    </div>


</template>