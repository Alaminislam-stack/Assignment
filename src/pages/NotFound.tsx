import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground px-4">
          The page you are looking for does not exist.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
          <Link to={"/"}>Go to Home</Link>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
