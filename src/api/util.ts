////// Responses //////

export type DateString = string; // YYYY-MM-DDTHH:mm:ss.SSSZ
export type RichText = string; // Markdown format

export type StrapiEntity<E> = E & {
  createdAt: DateString;
  updatedAt: DateString;
};

export type StrapiCollectionEntity<E> = {
  id: number;
  attributes: StrapiEntity<E>;
};

export type StrapiCollectionMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type StrapiCollectionResponse<E> = {
  data: StrapiCollectionEntity<E>[];
  meta: StrapiCollectionMeta;
};

export type StrapiCollectionOneResponse<E> = {
  data: StrapiCollectionEntity<E>;
  meta: {};
};

export type StrapiError = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: {};
  };
};

////// Monadic maps //////

const idMap = <T>(v: T) => v;

function mapStrapiEntity<E, E1>(v: StrapiEntity<E>, fn: (e: E) => E1): StrapiEntity<E1> {
  const { createdAt, updatedAt, ...e } = v;
  return { createdAt, updatedAt, ...fn(e as unknown as E) };
}
function mapStrapiCollectionEntity<E, E1>(
  v: StrapiCollectionEntity<E>,
  fn: (e: E) => E1,
): StrapiCollectionEntity<E1> {
  return {
    ...v,
    attributes: mapStrapiEntity(v.attributes, fn),
  };
}
function mapStrapiCollectionResponse<E, E1>(
  v: StrapiCollectionResponse<E>,
  fn: (e: E) => E1,
): StrapiCollectionResponse<E1> {
  return {
    ...v,
    data: v.data.map(item => mapStrapiCollectionEntity(item, fn)),
  };
}
function mapStrapiCollectionOneResponse<E, E1>(
  v: StrapiCollectionOneResponse<E>,
  fn: (e: E) => E1,
): StrapiCollectionOneResponse<E1> {
  return {
    ...v,
    data: mapStrapiCollectionEntity(v.data, fn),
  };
}

////// Api Util //////

export type CollectionApi<Type> = {
  create: (data: Type) => Promise<StrapiCollectionOneResponse<Type>>;
  delete: (id: number) => Promise<StrapiCollectionOneResponse<Type>>;
  find: () => Promise<StrapiCollectionResponse<Type>>;
  findOne: (id: number) => Promise<StrapiCollectionOneResponse<Type>>;
  update: (id: number, data: Partial<Type>) => Promise<StrapiCollectionOneResponse<Type>>;
};

export type RawTypeAdapter<Type, RawType> = {
  fromRaw: (raw: RawType) => Type;
  toRaw: (raw: Type) => RawType;
  toPartialRaw: (raw: Partial<Type>) => Partial<RawType>;
};

const getBackendUrl = (...parts: string[]) =>
  [import.meta.env.PUBLIC_BACKEND_BASE_URL, ...parts].join('/');

export function createCollectionApi<Type>(url: string): CollectionApi<Type>;
export function createCollectionApi<Type, RawType>(
  url: string,
  adapter: RawTypeAdapter<Type, RawType>,
): CollectionApi<Type>;
export function createCollectionApi<Type, RawType = Type>(
  url: string,
  adapter?: RawTypeAdapter<Type, RawType>,
): CollectionApi<Type> {
  const theAdapter =
    adapter ??
    ({ fromRaw: idMap, toRaw: idMap, toPartialRaw: idMap } as RawTypeAdapter<Type, RawType>);

  const createFn = async (data: Type) => {
    const response = await fetch(getBackendUrl(url), {
      method: 'POST',
      body: JSON.stringify({ data: theAdapter.toRaw(data) }),
    });
    const responseJson = (await response.json()) as StrapiCollectionOneResponse<RawType>;
    return mapStrapiCollectionOneResponse(responseJson, theAdapter.fromRaw);
  };

  const deleteFn = async (id: number) => {
    const response = await fetch(getBackendUrl(url, String(id)), { method: 'DELETE' });
    const responseJson = (await response.json()) as StrapiCollectionOneResponse<RawType>;
    return mapStrapiCollectionOneResponse(responseJson, theAdapter.fromRaw);
  };

  const findFn = async () => {
    const params = new URLSearchParams({ 'pagination[limit]': '-1' });
    const response = await fetch(`${getBackendUrl(url)}?${params.toString()}`);
    const responseJson = (await response.json()) as StrapiCollectionResponse<RawType>;
    return mapStrapiCollectionResponse(responseJson, theAdapter.fromRaw);
  };

  const findOneFn = async (id: number) => {
    const response = await fetch(getBackendUrl(url, String(id)));
    const responseJson = (await response.json()) as StrapiCollectionOneResponse<RawType>;
    return mapStrapiCollectionOneResponse(responseJson, theAdapter.fromRaw);
  };

  const updateFn = async (id: number, data: Partial<Type>) => {
    const response = await fetch(getBackendUrl(url, String(id)), {
      method: 'PUT',
      body: JSON.stringify({ data: theAdapter.toPartialRaw(data) }),
    });
    const responseJson = (await response.json()) as StrapiCollectionOneResponse<RawType>;
    return mapStrapiCollectionOneResponse(responseJson, theAdapter.fromRaw);
  };

  return {
    create: createFn,
    delete: deleteFn,
    find: findFn,
    findOne: findOneFn,
    update: updateFn,
  };
}

export function unwrapStrapiArray<Type>(response: StrapiCollectionResponse<Type>): Type[] {
  if (response.data === null) return [];

  return response.data.map(item => item.attributes);
}

export function unwrapStrapiArrayToMap<Type extends { slug: string }>(
  response: StrapiCollectionResponse<Type>,
): { [slug: string]: Type } {
  if (response.data === null) return {};

  return response.data
    .map(item => item.attributes)
    .reduce(
      (acc, next) => ({
        ...acc,
        [next.slug]: next,
      }),
      {},
    );
}
