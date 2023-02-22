import { useState } from "react";
import Todo from "./Todo";
import Popup from "./Modal";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setToDos] = useState([]);
  const [noToDo, setNoToDo] = useState(false);
  const [popup, setPopup] = useState(false);
  // const [popup, setPopup] = useState({
  //   show: false, // initial values set to false and null
  //   id: null,
  // });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setNoToDo(false);
    // const ide = nanoid();
    const date = new Date().toISOString().slice(0, 10);
    const newToDo = { task: inputValue,  date: date };
    setToDos([...todos, newToDo]);
    setInputValue("");
  };

  // const handleDelete = (id) => {
  //   setPopup(true);

  //   let filteredData = todos.filter((todo) => todo.id !== id);

  //   {
  //     /*
  //   filteredData is the new data, but I only want to update 
  //   todos with filteredData when the user has clicked on the confirm
  //   button in the modal component, which execute(handleDeleteTrue)*/
  //   }
  // };



  const handleDelete = (id) => {
    setPopup({
      show: true,
      id,
    });
  };

  const handleDeleteTrue = () => {
       alert("delete")
    let filteredData = todos.filter((todo) => todo.id !== popup.id);
    setToDos(filteredData);
       
    setPopup({
            show: false,
            id: null,
          });
  };



  // const handleDeleteTrue = () => {
  // 
  //   if (popup.show && popup.id) {
  //     let filteredData = todos.filter((todo) => todo.id !== popup.id);
  //     setToDos(filteredData);
  //     setPopup({
  //       show: false,
  //       id: null,
  //     });
  //   }
  // };



  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };
      
  const handleEdit = (id, task) => {
    setInputValue(task);
    const EditedData = todos.filter((edited) => edited.id !== id);
    setToDos(EditedData);
  };

  return (
    <div className="App">
      <div className="app_one">
        <h1>To do app</h1>
        <form action="" className="form" onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Go to the park..."
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button type="submit">ADD TO DO</button>
        </form>
      </div>
      {/* {noToDo && <FirstLoad />} */}
      {todos.map((todo,index) => {
        return (
          <div key={index} className="result">
            <Todo
              {...todo}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
        );
      })}
      {/* {popup && <Popup handleDeleteTrue={handleDeleteTrue} />} */}
      {popup.show && (
  <Popup
    handleDeleteTrue={handleDeleteTrue}
    handleDeleteFalse={handleDeleteFalse}
  />
)}
    </div>
  );
}

export default App;