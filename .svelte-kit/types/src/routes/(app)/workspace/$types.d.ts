import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/(app)/workspace';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = Omit<Omit<EnsureDefined<import('../../$types.js').LayoutData>, keyof import('../$types.js').LayoutData> & EnsureDefined<import('../$types.js').LayoutData>, keyof LayoutData> & EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/(app)/workspace" | "/(app)/workspace/functions/create" | "/(app)/workspace/knowledge" | "/(app)/workspace/knowledge/[id]" | "/(app)/workspace/knowledge/create" | "/(app)/workspace/models" | "/(app)/workspace/models/create" | "/(app)/workspace/models/edit" | "/(app)/workspace/prompts" | "/(app)/workspace/prompts/create" | "/(app)/workspace/prompts/edit" | "/(app)/workspace/tools" | "/(app)/workspace/tools/create" | "/(app)/workspace/tools/edit"
type LayoutParams = RouteParams & { id?: string }
type LayoutParentData = Omit<EnsureDefined<import('../../$types.js').LayoutData>, keyof import('../$types.js').LayoutData> & EnsureDefined<import('../$types.js').LayoutData>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { data: PageData }
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { data: LayoutData; children: import("svelte").Snippet }