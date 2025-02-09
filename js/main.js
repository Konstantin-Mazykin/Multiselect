const selectMenu = document.querySelector(".multiselect");
const selectTitle = document.querySelector(".multiselect__title");
const selectList = document.querySelector(".multiselect__list");
const listItems = selectList.querySelectorAll(".multiselect__item");
const searchField = document.querySelector(".multiselect__search");

const defaultValue = selectTitle.innerHTML;

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
  selectedAllItems(evant.target, "item-0");
  checkingAllItemsSelected();
  displayListSelectedItems();
}

function selectedAllItems(elem, id) {
  if (elem.id == id) {
    if (elem.checked) {
      checkedAllItems(true);
    } else {
      checkedAllItems(false);
    }
  }
}

function checkedAllItems(value) {
  for (let i = 1; i < listItems.length; i++) {
    if (!listItems[i].classList.contains("hide-item")) {
      listItems[i].children[0].checked = value;
    }
  }
}

function displayListSelectedItems() {
  const selectedItems = [];
  for (let i = 1; i < listItems.length; i++) {
    if (listItems[i].children[0].checked) {
      selectedItems.push(listItems[i].children[1].innerHTML);
    }
  }

  if (!selectedItems.length) {
    selectTitle.innerHTML = defaultValue;
  } else if (selectedItems.length > 3) {
    selectTitle.innerHTML = `Selected ${selectedItems.length} items`;
  } else selectTitle.innerHTML = selectedItems.join(", ");
}

function checkingAllItemsSelected() {
  let numberOfVisibeElements = 0;
  let numberOfCheckedElements = 0;
  for (let i = 1; i < listItems.length; i++) {
    if (!listItems[i].classList.contains("hide-item")) numberOfVisibeElements++;
    if (listItems[i].children[0].checked && !listItems[i].classList.contains("hide-item")) numberOfCheckedElements++;
  }

  if (numberOfVisibeElements && numberOfVisibeElements == numberOfCheckedElements) {
    listItems[0].children[0].checked = true;
  } else {
    listItems[0].children[0].checked = false;
  }
}

function searchItems() {
  let searchValue = searchField.value.toLowerCase();
  let numberOfElementsFound = 0;
  for (let i = 1; i < listItems.length; i++) {
    let listItemValue = listItems[i].children[1].innerHTML.toLowerCase();
    if (!listItemValue.includes(searchValue)) {
      listItems[i].classList.add("hide-item");
    } else {
      listItems[i].classList.remove("hide-item");
      listItems[numberOfElementsFound].classList.remove("last-item");
      numberOfElementsFound = i;
    }
  }
  listItems[numberOfElementsFound].classList.add("last-item");

  checkingAllItemsSelected();
}

function keyboardActions(evant) {
  if (evant.key === "Enter") {
    openSelectMenu();
  }
  if (evant.key === "Escape") {
    closeSelectMenu();
  }
}

function keyboardSelection(evant) {
  let checkedItem;
  if (evant.key === "Enter") {
    if (evant.target.firstElementChild.checked) {
      checkedItem = false;
    } else {
      checkedItem = true;
    }
    evant.target.firstElementChild.checked = checkedItem;
    selectedAllItems(evant.target.firstElementChild, "item-0");
  }
  checkingAllItemsSelected();
  displayListSelectedItems();
}

let chooseElement = -1;
function navigationUpDown(evant) {
  if (selectList.classList.contains("open-list")) {
    if (evant.key === "ArrowDown") {
      if (chooseElement < listItems.length - 1) {
        chooseElement++;
        listItems[chooseElement].focus();
      }
    }
    if (evant.key === "ArrowUp") {
      if (chooseElement) {
        chooseElement--;
        listItems[chooseElement].focus();
      }
    }
  }
}

selectTitle.addEventListener("click", openSelectMenu);
document.addEventListener("click", clickOutsideSelect);

listItems.forEach((listItem) => {
  listItem.addEventListener("click", processingSelectedItem);
});

searchField.addEventListener("input", searchItems);

selectTitle.addEventListener("keydown", keyboardActions);

selectList.addEventListener("keydown", keyboardSelection);

selectMenu.addEventListener("keydown", navigationUpDown);
