import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 sm:px-6">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight px-2">
          Schema-Driven Dynamic Form Builder
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto px-4">
          A custom form engine that renders complex forms from JSON schemas.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
          <Link to={"/form"}>View Showcase →</Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
