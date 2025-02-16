import {
  collection,
  doc,
  getDocs,
  setDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

import { db } from "shared/config";
import { HardwareSectionType, ProfileType } from "shared/schema";

export async function getPageData(collectionName: string) {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return [];
  }
}

export const updateProfileInSection = async (
  parent: string,
  profile: ProfileType,
): Promise<void> => {
  const parentDocRef = doc(db, parent, "profilesSection");

  await setDoc(
    parentDocRef,
    { profiles: arrayUnion(profile) },
    { merge: true },
  );
};

export const editProfileInSection = async (
  parent: string,
  updatedProfile: ProfileType,
): Promise<void> => {
  const parentDocRef = doc(db, parent, "profilesSection");

  const docSnap = await getDoc(parentDocRef);
  if (!docSnap.exists()) {
    throw new Error("Parent document does not exist");
  }

  const currentData = docSnap.data();
  const profiles: ProfileType[] = currentData.profiles || [];

  const newProfiles = profiles.map((profile) =>
    profile.id === updatedProfile.id ? updatedProfile : profile,
  );

  await setDoc(parentDocRef, { profiles: newProfiles }, { merge: true });
};

export const deleteProfileInSection = async (
  parent: string,
  profileId: number,
): Promise<void> => {
  const parentDocRef = doc(db, parent, "profilesSection");

  const docSnap = await getDoc(parentDocRef);
  if (!docSnap.exists()) {
    throw new Error("Parent document does not exist");
  }

  const currentData = docSnap.data();
  const profiles: ProfileType[] = currentData.profiles || [];

  const newProfiles = profiles.filter((profile) => profile.id !== profileId);

  await setDoc(parentDocRef, { profiles: newProfiles }, { merge: true });
};

export const updateHardwareSection = async (
  parent: string,
  hardware: HardwareSectionType,
): Promise<void> => {
  const hardwareDocRef = doc(db, parent, "hardwareSection");
  await setDoc(hardwareDocRef, hardware, { merge: true });
};
