import {object, string} from 'yup';

const clientSessionSchema = object({
  type: string().oneOf(['REGISTERED', 'UNREGISTERED']).required(),
  tier: string().oneOf(['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE']).required(),
});

export default clientSessionSchema;
