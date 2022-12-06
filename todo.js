import { ref } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
export default {
  emits: ['edit', 'destroy'],
  props: {
    content: String
  },
  setup(props, ctx) {
    const newContent = ref(props.content)
    const isEditing = ref(false)

    function toggleEditMode() {
      newContent.value = props.content
      isEditing.value = !isEditing.value
    }

    function edit() {
      ctx.emit('edit', newContent.value);
      toggleEditMode();
    }

    return {
      newContent,
      isEditing,
      toggleEditMode,
      edit
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
      <button type="button" @click="$emit('destroy')" >削除</button>
    </div>
  `
}
