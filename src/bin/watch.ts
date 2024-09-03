import * as chokidar from "chokidar";
import { compile } from "./compile.js";
import { Config } from "./config.js";

/** Start the watcher to watch for file changes and recompile the files. */
export function watchWorkspace(config: Config): void {
    chokidar
        .watch("**/*.mist", {
            ignored: "node_modules/**/*",
        })
        .on("add", (path) => recompileFile(path, config))
        .on("change", (path) => recompileFile(path, config));
}

async function recompileFile(filePath: string, config: Config): Promise<void> {
    try {
        await compile([filePath], config.rootDir, config.rootDir);
    } catch (err) {
        console.log(err);
    }
}

