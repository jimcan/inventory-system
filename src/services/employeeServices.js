import { firestore } from "../firebase/config"

export function addEmployee(data) {
  firestore.collection('employees').add(data)
}