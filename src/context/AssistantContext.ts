/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { Assistant } from "../assistant";

const AssistantContext = createContext({
	assistant: null as Assistant | null,
	setAssistant: ((assistant) => {}) as (assistant: Assistant | null) => void,
});
export default AssistantContext;