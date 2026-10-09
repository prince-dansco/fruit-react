import { productsData } from "../homeCom/const/constDataAllArray";
export const allProducts = (() => {
  let allItems = [];
  
  // Process regular categories (arrays)
  Object.entries(productsData).forEach(([category, items]) => {
    if (category === 'fruits') {
      
      Object.entries(items).forEach(([subcategory, subcategoryItems]) => {
        subcategoryItems.forEach(item => {
          allItems.push({...item, category: 'fruits', subcategory});
        });
      });
    } else {
      items.forEach(item => {
        allItems.push({...item, category});
      });
    }
  });
  
  return allItems;
})();