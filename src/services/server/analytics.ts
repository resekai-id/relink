import {Link} from '@prisma/client';

import prisma from './prisma';

import type {ResolveRequestBody} from '../../pages/api/link/resolve';

export interface AnalayticsData {
  // country
  [key: string]: Record<
    string, // referrer
    Record<string, number> // deviceType
  >;
}

const handleDeviceTypeAnalyticsData = (
  visitorDeviceType: string,
  deviceTypeAnalytics: AnalayticsData[string][string] = {}
): AnalayticsData[string][string] => {
  const updatedDeviceTypeAnalytics = {...deviceTypeAnalytics};

  if (!updatedDeviceTypeAnalytics[visitorDeviceType])
    updatedDeviceTypeAnalytics[visitorDeviceType] = 0;

  updatedDeviceTypeAnalytics[visitorDeviceType] += 1;

  return updatedDeviceTypeAnalytics;
};

const handleReferrerAnalyticsData = (
  visitorReferrer: string,
  visitorDeviceType: string,
  referrerAnalytics: AnalayticsData[string] = {}
): AnalayticsData[string] => {
  const updatedReferrerAnalytics = {...referrerAnalytics};

  updatedReferrerAnalytics[visitorReferrer] = handleDeviceTypeAnalyticsData(
    visitorDeviceType,
    referrerAnalytics[visitorReferrer]
  );

  return updatedReferrerAnalytics;
};

const handleAnalyticsData = (
  visitorCountry: string,
  visitorReferrer: string,
  visitorDeviceType: string,
  analytics: AnalayticsData | Record<string, unknown> = {}
): AnalayticsData => {
  const updatedAnalytics = {...analytics};

  updatedAnalytics[visitorCountry] = handleReferrerAnalyticsData(
    visitorReferrer,
    visitorDeviceType,
    <AnalayticsData[string] | undefined>analytics[visitorCountry]
  );

  return <AnalayticsData>updatedAnalytics;
};

// eslint-disable-next-line import/prefer-default-export
export const handleAnalytics = async (
  linkID: Link['ID'],
  visitor: ResolveRequestBody['visitor']
): Promise<void> => {
  try {
    // extract the date without the time from the ISO date string.
    const currentDate = new Date(new Date().toISOString().split('T')[0]);

    const currentAnalytics = await prisma.linkAnalytics.findFirst({
      where: {linkID, date: currentDate},
    });

    const visitorCountry = visitor.country || 'UNKNOWN';

    // ".trim()" to remove whitespace to alllow the "or" statement to work (empty strings are falsy).
    const visitorReferrer = new URL(visitor.referrer).hostname.trim() || 'UNKNOWN';

    const visitorDeviceType = visitor.deviceType || 'UNKNOWN';

    const analyticsData = handleAnalyticsData(
      visitorCountry,
      visitorReferrer,
      visitorDeviceType,
      <AnalayticsData | undefined>currentAnalytics?.data ?? undefined
    );

    if (!currentAnalytics) {
      await prisma.linkAnalytics.create({
        data: {
          linkID,
          date: currentDate,
          data: analyticsData,
        },
      });
    } else {
      await prisma.linkAnalytics.update({
        where: {ID: currentAnalytics.ID},
        data: {data: analyticsData},
      });
    }
  } catch (error: unknown) {
    console.error(error);
  }
};
