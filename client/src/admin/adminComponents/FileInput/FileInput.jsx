import React, { forwardRef, useEffect, useState } from "react";
// styles
import * as S from "./FileInput.styles";
// utils
import { readFileAndGetDataUrl } from "admin/admin.utils";

function FileInput(
  {
    clearPreview,
    defaultPreview,
    isInputRequired,
    inputId,
    label,
    isVideoInput,
    isAcceptMultipleFiles,
    ...otherProps
  },
  forwardRef
) {
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    setPreviewFile(defaultPreview);
  }, [defaultPreview]);

  useEffect(() => {
    if (clearPreview) setPreviewFile("");
  }, [clearPreview]);

  const getPreviewImage = async (files) => {
    const filePreview = await Promise.all(
      Object.keys(files).map(
        async (fileId) => await readFileAndGetDataUrl(files[fileId])
      )
    );
    return filePreview;
  };

  const handleChange = async (e) => {
    if (e.target.files.length === 0) return;
    let filePreview;
    setPreviewFile("");
    if (isAcceptMultipleFiles) {
      const files = e.target.files;
      filePreview = await getPreviewImage(files);
    } else {
      filePreview = await readFileAndGetDataUrl(e.target.files[0]);
    }
    setPreviewFile(filePreview);
  };

  return (
    <S.FileInputContainer {...otherProps}>
      <input
        type="file"
        ref={forwardRef}
        accept={isVideoInput ? "video/mp4" : "image/*"}
        onChange={handleChange}
        required={isInputRequired}
        id={inputId}
        multiple={isAcceptMultipleFiles}
      />
      <S.FilePreviewContainer type={isVideoInput ? "video" : "image"}>
        {previewFile ? (
          isAcceptMultipleFiles ? (
            previewFile.map((image, idx) => (
              <S.ImagePreviewWithNameContainer key={idx}>
                <S.ImagePreview src={image} alt={`img-${idx}-prev`} />
                <S.ImagePreviewName>Image {idx + 1}</S.ImagePreviewName>
              </S.ImagePreviewWithNameContainer>
            ))
          ) : isVideoInput ? (
            <S.StyledVideo controls src={previewFile} />
          ) : (
            <S.ImagePreview src={previewFile} alt="img-input-prev" />
          )
        ) : (
          <S.ImagePreviewPlaceHolder>{label}</S.ImagePreviewPlaceHolder>
        )}
      </S.FilePreviewContainer>
    </S.FileInputContainer>
  );
}

export default forwardRef(FileInput);
