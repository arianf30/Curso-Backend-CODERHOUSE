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
            const document = await this.collection.find({ _id: id });
            console.log('Read ID: ', { document });
            if (document.length === 0) {
                return null;
            } else {
                return document;
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }
    readAll() {
        const docRef = this.collection.doc();

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return doc.data();
            } else {
                return "No such document!";
            }
        }).catch((error) => {
            return `Error getting document: ${error}`;
        });
    }

    // UPDATE
    async update(id, element) {
        const response = await this.collection.doc(id).update({ element });
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