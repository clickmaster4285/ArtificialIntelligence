import type { DynamicPageData } from "@/types/dynamic-page";

import llmDevelopmentCompany from "./llm-development-company.json";
import costOfRagDevelopmentData from "./cost-of-rag-development.json";
import costOfAiConsulting from       "./cost-of-ai-consulting.json";
import aiDataLabelingServices from "./ai-data-labeling-services.json";
import aiDevelopmentCost from "./ai-development-cost.json";
import machineLearningModelDevelopmentCost from "./machine-learning-model-development-cost.json";
import llmIntegrationCost from "./llm-integration-cost.json";
import computerVisionDevelopmentCost from "./computer-vision-development-cost.json";
import aiAutomationCost from "./ai-automation-cost.json";
import aiChatbotDevelopmentCost from "./ai-chatbot-development-cost.json";





/**
 * Pages that use the neural-canvas visual template.
 */
export const neuralCanvasPages: DynamicPageData[] = [
  llmDevelopmentCompany as DynamicPageData,
  costOfRagDevelopmentData as DynamicPageData,
  costOfAiConsulting as DynamicPageData, 
  aiDataLabelingServices as DynamicPageData,
  aiDevelopmentCost as DynamicPageData,
machineLearningModelDevelopmentCost as DynamicPageData,
llmIntegrationCost as DynamicPageData,
computerVisionDevelopmentCost as DynamicPageData,
aiAutomationCost as DynamicPageData,
aiChatbotDevelopmentCost as DynamicPageData,







];
