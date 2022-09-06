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

////// Api Util //////

export type CollectionApi<Type> = {
  create: (data: Type) => Promise<StrapiCollectionOneResponse<Type>>;
  delete: (id: number) => Promise<StrapiCollectionOneResponse<Type>>;
  find: () => Promise<StrapiCollectionResponse<Type>>;
  findOne: (id: number) => Promise<StrapiCollectionOneResponse<Type>>;
  update: (id: number, data: Partial<Type>) => Promise<StrapiCollectionOneResponse<Type>>;
};

const getBackendUrl = (...parts: string[]) =>
  [import.meta.env.PUBLIC_BACKEND_BASE_URL, ...parts].join('/');

export function createCollectionApi<Type>(url: string): CollectionApi<Type> {
  const createFn = async (data: Type) => {
    const response = await fetch(getBackendUrl(url), {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
    const responseJson = await response.json();
    return responseJson as StrapiCollectionOneResponse<Type>;
  };

  const deleteFn = async (id: number) => {
    const response = await fetch(getBackendUrl(url, String(id)), { method: 'DELETE' });
    const responseJson = await response.json();
    return responseJson as StrapiCollectionOneResponse<Type>;
  };

  const findFn = async () => {
    const response = await fetch(getBackendUrl(url));
    const responseJson = await response.json();
    return responseJson as StrapiCollectionResponse<Type>;
  };

  const findOneFn = async (id: number) => {
    const response = await fetch(getBackendUrl(url, String(id)));
    const responseJson = await response.json();
    return responseJson as StrapiCollectionOneResponse<Type>;
  };

  const updateFn = async (id: number, data: Partial<Type>) => {
    const response = await fetch(getBackendUrl(url, String(id)), {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
    const responseJson = await response.json();
    return responseJson as StrapiCollectionOneResponse<Type>;
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
