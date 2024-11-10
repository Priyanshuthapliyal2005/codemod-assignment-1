import { describe, it } from 'vitest';
import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { transform } from "../src/index.js"; // Ensure this is the correct import

describe('TestingLibraryImportAndSnapshotFix', () => {
  it('should transform input code to expected output', async () => {
    const inputPath = join(__dirname, '..', '__testfixtures__/fixture1.input.js');
    const outputPath = join(__dirname, '..', '__testfixtures__/fixture1.output.js');

    const inputCode = await readFile(inputPath, 'utf-8');
    const expectedOutputCode = await readFile(outputPath, 'utf-8');

    // Mock API to simulate the expected input for the workflow function
    const mockApi = {
      files: async () => ({
        jsFam: () => ({
          astGrep: () => ({
            replace: (callback) => {
              const actualOutputCode = callback(inputCode);
              assert.strictEqual(
                actualOutputCode.replace(/\s/g, ''),
                expectedOutputCode.replace(/\s/g, '')
              );
            },
          }),
        }),
      }),
    };

    await transform(mockApi);
  });
});