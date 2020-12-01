import { firestore } from "../firebase/config"

export const getDepartmentCollection = () => (
  [
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' }
  ]
)

export function addEmployee(data) {
  const ref = firestore.collection('employees')
  ref.add(data)
}

export function getEmployees() {
  let employees = []
  firestore.collection('employees')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => employees.push(doc.data()))
    })
  return employees
}