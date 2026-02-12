interface FormSchema {
  id: string;
  version: number;
  title: string;
  description: string;
  fields: FormField[];
}

export const contactFormSchema: FormSchema = {
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
 
export const conditionalFormSchema: FormSchema = {
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

export const repeaterFormSchema: FormSchema = {
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

export const asyncFormSchema: FormSchema = {
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

export const autosaveFormSchema: FormSchema = {
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