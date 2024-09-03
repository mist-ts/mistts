import { readFile } from "fs/promises";

export type Config = {
    rootDir: string;
    outDir: string;
};

/** Gets the config from the `tsconfig.json` file. */
export async function getConfig(): Promise<Config> {
    let tsconfig: string;

    try {
        tsconfig = (await readFile("./tsconfig.json")).toString();
    } catch (err) {
        throw "Couldn't find tsconfig.json file. ";
    }

    const tsConfigParsed = JSON.parse(tsconfig) as object;
    if (typeof tsConfigParsed !== "object") throw "Invalid tsconfig.json. ";

    if (
        !("compilerOptions" in tsConfigParsed) ||
        !tsConfigParsed.compilerOptions ||
        typeof tsConfigParsed.compilerOptions !== "object"
    )
        throw "Invalid tsconfig.json compiler options. ";

    const compilerOptions = tsConfigParsed.compilerOptions;
    if (
        !("rootDir" in compilerOptions) ||
        typeof compilerOptions.rootDir !== "string"
    )
        throw "Invalid tsconfig.json rootDir. ";

    if (
        !("outDir" in compilerOptions) ||
        typeof compilerOptions.outDir !== "string"
    )
        throw "Invalid tsconfig.json outDir. ";

    return {
        rootDir: compilerOptions.rootDir as string,
        outDir: compilerOptions.outDir as string,
    };
}

