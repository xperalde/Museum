import axios from 'axios'

const API_KEY = 'b0514b2d15a21cb98bef101ac38ea682';
const API_URL = 'https://api.collection.cooperhewitt.org/rest/';

interface ExhibitionObject {
  id: string;
  title: string;
  description: string;
  images?: {
    b?: {
      url: string;
    };
  }[];
}
interface FetchParams {
  method: string;
  access_token: string;
  has_images?: boolean;
  format: string;
  per_page: number;
  page: number;
  query?: string;
}

export const fetchTotalObjects = async (query?: string): Promise<number> => {
  try {
    const params: FetchParams = {
      method: 'cooperhewitt.exhibitions.getObjects',
      access_token: API_KEY,
      has_images: true,
      format: 'json',
      per_page: 1,
      page: 1,
      ...(query && { query }),
    };

    const response = await axios.get<{ total: number }>(API_URL, { params });

    return response.data.total || 0;
  } catch (error) {
    console.error('Ошибка при получении общего количества объектов:', error);
    return 0;
  }
};

export const fetchCards = async (page: number, perPage: number, query?: string) => {
  try {
    const params: FetchParams = {
      method: 'cooperhewitt.exhibitions.getObjects',
      access_token: API_KEY,
      has_images: true,
      format: 'json',
      per_page: perPage,
      page: page,
      ...(query && { query }),
    };

    const response = await axios.get<{ objects: ExhibitionObject[] }>(API_URL, { params });

    const objects = response.data?.objects || [];

    return objects.map((obj) => ({
      id: obj.id,
      title: obj.title || 'Без названия',
      description: obj.description || 'Нет описания',
      imageUrl: obj.images?.[0]?.b?.url || '',
      isLiked: false,
      isCreate: false
    }));
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return [];
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        method: 'cooperhewitt.objects.getInfo',
        access_token: API_KEY,
        object_id: id,
        format: 'json',
      },
    });

    const obj = response.data?.object;

    return {
      id: obj.id,
      title: obj.title || 'Без названия',
      description: obj.description || 'Нет описания',
      imageUrl: obj.images?.[0]?.b?.url || '',
      isLiked: false,
      creator: obj.participant || 'Неизвестен',
      date: obj.date || 'Не указана',
      dimensions: obj.dimensions || 'Не указаны',
    };
  } catch (error) {
    console.error('Ошибка при получении данных по ID:', error);
    throw error;
  }
};
