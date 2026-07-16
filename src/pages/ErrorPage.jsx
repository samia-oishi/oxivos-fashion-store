import { Link, useRouteError } from "react-router";

export const ErrorPage = () => {
  const error = useRouteError();
  const isNotFound = error?.status === 404;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-semibold">
        {isNotFound ? "Page not found" : "Something went wrong"}
      </h1>
      <p className="mt-2 text-gray-700">
        {isNotFound
          ? "The page you are looking for does not exist."
          : "The store data could not be loaded. Please try again or go back to the home page."}
      </p>
      <Link to="/" className="mt-4 inline-block underline">
        Back to home
      </Link>
    </section>
  );
};
