import styled from "styled-components";

export const FileInputContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.4rem;
`;

export const ImagePreview = styled.img`
  height: 100%;
  width: 100%;
  max-width: 40rem;
  max-height: 30rem;
  object-fit: contain;
  padding: 1rem;
`;

export const ImagePreviewPlaceHolder = styled.div`
  height: 200px;
  width: 250px;
  background: pink;
  font-size: var(--font-md);
`;

export const FilePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: auto;
  max-width: 90%;
  height: auto;
  border: 1px solid var(--color-gray);
  gap: 1.5rem;
`;

export const ImagePreviewWithNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--color-gray);
  padding: 0.5rem;
`;

export const ImagePreviewName = styled.div`
  font-size: 1.4rem;
`;

export const StyledVideo = styled.video`
  max-width: 40rem;
  max-height: 30rem;
  min-height: 20rem;
  min-width: 30rem;
  width: 480px;
  height: 210px;
  object-fit: contain;
`;
