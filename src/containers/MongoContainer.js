import { model, connect } from "mongoose";

class MongoContainer {
    constructor(collection, schema, config) {
        this.collection = model(collection, schema);
        this.config = config;
        this.init();
    }

    init() {
        if (!this.conection) {
            this.conection = connect(this.config.host, this.config.options)
        }
    }

    // CREATE
    async create(item) {
        try {
            const document = await this.collection.create(item);
            console.log('Create: ', { document });
            return document._id;
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
    async readAll() {
        try {
            const documents = await this.collection.find();
            console.log('Read All: ', { documents });
            if (documents.length === 0) {
                return null;
            } else {
                return documents;
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    // UPDATE
    async update(id, element) {
        const { n, nModified } = await this.collection.updateOne({ _id: id }, { $set: { element } });
        if (n == 0 || nModified == 0) {
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
            const response = await this.collection.deleteOne({ _id: id });
            console.log('Delete ID: ', { response });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteAll() {
        try {
            const response = await this.collection.deleteMany();
            console.log('Delete All: ', { response });
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

export default MongoContainer;