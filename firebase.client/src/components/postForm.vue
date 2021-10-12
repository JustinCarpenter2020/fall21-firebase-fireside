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
        <button v-if="files[0]" class="btn btn-danger" type="button" @click="upload">
          Create post
        </button>
      </div>
    </div>
    <div class="col mt-2">
      <div class="form-group">
        <input type="file" ref="fileInput" accept="image/*,video/*" @change="filePicked" multiple="multiple">
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
import { fireBaseLogic } from '../services/FireBaseLogic'
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
        } catch (error) {
          logger.error(error)
        }
      },

      // <----------------------File Selection proccess------------------------------->
      filePicked(e) {
        files.value = e.target.files
        logger.log('files ref value', files.value)
        // Now we are establishing a 'reader' so that we can read the file
        // NOTE FileReader() comes from default JS - this lets JS read the contents of a file
        const reader = new FileReader()
        reader.readAsDataURL(files.value[0])
        reader.onload = () => {
          document.getElementById('image').src = reader.result
          document.getElementById('video').src = reader.result
          // document.getElementById('audio').src = reader.result
        }
        files.value[0]?.type.includes('image') ? editable.value.type = 'image' : editable.value.type = 'video'
      },

      // <----------------------upload proccess----------------------------------------------------->
      async upload() {
        const typeName = editable.value.body
        const url = await fireBaseLogic.upload(typeName, files.value[0], editable.value.type)
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
