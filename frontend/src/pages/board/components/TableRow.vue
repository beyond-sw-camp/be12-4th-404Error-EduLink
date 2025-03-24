<template>
  <tr @click="navigate" class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
    <td>{{ post.idx }}</td>
    <td>{{ post.writer }}</td>
    <td>{{ post.title }}</td>
    <td>{{ formatDate(post.createdDate) }}</td>
  </tr>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      // Adjust to your desired format
      const d = new Date(dateString);
      return d.toLocaleDateString();
    }
  }
}


</script>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = () => {
  router.push('/board/comment/register');
};
</script>

<style scoped></style>
