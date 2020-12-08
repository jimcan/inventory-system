import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

const ref = (collection) => firestore.collection(collection)

export function useFirestore(collection) {
  const [docs, setDocs] = useState([])
  const [filteredDocs, setFilteredDocs] = useState(docs)
  const ref = firestore.collection(collection)

  useEffect(() => {
<<<<<<< HEAD
    const unsub = ref.onSnapshot((snap) => {
      let documents = []
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id })
=======
    const unsub = ref(collection)
      .onSnapshot((snap) => {
        let documents = []
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id })
        })
        setDocs(documents)
>>>>>>> d688323109e8edb633f45e61e3d7268c5757d91a
      })
      setDocs(documents)
      setFilteredDocs(documents)
    })
    return () => unsub()
  }, [collection])

<<<<<<< HEAD
  const filterDocuments = (query, appliedTo) => {
    setFilteredDocs(docs.filter(x => x[appliedTo].toLowerCase().includes(query)))
  }

  const addDocument = (data) => {
    ref.add(data)
  }

  const updateDocument = (data) => {
    const id = data.id
    delete data.id
    ref.doc(id).update(data)
  }

  const deleteDocument = (id) => {
    ref.doc(id).delete()
  }

  return { filteredDocs, filterDocuments, addDocument, updateDocument, deleteDocument }
}
=======
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
>>>>>>> d688323109e8edb633f45e61e3d7268c5757d91a
