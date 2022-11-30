import type { ModuleManager } from '@garfish/loader';
import {
  PluginSystem,
  SyncHook,
  SyncWaterfallHook,
  AsyncWaterfallHook,
} from '@garfish/hooks';
import type { Actuator } from './actuator';
import type { ModuleConfig, ModuleInfo } from './common';

export interface BeforeLoadArgs {
  url: string;
  options?: ModuleConfig;
}

export interface afterLoadArgs {
  url: string;
  code: string;
  exports: Record<string, any>;
}

export const hooks = new PluginSystem({
  preloaded: new SyncHook<[ModuleManager], any>(),
  initModule: new SyncHook<[Actuator], any>('initModule'),
  beforeLoadModule: new SyncWaterfallHook<BeforeLoadArgs>('beforeLoadModule'),
  asyncBeforeLoadModule: new AsyncWaterfallHook<BeforeLoadArgs>(
    'asyncBeforeLoadModule',
  ),
  afterLoadModule: new SyncWaterfallHook<afterLoadArgs>('afterLoadModule'),
  asyncAfterLoadModule: new AsyncWaterfallHook<afterLoadArgs>(
    'asyncAfterLoadModule',
  ),
});
