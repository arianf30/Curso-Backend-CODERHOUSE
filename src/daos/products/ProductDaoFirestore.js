import FirestoreContainer from "../../containers/FirestoreContainer";
import { firestore } from "../../../config";

class ProductDaoFirestore extends FirestoreContainer {
    constructor () {
        super('products', firestore)
    }
}

export default ProductDaoFirestore;