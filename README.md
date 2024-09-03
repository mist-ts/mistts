# MistTs

MistTs is a templating engine for TypeScript.

```sh
npm install mistts
```

## Example

```html
{{-- index.mist --}}
<h1>Hello {{name}}</h1>
```

```
npx mistts
```

```ts
// index.ts
import { Templater } from "mistts";
import * as template from "./index.mist.ts";

const templater = new Templater().add(template);
console.log(
    await templater.render("index", {
        name: "John Doe",
    })
);
```

