import {
  DocumentData,
  QueryConstraint,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FirebaseDB } from "./config";

// Function to get a single document by ID
export const getDocumentById = async <T extends DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | undefined> => {
  const documentRef = doc(collection(FirebaseDB, collectionName), documentId);
  const documentSnapshot = await getDoc(documentRef);
  if (!documentSnapshot.exists()) {
    console.error("Document does not exist");
    return undefined;
  } else {
    return {
      id: documentSnapshot.id,
      ...documentSnapshot.data(),
    } as unknown as T;
  }
};

// Function to get all documents in a collection
export const getDocumentsByQuery = async <T extends DocumentData>(
  collectionName: string,
  ...filter: QueryConstraint[]
): Promise<T[]> => {
  const collectionRef = collection(FirebaseDB, collectionName);
  const collectionQuery = query(collectionRef, ...filter);
  const querySnapshot = await getDocs(collectionQuery);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as unknown as T)
  );
};

// Function to get all documents in a collection
export const getAllDocuments = async <T extends DocumentData>(
  collectionName: string
): Promise<T[]> => {
  const collectionRef = collection(FirebaseDB, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as unknown as T)
  );
};

// Function to add a new document to a collection
export const addNewDocument = async <T extends DocumentData>(
  collectionName: string,
  documentData: T
): Promise<string> => {
  const timestamp = serverTimestamp();
  const documentWithTimestamps = {
    ...documentData,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  const collectionRef = collection(FirebaseDB, collectionName);
  const docRef = await addDoc(collectionRef, documentWithTimestamps);
  return docRef.id;
};

// Function to update an existing document in a collection
export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  documentId: string,
  documentData: T
): Promise<void> => {
  const { id, ...documentWithoutId } = documentData;
  const documentRef = doc(collection(FirebaseDB, collectionName), documentId);
  await updateDoc(documentRef, {
    ...documentWithoutId,
    updatedAt: serverTimestamp(),
  });
};

// Function to create or update an existing document in a collection
export const addNewDocumentWithCustomId = async <T extends DocumentData>(
  collectionName: string,
  documentId: string,
  documentData: T
): Promise<void> => {
  const { id, ...documentWithoutId } = documentData;
  const timestamp = serverTimestamp();
  const documentWithTimestamps = {
    ...documentWithoutId,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  const documentRef = doc(collection(FirebaseDB, collectionName), documentId);
  await setDoc(documentRef, documentWithTimestamps);
};
