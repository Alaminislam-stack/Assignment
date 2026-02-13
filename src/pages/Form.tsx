import { useState } from "react";
import FormRenderer from "../components/FormRenderer";
import {
  asyncFormSchema,
  autosaveFormSchema,
  conditionalFormSchema,
  contactFormSchema,
  repeaterFormSchema,
} from "../assets/type";

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
  const [submittedData, setSubmittedData] = useState<any>(null);

  const activeData = scenarios.find((s) => s.key === activeScenario);

  const handleFormSubmit = (data: any) => {
    setSubmittedData(data);
    console.log("Form Submitted:", data);
  };

  const handleScenarioChange = (key: string) => {
    setActiveScenario(key);
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-10 py-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Form Engine Showcase
          </h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl">
            A schema-driven form builder capable of complex workflows, async
            validation, and accessibility.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-10 mt-10">
        <div className="flex flex-wrap gap-2 p-1.5 bg-gray-200/50 w-max rounded-xl mb-10 border border-gray-200">
          {scenarios.map((scenario) => (
            <button
              key={scenario.key}
              className={`px-4 py-2 cursor-pointer rounded-lg text-sm font-semibold transition-all ${
                activeScenario === scenario.key
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleScenarioChange(scenario.key)}
            >
              {scenario.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {activeData && (
              <FormRenderer
                key={activeScenario}
                schema={activeData.schema}
                autosave={activeData.autosave}
                onSubmit={handleFormSubmit}
              />
            )}

            {submittedData && (
              <div className="mt-10 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                  Last Submitted Data
                </h3>
                <pre className="bg-gray-900 text-blue-300 p-6 rounded-xl overflow-auto text-xs font-mono shadow-inner">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <path
                    d="M10 10L90 90M90 10L10 90"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-blue-400">
                  Schema Definition
                </h3>
                <button
                  onClick={() => setShowSchema(!showSchema)}
                  className="px-4 py-1.5 text-xs font-bold border border-blue-400/30 rounded-full hover:bg-blue-400/10 transition-colors"
                >
                  {showSchema ? "Hide Source" : "View Source"}
                </button>
              </div>

              {showSchema ? (
                <div className="relative group">
                  <pre className="text-xs font-mono text-blue-100 leading-relaxed overflow-auto max-h-[600px] scrollbar-thin scrollbar-thumb-blue-400/20">
                    {JSON.stringify(activeData?.schema, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="h-[200px] flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-gray-400 text-sm">
                    The engine renders the form dynamically from this JSON
                    structure.
                  </p>
                  <button
                    onClick={() => setShowSchema(true)}
                    className="text-blue-400 text-sm font-bold hover:underline"
                  >
                    Click to explore the schema →
                  </button>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Engine Info
              </h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Generic component for any JSON schema</li>
                <li>• Built-in recursive repeater support</li>
                <li>• Reactive conditional visibility</li>
                <li>• Debounced async validation layer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
