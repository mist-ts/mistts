#! /usr/bin/env node

import { program } from "commander";
import { getConfig } from "./config.js";
import { compileWorkspace } from "./compile.js";
import { watchWorkspace } from "./watch.js";

program
    .name("MistTS")
    .description("A templating engine for TypeScript")
    .version("0.1.0");

program.option("--watch", "Watch the files and automaticly recompile.");

program.parse();

const options = program.opts<{
    watch: boolean;
}>();

const config = await getConfig();

if (options.watch) {
    console.log("Watching this and nested directories. ");
    watchWorkspace(config);
} else {
    await compileWorkspace(config);
}

