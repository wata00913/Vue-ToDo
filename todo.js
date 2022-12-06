import { ref } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
export default {
  props: {
    content: String
  },
  setup(props) {
    const newContent = ref(props.content)
    const isEditing = ref(false)

    function toggleEditMode() {
      newContent.value = props.content
      isEditing.value = !isEditing.value
    }
    return {
      newContent,
      isEditing,
      toggleEditMode
    }
  },
  template: `
    <div v-if="isEditing">
      <input type="text" v-model="newContent">
      <button type="button" @click="edit" >更新</button> |
      <button type="button" @click="toggleEditMode" >キャンセル</button>
    </div>
    <div v-else>
      {{content}} 
      <button type="button" @click="toggleEditMode" >編集</button> |
      <button type="button" @click="destroy" >削除</button>
    </div>
  `
}
