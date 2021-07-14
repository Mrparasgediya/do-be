import React from "react";
// styles
import * as S from "./List.styles";
// components
import ListItem from "./ListItem/ListItem";

function List({
  isCollectionList,
  isIconList,
  isMenuList,
  list,
  listType,
  ...otherProps
}) {
  return (
    <S.ListContainer listType={listType}>
      {list.map((listItem, idx) => (
        <ListItem
          isCollectionList={isCollectionList}
          key={idx}
          {...listItem}
          listItemType={`${listType}Item`}
          {...otherProps}
        />
      ))}
    </S.ListContainer>
  );
}

export default List;
