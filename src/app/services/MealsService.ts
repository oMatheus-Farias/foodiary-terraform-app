import { Meal, SimplifiedMeal } from '@app/types/Meal';

import { Service } from './Services';

export class MealsService extends Service {
  static async getMealById(id: string): Promise<MealsService.GetMealByIdResponse> {
    const { data } = await this.client.get<MealsService.GetMealByIdResponse>(`/meals/${id}`);

    return {
      meal: {
        ...data.meal,
        createdAt: new Date(data.meal.createdAt),
      },
    };
  }

  static async getMealsByDate(date: string): Promise<MealsService.GetMealsByDateResponse> {
    const { data } = await this.client.get<MealsService.GetMealsByDateResponse>('/meals', {
      params: { date },
    });

    return {
      meals: data.meals.map((meal) => ({
        ...meal,
        createdAt: new Date(meal.createdAt),
      })),
    };
  }

  static async createMeal(
    payload: MealsService.CreateMealPayload,
  ): Promise<MealsService.CreateMealResponse> {
    const { data } = await this.client.post<{ uploadSignature: string; mealId: string }>(
      '/meals',
      payload,
    );

    await this.uploadPresignedPOST({
      file: {
        name: payload.file.name,
        type: payload.file.type,
        uri: payload.file.uri,
      },
      uploadSignature: data.uploadSignature,
    });

    return {
      mealId: data.mealId,
    };
  }
}

export namespace MealsService {
  export type GetMealByIdResponse = {
    meal: Meal;
  };

  export type GetMealsByDateResponse = {
    meals: SimplifiedMeal[];
  };

  export type CreateMealPayload = {
    file: {
      type: 'audio/m4a' | 'image/jpeg';
      name: string;
      uri: string;
      size: number;
    };
  };

  export type CreateMealResponse = {
    mealId: string;
  };
}
