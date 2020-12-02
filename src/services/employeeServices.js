import { firestore } from "../firebase/config"

const ref = firestore.collection('employees')

export function addEmployee(data) {
  ref.add(data)
}

export function updateEmployee(data) {
  const id = data.id
  delete data.id
  ref.doc(id).update(data)
}

export function deleteEmployee(id) {
  ref.doc(id).delete()
}