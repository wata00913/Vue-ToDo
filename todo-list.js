import { ref } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import ToDo from "./todo.js";
export default {
  components: {
    ToDo,
  },
  setup() {
    const newContent = ref("");
    const todoList = ref([{ content: "テストです" }, { content: "ToDo2" }]);
    const message = ref("");

    function onCreateToDo() {
      if (!newContent.value) {
        message.value = { content: "未入力です", colorType: "error" };
        return;
      }
      todoList.value.push({ content: newContent });
    }
    return {
      newContent,
      todoList,
      onCreateToDo,
    };
  },
  template: `
    <to-do v-for="todo in todoList"
      :content="todo.content"
    />
    <div>
      <input type="text" id="name" name="name" v-model="newContent">
      <button type="button" @click="onCreateToDo" >新規作成</button>
    </div>
  `,
};
