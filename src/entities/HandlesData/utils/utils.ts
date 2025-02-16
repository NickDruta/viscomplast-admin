import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "shared/config";

export async function getHandlesData(collectionName: string) {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return [];
  }
}

export const updateHandleInSection = async (
  parent: string,
  handle: any,
): Promise<void> => {
  const parentDocRef = doc(db, parent, parent);

  await setDoc(parentDocRef, { types: arrayUnion(handle) }, { merge: true });
};

export const editHandleInSection = async (
  parent: string,
  updatedHandle: any,
): Promise<void> => {
  const parentDocRef = doc(db, parent, parent);

  const docSnap = await getDoc(parentDocRef);
  if (!docSnap.exists()) {
    throw new Error("Parent document does not exist");
  }

  const currentData = docSnap.data();

  const handles = currentData.types || [];

  const newHandles = handles.map((handle) =>
    handle.id === updatedHandle.id ? updatedHandle : handle,
  );

  await setDoc(parentDocRef, { types: newHandles }, { merge: true });
};

export const deleteHandleInSection = async (
  parent: string,
  handleId: number,
): Promise<void> => {
  const parentDocRef = doc(db, parent, parent);

  const docSnap = await getDoc(parentDocRef);
  if (!docSnap.exists()) {
    throw new Error("Parent document does not exist");
  }

  const currentData = docSnap.data();
  const handles: any[] = currentData.types || [];

  const newHandles = handles.filter((handle) => handle.id !== handleId);

  await setDoc(parentDocRef, { types: newHandles }, { merge: true });
};
