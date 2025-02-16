import { createFileRoute } from "@tanstack/react-router";
import { AdminPartners } from "pages/AdminPartners";

export const Route = createFileRoute("/")({
  component: AdminPartners,
});
