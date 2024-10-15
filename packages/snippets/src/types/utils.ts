export type OverwriteProps<A, B> = Omit<A, keyof B> & B;
