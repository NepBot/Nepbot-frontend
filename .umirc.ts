/**
 * @ Author: Hikaru
 * @ Create Time: 2023-02-08 01:35:14
 * @ Modified by: Hikaru
 * @ Modified time: 2023-03-17 04:20:16
 * @ Description: i@rua.moe
 */

import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  routes: [
    {
      path: '/',
      component: 'Home',
    },
    {
      title: 'Verify',
      path: '/verify',
      component: 'Verify',
      layout: false,
    },
    {
      title: 'Role',
      path: '/role',
      component: 'Role',
      layout: false,
    },
    {
      title: 'Mint',
      path: '/mint',
      component: 'Mint',
      layout: false,
    },
    {
      title: 'Select Platform',
      path: '/platform',
      component: 'Platform',
      layout: false,
    },
    {
      title: 'Collection',
      path: '/collection',
      layout: false,
      routes: [
        {
          title: 'Collection',
          path: '/collection',
          component: 'Collection',
        },
        {
          title: 'Collection Create',
          path: '/collection/create',
          component: 'Collection/Create',
        },
        {
          title: 'Collection Detail',
          path: '/collection/:id',
          routes: [
            {
              title: 'Collection Detail',
              path: '/collection/:id',
              component: 'Collection/Detail',
            },
            {
              title: 'Add Item',
              path: '/collection/:id/add',
              component: 'Collection/Detail/Add',
            },
          ],
        },
      ],
    },
    {
      title: 'FT',
      path: '/ft',
      layout: false,
      routes: [
        {
          title: 'FT AirDrop',
          path: '/ft/airdrop',
          component: 'FT/Airdrop',
        },
        {
          title: 'FT Claim',
          path: '/ft/claim',
          component: 'FT/Claim',
        },
        {
          title: 'FT Redeem',
          path: '/ft/redeem',
          component: 'FT/Redeem',
        },
      ],
    },
  ],
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  fastRefresh: true,
  presets: ['umi-presets-pro'],
  npmClient: 'yarn',
  proxy: {
    '/api': {
      target: 'https://testnet.nepbot.org',
      changeOrigin: true,
    },
  },
});
