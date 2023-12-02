import "dotenv/config";

export function time(name: string) {
  if (process.env.DEBUG === "false") return;

  console.time(name);
}

export function timeEnd(name: string) {
  if (process.env.DEBUG === "false") return;

  console.timeEnd(name);
}
