import { Modal as AntModal } from "antd";
import { type CSSProperties, type ReactNode } from "react";

export interface ModalStyles {
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
  mask?: CSSProperties;
  wrapper?: CSSProperties;
  content?: CSSProperties;
}

interface ModalPropTypes {
  handleOk?: () => void;
  handleCancel?: () => void;
  children?: ReactNode;
  isOpen: boolean;
  close: (b: boolean) => void;
  title: string;
  top?: string | number;
  height?: string | number;
  width?: string | number;
  maskClosable?: boolean;
  showCloseIcon?: boolean;
  styles?: ModalStyles;
}

const Modal = ({
  title,
  height,
  width,
  isOpen,
  close,
  handleOk,
  handleCancel,
  maskClosable = true,
  showCloseIcon = true,
  styles,
  children,
}: ModalPropTypes) => {
  const _handleOk = () => {
    if (handleOk) {
      handleOk();
    }
    close(false);
  };

  const _handleCancel = () => {
    if (handleCancel) {
      handleCancel();
    }
    close(false);
  };

  return (
    <>
      <AntModal
        title={title}
        open={isOpen}
        onOk={_handleOk}
        onCancel={_handleCancel}
        height={height}
        width={width}
        footer={false}
        maskClosable={maskClosable}
        closeIcon={showCloseIcon}
        centered
        style={
          {
            // top: top,
            // top: "50%",
            // bottom: "50%",
          }
        }
        styles={{
          ...styles,
        }}
      >
        {children}
      </AntModal>
    </>
  );
};

export default Modal;
