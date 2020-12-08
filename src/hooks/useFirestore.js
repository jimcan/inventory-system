import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

export function useFirestore(collection) {
  const [docs, setDocs] = useState([])
  const [filteredDocs, setFilteredDocs] = useState(docs)
  const ref = firestore.collection(collection)

  useEffect(() => {
    const unsub = ref.onSnapshot((snap) => {
      let documents = []
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id })
      })
      setDocs(documents)
      setFilteredDocs(documents)
    })
    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection])

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
