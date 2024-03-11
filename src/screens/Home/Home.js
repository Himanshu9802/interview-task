import './Home.css'

import React, { useEffect, useState } from "react";

import { Button, Input, Label, List, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';

import { addItem, getItemsList, markFavourite } from "../../redux/items";

const Home = () => {
  const dispatch = useDispatch();

  const [newItem, setNewItem] = useState([]);

  const { itemsList: items, loading } = useSelector((s) => s.items);

  const loadItems = () => {
    dispatch(getItemsList())
  }

  useEffect(() => {
    loadItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemAdd = async() => {
    const checkItem = items?.filter(
      (singleItem) => singleItem?.item === newItem
    );
    if (checkItem?.length) {
      toast.warning("Item Exists!");
      return;
    }

    dispatch(addItem([
        ...items,
        {
          item: newItem,
          isFavourite: 0,
        },
      ]));

      await loadItems();
  };

  const handleFavourite = async (itemName) => {
    const updatedItems = [...items];

   const index = updatedItems?.findIndex(item => item.item === itemName );

    if (index > -1) {
      const newItem = updatedItems[index];

      if (newItem?.isFavourite){
        updatedItems[index] = {
            item: itemName,
            isFavourite: 0,
          }
          toast.success("Item Removed From Favourites!");
      }else{
        updatedItems[index] = {
            item: itemName,
            isFavourite: 1,
          }
          toast.success("Item Added to Favourites!");
      }
    }

    dispatch(markFavourite(updatedItems));

    await loadItems();
    
  }

  return (
    <div className="mx-5 my-5">
      <Label>Add Item</Label>
      <div className="d-flex align-items-center mb-4">
        <Input
          placeholder="enter item name"
          onChange={(v) => setNewItem(v.target.value)}
        />
        <Button color="primary" onClick={() => handleItemAdd()} disabled={loading}>
          {loading ? <Spinner size="sm">Loading...</Spinner> :
          'Add'}
        </Button>
      </div>
      <hr />
      <List type="unstyled">
        {items?.map((item) => {
          return (
            <li key={item.name}>
              <Input
                type="checkbox"
                checked={item?.isFavourite}
                className="mx-2"
                onClick={() => {
                  handleFavourite(item.item);
                }}
              />
              {item.item}
            </li>
          );
        })}
      </List>
    </div>
  );
};

export default Home;
