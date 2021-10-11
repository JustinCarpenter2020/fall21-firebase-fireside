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
        <button v-if="uploadReady" type="submit" class="btn btn-success">
          Create post
        </button>
        <button v-if="selected" class="btn btn-danger" type="button" @click="upload('img')">
          Upload
        </button>
      </div>
    </div>
    <div class="col mt-2">
      <div class="form-group">
        <input type="file" ref="fileInput" accept="image/*,video/*" @change="filePicked" multiple="multiple">
      </div>
    </div>
    <div class="col">
      <image class="h-50 w-50" id="image"></image>
      <video width="320" id="video" height="240">
        <!-- <source type="video/mp4"> -->
        Your browser does not support the video tag.
      </video>
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
    const selected = ref(false)
    const uploadReady = ref(false)
    const printing = ref(false)
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
        document.getElementById('image').src = ''
        document.getElementById('video').src = ''
        document.getElementById('video').attributes.remove = 'controls'
        logger.log('files ref value', files.value)
        // Now we are establishing a 'reader' so that we can read the file
        // NOTE FileReader() comes from default JS - this lets JS read the contents of a file
        if (files.value[0]?.type.includes('image')) {
          logger.log('yup')
          const reader = new FileReader()
          reader.readAsDataURL(files.value[0])
          reader.onload = () => {
            document.getElementById('image').src = reader.result
            editable.type = 'image'
          }
        } else {
          const reader = new FileReader()
          reader.readAsDataURL(files.value[0])
          reader.onload = () => {
            document.getElementById('video').src = reader.result
          }
          document.getElementById('video').attributes.add = 'controls'
          editable.type = 'video'
        }
      },

      // <----------------------upload proccess----------------------------------------------------->
      async upload() {
        const typeName = editable.value.body
        const url = await fireBaseLogic.upload(typeName, files.value[0], editable.type)
        editable.type === 'img' ? editable.value.imgUrl = url : editable.value.videoUrl = url

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
