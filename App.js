import "./App.css";
import {useState, useReducer, useEffect, useMemo, useCallback} from "react";

const users = [];
const initialState = 0;
const functionCounter = new Set();

const reducer = (state, action) => {
  switch (action) {
    case "Increment":
      return state + 1;
    case "Decrement":
      return state - 1;
  }
};
function App() {
  let temp = "";
  const [name, setName] = useState(" ");
  const [counter, setCounter] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [number, setNumber] = useState(0);
  const [numberUse, setNumberUse] = useState(0);
  const [otherNumberUse, setOtherNumberUse] = useState(0);

  const increment = useCallback(() => {
    setNumberUse(numberUse + 1);
  }, [numberUse]);

  const decrement = useCallback(() => {
    setNumberUse(numberUse - 1);
  }, [numberUse]);

  const ontherCount = useCallback(() => {
    setOtherNumberUse(otherNumberUse + 1);
  }, [otherNumberUse]);

  functionCounter.add(increment);
  functionCounter.add(decrement);
  functionCounter.add(ontherCount);
  console.log(functionCounter);
  useEffect(() => {
    setTimeout(() => setNumber((number) => number + 1), 1000);
  }, [number]);

  function handleNameChange() {
    let addName = document.getElementById("name").value;
    users.push({addName, counter});
    setCounter(counter + 1);
    document.getElementById("name").value = "";
    return users;
  }

  function handleDelete(user) {
    document.getElementById(user.counter).style.display = "none";
  }

  function handleUpdateName() {
    let upName = document.getElementById("changeName").value;
  }

  const nameUseEffect = useMemo(() => console.warn("name add"), [name]);
  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        id="changeName"
        placeholder="name change"
      />
      <input
        onChange={(e) => setName(e.target.value)}
        id="name"
        placeholder="name"
      />
      <button onClick={handleUpdateName} id="changeAddBtn">
        Change
      </button>
      <button onClick={() => handleNameChange()} id="addBtn">
        Add
      </button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>

        {users.map((user) => (
          <tbody className="table_body">
            <tr id={user.counter}>
              <td className="user_list">{user.counter}</td>
              <td className="user_list">{user.addName}</td>
              <td>
                <button onClick={() => handleDelete(user)}>DELETE</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <button onClick={() => dispatch("Increment")}>Increment</button>
      <button onClick={() => dispatch("Decrement")}>Decrement</button>
      <p>{state}</p>
      <p>{number}</p>
      <p>{name}</p>
      <p>{nameUseEffect}</p>
      <p>{counter}</p>
      {numberUse}
      <div>{otherNumberUse}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default App;
