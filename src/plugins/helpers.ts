import {categoryType} from "../types/types";

export function getCategoryNameById(categories: Array<categoryType>, id: number): string | undefined {
    let category = categories.find(category => category.id === id);
    return category ? category.title : undefined
}