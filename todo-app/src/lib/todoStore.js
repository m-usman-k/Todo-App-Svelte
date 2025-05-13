import { writable } from "svelte/store";

const LOCAL_STORAGE_KEY = "todos";

function loadTodos() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

function saveTodos(todos) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }
}

function createTodos() {
  const { subscribe, set, update } = writable(loadTodos());

  return {
    subscribe,
    add: (text) =>
      update((todos) => {
        const newTodos = [...todos, { id: Date.now(), text, done: false }];
        saveTodos(newTodos);
        return newTodos;
      }),
    toggle: (id) =>
      update((todos) => {
        const newTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        );
        saveTodos(newTodos);
        return newTodos;
      }),
    remove: (id) =>
      update((todos) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        saveTodos(newTodos);
        return newTodos;
      }),
    clear: () => {
      saveTodos([]);
      set([]);
    },
  };
}

export const todos = createTodos();
