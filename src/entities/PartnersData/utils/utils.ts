import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { db, storage } from "shared/config";

export const listPartnerFiles = async (): Promise<string[]> => {
  try {
    const partnersRef = ref(storage, "sponsorSection");

    const listResult = await listAll(partnersRef);

    const urlPromises = listResult.items.map((itemRef) =>
      getDownloadURL(itemRef),
    );
    return await Promise.all(urlPromises);
  } catch (error) {
    console.error("Error listing partner files:", error);
    throw error;
  }
};

export const uploadPartnerFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `sponsorSection/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress.toFixed(2) + "% done");
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => reject(error));
      },
    );
  });
};

export const deletePartnerFile = async (fileUrl: string): Promise<void> => {
  const getFilePathFromUrl = (url: string) => {
    try {
      const decodedUrl = decodeURIComponent(url);
      const match = decodedUrl.match(/\/o\/(.*?)\?/);
      if (match && match[1]) {
        return match[1];
      } else {
        console.error("Invalid file URL");
      }
    } catch (error) {
      throw new Error("Error decoding URL: " + error);
    }
  };

  try {
    const filePath = getFilePathFromUrl(fileUrl);
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    console.log("File deleted successfully:", fileUrl);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const getSponsorsSectionDescription = async (): Promise<any> => {
  try {
    const docRef = doc(db, "sponsorsSection", "sponsorsSection");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Sponsors section description not found");
    }

    return docSnap.data();
  } catch (error) {
    console.error("Error fetching sponsors section description:", error);
    throw error;
  }
};

export const updateSponsorsSectionDescription = async (
  newDescription: any,
): Promise<void> => {
  try {
    const docRef = doc(db, "sponsorsSection", "sponsorsSection");
    await updateDoc(docRef, { description: newDescription });
  } catch (error) {
    console.error("Error updating sponsors section description:", error);
    throw error;
  }
};
