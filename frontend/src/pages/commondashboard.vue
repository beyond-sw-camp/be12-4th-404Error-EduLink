





<template>
<div style="background-color: whitesmoke;"
class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50x dark:bg-slate-800 dark:text-slate-100"  >
<form style="margin-top: 300px;"

        class="rounded-2xl flex-col dark:bg-slate-900/70 hover:shadow-lg transition-shadow duration-500 bg-white flex md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto">
        <div class="flex-1 p-6">
          <div class="flex flex-col mb-6 -mt-6 -mr-6 -ml-6 animate-fade-in" is-placed-with-header="true">
            <div class="bg-blue-500 border-blue-500 text-white rounded-t-2xl flex flex-col p-6 transition-colors">
              <span><b class="capitalize">부트캠프</b> Code</span></div>
          </div>
          <div class="mb-6 last:mb-0"> 
            <div class="">
              <div class="relative"
                icon-left="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                help="Your full name"><input placeholder="부트캠프 코드" type="text"
                  class="px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-slate-800"><!--v-if-->
              </div>
            </div><!--v-if-->
          </div>
        </div>
        <footer class="p-6"><button
            class="inline-flex justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border cursor-pointer rounded border-blue-600 dark:border-blue-500 ring-blue-300 dark:ring-blue-700 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600 py-2 px-3"
            type="submit"><!--v-if--><span class="px-2">확인</span></button></footer>
      </form>
</div>


</template>