import { Link } from "@remix-run/react";

export default function EventIndexPage() {
  return (
    <p>
      No event selected. Select a note on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new event.
      </Link>
    </p>
  );
}
