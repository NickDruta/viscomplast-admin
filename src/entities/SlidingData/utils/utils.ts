import { GalleryCardType } from "shared/schema";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "shared/config";

export const addSlidingCard = async (
  parent: string,
  card: GalleryCardType,
): Promise<void> => {
  try {
    const docRef = doc(db, parent, "slidingSystemsSection");
    await updateDoc(docRef, {
      typeGalleryCards: arrayUnion(card),
    });
  } catch (error) {
    console.error("Error adding sliding card:", error);
    throw error;
  }
};

export const updateSlidingCard = async (
  parent: string,
  oldCard: GalleryCardType,
  newCard: GalleryCardType,
): Promise<void> => {
  try {
    const docRef = doc(db, parent, "slidingSystemsSection");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }

    const data = docSnap.data();
    const cards: GalleryCardType[] = data.typeGalleryCards || [];

    const index = cards.findIndex(
      (card) => JSON.stringify(card) === JSON.stringify(oldCard),
    );

    if (index === -1) {
      throw new Error("Card to update not found");
    }

    cards[index] = newCard;

    await updateDoc(docRef, { typeGalleryCards: cards });
  } catch (error) {
    console.error("Error updating sliding card:", error);
    throw error;
  }
};

export const deleteSlidingCard = async (
  parent: string,
  cardToDelete: GalleryCardType,
): Promise<void> => {
  const parentDocRef = doc(db, parent, "slidingSystemsSection");
  const docSnap = await getDoc(parentDocRef);
  if (!docSnap.exists()) {
    throw new Error("Parent document does not exist");
  }

  const currentData = docSnap.data();
  const cards: GalleryCardType[] = currentData.typeGalleryCards || [];

  const newCards = cards.filter(
    (card) => JSON.stringify(card) !== JSON.stringify(cardToDelete),
  );

  await setDoc(parentDocRef, { typeGalleryCards: newCards }, { merge: true });
};
