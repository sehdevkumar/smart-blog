export enum MessageIconTypeEnum {
  ERROR = 0,
  SUCCESS = 1,
  INFO = 2,
  WARNING = 3,
}

export enum PopupActionEnum {
  CANCEL = 1,
  SUBMIT = 2,
}

export interface IMessageBoxEmitter {
  action: PopupActionEnum;
  confirmData?: any;
}


export enum MessageBoxTypeEnum {
  MESSAGE_BOX = 1,
}

export interface MessageBoxProps {
  type: MessageBoxTypeEnum;
  title: string;
  content: string;
  iconType?: MessageIconTypeEnum;
  confirmMsg?: string;
  closeMsg?: string;
}
