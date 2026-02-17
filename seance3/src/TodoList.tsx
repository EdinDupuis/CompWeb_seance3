import {useState} from "react";

interface Todo {
    id: number,
    text: string,
    completed: boolean
}

function TodoList() {
    const [todos , setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    const addTodo = () => {

        if (input.trim()) {

            const new_todo : Todo = {id: Date.now(), text: input, completed: false};
            setTodos([...todos, new_todo]);
            setInput('')
        }

    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        ));
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => {
            if(todo.id !== id){
                return todo;
            }
        }));
    };

    const completed = () => {
        const comp = todos.filter(todo => {}).length;
        const total : number  = todos.length;
        return "{" + comp + "/"+ total +"}";
    }

    return (
        <div>
            <div>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Nouvelle tâche..."
                />
                <button onClick={addTodo}>Ajouter</button>
            </div>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}>
                        </input>
                        {todo.text}
                        <button onClick={() => removeTodo(todo.id)}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
            <div> {completed()} </div>
        </div>
    );
}

export default TodoList