import type { Meta, StoryObj } from "@storybook/react";
import FormRenderer from "./FormRenderer";
import {
  contactFormSchema,
  conditionalFormSchema,
  repeaterFormSchema,
  asyncFormSchema,
  autosaveFormSchema,
} from "../assets/type";

const meta: Meta<typeof FormRenderer> = {
  title: "Engine/FormRenderer",
  component: FormRenderer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormRenderer>;

export const ContactForm: Story = {
  args: {
    schema: contactFormSchema,
    onSubmit: (data) => console.log("Contact Form Submitted:", data),
    autosave: false
  },
};

export const ConditionalLogic: Story = {
  args: {
    schema: conditionalFormSchema,
    onSubmit: (data) => console.log("Conditional Form Submitted:", data),
  },
};

export const Repeaters: Story = {
  args: {
    schema: repeaterFormSchema,
    onSubmit: (data) => console.log("Repeater Form Submitted:", data),
  },
};

export const AsyncValidation: Story = {
  args: {
    schema: asyncFormSchema,
    onSubmit: (data) => console.log("Async Form Submitted:", data),
  },
};

export const Autosave: Story = {
  args: {
    schema: autosaveFormSchema,
    autosave: true,
    onSubmit: (data) => console.log("Autosave Form Submitted:", data),
  },
};
