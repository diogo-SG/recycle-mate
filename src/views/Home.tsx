import { Form, Formik, FormikProps } from "formik";
import { Input } from "../components/inputs/Input";
import { SuccessButton } from "../components/SuccessButton";
import { Assistant } from "../assistant";
import { Button } from "../components/Button";
import logo from "../assets/logo.png";
import { useContext, useEffect, useRef } from "react";
import AssistantContext from "../context/AssistantContext";
import { useFileStorage } from "../hooks/useFileStorage";
import * as Yup from "yup";

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
  const { assistant, setAssistant } = useContext(AssistantContext);
  const { uploadFiles, uploadedFiles, deleteFile, clearFileFromState } = useFileStorage();
  const formikRef = useRef<FormikProps<any> | null>(null);

  async function initAssistant() {
    const assistant = new Assistant();
    await assistant.init();
    setAssistant(assistant);
  }

  async function startAnalysis(file: File) {
    console.log(file, "file");
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
  }

  async function onImageUpload(values: any) {
    console.log(values, "values");
    // await assistant?.sendMessage(
    //   "https://franoidelivery.com.br/wp-content/uploads/2021/03/Pet-2-Litros-Coca-Cola-PNG.png"
    // );
    // retryCheckFunction(
    //   async () => {
    //     const response = await assistant?.receiveMessage();
    //     if (response) {
    //       console.log(response);
    //       return true;
    //     }
    //     return false;
    //   },
    //   1000,
    //   10
    // );
  }

  useEffect(() => {
    void initAssistant();
  }, []);

  return (
    <>
      {!assistant && <div>Loading...</div>}

      {assistant && (
        <div className="flex items-center flex-col">
          <img src={logo} className="h-80 mb-4" alt="Let's get it sorted logo" />
          <div className="text-center">
            <div className="max-w-md">
              <p className="py-3">
                Take a picture of any kind of waste and we will tell you how to recycle it. Earn points and compete with
                others to save the planet!
              </p>
              <Button>Get started</Button>
            </div>
          </div>
          <br></br>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onImageUpload}
            innerRef={formikRef}>
            {() => (
              <Form className="flex flex-col gap-3">
                <Input
                  type="picture"
                  name="picture"
                  settings={{
                    onChange: (value) => startAnalysis(value),
                    uploadHandlers: {
                      userId: "TEST",
                      clearFileFromState,
                      uploadFiles,
                      uploadedFiles,
                      deleteFile,
                    },
                  }}
                />
                <div className="flex pt-5">
                  <SuccessButton />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}
