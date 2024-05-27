import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Assistant } from "./assistant";

// async function testCall() {
//   try {
//     const message = "Which is the capital of Albania?";
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [{ role: "user", content: message }],
//       temperature: 0,
//       max_tokens: 1000,
//     });
//     console.log(response, "response");
//   } catch (err) {
//     console.error(err);
//   }
// }

function App() {
  const [message, setMessage] = useState<string>("");
  const [assistantResponse, setAssistantResponse] = useState<string>("");
  useEffect(() => {
    (async () => {
      const assistant = new Assistant();
      console.log(assistant, "assistant");
      await assistant.Init();
      await assistant.UserMessage(
        "json how can I recycle https://franoidelivery.com.br/wp-content/uploads/2021/03/Pet-2-Litros-Coca-Cola-PNG.png"
      );
      await assistant.RunThread();
      const res = await assistant.ResolveRun();

      console.log(res, "res");
      //if (res) setAssistantResponse(res.content[0]);
    })().catch((err) => console.log(err));
  }, [message]);

  return (
    <>
      <div>
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

export default App;
