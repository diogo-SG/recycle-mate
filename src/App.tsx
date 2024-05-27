import { Form, Formik } from "formik";
import "./App.css";
import { Input } from "./components/Input";
import { SuccessButton } from "./components/SuccessButton";
import { Assistant } from "./assistant";

async function App() {
	// const [message, setMessage] = useState<string>("");
	// const [assistantResponse, setAssistantResponse] = useState<string>("");
	// useEffect(() => {
	//   (async () => {
	//     const assistant = new Assistant();
	//     console.log(assistant, "assistant");
	//     await assistant.Init();
	//     await assistant.UserMessage(
	//       "json how can I recycle https://franoidelivery.com.br/wp-content/uploads/2021/03/Pet-2-Litros-Coca-Cola-PNG.png"
	//     );
	//     await assistant.RunThread();
	//     const res = await assistant.ResolveRun();

	//     console.log(res, "res");
	//     //if (res) setAssistantResponse(res.content[0]);
	//   })().catch((err) => console.log(err));
	// }, [message]);

	const assistant = await new Assistant().Init();
	async function onImageUpload() {
		console.log(assistant)
		console.log('heyo')
	}

	return (
		<>
			<div className="pt-[38px]">
				<Formik
					initialValues={{}}
					onSubmit={onImageUpload}
					// validationSchema={schema}
				>
					{() => (
						<Form className="flex flex-col gap-3">
							<Input />
							<div className="flex pt-5">
								<SuccessButton
								// disabled={Object.keys(errors).length > 0}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
}

export default App;
