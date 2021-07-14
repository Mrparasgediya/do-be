import { TableData } from "admin/adminComponents/CustomTable/CustomTable";
import { TableRow } from "admin/adminComponents/CustomTable/CustomTable";
import CustomButton from "components/CustomButton/CustomButton";
import React from "react";
import { connect } from "react-redux";
import {
  setBrandForOperation,
  toggleDeleteBrandDialog,
  toggleUpdateBrandDialog,
} from "redux/admin/brands/brands.actions";

function BrandInfoRow({
  brand,
  setBrandForOperation,
  toggleDeleteBrandDialog,
  toggleUpdateBrandDialog,
}) {
  let { id: brandId, name, discountRate, logo, image } = brand || {};
  const { src: logoSrc } = logo || {};
  const { src: imageSrc } = image || {};

  return (
    <TableRow>
      <TableData style={{ minWidth: "100px" }}>{name}</TableData>
      <TableData
        defaultWidth="100px"
        hasImage
        src={(logoSrc && logoSrc.org.url) || ""}
        alt={`${name}-logo`}
      />
      <TableData
        defaultWidth="100px"
        hasImage
        src={(imageSrc && imageSrc.org.url) || ""}
        alt={`${name}-img`}
      />
      <TableData>{discountRate}%</TableData>
      <TableData defaultWidth="100px">
        <CustomButton
          color="black"
          size="xs"
          align="center"
          isActive
          onClick={() => {
            setBrandForOperation(brandId);
            toggleUpdateBrandDialog();
          }}
        >
          Edit
        </CustomButton>
      </TableData>
      <TableData defaultWidth="100px">
        <CustomButton
          isActive
          color="red"
          size="xs"
          align="center"
          onClick={() => {
            setBrandForOperation(brandId);
            toggleDeleteBrandDialog();
          }}
        >
          Delete
        </CustomButton>
      </TableData>
    </TableRow>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setBrandForOperation: (brandId) => dispatch(setBrandForOperation(brandId)),
  toggleDeleteBrandDialog: () => dispatch(toggleDeleteBrandDialog()),
  toggleUpdateBrandDialog: () => dispatch(toggleUpdateBrandDialog()),
});

export default connect(null, mapDispatchToProps)(BrandInfoRow);
