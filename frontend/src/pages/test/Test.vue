<template>
  <div class="layout">
    <div class="main-content">
      <div v-show="isVisible" class="visible-content">
        404Error-EduLink
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true, 
    };
  },
};
</script>

<style scoped>
.layout {
  display: flex; 
  justify-content: center; 
  align-items: center;
  height: 100vh; 
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visible-content {
  display: flex;
  visibility: visible;
  opacity: 1;
  padding: 20px;
  background-color: yellow;
}
</style>
