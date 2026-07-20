export type CmsSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export async function readCmsSearchParam(
  searchParams: CmsSearchParams,
  key: string,
) {
  const resolved = await searchParams;
  const value = resolved[key];
  return Array.isArray(value) ? value[0] : value;
}
