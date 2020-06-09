<template>
  <div class="app-container">
    <p>{{tablename}}</p>
  </div>

</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  Component({
    name: 'testSuite',

  })
  export default class extends Vue  {
    private tablename:string='12jghkjas';
    }
</script>

<style scoped>

</style>
