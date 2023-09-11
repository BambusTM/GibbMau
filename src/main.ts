import "./app.css";
import App from "./App.svelte";

if (document.getElementById("app") == null) {
  console.error("Element with id 'app' not found");
  process.exit(1);
}

const app = new App({
  target: document.getElementById("app") as Document | Element | ShadowRoot,
});

export default app;
