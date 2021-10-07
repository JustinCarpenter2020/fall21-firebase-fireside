<template>
  <div class="container-fluid">
    <div class="row">
      <form @submit.prevent="createPost">
        <div class="col">
          <div class="form-group">
            <input type="text"
                   class="form-control"
                   name=""
                   id="title"
                   aria-describedby="helpId"
                   placeholder="new post..."
                   v-model="editable.body"
            >
            <button v-if="uploadReady" type="submit" class="btn btn-success">
              Create post
            </button>
            <button v-if="selected" class="btn btn-danger" type="button" @click="upload('img')">
              Upload
            </button>
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <input type="file" ref="fileInput" accept="image/*" @change="filePicked">
          </div>
        </div>
        <div class="col">
          <div v-if="image">
            <img :src="imageUrl" alt="">
          </div>
          <div v-else>
            <img id="img" class="selected" alt="">
          </div>
        </div>
        <div class="col mt-4">
          <div class="form-group">
            <input type="file" ref="fileInput" accept="video/*" @change="filePicked">
            <button v-if="selected" class="btn btn-danger" type="button" @click="upload('video')">
              Upload video
            </button>
          </div>
        </div>
      </form>
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
            <div class="card-body">
              <img id="printing" :src="printImg" class="print img-fluid" />
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
import { computed, onMounted, ref } from 'vue'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { fireBaseLogic } from '../services/FireBaseLogic'
export default {
  name: 'Home',
  setup() {
    const editable = ref({})
    const selected = ref(false)
    const uploadReady = ref(false)
    const printing = ref(false)
    const files = ref([])
    const printImg = ref('')
    onMounted(async() => {
      try {
        await postsService.getAll()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      files,
      printImg,
      editable,
      uploadReady,
      printing,
      selected,
      posts: computed(() => AppState.posts),
      async createPost() {
        try {
          await postsService.create(editable.value)
          printImg.value = editable.value.imgUrl
          this.print()
          editable.value = {}
          document.getElementById('img').src = ''
          uploadReady.value = false
        } catch (error) {
          logger.error(error)
        }
      },

      // <----------------------File Selection proccess------------------------------->
      filePicked(e) {
        files.value = e.target.files
        logger.log(files)
        // NOTE establish a reader to read the file that we pulled, it waits for the reader to load and then grabs the id and replaces it with our img
        const reader = new FileReader()

        reader.readAsDataURL(files.value[0])

        reader.onload = function() {
          document.getElementById('img').src = reader.result
        }
        // NOTE this method is very particular it must be readAsDataURL, it's also a built in js method with readers, it allows us to return the contents of a file as a base64 encoded string
        selected.value = true
      },

      // <----------------------upload proccess----------------------------------------------------->
      async upload(type) {
        const typeName = editable.value.body
        const url = await fireBaseLogic.upload(typeName, files.value[0], type)
        type === 'img' ? editable.value.imgUrl = url : editable.value.videoUrl = url

        selected.value = false
        uploadReady.value = true
      },

      // <----------------------extra css----------------------------------------------------->
      print() {
        printing.value = true
        setTimeout(function() {
          printing.value = false
        }, 2000)
      }
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

.selected{
  height: 20vh;
  width: 30vh;
}

.print{
  height: 30vh;
}
</style>
