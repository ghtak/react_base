import { createFileRoute } from "@tanstack/react-router";
import { MainComponent } from "../components/main";

export const Route = createFileRoute("/")({
  component: MainComponent,
});
