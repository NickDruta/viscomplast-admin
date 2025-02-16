import { createFileRoute } from "@tanstack/react-router";
import { AdminPages } from "pages/AdminPages";

export const Route = createFileRoute("/pages")({
  component: AdminPages,
});
