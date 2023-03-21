/**
 * @ Author: Hikaru
 * @ Create Time: 2023-03-15 22:56:35
 * @ Modified by: Hikaru
 * @ Modified time: 2023-03-22 00:34:40
 * @ Description: i@rua.moe
 */

import { GetServer, GetUser } from '@/services/api';
import { notification } from 'antd';
import { useCallback, useState } from 'react';

export default () => {
  const [discordUser, setDiscordUser] = useState<Resp.User>();
  const [discordServer, setDiscordServer] = useState<Resp.Server>();
  const [loading, setLoading] = useState<boolean>(true);

  const GetUserInfo = useCallback(
    async ({
      guild_id,
      user_id,
      sign,
    }: {
      guild_id: string;
      user_id: string;
      sign: string;
    }) => {
      setLoading(true);
      const res = await GetUser({
        guild_id,
        user_id,
        sign,
      });

      if (res?.response?.status === 200 && res?.data?.success) {
        setDiscordUser((res?.data as Resp.GetUser)?.data);
        setLoading(false);
        return (res?.data as Resp.GetUser)?.data;
      } else {
        setDiscordUser(undefined);
        notification.error({
          message: 'Error',
          description: (res?.data as Resp.Error)?.message || 'Unknown error',
        });
      }
      setLoading(false);
    },
    [],
  );

  const GetServerInfo = useCallback(
    async ({ guild_id }: { guild_id: string }) => {
      setLoading(true);
      const res = await GetServer({
        guild_id,
      });

      if (res?.response?.status === 200 && res?.data?.success) {
        setDiscordServer((res?.data as Resp.GetServer)?.data);
        setLoading(false);
        return (res?.data as Resp.GetServer)?.data;
      } else {
        setDiscordUser(undefined);
        notification.error({
          message: 'Error',
          description: (res?.data as Resp.Error)?.message || 'Unknown error',
        });
      }
      setLoading(false);
    },
    [],
  );

  return {
    loading,
    discordUser,
    discordServer,
    GetUserInfo,
    GetServerInfo,
  };
};
