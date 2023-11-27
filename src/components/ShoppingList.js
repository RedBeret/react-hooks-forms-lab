import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemFormSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    const itemNameLower = item.name.toLowerCase();
    const searchTextLower = searchText.toLowerCase();
    const matchesSearchText = itemNameLower.includes(searchTextLower);
    const matchesCategory = item.category === selectedCategory || selectedCategory === "All";
    return matchesSearchText && matchesCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter
        search={searchText}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
