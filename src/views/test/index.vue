<template>
  <sign @savePNG="savePNG"></sign>
</template>

<script>
  import Sign from '@/components/Sign'
  export default {
    name: 'test',
    components: { Sign },
    methods: {
      savePNG(signImage){
        console.log(signImage)
      }
    }
  }
</script>

<style scoped>

</style>
