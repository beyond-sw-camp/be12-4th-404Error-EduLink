<template>
  <div class="page-navi">
    <!-- Prev 버튼 -->
    <button class="page-button" @click="onPrevClick">Prev</button>

    <!-- 페이지 번호 버튼들 -->
    <button
      v-for="page in visiblePages"
      :key="page"
      class="page-button"
      :class="{ active: page === currentPage }"
      @click="onPageClick(page)"
    >
      {{ page }}
    </button>

    <!-- Next 버튼 -->
    <button class="page-button" @click="onNextClick">Next</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  // 현재 페이지 (1-based)
  currentPage: { type: Number, default: 1 },
  // 전체 페이지 수
  totalPages: { type: Number, default: 1 },
  // 한 화면에 보여줄 최대 페이지 버튼 개수
  maxVisible: { type: Number, default: 5 },
});

const emits = defineEmits(["updatePage"]);

// 표시할 페이지 번호 배열 계산
const visiblePages = computed(() => {
  const pages = [];
  // 예: 5개 버튼을 보여준다면, 현재 페이지를 중앙 근처에 배치
  const half = Math.floor(props.maxVisible / 2);

  let startPage = props.currentPage - half;
  let endPage = props.currentPage + half;

  // 최소값 보정
  if (startPage < 1) {
    startPage = 1;
    endPage = props.maxVisible;
  }
  // 최대값 보정
  if (endPage > props.totalPages) {
    endPage = props.totalPages;
    startPage = Math.max(endPage - props.maxVisible + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

// Prev 버튼 클릭 시
const onPrevClick = () => {
  const prevPage = props.currentPage > 1 ? props.currentPage - 1 : 1;
  emits("updatePage", prevPage);
};

// Next 버튼 클릭 시
const onNextClick = () => {
  const nextPage =
    props.currentPage < props.totalPages ? props.currentPage + 1 : props.totalPages;
  emits("updatePage", nextPage);
};

// 개별 페이지 번호 클릭 시
const onPageClick = (page) => {
  emits("updatePage", page);
};
</script>

<style scoped>
.page-navi {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.page-button {
  background-color: #e0e0e0;
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s, transform 0.2s;
}
.page-button:hover {
  background-color: #d0d0d0;
  transform: translateY(-2px);
}
.page-button.active {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}
</style>
