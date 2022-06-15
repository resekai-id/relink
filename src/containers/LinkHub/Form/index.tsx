import {FC, useRef, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import objectHash from 'object-hash';

import shortenLinkPayloadSchema from '../../../schemas/common/shortenLinkPayloadSchema';

import {useAppDispatch, useAppSelector} from '../../../store';
import {shortenLinkAction} from '../../../store/slices/links/sagas';
import {LinkStateStatus} from '../../../store/slices/links/types';

export interface ShortenFormProps {
  hCaptchaSiteKey: string;
}

const ShortenForm: FC<ShortenFormProps> = ({hCaptchaSiteKey}) => {
  const dispatch = useAppDispatch();

  const [currentLinkID, setCurrentLinkID] = useState<string | null>(null);

  const currentLink = useAppSelector(state => (currentLinkID ? state.links[currentLinkID] : null));

  const hCaptchaReference = useRef<HCaptcha>(null);

  return (
    <Formik
      initialValues={{
        destination: '',
        alias: '',
      }}
      validationSchema={shortenLinkPayloadSchema.pick(['destination', 'alias'])}
      onSubmit={async (values, {setSubmitting, setFieldError, resetForm}) => {
        try {
          setSubmitting(true);

          const hCaptcha = hCaptchaReference.current;

          if (!hCaptcha) {
            setFieldError('token', 'HCaptcha is not available.');

            return;
          }

          const hCaptchaResponse = await hCaptcha.execute({async: true});

          const shortenLinkActionPayload = {
            ...values,
            token: hCaptchaResponse.response,
          };

          const linkStateID = objectHash(shortenLinkActionPayload);

          setCurrentLinkID(linkStateID);

          dispatch(
            shortenLinkAction({
              ...shortenLinkActionPayload,
              linkStateID,
            })
          );

          setSubmitting(false);

          if (currentLink?.status === LinkStateStatus.Ready) resetForm();
        } catch (error: unknown) {
          console.error(error);

          if (error instanceof String) {
            switch (error) {
              case 'challenge-closed':
                break;

              default:
                break;
            }
          }

          setSubmitting(false);
        }
      }}
    >
      {({isSubmitting, getFieldMeta}) => (
        <Form>
          <label htmlFor="destination">Destination</label>
          <span>{getFieldMeta('destination').error}</span>
          <Field name="destination" type="url" placeholder="https://example.com/ALongURL" />

          <br />

          <label htmlFor="alias">Alias (Optional)</label>
          <span>{getFieldMeta('alias').error}</span>
          <Field name="alias" type="text" placeholder="relink.lol/Shorter" />

          <br />

          <span>{getFieldMeta('token').error}</span>
          <HCaptcha
            ref={hCaptchaReference}
            sitekey={hCaptchaSiteKey}
            size="invisible"
            onVerify={() => null}
          />

          <button type="submit" disabled={isSubmitting || currentLink?.status === 'PENDING'}>
            Shorten
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ShortenForm;
