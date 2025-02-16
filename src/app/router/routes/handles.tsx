import { createFileRoute } from "@tanstack/react-router";
import { AdminHandles } from "pages/AdminHandles";

export const Route = createFileRoute("/handles")({
  component: AdminHandles,
});
