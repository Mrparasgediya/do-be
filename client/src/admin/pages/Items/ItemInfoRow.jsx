import { TableData } from "admin/adminComponents/CustomTable/CustomTable";
import { TableRow } from "admin/adminComponents/CustomTable/CustomTable";
import CustomButton from "components/CustomButton/CustomButton";
import React from "react";
import { connect } from "react-redux";
import {
  setItemForOperation,
  toggleDeleteItemDialog,
  toggleShowItemDialog,
  toggleUpdateItemDialog,
} from "redux/admin/items/items.actions";

function ItemInfoRow({
  item,
  setItemForOperation,
  toggleDeleteItemDialog,
  toggleUpdateItemDialog,
  toggleShowItemDialog,
}) {
  const { id, images, name, brand, collection, price, discountRate } = item;

  return (
    <TableRow>
      <TableData style={{ width: "22rem" }}>{name}</TableData>
      <TableData>
        <img
          style={{
            height: "8rem",
            width: "6rem",
          }}
          src={
            (images[Object.keys(images)[0]] &&
              images[Object.keys(images)[0]].small.url) ||
            ""
          }
          alt={`item-${name}-img`}
        />
      </TableData>
      <TableData>{brand.name}</TableData>
      <TableData>{collection.name}</TableData>
      <TableData>Rs.{price}</TableData>
      <TableData>{`${discountRate}%`}</TableData>
      <TableData>
        {`${discountRate + collection.discountRate + brand.discountRate}%`}
      </TableData>
      <TableData>
        <CustomButton
          align="center"
          color="pink"
          size="xs"
          isActive
          onClick={() => {
            setItemForOperation(id);
            toggleShowItemDialog();
          }}
        >
          see item
        </CustomButton>
      </TableData>
      <TableData>
        <CustomButton
          align="center"
          color="black"
          size="xs"
          isActive
          onClick={() => {
            setItemForOperation(id);
            toggleUpdateItemDialog();
          }}
        >
          edit
        </CustomButton>
      </TableData>
      <TableData>
        <CustomButton
          onClick={() => {
            setItemForOperation(id);
            toggleDeleteItemDialog();
          }}
          align="center"
          color="red"
          size="xs"
          isActive
        >
          delete
        </CustomButton>
      </TableData>
    </TableRow>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setItemForOperation: (itemId) => dispatch(setItemForOperation(itemId)),
  toggleShowItemDialog: () => dispatch(toggleShowItemDialog()),
  toggleDeleteItemDialog: () => dispatch(toggleDeleteItemDialog()),
  toggleUpdateItemDialog: () => dispatch(toggleUpdateItemDialog()),
});

export default connect(null, mapDispatchToProps)(ItemInfoRow);
