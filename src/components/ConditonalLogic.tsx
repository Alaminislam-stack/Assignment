import React, { useState } from "react";

function ConditonalLogic() {
  const [formData, setFormData] = useState({
    accountType: "personal",
    businessName: "",
    businessId: "",
    personalId: "",
  });
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
  };
  return (
    <div className="border border-gray-200 rounded-md p-4 mt-5">
      <div>
        <h2 className="text-2xl font-bold">Conditonal Logic</h2>
        <p className="text-gray-500 text-sm">
          A simple form with conditional fields.
        </p>
      </div>
      <div className="flex-1">
        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="accountType">Account Type</label>
          <select
            id="accountType"
            name="accountType"
            className="border border-gray-200 rounded-md p-2"
            value={formData.accountType}
            onChange={(e) =>
              setFormData({ ...formData, accountType: e.target.value })
            }
          >
            <option value="personal">Personal</option>
            <option value="business">Business</option>
          </select>

          {formData.accountType === "business" && (
            <>
              <label htmlFor="businessName">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                className="border border-gray-200 rounded-md p-2"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
              />
              <label htmlFor="businessId">Business ID</label>
              <input
                type="text"
                id="businessId"
                name="businessId"
                className="border border-gray-200 rounded-md p-2"
                value={formData.businessId}
                onChange={(e) =>
                  setFormData({ ...formData, businessId: e.target.value })
                }
              />
            </>
          )}

          {formData.accountType === "personal" && (
            <>
              <label htmlFor="personalId">Personal ID</label>
              <input
                type="text"
                id="personalId"
                name="personalId"
                className="border border-gray-200 rounded-md p-2"
                value={formData.personalId}
                onChange={(e) =>
                  setFormData({ ...formData, personalId: e.target.value })
                }
              />
            </>
          )}

          <button
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              setSubmittedData(formData);
              console.log(formData);
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-5">
        <h2>Submitted Data</h2>
        {submittedData && <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-auto text-sm">{JSON.stringify(submittedData, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default ConditonalLogic;
