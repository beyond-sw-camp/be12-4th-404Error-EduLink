<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    assignment: {
      type: Array,
      required: true,
    },
});
</script>



<template>
    <li  class="mb-10 ms-6">
               <span
                  class="absolute flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900 dark:text-blue-300">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                     <path
                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
               </span>
               <h3 class="mb-1 text-lg font-semibold text-gray-800 dark:text-white">{{ assignment.title }}</h3>
               <time class="block mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">{{ assignment.date
                  }}</time>
               <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">{{ assignment.contents }}</p>
            </li>
  </template>
  
