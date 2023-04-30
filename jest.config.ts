import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  maxWorkers: 1,
  // watchAll: true,
  forceExit: true,
};
export default config;
