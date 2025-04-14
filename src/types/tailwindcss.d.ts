declare module "tailwindcss" {
  interface Config {
    content: string[];
    theme?: Record<string, unknown>;
    plugins?: unknown[];
  }
  const content: Config;
  export default content;
}
