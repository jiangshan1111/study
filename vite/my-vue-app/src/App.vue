<template>
  <div>
    {{msg}}
    <HelloWorld v-bind:msg="msg"
                v-on:update:msg="msg = $event" />
  </div>
</template>

<script setup>
import { defineComponent, reactive, defineProps, ref } from "vue";
import HelloWorld from 'comps/HelloWorld.vue'
const msg = ref('Hello Vue 3 + Vite')
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>