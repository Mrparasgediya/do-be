import styled, { css } from "styled-components";

export const ProfileAndOrdersContainer = styled.div`
  height: min-content;
  min-height: 60rem;
  width: 100%;

  @media (max-width: 425px) {
    height: min-content;
  }
`;

export const ProfileAndOrdersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  border-bottom: 0.1rem solid var(--color-gray);
`;

export const ProfileAndOrdersHeaderHeading = styled.h3`
  font-family: var(--font-family-body) !important;
`;

export const ProfileAndOrdersHeaderHeadingGreetingText = styled.span`
  margin-left: 0.5rem;
  font-size: var(--font-md-big);
  text-transform: capitalize;
`;

export const ProfileAndOrdersSelectWindowList = styled.ul`
  padding: 2rem 5rem;
  margin-bottom: 2.5rem;
  gap: 2rem;
  list-style: none;
  display: flex;
`;

export const ProfileAndOrdersSelectWindowListItem = styled.li`
  font-size: var(--font-md);
  cursor: pointer;
  position: relative;
`;

const selectedStyledLinkStyle = css`
  color: var(--color-skyblue) !important;

  &::after {
    visibility: visible;
  }
`;

export const StyledProfileAndOrdersLinkText = styled.div`
  font-weight: 700;
  min-height: 2rem;
  transition: all 0.3s ease-in-out;

  &::after {
    visibility: hidden;
    content: "";
    position: absolute;
    box-sizing: content-box;
    left: 50%;
    transform: translateX(-50%);
    bottom: -2rem;
    background-color: var(--color-pink);
    border-radius: 5rem;
    height: 0.5rem;
    width: 120%;
  }
  &:hover {
    color: var(--color-skyblue);

    &::after {
      visibility: visible;
    }
  }
  ${(props) => (props.isSelected ? selectedStyledLinkStyle : null)}
`;
