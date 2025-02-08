const selectTitle = document.querySelector(".multiselect__title");
const selectList = document.querySelector(".multiselect__list");
const listItems = selectList.querySelectorAll(".multiselect__item");
const searchField = document.querySelector(".multiselect__search");

const selectedItems = [];
let selectedItem = "";

function openSelectMenu() {
  selectList.classList.toggle("open-list");
  selectTitle.classList.toggle("title-pressed");
}

function closeSelectMenu() {
  selectList.classList.remove("open-list");
  selectTitle.classList.remove("title-pressed");
}

function clickOutsideSelect(evant) {
  if (!evant.target.classList.value.includes("multiselect__")) {
    closeSelectMenu();
  }
}

function processingSelectedItem(evant) {
  if (evant.target.localName == "label") {
    selectedItem = evant.target.innerHTML;
  }
  if (evant.target.localName == "input" && evant.target.id == "item-0") {
    if (evant.target.checked) {
      checkedAllItems(true);
    } else {
      checkedAllItems(false);
    }
  } else if (evant.target.localName == "input") {
    if (evant.target.checked) {
      selectedItems.push(selectedItem);
    } else {
      let index = selectedItems.findIndex((value) => value == selectedItem);
      selectedItems.splice(index, 1);
    }
  }
  displayListSelectedItems(selectedItems);
}

function checkedAllItems(value) {
  selectedItems.splice(0, selectedItems.length);
  listItems.forEach((listItem) => {
    listItem.children[0].checked = value;
    if (listItem.children[0].id !== "item-0") selectedItems.push(listItem.children[1].innerHTML);
  });
  if (!value) selectedItems.splice(0, selectedItems.length);
}

function displayListSelectedItems(arr) {
  if (!arr.length) {
    selectTitle.innerHTML = "Select city";
  } else {
    selectTitle.innerHTML = arr.join(", ");
  }
}

function searchItems() {
  console.log(searchField.value);
}

selectTitle.addEventListener("click", openSelectMenu);
document.addEventListener("click", clickOutsideSelect);

listItems.forEach((listItem) => {
  listItem.addEventListener("click", processingSelectedItem);
});

searchField.addEventListener("input", searchItems);
