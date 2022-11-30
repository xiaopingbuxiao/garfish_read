import { PatchEvent } from './patchers/event';
import { PatchStyle } from './patchers/style';
import { PatchHistory } from './patchers/history';
import { PatchInterval } from './patchers/interval';
import { PatchGlobalVal } from './patchers/variable';
import { PatchWebpackJsonp } from './patchers/webpackjsonp';

export class Sandbox {
  public type = 'snapshot';
  public isRunning: Boolean = false;
  private patchList: Array<
    PatchGlobalVal | PatchStyle | PatchInterval | PatchEvent | PatchWebpackJsonp
  > = [];

  constructor(
    public name: string,
    public protectVariable: Array<PropertyKey> = [],
    public targetToProtect: Window | Object = typeof window !== 'undefined'
      ? window
      : globalThis,
    private isInBrowser: Boolean = typeof window === 'undefined' ? false : true,
  ) {
    this.name = name;
    this.isInBrowser = isInBrowser;
    this.patchList.push(new PatchGlobalVal(targetToProtect, protectVariable));

    // 执行顺序是，全局环境变量先激活，全局环境变量后销毁
    if (this.isInBrowser) {
      this.patchList = [
        ...this.patchList,
        new PatchStyle(),
        new PatchEvent(),
        new PatchHistory(),
        new PatchInterval(),
        new PatchWebpackJsonp(),
      ];
    }
  }

  //  1.触发生命周期钩子，willActivate（将要激活）
  //  2.将当前组的其他沙盒disable，并触发switch生命周期
  //  3.将当前window对象属性进行缓存
  //  4.获取style节点，进行缓存
  //  5.恢复沙盒运行期间产生的副作用
  public activate() {
    if (this.isRunning) return;
    this.patchList.forEach((patch) => {
      patch.activate();
    });
    this.isRunning = true;
  }

  // 1.恢复沙盒启动期间变量变更的变量，记录变更记录
  // 2.恢复沙盒启动期间删除的变量，记录变更记录
  public deactivate(clearEffects: boolean = true) {
    if (!this.isRunning) return; // 最后销毁全局变量守护
    [...this.patchList].reverse().forEach((patch) => {
      patch.deactivate(clearEffects);
    });
    this.isRunning = false;
  }
}
