<template>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="uploadContent" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="uploadContent">
        Lets Add Some Images And Videos
      </h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <postForm />
    </div>
  </div>
</template>

<script>

export default {
  setup() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
