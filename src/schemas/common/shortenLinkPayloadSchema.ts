import {object, string} from 'yup';

import aliasSchema from './aliasSchema';

export interface ShortenLinkPayload {
  destination: string;
  token: string;
  alias?: string;
}

const shortenLinkPayloadSchema = object({
  token: string().required('Captcha token is required.'),
  destination: string()
    .url('Destination must be a valid URL.')
    .required('Destination is required.'),
  alias: aliasSchema.optional(),
});

export default shortenLinkPayloadSchema;
