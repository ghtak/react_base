import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/scroll")({
  component: RouteComponent,
});

function RouteComponent() {
  const x = Array.from({ length: 101}, (_, i) => i.toString());

  return (
    <div>
      {x.map((v) => <div>{v}</div>)}
    </div>
  );
}
