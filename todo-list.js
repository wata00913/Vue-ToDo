import { ref } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import ToDo from "./todo.js";
export default {
  components: {
    ToDo,
  },
  setup() {
    const message = ref({ text: "", colorType: "normal" });

    const rawDataStr = window.localStorage.getItem("todoList");
    const todoList = ref(rawDataStr ? JSON.parse(rawDataStr) : []);

    const newContent = ref("");

    function create() {
      if (!newContent.value) {
        message.value = {
          text: "入力欄が未記入のためToDoを新規作成できません。",
          colorType: "error",
        };
        return;
      }
      todoList.value.push({ content: newContent.value });
      save(todoList.value);
      newContent.value = "";
      message.value = { text: "ToDoを新規作成しました。", colorType: "normal" };
    }

    function update(content, idx) {
      todoList.value.splice(idx, 1, { content: content });
      save(todoList.value);
      message.value = { text: "ToDoを編集しました。", colorType: "normal" };
    }

    function destroy(idx) {
      todoList.value.splice(idx, 1);
      save(todoList.value);
      message.value = { text: "ToDoを削除しました。", colorType: "normal" };
    }

    function save(todoList) {
      window.localStorage.setItem("todoList", JSON.stringify(todoList));
    }
    return {
      message,
      newContent,
      todoList,
      create,
      update,
      destroy,
    };
  },
  template: `
    <p :class="message.colorType"> {{ message.text }} </p>
    <to-do v-for="(todo, idx) in todoList"
      :content="todo.content"
      @update="(editedContent) => update(editedContent, idx)"
      @destroy="destroy(idx)"
    />
    <div>
      <input type="text" id="name" name="name" v-model="newContent">
      <button type="button" @click="create" >新規作成</button>
    </div>
  `,
};
