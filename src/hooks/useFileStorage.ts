import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  UploadTask,
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
  deleteObject,
  FullMetadata,
} from "firebase/storage";
import { storage } from "../firebase/config";

export interface UserUploadedDocument {
  /** The original filename of the file */
  ogFilename: string;
  /** The URL of the file */
  url: string;
  /** The metadata of the file. Includes several essentials such as file name, type, size, and timestamps */
  metadata: FullMetadata;
  /** The width and height of the image, if applicable */
  dimensions?: {
    width: number;
    height: number;
  };
  /** The file's version number. Tracks updates in case of batch file processing */
  version: number;
}

export function useFileStorage() {
  const [uploadedFiles, setUploadedFiles] = useState<UserUploadedDocument[] | null>(null);
  const [uploadError, setUploadError] = useState<null | string>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                File uploader                               */
  /* -------------------------------------------------------------------------- */

  const uploadFiles = async (filesToUpload: File[], userId: string) => {
    // First let's check if we have everything we need
    if (filesToUpload.length === 0) throw new Error("No files to upload");

    // Now we setup the upload tasks
    const promises: UploadTask[] = [];

    const storagePath = buildStoragePath(userId);

    if (!storagePath) throw new Error("Could not build storage path");

    filesToUpload.map((file) => {
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(prog);
        },
        (err) => {
          setUploadError(err.message);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const metadata = await getMetadata(uploadTask.snapshot.ref);

          const img = new Image();
          img.src = url;
          img.onload = () => {
            const dimensions = {
              width: img.width,
              height: img.height,
            };
            const newFile: UserUploadedDocument = {
              ogFilename: file.name,
              url,
              metadata,
              dimensions,
              version: 1,
            };
            {
              //Deep copy to preserve all nested fields
              const clonedFilesArr = uploadedFiles ? JSON.parse(JSON.stringify(uploadedFiles)) : [];
              clonedFilesArr.push(newFile);

              setUploadedFiles(clonedFilesArr);
            }
          };
        }
      );
    });
    setIsUpdating(true);
    try {
      await Promise.all(promises);
      console.log("All files uploaded");
    } catch (err) {
      throw new Error(`Something went wrong while uploading the files: ${err}`);
    } finally {
      setIsUpdating(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                    Deleting and clearing files from docs                   */
  /* -------------------------------------------------------------------------- */

  /** Takes in a fullPath or url and deletes a file from Firebase storage */
  const deleteFile = async (urlOrPath: string) => {
    setIsUpdating(true);

    try {
      const fileRef = ref(storage, urlOrPath);
      await deleteObject(fileRef);
      console.log("Deleted file succesfully!");
    } catch (err) {
      throw new Error(`Something went wrong while deleting the file: ${err}`);
    } finally {
      setIsUpdating(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                Misc helpers                                */
  /* -------------------------------------------------------------------------- */

  const getFileMetadata = async (url: string) => {
    const fileRef = ref(storage, url);

    try {
      const metadata = await getMetadata(fileRef);
      return metadata;
    } catch (err) {
      throw new Error(`Something went wrong while fetching the file metadata: ${err}`);
    }
  };

  const buildStoragePath = (userId: string) => {
    if (!userId) return null;

    const basePath = `${userId}/uploads`;

    return `${basePath}/${uuidv4()}`;
  };

  return {
    uploadFiles,
    uploadedFiles,
    deleteFile,
    uploadError,
    uploadProgress,
    isUpdating,
    setIsUpdating,
    getFileMetadata,
  };
}
