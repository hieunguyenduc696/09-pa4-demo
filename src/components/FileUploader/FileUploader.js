import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import classes from "./FileUploader.module.less";
import clsx from "clsx";
import update from "immutability-helper";
import { Button, Progress } from "antd";
import { RiCheckFill, RiCloseFill, RiUploadCloudFill } from "react-icons/ri";
import { Upload } from "antd";
import { createUploadDocument } from "../../api";
import { findIndex } from "lodash";
import { mapFileTypeToIcon } from "../../utils";
import { usePrevious } from "../../hooks";

const { Dragger } = Upload;

const FileUploader = forwardRef(
  (
    {
      onUploadCompleted = () => {},
      onUploading = () => {},
      onError = () => {},
      className,
      draggerClassName,
      children,
      maxFileUpload = 1,
      maxFileTotal,
    },
    ref
  ) => {
    const [uploadItems, setUploadItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalUploadSuccess, setTotalUploadSuccess] = useState(-1);
    const prevTotalItems = usePrevious(totalItems);
    const refLock = useRef(false);
    const uploadProps = {
      name: "file",
      multiple: true,
      listType: "picture",
      beforeUpload: () => false,
      showUploadList: false,
    };

    const handleUploadCompleted = () => {
      const index = findIndex(uploadItems, { error: true });
      if (index >= 0) return;

      onUploadCompleted(
        uploadItems.reduce((prevValue, value) => {
          if (value.success) {
            prevValue.push({
              id: value.id,
              fileName: value.fileName,
              name: value.name,
              createdAt: value.createdAt,
              updatedAt: value.updatedAt,
              mimeType: value.mimeType,
            });
          }

          return prevValue;
        }, [])
      );
    };

    const handleRemove = (id) => {
      const index = findIndex(uploadItems, { id });
      if (index < 0) return;

      setUploadItems(
        update(uploadItems, {
          $splice: [[index, 1]],
        })
      );

      setTotalItems((prevState) => prevState - 1);
    };

    const handleError = (id) => {
      const index = findIndex(uploadItems, { id });
      if (index < 0) return;

      setUploadItems((prevState) =>
        update(prevState, {
          [index]: {
            error: { $set: true },
          },
        })
      );

      onError();
    };

    const handleUploading = (id) => {
      const index = findIndex(uploadItems, { id });
      if (index < 0) return;

      setUploadItems((prevState) =>
        update(prevState, {
          [index]: {
            uploading: { $set: true },
          },
        })
      );
    };

    const handleChange = (e) => {
      if (refLock.current) return;
      refLock.current = true;
      const list = [];
      for (const item of e.fileList) {
        const uploadItem = {
          id: item.uid,
          name: item.name,
          fileName: "fileName",
          mimeType: "",
          createdAt: "",
          updatedAt: "",
          progress: 0,
          file: item.originFileObj,
          success: false,
          error: false,
          uploading: false,
        };
        list.push(uploadItem);
      }
      setTotalUploadSuccess(e.fileList.length - 1);

      let newUploadItems = [...uploadItems, ...list];

      if (maxFileTotal && newUploadItems.length > maxFileTotal) {
        newUploadItems = newUploadItems.slice(
          newUploadItems.length - maxFileTotal
        );
      }

      setUploadItems(newUploadItems);

      setTotalItems(newUploadItems.length);

      onUploading();

      setTimeout(() => {
        refLock.current = false;
      }, 1000);
    };

    const onUploadItemSuccess = (id, uploadItem) => {
      const index = findIndex(uploadItems, { id });
      if (index < 0) return;
      setUploadItems((prevState) =>
        update(prevState, {
          [index]: {
            id: { $set: uploadItem.uid },
            fileName: { $set: uploadItem.name },
            name: { $set: uploadItem.name },
            mimeType: { $set: uploadItem.type },
            success: { $set: true },
            error: { $set: false },
          },
        })
      );
      setTotalUploadSuccess((prevState) => prevState - 1);
    };

    useImperativeHandle(ref, () => ({
      uploadItems,
      setUploadItems,
    }));

    useEffect(() => {
      if (totalUploadSuccess < 0) {
        handleUploadCompleted();
      }
    }, [totalUploadSuccess]);

    useEffect(() => {
      if (prevTotalItems && prevTotalItems > totalItems) {
        handleUploadCompleted();
      }
    }, [prevTotalItems, totalItems]);

    return (
      <div className={clsx(classes["file-uploader"], className)}>
        <Dragger
          {...uploadProps}
          className={clsx(classes["dragger"], draggerClassName)}
          maxCount={maxFileUpload}
          onChange={handleChange}
          defaultFileList={[]}
          fileList={[]}
        >
          {children ?? (
            <>
              <p className={classes.icon}>
                <RiUploadCloudFill />
              </p>
              <p className="ant-upload-hint">
                Drag & Drop your files (docx., .pdf) here or browse Files
              </p>
            </>
          )}
        </Dragger>

        <div className={classes["upload-items"]}>
          {uploadItems &&
            uploadItems.map((item) => {
              return (
                <FileItem
                  key={`file_${item.id}`}
                  data={item}
                  onUploadItemSuccess={onUploadItemSuccess}
                  onRemove={handleRemove}
                  onError={handleError}
                  onUploading={handleUploading}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

const FileItem = ({
  onUploading = () => {},
  onRemove = () => {},
  onError = () => {},
  onUploadItemSuccess,
  data,
}) => {
  const [state, setState] = useState(data);
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);
  const fileNameWithoutExtension = useMemo(() => {
    return state.file?.name?.split(".").slice(0, -1).join(".");
  }, [state.file]);
  const ref = useRef(false);

  const fileExtension = useMemo(() => {
    return "." + state.file?.name?.split(".").pop();
  }, [state.file]);

  const onUploadProgress = (progressEvent) => {
    const percent = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );

    setState((prevState) => ({ ...prevState, progress: percent }));
  };

  const onUploadSuccess = (result) => {
    setIsUploading(false);
    setState((prevState) => ({ ...prevState, ...result, success: true }));
    onUploadItemSuccess(
      result.data.get("document").uid,
      result.data.get("document")
    );
  };

  const onUpload = () => {
    if (
      !data?.file ||
      data.success ||
      data.error ||
      ref.current ||
      data.uploading
    ) {
      return;
    }
    setIsUploading(true);
    onUploading(data.id);
    const formData = new FormData();
    formData.set("document", data.file);
    createUploadDocument(formData, onUploadProgress, onUploadSuccess).catch(
      () => {
        setIsError(true);
        onError(data.id);
      }
    );
  };

  useEffect(() => {
    onUpload();
  }, []);

  return (
    <div className={classes["file-item"]}>
      <div className={classes["file-metadata"]}>
        <img
          className={classes["file-icon"]}
          src={mapFileTypeToIcon(state.file.type || "")}
          alt="file icon"
        />
        <span
          className={clsx([classes["file-name"], isError && classes["error"]])}
        >
          {fileNameWithoutExtension}
        </span>
        <span className={clsx([isError && classes["error"]])}>
          {fileExtension}
        </span>
      </div>
      {isUploading && (
        <Progress
          percent={state.progress}
          size="small"
          showInfo={false}
          strokeWidth={2}
          className={classes["progress-bar"]}
        />
      )}
      <div className={classes["action-icons"]}>
        {isUploading && !isError && <span>Uploading...</span>}
        {((!isUploading && !isError) || data.success) && (
          <div className={clsx(classes["icon-container"], classes["success"])}>
            <RiCheckFill />
          </div>
        )}
        {(!isUploading || isError || data.success || data.error) && (
          <Button
            type="text"
            shape="circle"
            size="small"
            onClick={() => onRemove(data.id)}
            icon={
              <div
                className={clsx(classes["icon-container"], classes["error"])}
              >
                <RiCloseFill />
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default FileUploader;
