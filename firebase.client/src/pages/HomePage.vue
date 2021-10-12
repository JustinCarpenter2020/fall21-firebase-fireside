<template>
  <div class="container-fluid background-image">
    <div class="row">
      <div class="col-12 text-center">
        <button class=" mt-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#uploadContent" aria-controls="offcanvasWithBothOptions">
          Take Photo
        </button>
      </div>
    </div>
    <div class="row text-center mt-5">
      <div class=" col animate__animated animate__bounce">
        <img class="camera" src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6317/6317527_sd.jpg" alt="">
      </div>
    </div>
    <div class="row justify-content-center mt-1" v-if="printing">
      <div class="col-3 animate__animated animate__slideInDown">
        <div>
          <div class="card shadow ">
            <div class="card-body bg-dark print">
              <!-- <img id="printing" :src="printImg" class="print img-fluid" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper mt-5">
      <PostComponent v-for="post in posts" :key="post.id" :post-prop="post" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import 'animate.css'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getAll()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      posts: computed(() => AppState.posts),
      printing: computed(() => AppState.printing)
    }
  }
}
</script>

<style scoped lang="scss">

.wrapper {
  width: 100%;
  padding: 0 2rem;
  text-align: center;
}
.camera{
  height: 30vh;
}

.background-image{
  background-image: url('https://wallpaperaccess.com/full/2847483.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.selected{
  height: 20vh;
  width: 30vh;
}

.print{
  height: 30vh;
}
</style>
