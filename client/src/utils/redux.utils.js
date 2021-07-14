export const calculateItemPriceByQty = (items) => {
  const totalPriceInfo = {
    MRP: 0,
    discountMRP: 0,
    noOfItems: items ? Object.keys(items).length : 0,
  };
  if (items) {
    const { totalMRP, totalDiscountMRP } = Object.keys(items).reduce(
      (total, itemId) => {
        const { totalPrice, totalDiscount } = getItemTotalPriceWithQty(
          items[itemId]
        );

        total.totalMRP += totalPrice;
        total.totalDiscountMRP += totalDiscount;

        return total;
      },
      { totalMRP: 0, totalDiscountMRP: 0 }
    );
    totalPriceInfo.MRP = totalMRP;
    totalPriceInfo.discountMRP = totalDiscountMRP;
  }

  totalPriceInfo.finalMRP = totalPriceInfo.MRP - totalPriceInfo.discountMRP;

  return totalPriceInfo;
};

export const getItemTotalPriceWithQty = (item) => {
  const { oldPrice, totalDiscountRate, selectedQty } = item;
  const totalPrice = Math.ceil(oldPrice * selectedQty);

  const totalDiscount =
    Math.ceil((oldPrice * totalDiscountRate) / 100) * selectedQty;
  return { totalPrice, totalDiscount };
};

export const getCurrentItemsForPagination = (
  currentPage,
  itemsPerPage,
  items
) => {
  const firstItemIdx = (currentPage - 1) * itemsPerPage;
  const lastItemIdx = firstItemIdx + itemsPerPage;
  return items.slice(firstItemIdx, lastItemIdx);
};
