import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
  await files("**/*.ts")
    .jsFam()
    .astGrep({
      rule: {
        kind: "pair",
        has: {
          kind: "property_identifier",
          regex: "^certChain$"
        }
      },
      fix: `
        cert: Deno.readTextFileSync("./server.crt")
      `
    })
    .replace(({ getNode }) => {
      console.log(getNode().text());
      return `
        cert: Deno.readTextFileSync("./server.crt")
      `;
    });
}
