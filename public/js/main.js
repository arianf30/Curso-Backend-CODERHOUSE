const socket = io.connect();

const renderMessages = (data) => {
    const html = data.map((elem, index) => {
        return (`<div>
        <strong>${elem.author}:</strong>
        <em>${elem.message}</em>
        </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
    document.getElementById('cuerpo-chat').scrollTop = 9999;
    
};
const renderProducts = (data) => {
    const html = data.map((elem, index) => {
        return (`<tr>
        <td>${elem.id}</td>
        <td><img src="${elem.thumbnail ? elem.thumbnail : "https://peugeot.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png"}" class="img-thumbnail" style="width: 100px; height: auto;" alt="<%= producto.name %>"></td>
        <td>${elem.name ? elem.name : ''}</td>
        <td>${elem.description ? elem.description : '-'}</td>
        <td>${elem.code ? elem.code : '-'}</td>
        <td>${elem.price ? '$'+elem.price: ''}</td>
        <td>${elem.stock ? elem.stock : 0}</td>
        <td style="text-align: right;">
            <button onClick="addToCart(1, ${elem.id})" type="button" class="btn btn-outline-primary"><i class="bi bi-cart-plus-fill"></i></button>
            &nbsp;
            <button onClick="deleteProduct(${elem.id})" type="button" class="btn btn-outline-danger"><i class="bi bi-trash-fill"></i></button>
        </td>
        </tr>`)
    }).join(" ");
    document.getElementById('products').innerHTML = html;
};

const renderCart = (data) => {
    if (data !== 'No hay productos.' && typeof data !== 'undefined' && data.length > 0) {
        if (data[0].products.length > 0) {
            const htmlCartTop = '<table class="table table-sm" style="vertical-align:middle;"><tbody>';
            let htmlCartBody = '';
            data[0].products.map((elem, index) => {
                htmlCartBody = `${htmlCartBody}<tr>
                    <td>${elem.qty}</td>
                    <td><img style="border-radius: 100%; width: 42px; height: 42px;" src="${elem.thumbnail ? elem.thumbnail : "https://peugeot.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png"}" class="img-thumbnail" style="width: 100px; height: auto;" alt="<%= producto.name %>"></td>
                    <td>${elem.name ? elem.name : ''}</td>
                    <td style="text-align:right;"><button onClick="deleteItemCart(${elem.id})" type="button" class="btn btn-link-danger"><i class="bi bi-trash-fill"></i></button></td>
                    </tr>`;
            });
            const htmlCartFoot = '</tbody></table>';
            document.getElementById('carrito').innerHTML = htmlCartTop+htmlCartBody+htmlCartFoot+'<br /><div style="width: 100%; text-align:center;"><button onClick="deleteCart('+data.id+')" type="button" class="btn btn-danger"><i class="bi bi-file-earmark-minus-fill"></i> Borrar Carrito</button></div>';
            /* document.getElementById('titulo-carrito').innerHTML = `Creación: ${data[0].timestamp}`; */
        } else {
            document.getElementById('carrito').innerHTML = '<div style="width: 100%; text-align:center;">Esperando que ingreses productos.<br /><br /><button onClick="deleteCart(1)" type="button" class="btn btn-danger"><i class="bi bi-file-earmark-minus-fill"></i> Borrar Carrito</button></div>';
            /* document.getElementById('titulo-carrito').innerHTML = `Creación: ${data[0].timestamp}`; */
        }
    } else {
        const htmlCart = '<div style="width: 100%; text-align:center;"><button onClick="newCart()" type="button" class="btn btn-primary"><i class="bi bi-file-earmark-plus-fill"></i> Nuevo Carrito</button></div>';
        document.getElementById('carrito').innerHTML = htmlCart;
    }
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
        description: document.getElementById('description-product').value,
        price: document.getElementById('price-product').value,
        thumbnail: document.getElementById('thumbnail-product').value,
        code: document.getElementById('code-product').value,
        stock: document.getElementById('stock-product').value
    }
    socket.emit('new-product', product);
    document.getElementById('name-product').value = '';
    document.getElementById('description-product').value = '';
    document.getElementById('price-product').value = '';
    document.getElementById('thumbnail-product').value = '';
    document.getElementById('code-product').value = '';
    document.getElementById('stock-product').value = '';
}
const deleteProduct = (product) => {
    socket.emit('delete-product', product);
}
const newCart = () => {
    const cart = { products: [] };
    socket.emit('new-cart', cart);
}
const deleteCart = (id) => {
    socket.emit('delete-cart', id);
}
const addToCart = (cartId, product) => {
    socket.emit('add-to-cart', { id: cartId, product_id: product });
}
const deleteItemCart = (product_id) => {
    socket.emit('delete-to-cart', { id: 1, product_id: product_id });
}

const formMessage = document.getElementById('form-new-message');
formMessage.addEventListener('submit', addMessage);

const formProduct = document.getElementById('form-new-product');
formProduct.addEventListener('submit', addProduct);

socket.on('messages', (data) => renderMessages(data));
socket.on('products', (data) => renderProducts(data));
socket.on('cart', (data) => renderCart(data));