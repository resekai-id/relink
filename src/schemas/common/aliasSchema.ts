import {string} from 'yup';

const aliasSchema = string()
  .required('Alias is required.')
  .max(26, 'Alias must be 26 characters or less.')
  .matches(/^[a-zA-Z0-9_-]*$/, {
    excludeEmptyString: true,
    message: 'Alias must be a URL-safe path segment.',
  });

export default aliasSchema;
