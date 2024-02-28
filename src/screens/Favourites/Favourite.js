import axios from "axios";
import React, { useEffect, useState } from "react";
import { List } from "reactstrap";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL).then((response) => {
      return setFavourites(response.data);
    });
  }, []);
  return (
    <div>
      <List>
        {favourites
          ?.filter((items) => items.isFavourite)
          ?.map((item) => {
            return <li>{item.item}</li>;
          })}
      </List>
    </div>
  );
};

export default Favourite;
