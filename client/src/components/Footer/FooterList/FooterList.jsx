import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// styles
import * as S from "./FooterList.styles";
// redux
import { connect } from "react-redux";
import {
  selectGroupForFilter,
  setSelectedGroupForFilter,
} from "redux/filter/filter.action";
// components
import FooterSvg from "./FooterSvg";

function FooterList({
  footerList,
  selectGroupForFilter,
  setSelectedGroupForFilter,
  history,
}) {
  let list;
  if (footerList.hasMultiplList) {
    list = (
      <React.Fragment>
        {footerList.lists.map((list, idx) => (
          <div key={idx}>
            <S.FooterListHeading type={list.hasSvg && "svg"}>
              {list.heading}
            </S.FooterListHeading>
            <S.FooterList type={list.hasSvg || list.hasImage ? "icon" : ""}>
              {list.hasImage
                ? list.items.map((listItem, idx) => (
                    <S.FooterListItem key={idx} type="dowloadImage">
                      <S.FooterListImage src={listItem} alt="dowload" />
                    </S.FooterListItem>
                  ))
                : null}
              {list.hasSvg
                ? list.items.map(({ Svg, name }, idx) => (
                    <li key={idx}>
                      <FooterSvg name={name} Svg={Svg} />
                    </li>
                  ))
                : null}
            </S.FooterList>
          </div>
        ))}
      </React.Fragment>
    );
  }

  if (footerList.hasFeatures) {
    list = (
      <S.FeatureList>
        {footerList.items.map(({ src, name, boldText, text }, idx) => (
          <S.FooterListItem type="featureListItem" key={idx}>
            <S.FooterListImage type="featureListImage" src={src} alt={name} />
            <S.FeatureListTextContainer>
              <b>{boldText}</b>
              <span> {text}</span>
            </S.FeatureListTextContainer>
          </S.FooterListItem>
        ))}
      </S.FeatureList>
    );
  }

  if (footerList.isCollectionList) {
    const handleListItemClick = (group) => {
      const groupName = group.toLowerCase();
      setSelectedGroupForFilter(groupName);
      selectGroupForFilter(groupName);
      history.push("/search");
    };
    list = (
      <Fragment>
        <S.FooterListHeading>{footerList.heading} </S.FooterListHeading>
        <S.FooterList>
          {footerList.items.map((listItem, idx) => (
            <S.FooterListItem
              hasLink
              onClick={() => handleListItemClick(listItem)}
              hasHoverEffect
              key={idx}
            >
              {listItem}
            </S.FooterListItem>
          ))}
        </S.FooterList>
      </Fragment>
    );
  }

  if (footerList.hasLinkUrl) {
    list = (
      <Fragment>
        <S.FooterListHeading>{footerList.heading} </S.FooterListHeading>
        <S.FooterList>
          {footerList.items.map(({ name, linkUrl }, idx) => (
            <Link to={linkUrl} key={idx}>
              <S.FooterListItem hasLink hasHoverEffect>
                {name}
              </S.FooterListItem>
            </Link>
          ))}
        </S.FooterList>
      </Fragment>
    );
  }

  return list;
}

const mapDispatchToProps = (dispatch) => ({
  setSelectedGroupForFilter: (group) =>
    dispatch(setSelectedGroupForFilter(group)),
  selectGroupForFilter: (group) => dispatch(selectGroupForFilter(group)),
});

export default connect(null, mapDispatchToProps)(withRouter(FooterList));
