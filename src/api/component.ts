import { Template } from "../templater.js";
import { throwRuntimeError } from "./error.js";

type TemplateProps<T extends Template> = Parameters<T["$render"]>[0];
type TemplateSlots<T extends Template> = Parameters<T["$render"]>[1];

/** Renders the component and throws an error if the render fails. */
export async function renderComponent<T extends Template>(
    component: T,
    props: TemplateProps<T>,
    slots: TemplateSlots<T>
): Promise<string> {
    const response = await component.$render(props, slots);

    if (!response.s) {
        throwRuntimeError(component.$meta.sourceFile, response.l, response.e);
    }

    return response.c;
}

