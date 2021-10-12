<template>
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
        <button v-if="files[0] && editable.body" class="btn btn-danger" type="button" @click="upload">
          Create post
        </button>
      </div>
    </div>
    <div class="col mt-2">
      <div class="form-group">
        <input type="file" ref="fileInput" accept="image/*,video/*, audio/*" @change="filePicked" multiple="multiple">
      </div>
    </div>
    <div class="col">
      <img src="" alt="" class="img-fluid" id="image">
      <video class="img-fluid" src="" id="video"></video>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { postsService } from '../services/PostsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { firebaseService } from '../services/FirebaseService'
import { Offcanvas } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    const files = ref([])
    return {
      files,
      editable,
      posts: computed(() => AppState.posts),
      async createPost() {
        try {
          await postsService.create(editable.value)
          this.print()
          editable.value = {}
          files.value = []
          document.getElementById('image').src = ''
          document.getElementById('video').src = ''
          const offCanvas = Offcanvas.getInstance(document.getElementById('uploadContent'))
          offCanvas.hide()
        } catch (error) {
          logger.error(error)
        }
      },

      // <----------------------File Selection proccess------------------------------->
      filePicked(e) {
        files.value = e.target.files
        logger.log('files ref value', files.value)
        // NOTE FileReader() comes from default JS - this lets JS read the contents of a file
        // Now we are establishing a 'reader' so that we can read the file
        const reader = new FileReader()
        // NOTE this method is very particular it must be readAsDataURL, it's also a built in js method with readers, it allows us to return the contents of a file as a base64 encoded string
        reader.readAsDataURL(files.value[0])
        reader.onload = () => {
          document.getElementById('image').src = reader.result
          document.getElementById('video').src = reader.result
        }
        files.value[0]?.type.includes('image') ? editable.value.type = 'Images' : editable.value.type = 'Videos'
      },

      // <----------------------upload proccess----------------------------------------------------->
      async upload() {
        const typeName = editable.value.body
        const url = await firebaseService.upload(typeName, files.value[0], editable.value.type)
        editable.value.mediaUrl = url
        await this.createPost()
      },

      // <----------------------extra css----------------------------------------------------->
      print() {
        AppState.printing = true
        setTimeout(function() {
          AppState.printing = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
