(() => {
  const cartItems = [];
  const cartButton = document.querySelector("span.cart-icon");
  const closeCartButton = document.querySelector("span.close-icon");
  const addButtons = document.querySelectorAll("[data-add-product");
  const cartProducts = document.querySelector(".cart__products");

  const createCartItem = (
    item = {
      color: "white",
      size: "XS",
      title: "Cotton dress",
      price: 50.0,
      quantity: 1,
    }
  ) => {
    const removeItem = (e, item) => {
      const element = e.target;
      const parentProduct = element.closest(".cart__product");
      const cartProducts = document.querySelector(".cart__products");
      const itemIndex = cartItems.findIndex(
        (element) => element === parentProduct
      );

      cartProducts.removeChild(parentProduct);
      cartItems.splice(itemIndex, 1);
      updateTotals(cartItems, item, "remove");
      toggleItems(cartItems);
    };

    const decrement = (e, item) => {
      const target = e.target;
      const quantityElement = target.parentElement.querySelector(".quantity");

      item.quantity = item.quantity - 1;

      quantityElement.innerText = item.quantity;

      if (item.quantity === 0) {
        item.quantity = 1;
        removeItem(e);
      } else {
        updateTotals(cartItems, item, "decrement");
      }
    };

    const increment = (e, item) => {
      const target = e.target;
      const quantityElement = target.parentElement.querySelector(".quantity");

      item.quantity = item.quantity + 1;

      quantityElement.innerText = item.quantity;
      updateTotals(cartItems, item, "increment");
    };

    const product = `
      <div class="cart__product">
        <div class="product__remove">
          <span class="close-icon">close</span>
        </div>
        <div class="cart__product-image">
          <img class="cart__product-image" src="/images/product-image.webp">
          <div class="quantity-selector">
            <span class="remove-icon">remove</span>
            <span class="quantity">${item.quantity}</span>
            <span class="add-icon">add</span>
          </div>
        </div>

        <div class="cart__product-details">
          <div class="cart__product-title">${item.title}</div>
          <div class="cart__product-price">${item.price.toFixed(2)}</div>
          <div class="cart__product-options">
            <div class="cart__product-option">
              <span class="option__name">Size:</span>
              <span class="option__value">${item.size}</span>
            </div>
            <div class="cart__product-option">
              <span class="option__name">Color:</span>
              <span class="option__value">${item.color}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const container = document.createElement("div");
    container.innerHTML = product;

    const closeIcon = container.querySelector(".close-icon");
    const addIcon = container.querySelector(".add-icon");
    const removeIcon = container.querySelector(".remove-icon");

    closeIcon.addEventListener('click', (e) => removeItem(e, item));
    addIcon.addEventListener('click', (e) => increment(e, item));
    removeIcon.addEventListener('click', (e) => decrement(e, item));

    return container.firstElementChild;
  };

  const toggleItems = (cartItems) => {
    const emptyCartElements = document.querySelectorAll("[data-empty-cart]");
    const notEmptyCartElements = document.querySelectorAll(
      "[data-not-empty-cart]"
    );

    if (cartItems.length === 0) {
      emptyCartElements.forEach((element) => {
        element.style.display = "block";
      });
      notEmptyCartElements.forEach((element) => {
        element.style.display = "none";
      });
      // Se tiver algum item, esconder os elementos
    } else {
      emptyCartElements.forEach((element) => {
        element.style.display = "none";
      });
      notEmptyCartElements.forEach((element) => {
        element.style.display = "flex";
      });
    }
  };

  const openCart = () => {
    const cart = document.querySelector(".cart");

    cart.style.display = "block";
  };

  const extractMoneyValue = (string) => {
    return Number(string.split("$")[1]);
  };

  const updateTotals = (cartItems, item, action = "add") => {
    const totalItems = document.querySelector(".cart__total-value");
    const subTotal = document.querySelector("[data-subtotal]");
    const grandTotal = document.querySelector("[data-grand-total]");
    const subTotalValue = extractMoneyValue(subTotal.innerText);
    const grandTotalValue = extractMoneyValue(subTotal.innerText);
    const quantityActions = ["increment", "decrement"];
    const remove = ["remove", "decrement"].includes(action);
    const itemTotalValue = quantityActions.includes(action)
      ? item.price
      : item.quantity * item.price;
    const newSubTotalValue = remove
      ? subTotalValue - itemTotalValue
      : subTotalValue + itemTotalValue;
    const newGrandTotalValue = remove
      ? grandTotalValue - itemTotalValue
      : grandTotalValue + itemTotalValue;

    totalItems.innerHTML = cartItems.length;

    subTotal.innerText = `$${newSubTotalValue.toFixed(2)}`;
    grandTotal.innerText = `$${newGrandTotalValue.toFixed(2)}`;
  };

  addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const parent = e.target.closest(".product");
      const { title, price } = parent.dataset;
      const extractedPrice = extractMoneyValue(price);

      const item = {
        color: "white",
        size: "XS",
        title,
        price: extractedPrice,
        quantity: 1,
      };
      
      const newCartItem = createCartItem(item);

      cartItems.push(newCartItem);
      cartProducts.appendChild(newCartItem);
      toggleItems(cartItems);
      openCart();
      updateTotals(cartItems, item);
    });
  });

  toggleItems(cartItems);

  // Ao clicar no cartButton a gente abre o carrinho
  cartButton.addEventListener("click", openCart);

  // Ao clicar no closeCartButton a gente esconde o carrinho
  closeCartButton.onclick = () => {
    const cart = document.querySelector(".cart");

    cart.style.display = "none";
  };
})();
