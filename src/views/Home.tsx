import { useEffect, useState } from "react";
import { Assistant } from "../assistant";
import { Button } from "../components/Button";
import logo from "../assets/logo.png";

export function Home() {
  //   const [message, setMessage] = useState<string>("");
  //   const [assistantResponse, setAssistantResponse] = useState<string>("");

  //   useEffect(() => {
  //     (async () => {
  //       const assistant = new Assistant();
  //       console.log(assistant, "assistant");
  //       await assistant.Init();
  //       await assistant.UserMessage(
  //         "json how can I recycle https://franoidelivery.com.br/wp-content/uploads/2021/03/Pet-2-Litros-Coca-Cola-PNG.png"
  //       );
  //       await assistant.RunThread();
  //       const res = await assistant.ResolveRun();

  //       console.log(res, "res");
  //       //if (res) setAssistantResponse(res.content[0]);
  //     })().catch((err) => console.log(err));
  //   }, [message]);

  return (
    <>
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
        <form action="" method="post" encType="multipart/form-data">
          <label htmlFor="image">Upload image:</label>
          <input type="file" accept="image/*;capture=camera" />
          <br />
          <input type="submit" name="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
