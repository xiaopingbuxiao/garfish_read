
import { AsyncHook, PluginSystem, AsyncWaterfallHook, SyncHook, SyncWaterfallHook } from "@garfish/hooks";

const hooks = new PluginSystem({
  a: new AsyncHook<any,string>(),
//   b: new AsyncWaterfallHook('AsyncWaterfallHook')
});



hooks.usePlugin({
  name: 'test1',
    a: async(a) => {
    console.log(a, 'test1')
    return 'xixixiix '
  }
});

hooks.usePlugin({
    name: 'test222',
      a: async(a) => {
      console.log(a, 'test222')
      return 'test222test222test222 '
    }
  });

hooks.usePlugin({
  name: 'test2',
  a: (a) => {
    console.log(a, 'test2')
    return 'hahahhaha'
  }
});





(async () => {
  // console.log(await hooks.lifecycle.a.emit(1, 2));

  console.log(await hooks.lifecycle.a.emit("11111"),'执行结果')
})()






// import { AsyncHook, PluginSystem } from '@garfish/hooks';

// const hooks1 = new PluginSystem({
//   a: new AsyncHook(),
// });

// const hooks2 = new PluginSystem({
//   b: new AsyncHook(),
// });

// hooks2.inherit(hooks1);
// hooks2.lifecycle.a.emit();