export default function getArgumentTypes(inputs) {
  if (inputs.length === 0) return [];
  return inputs.map((x) => x.type);
}
