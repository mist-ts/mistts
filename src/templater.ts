import { Prettify } from "./types.js";

type Params = any;
type Templates = Record<string, Template>;
type Slots = Record<string, () => Promise<string>>;

type TemplateMeta = {
    sourceFile: string;
    slots: readonly string[];
};
type TemplateFunction = (
    params: Params,
    $slots: Slots
) => Promise<{ s: true; c: string } | { s: false; l: number; e: any }>;
export type Template = {
    $meta: TemplateMeta;
    $render: TemplateFunction;
};

type TemplateNameFromPath<T extends string> =
    T extends `${infer Slug}/${infer Rest}`
        ? `${Slug}.${TemplateNameFromPath<Rest>}`
        : T extends `${infer FileName}.${string}`
          ? FileName
          : never;
type AppendTemplate<
    T extends Templates,
    U extends string,
    V extends Template,
> = Prettify<T & { [K in U]: V }>;

export class Templater<Tmpls extends Templates = {}> {
    #templates: Map<string, Template> = new Map();

    constructor() {}

    #getNameFromPath<T extends string>(path: T): TemplateNameFromPath<T> {
        const slugs = path.split("/");
        if (slugs.length === 0) return "" as TemplateNameFromPath<T>;

        const fileName = slugs.at(-1)!.split(".").slice(0, -1).join(".")!;
        if (slugs.length === 1) return fileName as TemplateNameFromPath<T>;

        return `${slugs.slice(0, -1).join(".")}.${fileName}` as TemplateNameFromPath<T>;
    }

    add<T extends Template>(
        template: T
    ): Templater<
        AppendTemplate<Tmpls, TemplateNameFromPath<T["$meta"]["sourceFile"]>, T>
    >;
    add<T extends Template, U extends string>(
        template: T,
        name: U
    ): Templater<AppendTemplate<Tmpls, U, T>>;
    add(template: Template, name?: string) {
        this.#templates.set(
            name || this.#getNameFromPath(template.$meta.sourceFile),
            template
        );

        return this;
    }

    #getTemplate(name: string): Template {
        console.log(this.#templates);
        const template = this.#templates.get(name);
        if (!template) throw "Invalid template name!";

        return template;
    }

    async render<T extends keyof Tmpls>(
        name: T,
        params: Parameters<Tmpls[T]["$render"]>[0]
    ): Promise<string> {
        const template = this.#getTemplate(name as string);

        const response = await template.$render(params, {});

        if (response.s) {
            return response.c;
        }

        throw `Error in ${template.$meta.sourceFile}:${response.l}\n${response.e}`;
    }
}

