import React, { useEffect, useState } from "react";

type Todo = {
  id: number;
  user_id: number;
  title: string;
  completed: boolean;
};

const API_URL = process.env.BACKEND_ORIGIN || "http://localhost:8080";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Todos laden
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  // Neues Todo anlegen
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: 1, title }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  // Todo löschen
  const deleteTodo = async (id: number) => {
    await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Todo bearbeiten
  const startEdit = (todo: Todo) => {
    setEditing(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = async (id: number) => {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, completed: false }),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
    setEditing(null);
    setEditTitle("");
  };

  return (
    <div>
      <h2>Todos</h2>
      <form onSubmit={addTodo}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Neues Todo"
        />
        <button type="submit">Hinzufügen</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editing === todo.id ? (
                <>
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label>
                    <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) =>
                        setTodos(todos.map((t) =>
                        t.id === todo.id ? { ...t, completed: e.target.checked } : t
                        ))
                    }
                    />
                    erledigt?
                </label>
                <button onClick={() => saveEdit(todo.id)}>Speichern</button>
                <button onClick={() => setEditing(null)}>Abbrechen</button>
                </>
            ) : (
                <>
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.title}
                </span>
                <button onClick={() => startEdit(todo)}>Bearbeiten</button>
                <button onClick={() => deleteTodo(todo.id)}>Löschen</button>
                </>
            )}
            </li>
        ))}
      </ul>
    </div>
  );
}