import { readFileSync } from 'fs';
import { join } from 'path';
import type { Api } from '@codemod.com/workflow';

// Load the rules from rule.yaml
const rulePath = join(__dirname, 'rule.yaml');
const rules = readFileSync(rulePath, 'utf-8');

// Function to apply the codemod
export async function workflow({ files }: Api) {
  await files("**/*.ts")
    .jsFam()
    .astGrep({
      rule: {
        kind: "expression_statement",
        pattern: "expect(wrapper.instance().$$).toHaveBeenCalled();",
      },
    })
    .replace(({ getNode }) => {
      const node = getNode();
      const methodCall = node.text().match(/wrapper\.instance\((.*?)\)/)[1];
      return `await waitFor(() => {
        expect(MyComponent.prototype.${methodCall}).toHaveBeenCalledTimes(1);
      });`;
    });
}