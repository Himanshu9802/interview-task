import React, { useEffect, useState } from "react";

import { getItemsList } from "../../redux/items";
import axios from "axios";
import { Button, Input, Label, List } from "reactstrap";
import { toast } from "react-toastify";

const Home = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState([]);

  const getItems = () => {
    axios.get(process.env.REACT_APP_API_URL).then((response) => {
      return setItems(response.data);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleItemAdd = () => {
    const checkItem = items?.filter(
      (singleItem) => singleItem?.item === newItem
    );
    if (checkItem?.length) {
      toast.warning("Item Exists!");
      return;
    }

    axios
      .post(process.env.REACT_APP_API_URL, [
        ...items,
        {
          item: newItem,
          isFavourite: 0,
        },
      ])
      .then((response) => {
        return setItems(response.data);
      })
      .then(() => {
        getItems();
        toast.success("Item Added!");
      });
  };

  return (
    <div className="mx-5 my-5">
      <Label>Add Item</Label>
      <div className="d-flex align-items-center mb-4">
        <Input
          placeholder="enter item name"
          onChange={(v) => setNewItem(v.target.value)}
        />
        <Button color="primary" onClick={() => handleItemAdd()}>
          Add
        </Button>
      </div>
      <hr />
      <List>
        {items?.map((item) => {
          return <li>{item.item}</li>;
        })}
      </List>
    </div>
  );
};

export default Home;
