import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import ConditonalLogic from "../components/ConditonalLogic";
import Repeaters from "../components/Repeaters";
import AsyncValidation from "../components/AsyncValidation";
import Autosave from "../components/Autosave";

interface FormSchema {
  id: string;
  version: number;
  title: string;
  description: string;
  fields: FormField[];
}

const contactFormSchema: FormSchema = {
  id: "contact-form",
  version: 1,
  title: "Contact Form",
  description: "A simple contact form with basic validation.",
  fields: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      validation: [{ type: "required", message: "Name is required" }],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
      validation: [
        { type: "required", message: "Email is required" },
        {
          type: "pattern",
          value: "^[^@]+@[^@]+\.[^@]+$",
          message: "Enter a valid email",
        },
      ],
    },
    {
      name: "subject",
      label: "Subject",
      type: "select",
      placeholder: "Choose a subject",
      options: [
        { label: "General Inquiry", value: "general" },
        { label: "Bug Report", value: "bug" },
        { label: "Feature Request", value: "feature" },
      ],
      validation: [{ type: "required", message: "Please select a subject" }],
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Your message...",
      validation: [
        { type: "required", message: "Message is required" },
        {
          type: "minLength",
          value: 10,
          message: "Message must be at least 10 characters",
        },
      ],
    },
    { name: "subscribe", label: "Subscribe to newsletter", type: "checkbox" },
  ],
};

const conditionalFormSchema: FormSchema = {
  id: "conditional-form",
  version: 1,
  title: "Conditional Logic",
  description: "Fields appear or disappear based on other field values.",
  fields: [
    {
      name: "accountType",
      label: "Account Type",
      type: "select",
      options: [
        { label: "Personal", value: "personal" },
        { label: "Business", value: "business" },
      ],
      validation: [{ type: "required", message: "Account type is required" }],
    },
    {
      name: "businessName",
      label: "Business Name",
      type: "text",
      placeholder: "Your company name",
      validation: [{ type: "required", message: "Business name is required" }],
      condition: { field: "accountType", eq: "business" },
    },
    {
      name: "businessId",
      label: "Business ID",
      type: "text",
      placeholder: "ABN / Tax ID",
      validation: [{ type: "required", message: "Business ID is required" }],
      condition: { field: "accountType", eq: "business" },
    },
    {
      name: "personalId",
      label: "Personal ID",
      type: "text",
      placeholder: "Driver's license / Passport",
      validation: [{ type: "required", message: "Personal ID is required" }],
      condition: { field: "accountType", eq: "personal" },
    },
  ],
};

const repeaterFormSchema: FormSchema = {
  id: "repeater-form",
  version: 1,
  title: "Repeaters",
  description: "Add multiple items like phone numbers or addresses.",
  fields: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      validation: [{ type: "required", message: "Name is required" }],
    },
    {
      name: "phones",
      label: "Phone Numbers",
      type: "repeater",
      fields: [
        {
          name: "number",
          label: "Phone Number",
          type: "tel",
          validation: [
            { type: "required", message: "Phone number is required" },
          ],
        },
        {
          name: "type",
          label: "Type",
          type: "select",
          options: [
            { label: "Mobile", value: "mobile" },
            { label: "Home", value: "home" },
            { label: "Work", value: "work" },
          ],
        },
      ],
    },
  ],
};

const asyncFormSchema: FormSchema = {
  id: "async-form",
  version: 1,
  title: "Async Validation",
  description: "Username availability checked in real-time.",
  fields: [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Choose a username",
      validation: [
        { type: "required", message: "Username is required" },
        {
          type: "minLength",
          value: 3,
          message: "Username must be at least 3 characters",
        },
        {
          type: "async",
          value: "/api/check-username",
          message: "Username already taken",
        },
      ],
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validation: [
        { type: "required", message: "Password is required" },
        {
          type: "minLength",
          value: 8,
          message: "Password must be at least 8 characters",
        },
      ],
    },
  ],
};

const autosaveFormSchema: FormSchema = {
  id: "autosave-form",
  version: 1,
  title: "Autosave",
  description: "Changes are saved automatically as you type.",
  fields: [
    {
      name: "bio",
      label: "Biography",
      type: "textarea",
      placeholder: "Tell us about yourself...",
      validation: [
        {
          type: "minLength",
          value: 10,
          message: "Bio must be at least 10 characters",
        },
      ],
    },
    {
      name: "website",
      label: "Website",
      type: "url",
      placeholder: "https://example.com",
      validation: [
        {
          type: "pattern",
          value: "^https?:\/\/.+$",
          message: "Enter a valid URL",
        },
      ],
    },
  ],
};

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  validation?: { type: string; value?: any; message: string }[];
  fields?: FormField[];
  condition?: {
    field: string;
    eq?: any;
  };
}

const scenarios = [
  {
    key: "contact",
    label: "Contact Form",
    schema: contactFormSchema,
    autosave: false,
  },
  {
    key: "conditional",
    label: "Conditional Logic",
    schema: conditionalFormSchema,
    autosave: false,
  },
  {
    key: "repeater",
    label: "Repeaters",
    schema: repeaterFormSchema,
    autosave: false,
  },
  {
    key: "async",
    label: "Async Validation",
    schema: asyncFormSchema,
    autosave: false,
  },
  {
    key: "autosave",
    label: "Autosave",
    schema: autosaveFormSchema,
    autosave: true,
  },
] as const;

function Form() {
  const [activeScenario, setActiveScenario] = useState("contact");
  const [showSchema, setShowSchema] = useState(false);

  // const activeScenarioData = scenarios.find((s) => s.key === activeScenario);

  const renderForm = () => {
    switch (activeScenario) {
      case "contact":
        return <ContactForm />;
      case "conditional":
        return <ConditonalLogic />;
      case "repeater":
        return <Repeaters />;
      case "async":
        return <AsyncValidation />;
      case "autosave":
        return <Autosave />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mx-4 sm:mx-10 my-5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dynamic Form Builder — Showcase
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Interactive demos of the schema-driven form engine. Each tab shows a
          live form and its driving schema.
        </p>
      </div>
      <div className="w-full h-[1px] bg-gray-200 mt-8"></div>
      <div className="mt-8 mx-4 sm:mx-10 my-5">
        <div className="flex flex-wrap gap-2 p-1 bg-gray-100 w-max max-w-full rounded">
          {scenarios.map((scenario) => (
            <button
              key={scenario.key}
              className={`px-2 py-1 cursor-pointer rounded text-sm font-medium ${activeScenario === scenario.key ? "bg-white text-black" : "text-gray-500"}`}
              onClick={() => {
                setActiveScenario(scenario.key);
              }}
            >
              {scenario.label}
            </button>
          ))}
        </div>
        <div className="sm:flex flex-row justify-between gap-4">
          <div className="sm:w-1/2 w-full">{renderForm()}</div>
          <div className="mt-5 sm:w-1/2 w-full border border-gray-200 rounded-md p-4 h-max">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Schema JSON</h3>
              <button
                onClick={() => setShowSchema(!showSchema)}
                className="px-4 py-2 cursor-pointer rounded-md"
              >
                {showSchema ? "Hide" : "Show"}
              </button>
            </div>
            {showSchema && (
              <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-auto text-sm">
                {JSON.stringify(
                  scenarios.find((s) => s.key === activeScenario)?.schema,
                  null,
                  2,
                )}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
