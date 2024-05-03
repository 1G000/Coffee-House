import { ITEMS } from "./items.js";

const container = document.querySelector(".cards-container");
const categoryBtns = document.querySelectorAll(".menu-item_btn");
const showMoreBtn = document.querySelector(".show-more_btn");
const backdrop = document.querySelector(".backdrop");

const SHOW_MORE_CARD_COUNT = 4;
const generateCard = function (el) {
  const card = document.createElement("div");
  card.classList.add("card");
  container.appendChild(card);
  const imgContainer = document.createElement("picture");
  imgContainer.classList.add("card-photo");
  card.append(imgContainer);
  const img = document.createElement("img");
  img.classList.add("card-photo__img");
  img.src = `${el.photoUrl}`;
  imgContainer.append(img);
  const cardTextContent = document.createElement("div");
  cardTextContent.classList.add("card-text-content");
  card.append(cardTextContent);
  const cardTitle = document.createElement("h4");
  cardTitle.classList.add("card-title");
  cardTitle.append(el.name);
  cardTextContent.append(cardTitle);
  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-description");
  cardDescription.append(el.description);
  cardTextContent.append(cardDescription);
  const cardPrice = document.createElement("span");
  cardPrice.classList.add("card-price");
  cardPrice.append(`$${el.price}`);
  cardTextContent.append(cardPrice);

  card.addEventListener("click", () => showModal(el));
  return card;
};

const generateModal = function (el) {
  let modalWindow = `
<div class="modal-window">
      <picture class="modal-photo__container"><img class="modal-photo" src=${el.photoUrl} alt=""></picture>
      <div class="modal-textcontent">
        <div>
          <h4 class="modal-textcontent__title">${el.name}</h4>
          <p class="modal-textcontent__description">${el.description}
        </div>
        <div class="size-block">
          <p class="size-text">Size
          </p>
          <ul class="size-items">
            <li class="size-item" id="small">
              <button data-add-price="${el.sizes.s["add-price"]}" class="size-btn selected">
                <span class="icon-wrapper">
                  <span class="value">S</span>
                </span>
                <span class="weight-value__small">${el.sizes.s.size}</span>
              </button>
            </li>
            <li class="size-item" id="medium">
              <button data-add-price="${el.sizes.m["add-price"]}" class="size-btn">
                <span class="icon-wrapper">
                  <span class="value">M</span>
                </span>
                <span class="weight-value__medium">${el.sizes.m.size}</span>
              </button>
            </li>
            <li class="size-item" id="large">
              <button data-add-price="${el.sizes.l["add-price"]}" class="size-btn">
                <span class="icon-wrapper">
                  <span class="value">L</span>
                </span>
                <span class="weight-value__large">${el.sizes.l.size}</span>
              </button>
            </li>
          </ul>
        </div>
        <div class="size-block">
          <p class="size-text">Additives</p>
          </p>
          <ul class="additives-items">
            <li class="additives-item">
              <button data-add-price="${el.additives[0]["add-price"]}" class="additives-btn">
                <span class="icon-wrapper">
                  <span class="value">1</span>
                </span>
                <span class="topping">${el.additives[0].name}
                 </span>
              </button>
            </li>
            <li class="additives-item">
              <button data-add-price="${el.additives[1]["add-price"]}" class="additives-btn">
                <span class="icon-wrapper">
                  <span class="value">2</span>
                </span>
                <span class="topping">${el.additives[1].name}</span>
              </button>
            </li>
            <li class="additives-item">
              <button data-add-price="${el.additives[2]["add-price"]}" class="additives-btn">
                <span class="icon-wrapper">
                  <span class="value">3</span>
                </span>
                <span class="topping">${el.additives[2].name}</span>
              </button>
            </li>
          </ul>
        </div>
        <div class="price-block">
          <span class="modal-textcontent__total">Total:</span><span class="modal-textcontent__price">${el.price}</span>
        </div>
        <div class="modal-footer">
          <div class="ico-conteiner">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clip-path="url(#clip0_268_10145)">
                <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z"
                  stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_268_10145">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p>
            The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty
            points and enjoy your favorite coffee with up to 20% discount.
          </p>
        </div>
        <button class="close-btn">Close</button>
      </div>
    </div>
`;
  return modalWindow;
};

let timer;
const closeModal = function () {
  if (timer) {
    clearTimeout(timer);
  }
  backdrop.classList.remove("is-visible");
  backdrop.classList.add("is-hidden");
  document.body.classList.remove("non-scrolling");
  timer = setTimeout(() => {
    backdrop.innerHTML = "";
  }, 1000);
};

backdrop.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});

const showModal = function (el) {
  if (timer) {
    clearTimeout(timer);
  }
  document.body.classList.add("non-scrolling");
  const modalWindow = generateModal(el);
  backdrop.innerHTML = modalWindow;

  function calcPrice() {
    let price = Number(el.price);
    const selectedItems = backdrop.querySelectorAll(
      "button[data-add-price].selected"
    );
    selectedItems.forEach((item) => {
      price += Number(item.dataset.addPrice);
    });
    backdrop.querySelector(
      ".modal-textcontent__price"
    ).innerText = `$${price.toFixed(2)}`;
  }

  function changeSize(e) {
    backdrop
      .querySelectorAll(".size-btn.selected")
      .forEach((item) => item.classList.remove("selected"));
    e.currentTarget.classList.add("selected");
    calcPrice();
  }
  backdrop
    .querySelectorAll(".size-btn")
    .forEach((item) => item.addEventListener("click", changeSize));

  function addAdditive(e) {
    if (e.currentTarget.classList.contains("selected")) {
      e.currentTarget.classList.remove("selected");
    } else {
      e.currentTarget.classList.add("selected");
    }
    calcPrice();
  }

  backdrop
    .querySelectorAll(".additives-btn")
    .forEach((item) => item.addEventListener("click", addAdditive));

  calcPrice();

  backdrop.querySelector(".close-btn").addEventListener("click", closeModal);

  backdrop.classList.remove("is-hidden");
  backdrop.classList.add("is-visible");
};

const generateCards = function (items) {
  items.forEach((el) => {
    generateCard(el);
  });
};

let generatedAtSmallScreen = false;
let allItems = [];
let selectedCategory = "coffee";

const filterCards = function (currentCategory) {
  selectedCategory = currentCategory;
  container.innerHTML = "";
  allItems = ITEMS.filter((item) => item.category === currentCategory);
  const shouldShowLoadMore = allItems.length > 4;
  generatedAtSmallScreen = window.innerWidth <= 768;
  if (generatedAtSmallScreen && shouldShowLoadMore) {
    showMoreBtn.classList.add("visible");
    generateCards(allItems.slice(0, 4));
  } else {
    showMoreBtn.classList.remove("visible");
    generateCards(allItems);
  }
};

categoryBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    categoryBtns.forEach((btn) => btn.classList.remove("selected"));
    let currentCategory = e.currentTarget.dataset.category;
    e.currentTarget.classList.add("selected");
    filterCards(currentCategory);
  })
);

filterCards(selectedCategory);

const resizeObserver = new ResizeObserver(([element]) => {
  const smallSize = window.innerWidth <= 768;
  if (
    (smallSize && !generatedAtSmallScreen) ||
    (!smallSize && generatedAtSmallScreen)
  ) {
    filterCards(selectedCategory);
  }
});

resizeObserver.observe(document.body);

showMoreBtn.addEventListener("click", () => {
  const currentCardCount = document.querySelectorAll(
    ".cards-container .card"
  ).length;
  const showMoreItems = allItems.slice(
    currentCardCount,
    currentCardCount + SHOW_MORE_CARD_COUNT
  );
  generateCards(showMoreItems);
  if (allItems.length <= currentCardCount + SHOW_MORE_CARD_COUNT) {
    showMoreBtn.classList.remove("visible");
  }
});
