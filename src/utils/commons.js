export const isEmpty = (value) => {
	if (value instanceof Array) {
    return value.length === 0;
  }
	return value === void 0 || value === null || value === '' || value === undefined;
};