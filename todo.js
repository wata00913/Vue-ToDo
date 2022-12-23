import { ref } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
export default {
  emits: ["update", "destroy"],
  props: {
    content: String,
    required: true,
  },
  setup(props, ctx) {
    const editingContent = ref(props.content);
    const isEditing = ref(false);

    function toggleEditMode() {
      editingContent.value = props.content;
      isEditing.value = !isEditing.value;
    }

    function update() {
      ctx.emit("update", editingContent.value);
      toggleEditMode();
    }

    return {
      editingContent,
      isEditing,
      toggleEditMode,
      update,
    };
  },
  template: `
    <div v-if="isEditing">
      <input type="text" v-model="editingContent">
      <button type="button" @click="update" >更新</button> |
      <button type="button" @click="toggleEditMode" >キャンセル</button>
    </div>
    <div v-else>
      {{content}} 
      <button type="button" @click="toggleEditMode" >編集</button> |
      <button type="button" @click="$emit('destroy')" >削除</button>
    </div>
  `,
};
