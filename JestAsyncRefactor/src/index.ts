import type { Api } from "@codemod.com/workflow";

export async function workflow({ files }: Api) {
  await files("**/*.ts")
    .jsFam()
    .astGrep({
      rule: {
        kind: "expression_statement",
        pattern: "expect(wrapper.instance().$A).toHaveBeenCalled();"
      },
      fix: `
        await waitFor(() => {
          expect(MyComponent.prototype.$A).toHaveBeenCalledTimes(1);
        });
      `,
    })
    .replace(({ getNode, getMatch }) => {
      console.log(getNode().text());
      return `
        await waitFor(() => {
          expect(MyComponent.prototype.$A).toHaveBeenCalledTimes(1);
        });
      `;
    });
}
