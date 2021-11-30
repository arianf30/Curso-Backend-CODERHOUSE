const socket = io.connect();

const schemaAuthor = new normalizr.schema.Entity('author', {}, {idAttribute: 'id'});

const schemaMessage = new normalizr.schema.Entity('message', {
    author: schemaAuthor
});

const schemaMessages = new normalizr.schema.Entity('messages', {
    messages: [schemaMessage]
});

const renderMessages = (data) => {
    console.log(data);
    const html = data.map((elem, index) => {
        return (`<div>
        <strong>${elem.author.nombre}</strong>
        <em>${elem.text}</em>
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

socket.on('messages', (data) => {
    const dataDenormalized = normalizr.denormalize(data.result, schemaMessages, data.entities);
    renderMessages(dataDenormalized.messages);
});
socket.on('products', (data) => renderProducts(data));