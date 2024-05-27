/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { Assistant } from "../assistant";

export type ResponseMessage = {
  nameOfObject: string;
  whereToRecycle: string;
  howToRecycle: string;
  co2EstimativeReduction: string;
  objectMaterials: string[];
};
const AssistantContext = createContext({
  assistant: null as Assistant | null,
  setAssistant: (() => {}) as (assistant: Assistant | null) => void,
  responseMessage: null as ResponseMessage | null,
  setResponseMessage: (() => {}) as (responseMessage: ResponseMessage | null) => void,
});
export default AssistantContext;
