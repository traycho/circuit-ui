import { identity, keys, pickBy } from 'lodash/fp';

const getValidationErrors = errors => {
  const activeErrors = pickBy(identity, errors);
  return keys(activeErrors).length ? activeErrors : null;
};

export default getValidationErrors;
