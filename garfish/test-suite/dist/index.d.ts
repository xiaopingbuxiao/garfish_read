declare function mockStaticServer({ baseDir, filterKeywords, customerHeaders, timeConsuming, }: {
    baseDir: string;
    timeConsuming?: number;
    filterKeywords?: Array<string>;
    customerHeaders?: Record<string, Record<string, any>>;
}): void;

export { mockStaticServer };
