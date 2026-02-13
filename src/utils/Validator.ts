import type { FormField } from "../assets/type";

export type ValidationError = string | null;

export const validateField = async (
  field: FormField,
  value: any,
): Promise<ValidationError> => {
  if (!field.validation) return null;

  for (const rule of field.validation) {
    switch (rule.type) {
      case "required":
        if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
          return rule.message;
        }
        break;
      case "pattern":
        if (value && !new RegExp(rule.value).test(value)) {
          return rule.message;
        }
        break;
      case "minLength":
        if (value && value.length < rule.value) {
          return rule.message;
        }
        break;
      case "async":
        // Simulated async validation based on the schema and current hardcoded logic
        if (value) {
          await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network lag
          if (value.toLowerCase() === "admin") {
            return rule.message;
          }
        }
        break;
    }
  }

  return null;
};

export const checkCondition = (condition: FormField["condition"], formData: any): boolean => {
  if (!condition) return true;
  const { field, eq } = condition;
  return formData[field] === eq;
};
