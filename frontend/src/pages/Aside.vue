<script setup>
import axios from 'axios';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '@/stores/useMemberStore';

const router = useRouter();
const memberStore = useMemberStore();

const dashboardRoute = computed(() => {
  switch (memberStore.role) {
    case 'ROLE_INSTRUCTOR':
      return '/inst/dashboard';
    case 'ROLE_MANAGER':
      return '/manager/dashboard';
    case 'ROLE_STUDENT':
    default:
      return '/studentdashboard';
  }
});

const logout = async () => {
    try {
        await axios.post('/logout', {}, { withCredentials: true });
        memberStore.token = null;
        memberStore.role = null;
        memberStore.email = null;
        router.push("/");
    } catch (error) {
        console.error("Logout error:", error);
    }
};
</script>

<template>
    <aside id="aside"
        class="lg:py-2 lg:pl-2 w-60 fixed flex z-40 top-0 h-screen transition-position overflow-hidden -left-60 lg:left-0 lg:hidden xl:flex">
        <div class="aside lg:rounded-2xl flex-1 flex flex-col overflow-hidden dark:bg-slate-900 bg-slate-900">
            <div
                class="aside-brand flex flex-row h-14 items-center justify-between dark:bg-slate-900 bg-slate-900 text-white">
                <div class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0">
                    <b
                        class="font-black">EduLink</b></div><button class="hidden lg:inline-block xl:hidden p-3"><span
                        class="inline-flex justify-center items-center w-6 h-6"><svg viewBox="0 0 24 24" width="16"
                            height="16" class="inline-block">
                            <path fill="currentColor"
                                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                            </path>
                        </svg></span></button>
            </div>
            <div
                class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars dark:aside-scrollbars-[slate] bg-slate-800">
                <ul>
                    <li>
                        <router-link :to="dashboardRoute" aria-current="page" href="/studentdashboard"
                            class="router-link-active router-link-exact-active flex cursor-pointer py-3 aside-menu-item text-slate-300 dark:text-slate-300 hover:text-white dark:hover:text-white">
                            <span
                                class="inline-flex justify-center items-center w-16 h-6 flex-none aside-menu-item-active font-bold">
                                <svg viewBox="0 0 24 24" width="18" height="18" class="inline-block">
                                    <path fill="currentColor"
                                        d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z">
                                    </path>
                                </svg>
                            </span>
                            <span
                                class="grow text-ellipsis line-clamp-1 pr-12 aside-menu-item-active font-bold">Dashboard</span><!--v-if-->
                        </router-link><!--v-if-->
                    </li>
                    <li>
                        <a href="/board/freeboard"
                            class="flex cursor-pointer py-3 aside-menu-item dark:text-slate-300 dark:hover:text-white hover:text-white text-slate-300">
                            <span class="inline-flex justify-center items-center w-16 h-6 flex-none">
                                <svg viewBox="0 0 24 24" width="18" height="18" class="inline-block">
                                    <path fill="currentColor"
                                        d="M21,17V5H3V17H21M21,3A2,2 0 0,1 23,5V17A2,2 0 0,1 21,19H16V21H8V19H3A2,2 0 0,1 1,17V5A2,2 0 0,1 3,3H21M5,7H11V11H5V7M5,13H11V15H5V13M13,7H19V9H13V7M13,11H19V15H13V11Z">
                                    </path>
                                </svg>
                            </span>
                            <span class="grow text-ellipsis line-clamp-1 pr-12">Board</span><!--v-if-->
                        </a><!--v-if-->
                    </li>
                </ul>
            </div>
            <ul>
                <li>
                    <button @click="logout"
                        class="flex items-center w-full cursor-pointer py-3 border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600">
                        <span class="inline-flex justify-center items-center w-16 h-6 flex-none">
                            <svg viewBox="0 0 24 24" width="18" height="18" class="inline-block">
                                <path fill="currentColor"
                                    d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z">
                                </path>
                            </svg>
                        </span>
                        <span class="flex-grow text-ellipsis line-clamp-1">Logout</span>
                    </button>

                </li>
            </ul>
        </div>
    </aside>
</template>

<style scoped></style>