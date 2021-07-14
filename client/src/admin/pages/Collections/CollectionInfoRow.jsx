import React from "react";
// styles
import * as S from "./Collections.styles";
// redux
import { connect } from "react-redux";
import {
  setCollectionForOperation,
  toggleDeleteCollectionDialog,
  toggleUpdateCollectionDialog,
} from "redux/admin/collections/collections.actions";
// components
import { TableData } from "admin/adminComponents/CustomTable/CustomTable";
import { TableRow } from "admin/adminComponents/CustomTable/CustomTable";
import CustomButton from "components/CustomButton/CustomButton";

function CollectionInfoRow({
  collection,
  setCollectionForOperation,
  toggleUpdateCollectionDialog,
  toggleDeleteCollectionDialog,
}) {
  const { name, image, discountRate, id } = collection || {};
  const { src } = image || {};

  return (
    <TableRow>
      <TableData defaultWidth="220px">{name}</TableData>
      <TableData defaultWidth="220px">
        <S.StyledImage src={(src && src.small.url) || ""} alt={`${name}-img`} />
      </TableData>
      <TableData defaultWidth="220px">{discountRate}</TableData>
      <TableData defaultWidth="220px">
        <CustomButton
          align="center"
          size="xs"
          color="black"
          isActive
          onClick={() => {
            setCollectionForOperation(id);
            toggleUpdateCollectionDialog();
          }}
        >
          Edit
        </CustomButton>
      </TableData>
      <TableData defaultWidth="220px">
        <CustomButton
          align="center"
          size="xs"
          color="red"
          isActive
          onClick={() => {
            setCollectionForOperation(id);
            toggleDeleteCollectionDialog();
          }}
        >
          delete
        </CustomButton>
      </TableData>
    </TableRow>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setCollectionForOperation: (collectionId) =>
    dispatch(setCollectionForOperation(collectionId)),
  toggleUpdateCollectionDialog: () => dispatch(toggleUpdateCollectionDialog()),
  toggleDeleteCollectionDialog: () => dispatch(toggleDeleteCollectionDialog()),
});

export default connect(null, mapDispatchToProps)(CollectionInfoRow);
