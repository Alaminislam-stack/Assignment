import React, { useState } from "react";

function Repeaters() {
  const [formData, setFormData] = useState({
    name: "",
    phones: [{ number: "", type: "mobile" }],
  });
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...formData.phones];
    newPhones[index].number = value;
    setFormData({ ...formData, phones: newPhones });
  };

  const handleTypeChange = (index: number, value: string) => {
    const newPhones = [...formData.phones];
    newPhones[index].type = value;
    setFormData({ ...formData, phones: newPhones });
  };

  const addPhone = () => {
    setFormData({
      ...formData,
      phones: [...formData.phones, { number: "", type: "mobile" }],
    });
  };

  const removePhone = (index: number) => {
    const newPhones = formData.phones.filter((_, i) => i !== index);
    setFormData({ ...formData, phones: newPhones });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 mt-5">
      <div>
        <h2 className="text-2xl font-bold">Repeaters</h2>
        <p className="text-gray-500 text-sm">
          Add multiple items like phone numbers.
        </p>
      </div>
      <div className="flex-1">
        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            className="border border-gray-200 rounded-md p-2"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <label>Phone Numbers</label>
          {formData.phones.map((phone, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-3 bg-gray-50 rounded-md border border-gray-200 mb-2"
            >
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-200 rounded-md p-2 bg-white"
                value={phone.number}
                required
                onChange={(e) => handlePhoneChange(index, e.target.value)}
              />
              <select
                className="border border-gray-200 rounded-md p-2 bg-white"
                value={phone.type}
                onChange={(e) => handleTypeChange(index, e.target.value)}
                required
              >
                <option value="mobile">Mobile</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
              </select>
              {formData.phones.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 text-sm mt-1 text-left w-max"
                  onClick={() => removePhone(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="text-blue-500 text-sm font-medium w-max"
            onClick={addPhone}
          >
            + Add Phone Number
          </button>

          <button
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md mt-4"
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

export default Repeaters;
