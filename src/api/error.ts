/** Shorthand for throwing a rundtime error at line. */
export function throwRuntimeError(
    file: string,
    line: number,
    error: any
): never {
    throw `Error in file ${file}:${line}\n\n${error}`;
}

