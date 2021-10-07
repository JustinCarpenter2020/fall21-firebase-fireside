<template>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="uploadContent" aria-labelledby="offcanvasWithBothOptionsLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="uploadContent">
        Lets Add Some Images And Videos
      </h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
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
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { postsService } from '../services/PostsService'
import { computed } from '@vue/runtime-core'
import { fireBaseLogic } from '../services/FireBaseLogic'
import { AppState } from '../AppState'
export default {
  setup() {
    const editable = ref({})
    const selected = ref(false)
    const uploadReady = ref(false)
    const printing = ref(false)
    const files = ref([])
    const printImg = ref('')
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

<style lang="scss" scoped>

</style>
