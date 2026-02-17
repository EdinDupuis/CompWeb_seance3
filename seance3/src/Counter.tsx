import {useState} from "react";

function Counter() {
    const [count, setCount] = useState(0);

    const afficher = () => {
        <h2>Compteur : {count}</h2>
    };
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };
    const decrementer5 = () => {
        setCount(prevCount => prevCount - 5);
    };
    const decrementer = () => {
        setCount(prevCount => prevCount - 1);
    };
    const reset = () => {
        setCount(prevCount => prevCount - prevCount);
    };
    const increment5 = () => {
        setCount(prevCount => prevCount + 5);
    };

    return (
        <div>
            <button onClick={afficher}>Count: {count}</button>
            <button onClick={increment}>Incrementer</button>
            <button onClick={increment5}>Incrémenter 5</button>
            <button onClick={reset}>Reset</button>
            <button onClick={decrementer}>Décrémenter</button>
            <button onClick={decrementer5}>Décrémenter 5</button>
        </div>
    );
}


export default Counter