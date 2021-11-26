let data = [
    {
        id: '98347b3a0013',
        name: 'Uno',
        description: 'Descripción 1',
        code: 456,
        price: 20.2,
        stock: 4,
        thumbnail: ''
      },
      {
        id: '0200f1ee40a8',
        name: 'Uno',
        description: 'Descripción 1',
        code: 456,
        price: 20.2,
        stock: 4,
        thumbnail: ''
      }
];

class MemoryContainer {
    constructor(collection) {
        this.collection = collection;
    }
    
    // UID
    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    // CREATE
    create(item) {
        const newId = this.generateUUID();
        const newItem = {
            id: newId,
            ...item
        }
        data.push(newItem);
        return newId;
    }

    // READ
    readAll() {
        if (data.length === 0) {
            return 'No hay items.';
        } else {
            return data;
        }
    }
    readId(id) {
        const response = data.find(item => item.id === id);
        if (response) {
            return response;
        } else {
            return 'No se encontró el item.'
        }
    }

    // UPDATE
    update(id, element) {
        const document = this.readId(id);
        const newDocument = {
            ...document,
            ...element
        }
        if (typeof document === 'object') {
            console.log('si devuelve');
            data.map((item, index) => {
                if (item.id === id) {
                    data[index] = newDocument;
                }
            })
        } else {
            console.log(typeof document);
        }
        return id;
    }

    // DELETE
    async deleteId(id) {
        data = data.filter((item) => {
            return item.id !== id; 
        });
        return id;
    }

    async deleteAll() {
        data = [];
        return 'Todos los items fueron eliminados.';
    }
}

module.exports = MemoryContainer;