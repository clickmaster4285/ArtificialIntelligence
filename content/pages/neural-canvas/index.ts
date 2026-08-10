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
import aiConsultingCost from "./ai-consulting-cost.json";
import generativeAiDevelopment from "./generative-ai-development.json";
import buildVsBuyAi from "./build-vs-buy-ai.json";
import aiDevelopmentCompany from "./ai-development-company.json";
import generativeAiDevelopmentCost from "./generative-ai-development-cost.json";
import openaiVsAnthropicVsGoogleEnterprise from "./openai-vs-anthropic-vs-google-enterprise.json";
import langchainVsLlamaIndex from "./langchain-vs-llamaindex.json";
import ragDevelopmentCost from "./rag-development-cost.json";
import aiAgentDevelopmentCost from "./ai-agent-development-cost.json";
import aiApplicationDevelopmentServices from "./ai-application-development-services.json";
import customAiDevelopmentCompany from "./custom-ai-development-company.json";
import aiConsultingCompany from "./ai-consulting-company.json";
import generativeAiConsulting from "./generative-ai-consulting.json";
import ragDevelopmentServices from "./rag-development-services.json";
import llmIntegrationServices from "./llm-integration-services.json";
import aiModelFineTuningServices from "./ai-model-fine-tuning-services.json";
import aiAgentDevelopmentServices from "./ai-agent-development-services.json";
import aiStrategyConsulting from "./ai-strategy-consulting.json";
import agenticAiDevelopment from "./agentic-ai-development.json";
import topAiConsultingFirms from "./top-ai-consulting-firms.json";
import aiConsultingNearMe from "./ai-consulting-near-me.json";
import predictiveAnalyticsServices from "./predictive-analytics-services.json";
import aiNlpDevelopmentServices from "./ai-nlp-development-services.json";
import costOfAiChatbotDevelopment from "./cost-of-ai-chatbot-development.json";
import costOfMachineLearningDevelopment from "./cost-of-machine-learning-development.json";
import enterpriseAiDevelopment from "./enterprise-ai-development.json";
import aiWorkflowAutomationServices from "./ai-workflow-automation-services.json";
import costOfGenerativeAiDevelopment from "./cost-of-generative-ai-development.json";
import aiRecommendationEngineDevelopment from "./ai-recommendation-engine-development.json";
import responsibleAiConsulting from "./responsible-ai-consulting.json";
import aiDocumentProcessingServices from "./ai-document-processing-services.json";
import costOfAiAgentDevelopment from "./cost-of-ai-agent-development.json";
import aiComputerVisionServices from "./ai-computer-vision-services.json";
import aiDataEngineeringServices from "./ai-data-engineering-services.json";
import aiMlopsServices from "./ai-mlops-services.json";
import costOfComputerVisionDevelopment from "./cost-of-computer-vision-development.json";
import aiPoweredSearchDevelopment from "./ai-powered-search-development.json";
import aiSentimentAnalysisServices from "./ai-sentiment-analysis-services.json";
import aiFraudDetectionServices from "./ai-fraud-detection-services.json";
import aiDevelopmentManufacturingLosAngeles from "./ai-development-manufacturing-los-angeles.json";
import computerVisionServicesSeattle from "./computer-vision-services-seattle.json";
import aiDevelopmentRealEstateSeattle from "./ai-development-real-estate-seattle.json";
import aiDevelopmentCompanyStLouis from "./ai-development-company-st-louis.json";
import aiAutomationServicesBoston from "./ai-automation-services-boston.json";
import aiDevelopmentHealthcareCharlotte from "./ai-development-healthcare-charlotte.json";
import aiDevelopmentFintechCharlotte from "./ai-development-fintech-charlotte.json";
import machineLearningServicesDenver from "./machine-learning-services-denver.json";
import aiDevelopmentRealEstateBoston from "./ai-development-real-estate-boston.json";
import aiDevelopmentCompanyLasVegas from "./ai-development-company-las-vegas.json";
import aiAgentDevelopmentChicago from "./ai-agent-development-chicago.json";
import aiDevelopmentHealthcareDenver from "./ai-development-healthcare-denver.json";
import aiPlatformDevelopment from "./ai-platform-development.json";
import aiDevelopmentFintechMiami from "./ai-development-fintech-miami.json";
import computerVisionServicesBoston from "./computer-vision-services-boston.json";
import aiDevelopmentRealEstateNewYork from "./ai-development-real-estate-new-york.json";
import aiDevelopmentCompanyCincinnati from "./ai-development-company-cincinnati.json";
import aiAgentDevelopmentBoston from "./ai-agent-development-boston.json";
import aiDevelopmentHealthcareAustin from "./ai-development-healthcare-austin.json";
import dataPipelineDevelopmentCost from "./data-pipeline-development-cost.json";
import ragDevelopmentAustin from "./rag-development-austin.json";
import aiChatbotDevelopmentMiami from "./ai-chatbot-development-miami.json";
import aiDevelopmentManufacturingAustin from "./ai-development-manufacturing-austin.json";
import aiDevelopmentCompanyIndianapolis from "./ai-development-company-indianapolis.json";
import aiDevelopmentRealEstateChicago from "./ai-development-real-estate-chicago.json";
import aiDevelopmentHealthcareSeattle from "./ai-development-healthcare-seattle.json";
import aiAutomationServicesSeattle from "./ai-automation-services-seattle.json";
import ragDevelopmentChicago from "./rag-development-chicago.json";
import aiDevelopmentLogisticsNewYork from "./ai-development-logistics-new-york.json";
import aiDevelopmentCompanyPortland from "./ai-development-company-portland.json";
import aiAgentDevelopmentNewYork from "./ai-agent-development-new-york.json";
import aiDevelopmentFintechDenver from "./ai-development-fintech-denver.json";
import responsibleAiCompliance from "./responsible-ai-compliance.json";
import ragDevelopmentNewYork from "./rag-development-new-york.json";
import machineLearningServicesBoston from "./machine-learning-services-boston.json";
import aiDevelopmentFintechAustin from "./ai-development-fintech-austin.json";
import hireAiEngineerTucson from "./hire-ai-engineer-tucson.json";
import aiDevelopmentCompanyNashville from "./ai-development-company-nashville.json";
import aiChatbotDevelopmentBoston from "./ai-chatbot-development-boston.json";
import aiDevelopmentLogisticsMiami from "./ai-development-logistics-miami.json";
import aiAutomationServicesNewYork from "./ai-automation-services-new-york.json";
import aiDevelopmentEcommerceMiami from "./ai-development-ecommerce-miami.json";
import aiDevelopmentCompanyTucson from "./ai-development-company-tucson.json";
import machineLearningServicesNewYork from "./machine-learning-services-new-york.json";
import aiDevelopmentFintechSeattle from "./ai-development-fintech-seattle.json";
import aiSaaSDevelopment from "./ai-saas-development.json";
import computerVisionServicesNewYork from "./computer-vision-services-new-york.json";
import aiDevelopmentEcommerceSeattle from "./ai-development-ecommerce-seattle.json";
import aiDevelopmentCompanyRichmond from "./ai-development-company-richmond.json";
import aiChatbotDevelopmentNewYork from "./ai-chatbot-development-new-york.json";
import aiDevelopmentLogisticsDallas from "./ai-development-logistics-dallas.json";
import aiDevelopmentManufacturingMiami from "./ai-development-manufacturing-miami.json";
import aiAutomationServicesChicago from "./ai-automation-services-chicago.json";
import aiDevelopmentHealthcareDallas from "./ai-development-healthcare-dallas.json";
import aiDevelopmentCompanySaltLakeCity from "./ai-development-company-salt-lake-city.json";
import ragDevelopmentDenver from "./rag-development-denver.json";
import aiDevelopmentLogisticsChicago from "./ai-development-logistics-chicago.json";
import aiChatbotDevelopmentChicago from "./ai-chatbot-development-chicago.json";
import aiAgentDevelopmentDenver from "./ai-agent-development-denver.json";
import aiDevelopmentEcommerceDallas from "./ai-development-ecommerce-dallas.json";
import aiDevelopmentCompanyBoise from "./ai-development-company-boise.json";
import aiDevelopmentManufacturingSeattle from "./ai-development-manufacturing-seattle.json";
import aiAutomationServicesAtlanta from "./ai-automation-services-atlanta.json";
import aiDevelopmentRetailBoston from "./ai-development-retail-boston.json";
import aiDevelopmentCompanyAlbuquerque from "./ai-development-company-albuquerque.json";
import ragDevelopmentLosAngeles from "./rag-development-los-angeles.json";
import aiDevelopmentInsuranceChicago from "./ai-development-insurance-chicago.json";
import aiAgentDevelopmentLosAngeles from "./ai-agent-development-los-angeles.json";
import machineLearningServicesLosAngeles from "./machine-learning-services-los-angeles.json";
import aiDevelopmentManufacturingPhoenix from "./ai-development-manufacturing-phoenix.json";
import aiDevelopmentCompanyLouisville from "./ai-development-company-louisville.json";
import aiChatbotDevelopmentLosAngeles from "./ai-chatbot-development-los-angeles.json";
import aiDevelopmentRetailAtlanta from "./ai-development-retail-atlanta.json";
import computerVisionServicesDenver from "./computer-vision-services-denver.json";
import aiDevelopmentCompanyPittsburgh from "./ai-development-company-pittsburgh.json";
import ragDevelopmentBoston from "./rag-development-boston.json";
import aiDevelopmentInsuranceNewYork from "./ai-development-insurance-new-york.json";
import aiSaaSDevelopmentCost from "./ai-saas-development-cost.json";
import aiAutomationServicesDenver from "./ai-automation-services-denver.json";
import computerVisionServicesLosAngeles from "./computer-vision-services-los-angeles.json";
import aiDevelopmentLogisticsBoston from "./ai-development-logistics-boston.json";
import aiDevelopmentCompanyMemphis from "./ai-development-company-memphis.json";
import aiChatbotDevelopmentDenver from "./ai-chatbot-development-denver.json";
import aiDevelopmentSupplyChainChicago from "./ai-development-supply-chain-chicago.json";
import dataEngineeringMlPipelines from "./data-engineering-ml-pipelines.json";
import aiChatbotDevelopmentSeattle from "./ai-chatbot-development-seattle.json";
import llmIntegrationDenver from "./llm-integration-denver.json";
import aiDevelopmentFintechAtlanta from "./ai-development-fintech-atlanta.json";
import aiDevelopmentCompanyKansasCity from "./ai-development-company-kansas-city.json";
import ragDevelopmentAtlanta from "./rag-development-atlanta.json";








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
aiConsultingCost as DynamicPageData,
generativeAiDevelopment as DynamicPageData,
buildVsBuyAi as DynamicPageData,
aiDevelopmentCompany as DynamicPageData,
generativeAiDevelopmentCost as DynamicPageData,
openaiVsAnthropicVsGoogleEnterprise as DynamicPageData,
langchainVsLlamaIndex as DynamicPageData,
ragDevelopmentCost as DynamicPageData,
aiAgentDevelopmentCost as DynamicPageData,
aiApplicationDevelopmentServices as DynamicPageData,
customAiDevelopmentCompany as DynamicPageData,
aiConsultingCompany as DynamicPageData,
generativeAiConsulting as DynamicPageData,
ragDevelopmentServices as DynamicPageData,
llmIntegrationServices as DynamicPageData,
aiModelFineTuningServices as DynamicPageData,
aiAgentDevelopmentServices as DynamicPageData,
aiStrategyConsulting as DynamicPageData,
agenticAiDevelopment as DynamicPageData,
topAiConsultingFirms as DynamicPageData,
aiConsultingNearMe as DynamicPageData,
predictiveAnalyticsServices as DynamicPageData,
aiNlpDevelopmentServices as DynamicPageData,
costOfAiChatbotDevelopment as DynamicPageData,
costOfMachineLearningDevelopment as DynamicPageData,
enterpriseAiDevelopment as DynamicPageData,
aiWorkflowAutomationServices as DynamicPageData,
costOfGenerativeAiDevelopment as DynamicPageData,
aiRecommendationEngineDevelopment as DynamicPageData,
responsibleAiConsulting as DynamicPageData,
aiDocumentProcessingServices as DynamicPageData,
costOfAiAgentDevelopment as DynamicPageData,
aiComputerVisionServices as DynamicPageData,
aiDataEngineeringServices as DynamicPageData,
aiMlopsServices as DynamicPageData,
costOfComputerVisionDevelopment as DynamicPageData,
aiPoweredSearchDevelopment as DynamicPageData,
aiSentimentAnalysisServices as DynamicPageData,
aiFraudDetectionServices as DynamicPageData,
aiDevelopmentManufacturingLosAngeles as DynamicPageData,
computerVisionServicesSeattle as DynamicPageData,
aiDevelopmentRealEstateSeattle as DynamicPageData,
aiDevelopmentCompanyStLouis as DynamicPageData,
aiAutomationServicesBoston as DynamicPageData,
aiDevelopmentHealthcareCharlotte as DynamicPageData,
aiDevelopmentFintechCharlotte as DynamicPageData,
machineLearningServicesDenver as DynamicPageData,
aiDevelopmentRealEstateBoston as DynamicPageData,
aiDevelopmentCompanyLasVegas as DynamicPageData,
aiAgentDevelopmentChicago as DynamicPageData,
aiDevelopmentHealthcareDenver as DynamicPageData,
aiPlatformDevelopment as DynamicPageData,
aiDevelopmentFintechMiami as DynamicPageData,
computerVisionServicesBoston as DynamicPageData,
aiDevelopmentRealEstateNewYork as DynamicPageData,
aiDevelopmentCompanyCincinnati as DynamicPageData,
aiAgentDevelopmentBoston as DynamicPageData,
aiDevelopmentHealthcareAustin as DynamicPageData,
dataPipelineDevelopmentCost as DynamicPageData,
ragDevelopmentAustin as DynamicPageData,
aiChatbotDevelopmentMiami as DynamicPageData,
aiDevelopmentManufacturingAustin as DynamicPageData,
aiDevelopmentCompanyIndianapolis as DynamicPageData,
aiDevelopmentRealEstateChicago as DynamicPageData,
aiDevelopmentHealthcareSeattle as DynamicPageData,
aiAutomationServicesSeattle as DynamicPageData,
ragDevelopmentChicago as DynamicPageData,
aiDevelopmentLogisticsNewYork as DynamicPageData,
aiDevelopmentCompanyPortland as DynamicPageData,
aiAgentDevelopmentNewYork as DynamicPageData,
aiDevelopmentFintechDenver as DynamicPageData,
responsibleAiCompliance as DynamicPageData,
ragDevelopmentNewYork as DynamicPageData,
machineLearningServicesBoston as DynamicPageData,
aiDevelopmentFintechAustin as DynamicPageData,
hireAiEngineerTucson as DynamicPageData,
aiDevelopmentCompanyNashville as DynamicPageData,
aiChatbotDevelopmentBoston as DynamicPageData,
aiDevelopmentLogisticsMiami as DynamicPageData,
aiAutomationServicesNewYork as DynamicPageData,
aiDevelopmentEcommerceMiami as DynamicPageData,
aiDevelopmentCompanyTucson as DynamicPageData,
machineLearningServicesNewYork as DynamicPageData,
aiDevelopmentFintechSeattle as DynamicPageData,
aiSaaSDevelopment as DynamicPageData,
computerVisionServicesNewYork as DynamicPageData,
aiDevelopmentEcommerceSeattle as DynamicPageData,
aiDevelopmentCompanyRichmond as DynamicPageData,
aiChatbotDevelopmentNewYork as DynamicPageData,
aiDevelopmentLogisticsDallas as DynamicPageData,
aiDevelopmentManufacturingMiami as DynamicPageData,
aiAutomationServicesChicago as DynamicPageData,
aiDevelopmentHealthcareDallas as DynamicPageData,
aiDevelopmentCompanySaltLakeCity as DynamicPageData,
ragDevelopmentDenver as DynamicPageData,
aiDevelopmentLogisticsChicago as DynamicPageData,
aiChatbotDevelopmentChicago as DynamicPageData,
aiAgentDevelopmentDenver as DynamicPageData,
aiDevelopmentEcommerceDallas as DynamicPageData,
aiDevelopmentCompanyBoise as DynamicPageData,
aiDevelopmentManufacturingSeattle as DynamicPageData,
aiAutomationServicesAtlanta as DynamicPageData,
aiDevelopmentRetailBoston as DynamicPageData,
aiDevelopmentCompanyAlbuquerque as DynamicPageData,
ragDevelopmentLosAngeles as DynamicPageData,
aiDevelopmentInsuranceChicago as DynamicPageData,
aiAgentDevelopmentLosAngeles as DynamicPageData,
machineLearningServicesLosAngeles as DynamicPageData,
aiDevelopmentManufacturingPhoenix as DynamicPageData,
aiDevelopmentCompanyLouisville as DynamicPageData,
aiChatbotDevelopmentLosAngeles as DynamicPageData,
aiDevelopmentRetailAtlanta as DynamicPageData,
computerVisionServicesDenver as DynamicPageData,
aiDevelopmentCompanyPittsburgh as DynamicPageData,
ragDevelopmentBoston as DynamicPageData,
aiDevelopmentInsuranceNewYork as DynamicPageData,
aiSaaSDevelopmentCost as DynamicPageData,
aiAutomationServicesDenver as DynamicPageData,
computerVisionServicesLosAngeles as DynamicPageData,
aiDevelopmentLogisticsBoston as DynamicPageData,
aiDevelopmentCompanyMemphis as DynamicPageData,
aiChatbotDevelopmentDenver as DynamicPageData,
aiDevelopmentSupplyChainChicago as DynamicPageData,
dataEngineeringMlPipelines as DynamicPageData,
aiChatbotDevelopmentSeattle as DynamicPageData,
llmIntegrationDenver as DynamicPageData,
aiDevelopmentFintechAtlanta as DynamicPageData,
aiDevelopmentCompanyKansasCity as DynamicPageData,
ragDevelopmentAtlanta as DynamicPageData,




];
