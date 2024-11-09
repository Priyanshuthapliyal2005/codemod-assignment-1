import type { Api } from "@codemod.com/workflow";

// TLS methods and property names to check in the AST
const tlsMethods = ["Deno.connectTls", "Deno.listenTls"];
const tlsProperties = ["certFile", "certChain", "keyFile"];

// Parses a string value to extract content after the first colon (":")
const parseKeyValue = (value: string): string => {
  const separatorIndex = value.indexOf(":");
  return separatorIndex !== -1 ? value.slice(separatorIndex + 1).trim() : value;
};

// Builds the AST query structure to find "certChain" property and replace it with "cert"
const buildQuery = () => ({
  rule: {
    kind: "pair",
    has: {
      kind: "property_identifier",
      regex: "^certChain$",
    },
  },
});

// Updates the workflow to use the new rule with a fixed replacement value
export async function workflow({ files }: Api) {
  await files("**/*.{js,ts,tsx,jsx,cjs,mjs}")
    .jsFam()
    .astGrep(buildQuery())
    .replace(() => {
      // Replaces "certChain" with "cert: Deno.readTextFileSync('./server.crt')"
      return `cert: Deno.readTextFileSync("./server.crt")`;
    });
}


// Formats the key-value pair based on whether the value is a file path or a literal
const formatKeyValuePair = (newProp: string, value: string): string => {
  const isLiteral = ['"', "'", "`"].includes(value[0] as string);
  return isLiteral
    ? `${newProp}: Deno.readTextFileSync(${value})`
    : `${newProp}: ${value}`;
};