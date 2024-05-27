import { Form, Formik } from "formik";
import { Input } from "../components/Input";
import { SuccessButton } from "../components/SuccessButton";
import { Assistant } from "../assistant";
import { Button } from "../components/Button";
import logo from "../assets/logo.png";
import { useContext, useEffect } from "react";
import AssistantContext from "../context/AssistantContext";
// import { useFileStorage } from "../hooks/useFileStorage";

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
	// const { uploadFiles, uploadedFiles } = useFileStorage();

	async function initAssistant() {
		const assistant = new Assistant();
		await assistant.init();
		setAssistant(assistant);
	}

	async function onImageUpload() {
		await assistant?.sendMessage(
			"https://franoidelivery.com.br/wp-content/uploads/2021/03/Pet-2-Litros-Coca-Cola-PNG.png"
		);
		retryCheckFunction(
			async () => {
				const response = await assistant?.receiveMessage();
				if (response) {
					console.log(response);
					return true;
				}
				return false;
			},
			1000,
			10
		);
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
					initialValues={{}}
					onSubmit={onImageUpload}
				>
					{() => (
						<Form className="flex flex-col gap-3">
							<Input />
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