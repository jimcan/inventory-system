import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

const ref = (collection) => firestore.collection(collection)

export function useFirestore(collection) {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const unsub = ref(collection)
      .onSnapshot((snap) => {
        let documents = []
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id })
        })
        setDocs(documents)
      })
    return () => unsub()
  }, [collection])

  return { docs }
}

export function addData(collection, data) {
    ref(collection).add(data)
  }

export function updateData(collection, data) {
    const id = data.id
    delete data.id
    ref(collection).doc(id).update(data)
  }

export function deleteData(collection, id) {
    ref(collection).doc(id).delete()
  }