import { useState, useEffect, useRef } from "react";

function Autosave() {
  const [formData, setFormData] = useState({
    bio: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");
  const [submittedData, setSubmittedData] = useState<any>(null);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setStatus("saving");
    const timer = setTimeout(() => {
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <div className="border border-gray-200 rounded-md p-4 mt-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Autosave</h2>
          <p className="text-gray-500 text-sm">
            Changes are saved automatically as you type.
          </p>
        </div>
        <div className="text-sm font-medium">
          {status === "saving" && (
            <span className="text-blue-500">Saving...</span>
          )}
          {status === "saved" && <span className="text-green-500">Saved</span>}
        </div>
      </div>
      <div className="flex-1">
        <form
          className="mt-5 flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="bio">Biography</label>
          <textarea
            id="bio"
            rows={4}
            className="border border-gray-200 rounded-md p-2"
            placeholder="Tell us about yourself..."
            required
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          ></textarea>

          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            className="border border-gray-200 rounded-md p-2"
            placeholder="https://example.com"
            required
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
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

export default Autosave;
