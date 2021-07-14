import React, { useEffect, useState } from "react";
// styles
import * as S from "./Bag.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserBagIds } from "redux/user/user.selectors";
import { setUserBagItems } from "redux/user/bag/bag.actions";
import {
  selectBagItemsIds,
  selectBagItemsToDisplay,
} from "redux/user/bag/bag.selectors";
// components
import BagItem from "components/Bag/BagItem/BagItem";
import BagPriceInfo from "components/Bag/BagPriceInfo/BagPriceInfo";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
// utils
import { getItemFromId } from "firebase/items.utils";
import { scrollWindowToTop } from "utils/app.utils";
import { showNotification } from "redux/notification/notification.actions";

function Bag({
  bagIds,
  bagItems,
  setUserBagItems,
  bagItemsIds,
  showNotification,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const initBag = async () => {
    let items = {};

    setIsLoading(true);
    try {
      for (let itemId of bagIds.reverse()) {
        // get item from bag item
        let item = bagItems[itemId];
        // fetch item if item is not exist in bagitems
        if (!item) {
          try {
            const [foundItem, error] = await getItemFromId(itemId);
            if (error) throw new Error(error);
            const { id, ...otherData } = foundItem;
            item = { [itemId]: otherData };
          } catch (error) {
            showNotification(error.message, "error");
          }
        } else {
          // get item from bag items
          item = { [itemId]: bagItems[itemId] };
        }
        items = { ...items, ...item };
      }

      setUserBagItems(items);
      setIsLoading(false);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  useEffect(() => {
    scrollWindowToTop();

    if (bagIds.length !== bagItemsIds.length) {
      initBag();
    }
  }, []);

  return (
    <S.StyledBagContainer fixed>
      <S.BagHeading>
        My Bag
        {bagItemsIds.length > 0 && (
          <S.BagItemsCountContainer>
            {`( ${bagItemsIds.length} ${
              bagItemsIds.length > 1 ? "items" : "item"
            } )`}
          </S.BagItemsCountContainer>
        )}
      </S.BagHeading>

      <S.StyledBagGridContainer container>
        {isLoading && (
          <LoadingSpinner
            placeCenter
            hasLoadingText
            displayText="Getting bag items"
          />
        )}
        <S.StyledBagGridItem item xlg={8} lg={8} md={8} sm={12} xs={12}>
          {!isLoading &&
            bagItemsIds.map((itemId) => (
              <BagItem
                key={itemId}
                item={{ id: itemId, ...bagItems[itemId] }}
              />
            ))}
        </S.StyledBagGridItem>
        {bagItemsIds.length > 0 && (
          <BagPriceInfo totalMRP={10} totalDiscount={10} totalItems={2} />
        )}
      </S.StyledBagGridContainer>
      {(bagIds.length === 0 || bagItemsIds.length === 0) && !isLoading && (
        <S.NoBagItemsText>You Do not have Items in your bag.</S.NoBagItemsText>
      )}
    </S.StyledBagContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  bagItems: selectBagItemsToDisplay,
  bagIds: selectUserBagIds,
  bagItemsIds: selectBagItemsIds,
});

const mapDispatchToProps = (dispatch) => ({
  setUserBagItems: (items) => dispatch(setUserBagItems(items)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bag);
