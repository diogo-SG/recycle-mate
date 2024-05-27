import { useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { InputPictureSettingsShape } from "../../types/types";
import placeholderImageSrc from "../../assets/picture_placeholder.png";
import Heading from "../Heading";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../LoadingSpinner";

export interface InputSelectFileProps {
  name: string;
  onChange?: (value: string) => Promise<void> | void | undefined;
  settings?: InputPictureSettingsShape;
}
export function InputPicture({ name, settings }: InputSelectFileProps) {
  const { uploadHandlers, placeholder, externalRef, onChange } = settings || {};
  const { uploadFiles, uploadedFiles, deleteFile, userId, clearFileFromState } = uploadHandlers || {};
  const [isLoading, setIsLoading] = useState(false);
  const [field, meta] = useField(name);
  const { value, ...rest } = field;
  const { setFieldValue, setFieldTouched, setErrors } = useFormikContext();
  const ref = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState(placeholder || placeholderImageSrc);
  const [showOption, setShowOption] = useState(false);

  useEffect(() => {
    setPreviewImage(placeholder || placeholderImageSrc);
  }, [placeholder]);

  function onChangeFn(event: React.ChangeEvent<HTMLInputElement>) {
    setIsLoading(true);
    const files = Array.prototype.slice.call(event.target.files);
    const reader = new FileReader();
    reader.onload = (function (theFile) {
      return async function (e: any) {
        if (e.target && uploadFiles && userId) {
          await uploadFiles([theFile], userId);
          void setFieldTouched(name, true);
        } else {
          setErrors(1);
        }
      };
    })(files[0]);
    reader.readAsDataURL(files[0]);

    (settings?.onChange || (() => void 0))(files[0]);
  }

  useEffect(() => {
    if (!deleteFile || !clearFileFromState) return;

    if (uploadedFiles?.length === 1 && uploadedFiles?.[0].url !== previewImage) {
      setPreviewImage(uploadedFiles?.[0].url);
      void setFieldValue(name, uploadedFiles?.[0]);
      setIsLoading(false);
      ((uploadedFiles?.length && settings?.onChange) || (() => void 0))(uploadedFiles?.[0].url);
    }
    // Only allow one file at a time, immediately delete the rest
    if (uploadedFiles && uploadedFiles?.length > 1) {
      uploadedFiles?.forEach((file, i) => {
        if (i !== uploadedFiles.length - 1)
          void (async () => {
            await clearFileFromState(file.metadata.fullPath);
            await deleteFile(file.metadata.fullPath);

            ((uploadedFiles?.length && settings?.onChange) || (() => void 0))(uploadedFiles?.[0].url);
            setPreviewImage(uploadedFiles?.[0].url);
            void setFieldValue(name, uploadedFiles?.[0]);

            setIsLoading(false);
          })();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles]);

  const showUpdateOption = (e: React.MouseEvent<HTMLElement>) => {
    if (value !== undefined) {
      e.preventDefault();
      setShowOption(!showOption);
    }
  };

  const browsePhoto = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    ref.current?.click();
  };

  const removePhoto = () => {
    setPreviewImage(placeholderImageSrc);
    (settings?.onRemove || (() => void 0))(meta.value);
  };

  const defaultStyle = "relative mx-auto w-fit bg-gray-100 cursor-pointer";

  if (isLoading)
    return (
      <div className="m-auto grid h-[140px] w-[140px] place-items-center overflow-hidden bg-gray-100">
        <LoadingSpinner size="xs" />
      </div>
    );

  return (
    <label className={meta?.touched && meta?.error?.length ? "border-2 border-red-200 " + defaultStyle : defaultStyle}>
      <span
        style={externalRef ? { display: "none" } : {}}
        onClick={showUpdateOption}
        className="bg-primary-900 hover:bg-primary-700 absolute -right-2 -top-2 z-10 grid h-8 w-8 cursor-pointer place-items-center rounded-2xl text-sm text-white">
        {meta.value ? <CameraSVGIcon /> : <PencilSVGIcon />}
        <div
          className={
            (showOption ? "" : "hidden") +
            " absolute top-[calc(100%+4px)] right-0 flex w-[260px] flex-col gap-6 rounded-md bg-white p-3 shadow-md"
          }>
          <div className="flex justify-between">
            <Heading kind="h5">Upload</Heading>
            <XMarkIcon className="w-6 text-gray-400" />
          </div>
          <div className="flex flex-col gap-4">
            <div
              ref={externalRef}
              className="font-nunito focus:border-1 bg-primary-900 hover:bg-primary-700 flex min-h-[41px] flex-shrink-0 flex-grow cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-base font-medium text-white"
              onClick={browsePhoto}>
              <BrowseSVGIcon />
              Browse...
            </div>
            <div
              className="font-nunito focus:border-1 flex min-h-[41px] flex-shrink-0 flex-grow cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-700 bg-white px-4 py-2.5 text-base font-medium text-red-700 hover:border-red-700 hover:text-red-700"
              onClick={removePhoto}>
              <TrashSVGIcon />
              Remove current photo
            </div>
          </div>
        </div>
      </span>

      <input
        {...rest}
        id="file-upload"
        ref={ref}
        multiple={false}
        className="hidden"
        aria-describedby="file_input_help"
        type="file"
        accept={"image/*"}
        onChange={onChangeFn}
        disabled={isLoading}
      />
      <div className="grid h-[140px] w-[140px] place-items-center overflow-hidden bg-gray-100">
        <img src={previewImage} alt="default placeholder" className="object-scale-down" />
      </div>
    </label>
  );
}

export default InputPicture;

/* -------------------------------------------------------------------------- */
/*                                    SVGs                                    */
/* -------------------------------------------------------------------------- */

const CameraSVGIcon = () => {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.71373 1.42857C1.33485 1.42857 0.971484 1.57908 0.703575 1.84699C0.435666 2.1149 0.285156 2.47826 0.285156 2.85714V8.57143C0.285156 8.95031 0.435666 9.31367 0.703575 9.58158C0.971484 9.84949 1.33485 10 1.71373 10H10.2852C10.664 10 11.0274 9.84949 11.2953 9.58158C11.5632 9.31367 11.7137 8.95031 11.7137 8.57143V2.85714C11.7137 2.47826 11.5632 2.1149 11.2953 1.84699C11.0274 1.57908 10.664 1.42857 10.2852 1.42857H9.1523C8.96287 1.42853 8.78122 1.35325 8.6473 1.21929L7.84659 0.418571C7.57874 0.150644 7.21543 8.09106e-05 6.83659 0H5.1623C4.78345 8.09106e-05 4.42015 0.150644 4.1523 0.418571L3.35159 1.21929C3.21766 1.35325 3.03601 1.42853 2.84658 1.42857H1.71373ZM5.99944 7.85714C6.28085 7.85714 6.55949 7.80172 6.81948 7.69403C7.07946 7.58634 7.31569 7.4285 7.51467 7.22952C7.71365 7.03053 7.8715 6.79431 7.97918 6.53432C8.08687 6.27434 8.1423 5.99569 8.1423 5.71429C8.1423 5.43288 8.08687 5.15423 7.97918 4.89425C7.8715 4.63427 7.71365 4.39804 7.51467 4.19906C7.31569 4.00007 7.07946 3.84223 6.81948 3.73454C6.55949 3.62686 6.28085 3.57143 5.99944 3.57143C5.43112 3.57143 4.88608 3.79719 4.48421 4.19906C4.08235 4.60092 3.85659 5.14596 3.85659 5.71429C3.85659 6.28261 4.08235 6.82765 4.48421 7.22952C4.88608 7.63138 5.43112 7.85714 5.99944 7.85714Z"
        fill="white"
      />
    </svg>
  );
};

const PencilSVGIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
    </svg>
  );
};

const BrowseSVGIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.28895 2.68652C6.05358 2.68652 5.82784 2.78003 5.66141 2.94646C5.49497 3.11289 5.40147 3.33863 5.40147 3.574C5.40147 3.80937 5.49497 4.03511 5.66141 4.20154C5.82784 4.36798 6.05358 4.46148 6.28895 4.46148H11.6138C11.8492 4.46148 12.0749 4.36798 12.2414 4.20154C12.4078 4.03511 12.5013 3.80937 12.5013 3.574C12.5013 3.33863 12.4078 3.11289 12.2414 2.94646C12.0749 2.78003 11.8492 2.68652 11.6138 2.68652H6.28895ZM3.62652 6.23643C3.62652 6.00106 3.72002 5.77533 3.88645 5.60889C4.05289 5.44246 4.27862 5.34896 4.51399 5.34896H13.3888C13.6241 5.34896 13.8499 5.44246 14.0163 5.60889C14.1827 5.77533 14.2762 6.00106 14.2762 6.23643C14.2762 6.47181 14.1827 6.69754 14.0163 6.86397C13.8499 7.03041 13.6241 7.12391 13.3888 7.12391H4.51399C4.27862 7.12391 4.05289 7.03041 3.88645 6.86397C3.72002 6.69754 3.62652 6.47181 3.62652 6.23643ZM1.85156 9.78634C1.85156 9.31559 2.03857 8.86413 2.37143 8.53126C2.7043 8.19839 3.15577 8.01139 3.62652 8.01139H14.2762C14.747 8.01139 15.1985 8.19839 15.5313 8.53126C15.8642 8.86413 16.0512 9.31559 16.0512 9.78634V13.3363C16.0512 13.807 15.8642 14.2585 15.5313 14.5913C15.1985 14.9242 14.747 15.1112 14.2762 15.1112H3.62652C3.15577 15.1112 2.7043 14.9242 2.37143 14.5913C2.03857 14.2585 1.85156 13.807 1.85156 13.3363V9.78634Z"
        fill="white"
      />
    </svg>
  );
};

const TrashSVGIcon = () => {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.56315 2.74902C8.39837 2.74911 8.23688 2.79507 8.09675 2.88175C7.95662 2.96843 7.84339 3.09241 7.76974 3.2398L7.12721 4.52398H4.12576C3.89038 4.52398 3.66465 4.61748 3.49822 4.78391C3.33178 4.95035 3.23828 5.17608 3.23828 5.41146C3.23828 5.64683 3.33178 5.87256 3.49822 6.039C3.66465 6.20543 3.89038 6.29893 4.12576 6.29893V15.1737C4.12576 15.6445 4.31276 16.0959 4.64563 16.4288C4.9785 16.7617 5.42997 16.9487 5.90071 16.9487H13.0005C13.4713 16.9487 13.9227 16.7617 14.2556 16.4288C14.5885 16.0959 14.7755 15.6445 14.7755 15.1737V6.29893C15.0109 6.29893 15.2366 6.20543 15.403 6.039C15.5695 5.87256 15.663 5.64683 15.663 5.41146C15.663 5.17608 15.5695 4.95035 15.403 4.78391C15.2366 4.61748 15.0109 4.52398 14.7755 4.52398H11.774L11.1315 3.2398C11.0579 3.09241 10.9446 2.96843 10.8045 2.88175C10.6644 2.79507 10.5029 2.74911 10.3381 2.74902H8.56315ZM6.78819 8.07389C6.78819 7.83851 6.88169 7.61278 7.04813 7.44635C7.21456 7.27991 7.44029 7.18641 7.67567 7.18641C7.91104 7.18641 8.13678 7.27991 8.30321 7.44635C8.46964 7.61278 8.56315 7.83851 8.56315 8.07389V13.3988C8.56315 13.6341 8.46964 13.8599 8.30321 14.0263C8.13678 14.1927 7.91104 14.2862 7.67567 14.2862C7.44029 14.2862 7.21456 14.1927 7.04813 14.0263C6.88169 13.8599 6.78819 13.6341 6.78819 13.3988V8.07389ZM11.2256 7.18641C10.9902 7.18641 10.7645 7.27991 10.598 7.44635C10.4316 7.61278 10.3381 7.83851 10.3381 8.07389V13.3988C10.3381 13.6341 10.4316 13.8599 10.598 14.0263C10.7645 14.1927 10.9902 14.2862 11.2256 14.2862C11.461 14.2862 11.6867 14.1927 11.8531 14.0263C12.0196 13.8599 12.1131 13.6341 12.1131 13.3988V8.07389C12.1131 7.83851 12.0196 7.61278 11.8531 7.44635C11.6867 7.27991 11.461 7.18641 11.2256 7.18641Z"
        fill="#C81E1E"
      />
    </svg>
  );
};
