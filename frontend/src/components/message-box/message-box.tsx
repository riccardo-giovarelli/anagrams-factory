import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

import { mergeClassNames } from '../../utils/style';
import { AlertMessageType } from './message-box.type';

const MessageBox = ({ type, message }: AlertMessageType) => {
  return (
    <div
      className={mergeClassNames(
        type === 'warning'
          ? 'bg-yellow-50'
          : type === 'error'
          ? 'bg-red-50'
          : type === 'success'
          ? 'bg-green-50'
          : type === 'message'
          ? 'bg-blue-50'
          : '',
        'rounded-md p-4 w-full'
      )}
    >
      <div className='flex'>
        <div className='flex-shrink-0'>
          {type === 'warning' ? (
            <ExclamationTriangleIcon className='text-yellow-800 h-5 w-5' aria-hidden='true' />
          ) : type === 'error' ? (
            <XCircleIcon className='text-red-800 h-5 w-5' aria-hidden='true' />
          ) : type === 'success' ? (
            <CheckCircleIcon className='text-green-800 h-5 w-5' aria-hidden='true' />
          ) : type === 'message' ? (
            <InformationCircleIcon className='text-blue-700 h-5 w-5' aria-hidden='true' />
          ) : (
            <></>
          )}
        </div>
        <div className='ml-3'>
          <h3
            className={mergeClassNames(
              type === 'warning'
                ? 'text-yellow-800'
                : type === 'error'
                ? 'text-red-700'
                : type === 'success'
                ? 'text-green-700'
                : type === 'message'
                ? 'text-blue-700'
                : '',
              'text-sm font-medium'
            )}
          >
            {type === 'warning' ? 'Attention!' : type === 'error' ? 'Error!' : type === 'success' ? 'Success!' : type === 'message' ? 'Message' : ''}
          </h3>
          <div
            className={mergeClassNames(
              type === 'warning'
                ? 'text-yellow-800'
                : type === 'error'
                ? 'text-red-700'
                : type === 'success'
                ? 'text-green-700'
                : type === 'message'
                ? 'text-blue-700'
                : '',
              'mt-2 text-sm'
            )}
          >
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
