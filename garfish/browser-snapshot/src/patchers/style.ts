import { Interceptor, Snapshot, SnapshotDiff } from './interceptor';

interface EffectCt {
  src: string;
  outerHTML: string;
  content: string;
}

interface EffectMap {
  style: Array<EffectCt>;
  script: Array<EffectCt>;
  other: Array<EffectCt>;
}

export class PatchStyle {
  public headInterceptor: Interceptor;
  private domSnapshotBefore!: Snapshot;
  private domSnapshotMutated!: SnapshotDiff | null;

  constructor() {
    this.headInterceptor = new Interceptor(document.head);
  }

  public activate() {
    // 记录当前dom节点、恢复之前dom节点副作用
    this.domSnapshotBefore = Snapshot.take();
    if (this.domSnapshotMutated)
      this.headInterceptor.add(
        this.domSnapshotMutated.created,
        this.domSnapshotMutated.removed,
      );
  }

  public deactivate() {
    // 恢复沙盒运行前dom节点环境，并将差异值进行缓存
    const domSnapshot = Snapshot.take();
    this.domSnapshotMutated = domSnapshot.diff(this.domSnapshotBefore);
    if (!this.domSnapshotMutated) return;
    this.headInterceptor.remove(
      this.domSnapshotMutated.created,
      this.domSnapshotMutated.removed,
    );
  }

  private formateCtx(arrDoms: Array<HTMLElement>) {
    const effectMap: EffectMap = {
      style: [],
      script: [],
      other: [],
    };

    arrDoms.forEach((dom) => {
      let type: 'other' | 'style' | 'script' = 'other';
      if (/css/.test((dom as any).type)) type = 'style';
      if (/javascript/.test((dom as any).type)) type = 'script';
      effectMap[type].push({
        src: (dom as any).src,
        outerHTML: dom.outerHTML,
        content: dom.innerText,
      });
    });

    return effectMap;
  }
}
