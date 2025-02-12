const selectMenu = document.querySelector(".multiselect");
const selectTitle = document.querySelector(".multiselect__title");
const selectList = document.querySelector(".multiselect__list");
const listItems = selectList.querySelectorAll(".multiselect__item");
const mainItem = document.querySelector("#item-0");
const searchField = document.querySelector(".multiselect__search");

const defaultValue = selectTitle.innerHTML;
let chooseElement;

function openCloseSelectMenu() {
  chooseElement = -1;
  selectList.classList.toggle("open-list");
  selectTitle.classList.toggle("title-pressed");
  setAriaHeaderAttributes();
}

function setAriaHeaderAttributes() {
  if (selectTitle.classList.contains("title-pressed")) {
    selectTitle.setAttribute("aria-expanded", "true");
    selectList.setAttribute("aria-hidden", "false");
  } else {
    selectTitle.setAttribute("aria-expanded", "false");
    selectList.setAttribute("aria-hidden", "true");
  }
}

function closeSelectMenu() {
  selectTitle.classList.remove("title-pressed");
  selectList.classList.remove("open-list");
  setAriaHeaderAttributes();
}

function closeMenuWhenClickedOutside(event) {
  if (!event.target.classList.value.includes("multiselect__")) {
    closeSelectMenu();
  }
}

function processingSelectedItem() {
  checkingAllItemsSelected();
  displayListSelectedItems();
}

function selectUnselectAllItems() {
  if (mainItem.checked) {
    checkUncheckAllItems(true);
  } else {
    checkUncheckAllItems(false);
  }
  displayListSelectedItems();
}

function checkUncheckAllItems(value) {
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
  } else { selectTitle.innerHTML = selectedItems.join(", "); }

  setAriaItemsAttributes();
}

function setAriaItemsAttributes() {
  for (let i = 0; i < listItems.length; i++) {
    if (listItems[i].children[0].checked) {
      listItems[i].setAttribute("aria-checked", "true");
    } else {
      listItems[i].setAttribute("aria-checked", "false");
    }
  }
}

function checkingAllItemsSelected() {
  let numberOfVisibeElements = 0;
  let numberOfCheckedElements = 0;
  for (let i = 1; i < listItems.length; i++) {
    if (!listItems[i].classList.contains("hide-item")) { numberOfVisibeElements++; };
    if (listItems[i].children[0].checked && !listItems[i].classList.contains("hide-item")) { numberOfCheckedElements++; };
  }

  if (numberOfVisibeElements && (numberOfVisibeElements === numberOfCheckedElements)) {
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
  chooseElement = -1;
}

function keyboardActionsOpenCloseMenu(event) {
  if (event.key === "Enter") {
    openCloseSelectMenu();
  }
  if (event.key === "Escape") {
    closeSelectMenu();
  }
}

function keyboardActionsCloseMenu(event) {
  if (event.key === "Escape") {
    closeSelectMenu();
  }
}

function keyboardSelectUnselect(event) {
  if (event.key !== "Enter") return;
  if (event.target.firstElementChild.checked) {
    event.target.firstElementChild.checked = false;
  } else {
    event.target.firstElementChild.checked = true;
  }
  if (event.target.firstElementChild.id === "item-0") {
    selectUnselectAllItems();
  }
  checkingAllItemsSelected();
  displayListSelectedItems();
}

function navigationUpDown(event) {
  if (!selectList.classList.contains("open-list")) return;

  event.preventDefault();

  if ((event.key === "ArrowDown") && (chooseElement < listItems.length - 1)) {
    chooseElement++;
    listItems[chooseElement].focus();
  }
  if ((event.key === "ArrowUp") && chooseElement) {
    chooseElement--;
    listItems[chooseElement].focus();
  }
}


selectTitle.addEventListener("click", openCloseSelectMenu);
selectTitle.addEventListener("keydown", keyboardActionsOpenCloseMenu);

mainItem.addEventListener("click", selectUnselectAllItems);

listItems.forEach((listItem) => {
  listItem.addEventListener("click", processingSelectedItem);
});

searchField.addEventListener("input", searchItems);

selectList.addEventListener("keydown", keyboardActionsCloseMenu);
selectList.addEventListener("keydown", keyboardSelectUnselect);

selectMenu.addEventListener("keydown", navigationUpDown);

document.addEventListener("click", closeMenuWhenClickedOutside);
