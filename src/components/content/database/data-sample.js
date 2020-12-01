import { firestore } from '../../../firebase/config'

export const add = () => firestore.collection('products').add({
    id: 0,
    name: 'Slash',
    unit: 'L',
    price: 410,
    stock: 20
}).then((docRef) => {
    console.log('Document written with ID', docRef.id);
}).catch((error) => {
    console.error('Error adding document', error);
})