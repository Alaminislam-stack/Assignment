import React, { useState, useEffect, useCallback } from "react";
import type { FormSchema, FormField } from "../assets/type";
import { validateField, checkCondition } from "../utils/Validator";

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (data: any) => void;
  autosave?: boolean;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  onSubmit,
  autosave = false,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Initialize form data based on schema
  useEffect(() => {
    const initialData: any = {};
    schema.fields.forEach((field) => {
      if (field.type === "repeater") {
        initialData[field.name] = [{}];
      } else if (field.type === "checkbox") {
        initialData[field.name] = false;
      } else {
        initialData[field.name] = "";
      }
    });
    setFormData(initialData);
  }, [schema]);

  const validate = useCallback(
    async (name: string, value: any, field: FormField) => {
      setIsValidating((prev) => ({ ...prev, [name]: true }));
      const error = await validateField(field, value);
      setErrors((prev) => ({ ...prev, [name]: error || "" }));
      setIsValidating((prev) => ({ ...prev, [name]: false }));
      return error;
    },
    [formData],
  );

  const handleChange = async (name: string, value: any, field: FormField) => {
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    await validate(name, value, field);

    if (autosave) {
      handleAutosave(newData);
    }
  };

  const [autosaveTimer, setAutosaveTimer] = useState<any>(null);

  const handleAutosave = (data: any) => {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    setStatus("saving");
    const timer = setTimeout(() => {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
      console.log("Autosaved:", data);
    }, 1000);
    setAutosaveTimer(timer);
  };

  const handleRepeaterChange = (
    field: FormField,
    index: number,
    subFieldName: string,
    value: any,
  ) => {
    const fieldData = [...(formData[field.name] || [])];
    fieldData[index] = { ...fieldData[index], [subFieldName]: value };
    const newData = { ...formData, [field.name]: fieldData };
    setFormData(newData);
    if (autosave) handleAutosave(newData);
  };

  const addRepeaterItem = (fieldName: string) => {
    const fieldData = [...(formData[fieldName] || []), {}];
    setFormData({ ...formData, [fieldName]: fieldData });
  };

  const removeRepeaterItem = (fieldName: string, index: number) => {
    const fieldData = (formData[fieldName] || []).filter(
      (_: any, i: number) => i !== index,
    );
    setFormData({ ...formData, [fieldName]: fieldData });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    for (const field of schema.fields) {
      if (checkCondition(field.condition, formData)) {
        const error = await validateField(field, formData[field.name]);
        if (error) newErrors[field.name] = error;
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    if (!checkCondition(field.condition, formData)) return null;

    const inputClass =
      "border border-gray-200 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "tel":
      case "url":
        return (
          <div key={field.name} className="relative">
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              className={`${inputClass} ${errors[field.name] ? "border-red-500" : ""}`}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field)}
              aria-invalid={!!errors[field.name]}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
            />
            {isValidating[field.name] && (
              <span className="absolute right-3 top-9 text-blue-500 text-xs">
                checking...
              </span>
            )}
            {errors[field.name] && (
              <p
                id={`${field.name}-error`}
                className="text-red-500 text-xs mt-1"
              >
                {errors[field.name]}
              </p>
            )}
          </div>
        );
      case "textarea":
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>
            <textarea
              id={field.name}
              className={`${inputClass} ${errors[field.name] ? "border-red-500" : ""}`}
              placeholder={field.placeholder}
              rows={4}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field)}
            ></textarea>
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        );
      case "select":
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className={labelClass}>
              {field.label}
            </label>
            <select
              id={field.name}
              className={`${inputClass} bg-white`}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field)}
            >
              <option value="">
                {field.placeholder || "Select an option"}
              </option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        );
      case "checkbox":
        return (
          <div key={field.name} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={field.name}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={formData[field.name] || false}
              onChange={(e) =>
                handleChange(field.name, e.target.checked, field)
              }
            />
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
          </div>
        );
      case "repeater":
        return (
          <div key={field.name} className="space-y-4">
            <label className={labelClass}>{field.label}</label>
            {(formData[field.name] || []).map((item: any, index: number) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative animate-in fade-in slide-in-from-top-1"
              >
                {field.fields?.map((innerField) => (
                  <div key={innerField.name} className="mb-3 last:mb-0">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      {innerField.label}
                    </label>
                    {innerField.type === "select" ? (
                      <select
                        className={`${inputClass} bg-white py-1 text-sm`}
                        value={item[innerField.name] || ""}
                        onChange={(e) =>
                          handleRepeaterChange(
                            field,
                            index,
                            innerField.name,
                            e.target.value,
                          )
                        }
                      >
                        {innerField.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={innerField.type}
                        className={`${inputClass} py-1 text-sm`}
                        value={item[innerField.name] || ""}
                        onChange={(e) =>
                          handleRepeaterChange(
                            field,
                            index,
                            innerField.name,
                            e.target.value,
                          )
                        }
                      />
                    )}
                  </div>
                ))}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeRepeaterItem(field.name, index)}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addRepeaterItem(field.name)}
              className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-700 transition-colors"
            >
              <span>+ Add {field.label.replace(/s$/, "")}</span>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{schema.title}</h2>
          <p className="text-sm text-gray-500">{schema.description}</p>
        </div>
        {autosave && (
          <div className="text-xs font-medium">
            {status === "saving" && (
              <span className="text-blue-500 animate-pulse">Saving...</span>
            )}
            {status === "saved" && (
              <span className="text-green-500">Saved</span>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {schema.fields.map(renderField)}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormRenderer;
