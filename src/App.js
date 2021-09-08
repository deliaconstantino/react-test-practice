import React, { useState } from "react";
import './App.css';
import SearchBox from "./SearchBox";
import { api } from "./api"; //must import the api module in order to use api and it's method `createItem`

const App = () => {
  const [items, setItems] = React.useState([]);
  // const [text, setTextct] = React.useState("");
  const [text, setText] = React.useState("");

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.length) {
      return;
    }

    const newItem = {
      text,
      id: Date.now()
    };

    // setText("");
    // setItems(items.concat(newItem));

    // *** NEW *** for api^comment out above - this actual creates a new item and posts it to '/items'
    api.createItem("/items", newItem).then((persistedItem) => {
      console.log(persistedItem)
      setText("");
      setItems(items.concat(persistedItem));
    });
  };

  return (
    <div>
      <h1>TODOs</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">What needs to be done?</label>
        <br />
        <input id="new-todo" value={text} onChange={handleChange} />
        <button>Add #{items.length + 1}</button>
      </form>
      <SearchBox />
    </div>
  );
};

export default App;
