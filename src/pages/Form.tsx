import { useState } from "react";
import ContactForm from "../components/ContactForm";
import ConditonalLogic from "../components/ConditonalLogic";
import Repeaters from "../components/Repeaters";
import AsyncValidation from "../components/AsyncValidation";
import Autosave from "../components/Autosave";
import { asyncFormSchema, autosaveFormSchema, conditionalFormSchema, contactFormSchema, repeaterFormSchema } from "../assets/type";



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
