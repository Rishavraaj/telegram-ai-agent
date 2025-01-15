import { db } from "@/server/db";

export async function saveTokens(telegram_user_id: string, tokens: any) {
  return await db.userToken.upsert({
    where: {
      telegramUserId: telegram_user_id.toString(),
    },
    update: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: new Date(tokens.expiry_date),
    },
    create: {
      telegramUserId: telegram_user_id.toString(),
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiryDate: new Date(tokens.expiry_date),
    },
  });
}

export async function getTokens(telegram_user_id: string) {
  const userToken = await db.userToken.findUnique({
    where: {
      telegramUserId: telegram_user_id.toString(),
    },
  });

  if (!userToken) return null;

  return {
    access_token: userToken.accessToken,
    refresh_token: userToken.refreshToken,
    expiry_date: userToken.expiryDate.getTime(),
  };
}
