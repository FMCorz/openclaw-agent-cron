import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { createScheduleTool } from "./src/tool.js";

export default function register(api: OpenClawPluginApi) {
  api.registerTool(createScheduleTool, { optional: true });
}
