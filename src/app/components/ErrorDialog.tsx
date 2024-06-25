
import React, { useEffect, useState } from 'react';
import { type IMessageBoxEmitter, type MessageBoxProps, MessageBoxTypeEnum, MessageIconTypeEnum } from '../typings/app-typings';
import { flattenObject, isPropEmpty } from '../utils/utilfunctions';
import MessageBox from './MessageBox';
import { useApplicationContext } from '../context';
import { AppEventEnum } from '~/pages/api/api-typings';

const ErrorDialog = () => {
  const [showErrorDialog, setErrorDialogVisibility] = useState(false);
  const [dialogDetails, setDialogDetails] = useState<MessageBoxProps>();

  const {state, dispatch} = useApplicationContext();

  /**
   * On confirm button click in error dialog, close the dialog and set the reducer state.
   * @param {IMessageBoxEmitter} data
   */
  function onConfirmClick(data: IMessageBoxEmitter) {
    setErrorDialogVisibility(false);
    dispatch({type: AppEventEnum.ERROR ,payload: null});
  }

  /**
   * Constructs the error dialog props.
   */
  function constructErrDialogProp() {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = flattenObject(state?.error)

    setDialogDetails({
      type: MessageBoxTypeEnum.MESSAGE_BOX,
      iconType: MessageIconTypeEnum.ERROR,
      title: 'Oops!',
      content: `Failed with server error code (${data?.status ?? data?.statusCode}), see console for error details`,
    });
  }

  /**
   * On httpErr reducer state change, fire this effect and show error dialog.
   * @deps {IHttpErrDetails} httpErrDetails
   */
  useEffect(() => {
    if (!isPropEmpty(state.error)) {
      setErrorDialogVisibility(true);
      constructErrDialogProp();
    }
  }, [state.error]);

  return <>{showErrorDialog && <MessageBox dialogDetails={dialogDetails} confirmBtnEmitter={onConfirmClick}></MessageBox>}</>;
};

export default ErrorDialog;
