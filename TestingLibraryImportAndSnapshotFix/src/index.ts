import { readFileSync } from 'fs';
import { join } from 'path';
import { applyCodemod } from '@codemod.com/workflow'; // Ensure this is the correct import

// Load the rules from rule.yaml
const rulePath = join(__dirname, 'rule.yaml'); // Adjust path if necessary
const rules = readFileSync(rulePath, 'utf-8');

// Function to apply the codemod
export async function transform({ files }) {
  await applyCodemod({
    files: '**/*.{js,jsx,ts,tsx}',
    rules,
  });
}