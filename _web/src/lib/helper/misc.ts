const getBoolean = (value: string) => {
  if (value == null) {
    return false;
  }
  switch (value.toLocaleLowerCase()) {
    case "true":
      return true;
    default:
      return false;
  }
};

const getString = (value: boolean) => {
  return value ? "true" : "false";
};

export { getBoolean, getString };
