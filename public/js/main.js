const socket = io.connect();

const renderMessages = (data) => {
    const html = data.map((elem, index) => {
        return (`<div>
        <strong>${elem.author}</strong>
        <em>${elem.message}</em>
        </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
};
const renderProducts = (data) => {
    const html = data.map((elem, index) => {
        let imagen = '';
        if (elem.thumbnail !== '') {
            imagen = elem.thumbnail;
        } else {
            imagen = "https://peugeot.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png";
        }
        return (`<tr>
        <td><img src="${imagen}" class="img-thumbnail" style="width: 100px; height: auto;" alt="<%= producto.name %>"></td>
        <td>${elem.name}</td>
        <td>${elem.price}</td>
        </tr>`)
    }).join(" ");
    document.getElementById('products').innerHTML = html;
};

const addMessage = (event) => {
    event.preventDefault();
    const mensaje = {
        author: document.getElementById('username-chat').value,
        message: document.getElementById('text-chat').value
    }
    socket.emit('new-message', mensaje);
    document.getElementById('text-chat').value = '';
}
const addProduct = (event) => {
    event.preventDefault();
    const product = {
        name: document.getElementById('name-product').value,
        price: document.getElementById('price-product').value,
        thumbnail: document.getElementById('thumbnail-product').value
    }
    socket.emit('new-product', product);
    document.getElementById('name-product').value = '';
    document.getElementById('price-product').value = '';
    document.getElementById('thumbnail-product').value = '';
}

const formMessage = document.getElementById('form-new-message');
formMessage.addEventListener('submit', addMessage);

const formProduct = document.getElementById('form-new-product');
formProduct.addEventListener('submit', addProduct);

socket.on('messages', (data) => renderMessages(data));
socket.on('products', (data) => renderProducts(data));