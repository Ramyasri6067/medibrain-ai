/**
 * Mock AI Medical Assistant logic
 * In a real scenario, this would connect to an LLM like OpenAI or Gemini
 */
export const generateChatResponse = async (userMessage) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('headache')) {
    return "I am an AI assistant, not a doctor. However, common causes of headaches include dehydration, stress, or lack of sleep. If it's severe or persistent, please consult a healthcare professional. Ensure you are drinking enough water.";
  } else if (lowerMessage.includes('fever')) {
    return "A fever is a sign your body is fighting off an infection. Rest and stay hydrated. If your temperature exceeds 103°F (39.4°C) or lasts more than a few days, please seek medical attention.";
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I am your AI Medical Assistant. How can I help you today? Please note that I provide general information and not professional medical diagnoses.";
  } else {
    return "I understand your concern. As an AI, I can provide general medical information, but I cannot diagnose conditions. For accurate medical advice regarding '" + userMessage + "', please consult a healthcare provider.";
  }
};
