// here will be all actions, for example:
// export function addToLikedProducts(item) {
//     if (!item || typeof item !== "object" || !item.name || !item.photo || !item.article) {
//         console.error("Invalid item object:", item);
//         return null;
//     }
//     return { type: ADD_TO_LIKE_ARR, item };
// }
//
// export function removeProductFromPurchases(item) {
//     return { type: REMOVE_FROM_BUY_ARR, item };
// }
//
// export const savePurchasesArrToLocalStorage = () => {
//     return (dispatch, getState) => {
//         const purchases = getState().buy.purchases;
//         localStorage.setItem("purchases", JSON.stringify(purchases));
//         dispatch({ type: SAVE_BUY_ARR_TO_LOCALE_STORAGE });
//     };
// };