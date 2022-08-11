import JWT from 'jsonwebtoken';
import crypto from 'crypto';

import {User, UserType} from '@prisma/client';

export type SessionTokenUser = Pick<User, 'ID' | 'type' | 'IP' | 'tier' | 'fingerprint'>;

export const createSessionToken = (user: SessionTokenUser): string | null => {
  try {
    return JWT.sign(user, process.env.JWT_SECRET_KEY, {
      expiresIn: user.type === UserType.REGISTERED ? '2w' : '1w',
    });
  } catch (error: unknown) {
    console.error(error);

    return null;
  }
};

export const verifySessionToken = (token: string): SessionTokenUser | null => {
  try {
    return JWT.verify(token, process.env.JWT_SECRET_KEY) as SessionTokenUser;
  } catch {
    return null;
  }
};

export const createSessionTicket = (fingerprint: User['fingerprint'], IP: User['IP']): string =>
  crypto.createHash('sha256').update(`${fingerprint}${IP}`).digest('base64');

export const createSessionCookie = (token: string): string =>
  `session=${token}; Path=/; HttpOnly; SameSite=Strict; Priority=High`;
