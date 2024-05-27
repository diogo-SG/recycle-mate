import { Form, Formik, FormikProps } from "formik";
import { Input } from "../components/inputs/Input";
import { Assistant } from "../assistant";
import { Button, DisabledButton } from "../components/Button";
import logo from "../assets/logo.png";
import { useContext, useEffect, useState, useRef } from "react";
import AssistantContext from "../context/AssistantContext";
import { useFileStorage } from "../hooks/useFileStorage";
import * as Yup from "yup";
import LoadingSpinner from "../components/LoadingSpinner";

const validationSchema = Yup.object().shape({
  picture: Yup.mixed(),
});

const initialValues = {
  picture: null,
};

async function retryCheckFunction(
  checkFn: () => Promise<boolean>,
  interval: number = 500,
  maxRetries: number = 10
): Promise<void> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const executeCheck = async () => {
      attempts++;
      const result = await checkFn();

      if (result) {
        resolve();
      } else if (attempts >= maxRetries) {
        reject(new Error("Max retries reached"));
      } else {
        setTimeout(executeCheck, interval);
      }
    };

    executeCheck();
  });
}

export function Home() {
  const { assistant, setAssistant, responseMessage, setResponseMessage } = useContext(AssistantContext);
  const { uploadFiles, uploadedFiles, deleteFile, clearFileFromState } = useFileStorage();
  const [isLoading, setIsLoading] = useState(false);
  const formikRef = useRef<FormikProps<any> | null>(null);

  async function initAssistant() {
    const assistant = new Assistant();
    await assistant.init();
    setAssistant(assistant);
  }

  async function startAnalysis(file: string) {
    if (!file) return;

    await retryCheckFunction(
      async () => {
        if (uploadedFiles && uploadedFiles.length > 0) {
          return true;
        }
        return false;
      },
      1000,
      10
    );

    const uploadedFile = uploadedFiles![0];
    await assistant?.sendMessage(uploadedFile.url);
    console.log(uploadedFile.url);
    setIsLoading(true);
    retryCheckFunction(
      async () => {
        const response = await assistant?.receiveMessage();
        if (response) {
          setResponseMessage(response);
          return true;
        }
        return false;
      },
      1000,
      10
    );
    setIsLoading(false);
  }

  useEffect(() => {
    void initAssistant();
  }, []);

  return (
    <>
      {!assistant && <LoadingSpinner size="xl" />}

      {assistant && (
        <div className="flex items-center flex-col">
          <img src={logo} className="h-80 mb-4" alt="Let's get it sorted logo" />
          <div className="text-center">
            <div className="max-w-md">
              <p className="py-3">
                Take a picture of any kind of waste and we will tell you how to recycle it. Earn points and compete with
                others to save the planet!
              </p>
              <DisabledButton>Get started uploading an image below!</DisabledButton>
            </div>
          </div>
          <br></br>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => void 0}
            innerRef={formikRef}>
            {() => (
              <Form className="flex flex-col gap-3">
                <Input
                  type="picture"
                  name="picture"
                  settings={{
                    onChange: async (value) => await startAnalysis(value),
                    uploadHandlers: {
                      userId: "TEST",
                      clearFileFromState,
                      uploadFiles,
                      uploadedFiles,
                      deleteFile,
                    },
                  }}
                />
              </Form>
            )}
          </Formik>
          {isLoading ? (
            <LoadingSpinner size="xl" />
          ) : responseMessage ? (
            <>
              <h1>{responseMessage.nameOfObject}</h1>
              <ul>
                <li>
                  <b>Where to recycle:</b> {responseMessage.whereToRecycle}
                </li>
                <li>
                  <b>How to recycle:</b> {responseMessage.howToRecycle}
                </li>
                <li>
                  <b>CO2 Estimative Reduction:</b>
                  {responseMessage.co2EstimativeReduction}
                </li>
                <li>
                  <b>Materials:</b> {responseMessage.objectMaterials}
                </li>
                <li></li>
              </ul>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}
