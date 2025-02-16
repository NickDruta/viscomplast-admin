import { createFileRoute } from "@tanstack/react-router";
import { AdminExport } from "pages/AdminExport";

export const Route = createFileRoute("/export")({
  component: AdminExport,
});
