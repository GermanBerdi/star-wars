const applyTemplate = (template: string, values: Record<string, string>): string => {
  return template.replace(/\$([a-zA-Z0-9_]+)/g, (_, key) => {
    return key in values ? values[key] : `$${key}`;
  });
};

const utils = {
  applyTemplate,
};

export default utils;
