<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Datepicker from 'vue3-datepicker';
import { useStudentStore } from '../../stores/useStudentStore'
import { onMounted } from 'vue'

const usestudent = useStudentStore();
const startDate = ref(null);
const endDate = ref(null);
const router = useRouter();

const vacationData = ref({
  name: '',
  startDate: null,
  endDate: null,
  logType: '',
  description: '',
  createdAt: new Date().toISOString().split('T')[0]
});


const leaveData = ref({
  name: '',
  description: ''
});


// 임시. 백엔드가 없으므로 임의로 팝업을 닫는다.
// const showPopup1 = ref(false);
// const showPopup2 = ref(false);
const setString = ref('');
const userIdx = 5; 
onMounted(async () => {
    try {
        await usestudent.get_dashboard();
    } catch (error) {
        console.error('Error in get_dashboard:', error);
    }
});
const curriculum = ref([]);  

// Drawer의 열림 상태를 관리하는 변수
const isDrawerOpen = ref(false);



const handleClick = async (subject) => {
   await usestudent.get_curriculum(subject);
   curriculum.value = usestudent.curriculum;  // curriculum store에서 가져온 데이터를 ref에 할당

   toggleDrawer(); // Drawer 열기
   console.log('Curriculum:', curriculum.value);  // 가져온 curriculum 데이터 출력
};

// Drawer를 열거나 닫는 함수
const toggleDrawer = () => {
   isDrawerOpen.value = !isDrawerOpen.value;
};

// const handleSubmit = async (event) => {
//    event.preventDefault();

//    const formData = new FormData(event.target);
//    const data = Object.fromEntries(formData.entries());

//    try {
//       const response = await axios.post('/api/submit', data, {
//          headers: {
//             'Content-Type': 'application/json',
//          },
//       });

//       if (response.ok) {
//          console.log('Form submitted successfully');
//       } else {
//          console.error('Form submission failed');
//       }
//    } catch (error) {
//       console.error('Error submitting form:', error);
//    } finally {  
//       window.location.reload();
//    }
// };
const getColorForDay = (day) => {
  const dayOfWeek = new Date(day).getDay();
  switch (dayOfWeek) {
    case 0:
      return 'red';  // Sunday
    case 1:
      return 'blue'; // Monday
    case 2:
      return 'green'; // Tuesday
    // 나머지 요일에 대한 색상 처리
    default:
      return 'gray'; // Default color
  }



  
};

const handleSubmit = async (formType) => {
  let data = {};
  
  if (formType === 'vacation') {
    data = vacationData.value;
    try {
    const response = await axios.post('/api/student/apply', data);
    alert(`${formType === 'vacation' ? '휴가' : '조퇴'} 신11청이 완료되었습니다!`);
    console.log('응답:', response);
    window.location.reload()

  } catch (error) {
    alert(`${formType === 'vacation' ? '휴가' : '조퇴'} 신청 중 오류가 발생했습니다.`);
    console.error('에러 발생:', error.response ? error.response.data : error.message);
  }

    
  } else if (formType === 'leave') {
    data = leaveData.value;
  }





  
  
};


document.addEventListener("DOMContentLoaded", function () {
    // 출석 체크 버튼 이벤트
    document.getElementById("attendance-btn").addEventListener("click", function () {
        sendAttendanceRequest('attendance');
    });

    // 퇴실 체크 버튼 이벤트
    document.getElementById("leave_early-btn").addEventListener("click", function () {
        sendAttendanceRequest('leaveEarly');
    });

    async function sendAttendanceRequest(action) {
      console.log('  ddd :', action);
        try {
            const response = await axios.get(`/api/student/attend/update/${action}`);
            console.log('  ddd :', response);


            alert(`${action === 'attendance' ? '출석' : '조퇴'} 체크 완료!`);
            window.location.reload()
        } catch (error) {
            console.log('Error in sendAttendanceRequest:', response);
            console.error('에러 발생:', error.response ? error.response.data : error.message);
            alert('오류가 발생했습니다.');
        }
    }
});




 




const examData = ref([
   {
      id: 1,
      subject: "프론트 엔드",
      date: "2024-12-30",
      participants: 26,
      total: 27,
   },
   { id: 2, subject: "백엔드", date: "2024-12-29", participants: 27, total: 27 },
   {
      id: 3,
      subject: "기반 기술",
      date: "2024-12-28",
      participants: 26,
      total: 27,
   },{
      id: 4,
      subject: "기반 기술",
      date: "2024-12-28",
      participants: 26,
      total: 27,
   },{
      id: 5,
      subject: "기반 기술",
      date: "2024-12-28",
      participants: 26,
      total: 27,
   }
]);

</script>

<style>
.exam-card-grid {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
   gap: 20px;
   margin-top: 20px;
}

.exam-card {
   background: #fff;
   border-radius: 12px;
   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   overflow: hidden;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.exam-card:hover {
   transform: translateY(-5px);
   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.exam-header {
   padding: 16px;
   background-color: #f7f7f7;
   border-bottom: 1px solid #eee;
}

.exam-subject {
   font-size: 18px;
   font-weight: 600;
   margin-bottom: 8px;
   color: #333;
}

.exam-date {
   font-size: 14px;
   color: #666;
}

.exam-body {
   padding: 16px;
}

.exam-participants {
   font-size: 16px;
   color: #444;
   margin-bottom: 8px;
}

.exam-progress {
   width: 100%;
   height: 8px;
   border-radius: 4px;
   background-color: #e0e0e0;
   appearance: none;
   overflow: hidden;
}

.exam-progress::-webkit-progress-bar {
   background-color: #e0e0e0;
   border-radius: 4px;
}

.exam-progress::-webkit-progress-value {
   background-color: #4caf50;
   border-radius: 4px;
}

.exam-footer {
   padding: 16px;
   background-color: #f7f7f7;
   text-align: center;
}

.exam-button {
   background-color: #4caf50;
   color: white;
   border: none;
   border-radius: 8px;
   padding: 8px 16px;
   font-size: 14px;
   cursor: pointer;
   transition: background-color 0.2s ease-in-out;
}

.exam-button:hover {
   background-color: #45a049;
}
</style>


<!-- //data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example" -->
<template>

   <div style="background-color: whitesmoke;"
      class="xl:pl-60 pt-14 min-h-screen w-full transition-position bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
      <!-- Navigation Button -->



      <!-- <div id="drawer-right-example"
         class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
         tabindex="-1" aria-labelledby="drawer-right-label">
         <h5 id="drawer-right-label"
            class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg
               class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
               viewBox="0 0 20 20">
               <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>Right drawer</h5>
         <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close menu</span>
         </button>
         <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">Supercharge your hiring by taking advantage of our <a
               href="#" class="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline">limited-time
               sale</a> for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1
            design job board.</p>
         <div class="grid grid-cols-2 gap-4">
            <a href="#"
               class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn
               more</a>
            <a href="#"
               class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get
               access <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                     d="M1 5h12m0 0L9 1m4 4L9 9" />
               </svg></a>
         </div>
      </div> -->


      <div id="popup-modal" tabindex="-1"
         class="hidden fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

         <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">


               <div class="p-4 md:p-5 text-center">
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                     출석 체크하기</h3>
                  <button id="attendance-btn" data-modal-hide="popup-modal" type="button"
                     class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                     확인
                  </button>
                  <button data-modal-hide="popup-modal" type="button"
                     class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                     취소</button>
               </div>
            </div>
         </div>
      </div>
      <div id="popup-modal1" tabindex="-1"
         class="hidden fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

         <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">


               <div class="p-4 md:p-5 text-center">
                  <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">퇴실 체크</h3>
                  <button id="outing-btn" data-modal-hide="popup-modal1" type="button"
                     class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                     퇴실 하기 ( 서비스 준비중 )
                  </button>
                  <button  data-modal-hide="popup-modal1" type="button"
                     class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">취소
                  </button>
               </div>
            </div>
         </div>
      </div>
      <div id="popup-modal2" tabindex="-1"
         class="hidden fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

         <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">


               <form @submit.prevent="handleSubmit('vacation')" class="p-4 md:p-5">
   <div class="grid gap-4 mb-4 grid-cols-2">
      <div class="col-span-2">
         <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">휴가 신청</label>
         <input 
            v-model="vacationData.name" 
            type="text" 
            name="name" 
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            placeholder="사유 요약" 
            required="">
      </div>
      <div class="col-span-2">
         <label for="date-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">날짜 범위</label>
         <div class="flex items-center">
            <Datepicker 
               v-model="vacationData.startDate" 
               placeholder="Select start date" 
               class="w-full" />
            <span class="mx-4 text-gray-500">to</span>
            <Datepicker 
               v-model="vacationData.endDate" 
               placeholder="Select end date" 
               class="w-full" />
         </div>
      </div>

      <div class="col-span-2">
         <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> 목록 </label>
         <select 
            v-model="vacationData.logType" 
            id="category" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option selected>선택</option>
            <option value="huga">휴가</option>
            <option value="sick">병가</option>
            <option value="gita">기타</option>
         </select>
      </div>
      <div class="col-span-2">
         <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">사유</label>
         <textarea 
            v-model="vacationData.description" 
            id="description" 
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Write product description here"></textarea>
      </div>
   </div>
   <button type="submit" id="vacation-btn" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
      </svg>
      신청 하기
   </button>
</form>

            </div>
         </div>
      </div>
      <div id="popup-modal3" tabindex="-1"
         class="hidden fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

         <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">


               <div class="p-4 md:p-5 text-center">
                  <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">조퇴 체크</h3>
                  <button id="leave_early-btn" data-modal-hide="popup-modal1" type="button"
                     class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                     조퇴 하기
                  </button>
                  <button  data-modal-hide="popup-modal3" type="button"
                     class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">취소
                  </button>
               </div>
            </div>
         </div>
      </div>

      <!-- Drawer -->
      <!-- <div v-if="isDrawerOpen"
     class="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto bg-white dark:bg-gray-800 transition-transform">
  <h5 class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
    Menu
  </h5>
  <button @click="toggleDrawer"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
         xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
    </svg>
    <span class="sr-only">Close menu</span>
  </button>
  <ul class="py-4 space-y-2 font-medium">
    <li>
      <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <span class="ml-3">커리큘럼 진행 상황</span>
      </a>

      <div class="timeline-item-point rounded-full bg-red-500 relative">
        <span class="inline-flex h-full w-full animate-ping absolute bg-red-500 opacity-100 rounded-full"></span>
      </div>
    </li>
    <div>
       <div v-if="usestudent.curry_check && usestudent.curry_check.length > 0">
        <ol class="relative border-l border-gray-200 dark:border-gray-700">
          <li v-for="item in usestudent.curry_check" :key="item.day" class="mb-10 ml-4">
            <div :class="`absolute w-3 h-3 ${item.color} rounded-full -left-1.5 border border-white dark:border-gray-900`">
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ item.content }}
            </h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Day {{ item.day }}
            </time>
          </li>
        </ol>
      </div>
      <div v-else>
        <p class="text-gray-500 dark:text-gray-400">데이터를 불러오는 중...</p>
      </div>
    </div>
  </ul>
</div> -->
<div>
  <div v-if="isDrawerOpen" class="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto bg-white dark:bg-gray-800 transition-transform">
    <h5 class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
      Menu
    </h5>
    <button @click="toggleDrawer" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <ul class="py-4 space-y-2 font-medium">
      <li>
        <a class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <span class="ml-3">커리큘럼 진행 상황</span>
        </a>
        <div class="timeline-item-point rounded-full bg-red-500 relative">
          <span class="inline-flex h-full w-full animate-ping absolute bg-red-500 opacity-100 rounded-full"></span>
        </div>
      </li>

      <!-- curriculum 배열을 렌더링 -->
      <div>
        <div v-if="curriculum && curriculum.length > 0">
          <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li v-for="item in curriculum" :key="item.idx" class="mb-10 ml-4">
              <div :class="`absolute w-3 h-3 ${getColorForDay(item.curriculumDay)} rounded-full -left-1.5 border border-white dark:border-gray-900`"></div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.content }}</h3>
              <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Day {{ item.curriculumDay }}</time>
              <p class="text-sm text-gray-500 dark:text-gray-400">시간: {{ item.curriculumHours }} 시간</p>
            </li>
          </ol>
        </div>
        <div v-else>
          <p class="text-gray-500 dark:text-gray-400">데이터를 불러오는 중...</p>
        </div>
      </div>
    </ul>
  </div>
</div>

      <div class="py-10">
         <h2 class="text-2xl font-bold mb-6">강의 커리큘럼</h2>
         <div class="flex flex-wrap gap-4 justify-center">
            <!-- Card 1 -->
            <div
               class="rounded-lg shadow-md bg-white border-l-4 border-blue-500 p-4 flex flex-col justify-between min-w-[250px] max-w-[300px]">
               <h3 class="font-semibold text-lg text-slate-800"> 기반 기술</h3>
               <div class="mt-4 relative h-2 bg-gray-200 rounded">
                  <div class="absolute top-0 left-0 h-full bg-blue-500 rounded" style="width: 25%;"></div>
               </div>
               <div class="flex justify-between items-center mt-2">
                  <span class="text-blue-500 font-medium">Advanced</span>
                  <a href="#" class="text-blue-500 hover:text-blue-600"  @click="handleClick('기반기술')">→</a>
               </div>
            </div>

            <!-- Card 2 -->
            <div
               class="rounded-lg shadow-md bg-white border-l-4 border-pink-500 p-4 flex flex-col justify-between min-w-[250px] max-w-[300px]">
               <h3 class="font-semibold text-lg text-slate-800"> 프로그래밍 </h3>
               <div class="mt-4 relative h-2 bg-gray-200 rounded">
                  <div class="absolute top-0 left-0 h-full bg-pink-500 rounded" style="width: 25%;"></div>
               </div>
               <div class="flex justify-between items-center mt-2">
                  <span class="text-pink-500 font-medium">Beginner</span>
                  <a href="#" class="text-pink-500 hover:text-pink-600" @click="handleClick('프로그래밍')">→</a>
               </div>
            </div>

            <!-- Card 3 -->
            <div
               class="rounded-lg shadow-md bg-white border-l-4 border-orange-500 p-4 flex flex-col justify-between min-w-[250px] max-w-[300px]">
               <h3 class="font-semibold text-lg text-slate-800"> 알고리즘 </h3>
               <div class="mt-4 relative h-2 bg-gray-200 rounded">
                  <div class="absolute top-0 left-0 h-full bg-orange-500 rounded" style="width: 50%;"></div>
               </div>
               <div class="flex justify-between items-center mt-2">
                  <span class="text-orange-500 font-medium">Intermediate</span>
                  <a href="#" class="text-orange-500 hover:text-orange-600" @click="handleClick('알고리즘')">→</a>
               </div>
            </div>

            <!-- Card 4 -->
            <div
               class="rounded-lg shadow-md bg-white border-l-4 border-blue-500 p-4 flex flex-col justify-between min-w-[250px] max-w-[300px]">
               <h3 class="font-semibold text-lg text-slate-800"> 웹개발 </h3>
               <div class="mt-4 relative h-2 bg-gray-200 rounded">
                  <div class="absolute top-0 left-0 h-full bg-blue-500 rounded" style="width: 25%;"></div>
               </div>
               <div class="flex justify-between items-center mt-2">
                  <span class="text-blue-500 font-medium">Advanced</span>
                  <a href="#" class="text-blue-500 hover:text-blue-600" @click="handleClick('웹 개발')">→</a>
               </div>
            </div>

            <!-- Card 5 -->
            <div
               class="rounded-lg shadow-md bg-white border-l-4 border-pink-500 p-4 flex flex-col justify-between min-w-[250px] max-w-[300px]">
               <h3 class="font-semibold text-lg text-slate-800"> 데이터베이스</h3>
               <div class="mt-4 relative h-2 bg-gray-200 rounded">
                  <div class="absolute top-0 left-0 h-full bg-pink-500 rounded" style="width: 25%;"></div>
               </div>
               <div class="flex justify-between items-center mt-2">
                  <span class="text-pink-500 font-medium">Beginner</span>
                  <a href="#" class="text-pink-500 hover:text-pink-600" @click="handleClick('데이터베이스')">→</a>
               </div>
            </div>
         </div>
      </div>

      <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50">
   <!-- Card 1 (출석) -->
   <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div>
         <p class="text-sm font-medium text-gray-500">출석</p>
         <p class="text-2xl font-bold text-gray-800">
            {{ usestudent.get_Student && usestudent.get_Student.attendance != null ? usestudent.get_Student.attendance : '정보 없음' }}
         </p>
      </div>
      <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" class="size-10 text-primary dark:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
         </svg>
      </div>
   </div>

   <!-- Card 2 (남은 휴가) -->
   <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div>
         <p class="text-sm font-medium text-gray-500">남은 휴가</p>
         <p class="text-2xl font-bold text-gray-800">
            {{ usestudent.get_Student && usestudent.get_Student.vacationLeft != null ? usestudent.get_Student.vacationLeft : '정보 없음' }}
         </p>
      </div>
      <div class="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
         </svg>
      </div>
   </div>

   <!-- Card 3 (지각) -->
   <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div>
         <p class="text-sm font-medium text-gray-500">지각</p>
         <p class="text-2xl font-bold text-gray-800">
            {{ usestudent.get_Student && usestudent.get_Student.perception != null ? usestudent.get_Student.perception : '정보 없음' }}
         </p>
      </div>
      <div class="flex items-center justify-center w-10 h-10 bg-pink-100 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
         </svg>
      </div>
   </div>

   <!-- Card 4 (조퇴) -->
   <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div>
         <p class="text-sm font-medium text-gray-500">조퇴</p>
         <p class="text-2xl font-bold text-gray-800">
            {{ usestudent.get_Student && usestudent.get_Student.leaveEarly != null ? usestudent.get_Student.leaveEarly : '정보 없음' }}
         </p>
      </div>
      <div class="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
         </svg>
      </div>
   </div>

   <!-- Card 5 (외출) -->
   <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div>
         <p class="text-sm font-medium text-gray-500">외출</p>
         <p class="text-2xl font-bold text-gray-800">
            {{ usestudent.get_Student && usestudent.get_Student.outing != null ? usestudent.get_Student.outing : '정보 없음' }}
         </p>
      </div>
      <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
         </svg>
      </div>
   </div>

   <!-- Card 6 (시험 상태) -->
   <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div>
         <p class="text-sm font-medium text-gray-500">시험 상태</p>
         <p class="text-2xl font-bold text-gray-800">
            {{ usestudent.get_Student && usestudent.get_Student.testStatus != null ? usestudent.get_Student.testStatus : '정보 없음' }}
         </p>
      </div>
      <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h11M9 21l-6-6 6-6m6 6h6" />
         </svg>
      </div>
   </div>
</div>

      <!-- <div class="p-8 bg-gray-100 dark:bg-gray-900">
         <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">게시판</h1>
         <div class="overflow-x-auto shadow-lg rounded-lg">
            <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs">
                  <tr>
                     <th scope="col" class="px-6 py-4">제목</th>
                     <th scope="col" class="px-6 py-4">글쓴이</th>
                     <th scope="col" class="px-6 py-4">카테고리</th>
                     <th scope="col" class="px-6 py-4">작성 일자</th>
                     <th scope="col" class="px-6 py-4 text-right">
                        <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">더보기</a>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr class="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                     <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">애플 맥북 프로 17"</td>
                     <td class="px-6 py-4">홍길동</td>
                     <td class="px-6 py-4">랩탑</td>
                     <td class="px-6 py-4">2024-01-01</td>
                     <td class="px-6 py-4 text-right">
                        <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">글보기</a>
                     </td>
                  </tr>
                  <tr class="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
                     <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">마이크로소프트 서피스 프로</td>
                     <td class="px-6 py-4">김철수</td>
                     <td class="px-6 py-4">랩탑 PC</td>
                     <td class="px-6 py-4">2024-01-02</td>
                     <td class="px-6 py-4 text-right">
                        <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">글보기</a>
                     </td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                     <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">매직 마우스 2</td>
                     <td class="px-6 py-4">이영희</td>
                     <td class="px-6 py-4">액세서리</td>
                     <td class="px-6 py-4">2024-01-03</td>
                     <td class="px-6 py-4 text-right">
                        <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">글보기</a>
                     </td>
                  </tr>
                  <tr class="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
                     <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">매직 키보드</td>
                     <td class="px-6 py-4">박지민</td>
                     <td class="px-6 py-4">액세서리</td>
                     <td class="px-6 py-4">2024-01-04</td>
                     <td class="px-6 py-4 text-right">
                        <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">글보기</a>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div> -->
      <div class="container" style="margin-bottom: 20px; height: 350px; ">
         <!-- 시험 섹션 -->
         <div class="section-title">
            <h1>시험 ( 미완 )</h1>
         </div>
         <div class="exam-card-grid">
            <div v-for="exam in examData.slice(0, 3)" :key="exam.id" class="exam-card">
               <div class="exam-header">
                  <h3 class="exam-subject">{{ exam.subject }}</h3>
                  <p class="exam-date">시험 날짜: {{ exam.date }}</p>
               </div>
               <div class="exam-body">
                  <p class="exam-participants">
                     참여 인원: {{ exam.participants }} / {{ exam.total }}
                  </p>
                  <progress class="exam-progress" :value="exam.participants" :max="exam.total"></progress>
               </div>
               <div class="exam-footer">
                  <button class="exam-button" @click="$router.push`/exam/${exam.id}`">
                     시험 보기
                  </button>
               </div>
            </div>
         </div>
      </div>


      <div>
         <ol class="relative border-s border-gray-200 dark:border-gray-700 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg"
            style="
    margin-left: 40px;
">
            <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">과제 현황 ( 미완 ) </h1>
            <div class="px-6 py-4 text-right">
               <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">더보기</a>
            </div>
            <li v-for="assignment in usestudent.homework_check" :key="assignment.id" class="mb-10 ms-6">
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
         </ol>

      </div>



   </div>
</template>
