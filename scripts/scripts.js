let cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    alert(`${item} foi adicionado ao carrinho!`);
    console.log(cart);
}
