import FirestoreContainer from "../../containers/FirestoreContainer";
import { firestore } from "../../../config";

class CartDaoFirestore extends FirestoreContainer {
    constructor () {
        super('carts', firestore )
    }
}

export default CartDaoFirestore;