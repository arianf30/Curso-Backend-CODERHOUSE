const admin = require("firebase-admin");

class MongoContainer {
    constructor(collection, config) {
        this.config = config;
        this.init();
        this.collection = this.connection.firestore().collection(collection);
    }

    init() {
        if (!this.connection) {
            this.connection = admin.initializeApp({
                credential: admin.credential.cert(this.config)
            });
            console.log('conectado!');
        }
    }

    // CREATE
    async create(item) {
        try {
            const document = await this.collection.doc().set(item);
            console.log('Create: ', { document });
            return "Item creado con éxito";
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    // READ
    async readId(id) {
        try {
            const document = await this.collection.doc(id).get();
            return document.data();
        } catch (error) {
            console.error('Error: ', error);
        }
    }
    async readAll() {
        try {
            const documents = await this.collection.get();
            let data = [];
            documents.forEach(doc => {
                data.push({
                    id: doc.id, ...doc.data()
                });
            })
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    // UPDATE
    async update(id, element) {
        const response = await this.collection.doc(id).update(element);
        if (!response) {
            console.log(`Elemento con el ID ${id} no fue encontrado`);
            return null;
        } else {
            const elementUpdated = await this.readId(id);
            return elementUpdated;
        }
    }

    // DELETE
    async deleteId(id) {
        try {
            const response = await this.collection.doc(id).delete();
            console.log(response);
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteAll() {
        try {
            const response = await this.collection.delete();
            console.log(response);
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

module.exports = MongoContainer;