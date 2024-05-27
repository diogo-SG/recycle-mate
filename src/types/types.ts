import { FullMetadata } from "firebase/storage";
import { Ref } from "react";

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

export interface InputProps {
  /*
   * Name is absolutely essential here as it's used by Formik for identifying the field.
   */
  name: string;
  type: "email" | "password" | "picture";
  className?: string;
  label?: string;
  labelStyles?: string;
  settings: InputSettingsShape | InputTypePasswordSettingsShape | InputPictureSettingsShape;
  onChange?: (...args: any) => any;
}

export interface InputTypePasswordSettingsShape extends InputSettingsShape {
  popoverTarget?: string;
  popoverPlacement?: "top" | "bottom" | "left" | "right"; //More variations are available but currently unnecessary. See type PopoverOptions from Flowbite
  popoverTrigger?: "click" | "hover";
}

export interface InputSettingsShape {
  id?: string;
  placeholder?: string;
  active?: boolean;
  errors?: boolean;
  disabled?: boolean;
  loading?: boolean;
  hint?: string;
  prepend?: string;
  append?: string;
  onFocus?: (...args: any) => any;
  allowSpecialCharacter?: boolean;
  forceUpperCaseFirstLetter?: boolean;
}

export interface FileUploadHandlersShape {
  userId: string;
  uploadFiles: (filesToUpload: File[], userId: string) => Promise<void>;
  uploadedFiles?: UserUploadedDocument[] | null;
  deleteFile?: (urlOrPath: string) => Promise<void>;
  clearFileFromState?: (filePath: string) => Promise<void>;
  isUpdating?: boolean;
  uploadProgress?: number | null;
}

export interface InputPictureSettingsShape extends InputSettingsShape {
  onRemove?: (value: string) => void | undefined;
  onChange?: (value: string) => Promise<void> | void | undefined;
  placeholder?: string;
  uploadHandlers?: FileUploadHandlersShape;
  externalRef?: Ref<any>;
}
