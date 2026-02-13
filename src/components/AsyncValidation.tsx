import React, { useState, useEffect } from "react";

function AsyncValidation() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isValidating, setIsValidating] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    if (formData.username.length > 0 && formData.username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return;
    }

    if (formData.username.length >= 3) {
      const timer = setTimeout(async () => {
        setIsValidating(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (formData.username.toLowerCase() === "admin") {
          setUsernameError("Username already taken");
        } else {
          setUsernameError("");
        }
        setIsValidating(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setUsernameError("");
    }
  }, [formData.username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
    console.log(formData);
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 mt-5">
      <div>
        <h2 className="text-2xl font-bold">Async Validation</h2>
        <p className="text-gray-500 text-sm">
          Username availability checked in real-time.
        </p>
      </div>
      <div className="flex-1">
        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              required
              className="border border-gray-200 rounded-md p-2 w-full"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            {isValidating && (
              <span className="absolute right-3 top-2 text-blue-500 text-xs">
                checking...
              </span>
            )}
          </div>
          {usernameError && (
            <p className="text-red-500 text-xs">{usernameError}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border border-gray-200 rounded-md p-2"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md disabled:bg-gray-400"
            disabled={isValidating}
            onClick={(e) => {
              e.preventDefault();
              setSubmittedData(formData);
              console.log(formData);
            }}
          >
            {isValidating ? "Validating..." : "Sign Up"}
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

export default AsyncValidation;
