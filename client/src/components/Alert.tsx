import React from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx';



type AlertProps = {
    primaryMessage: string,
    secondaryMessage: string,
    type: 'success' | 'error' | 'warning',
}

const variations = {
    color: {success: 'green', error: 'red', warning: 'yellow'},
    icon : {success: CheckCircleIcon, error: XCircleIcon, warning: ExclamationTriangleIcon}
}

export default function Alert({primaryMessage, secondaryMessage, type} : AlertProps) {
    const Icon = variations.icon[type];
    const color = variations.color[type];
  return (
    <div className={clsx('rounded-md',
      type === 'success' ? 'bg-green-50' : type === 'error' ? 'bg-red-50' : 'bg-yellow-50',
     'p-4')}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={clsx('h-5', 'w-5', 
          type === 'success' ? 'text-green-400' : type === 'error' ? 'text-red-400' : 'text-yellow-400'
          )} aria-hidden="true" />
        </div>
        <div className="ml-3">
          {primaryMessage && <h3 className={clsx('text-sm font-medium', type === 'success' ? 'text-green-800' : type === 'error' ? 'text-red-800' : 'text-yellow-800')}>
            {primaryMessage}
          </h3>}
          {secondaryMessage && <div className={clsx('mt-2 text-sm',type === 'success' ? 'text-green-700' : type === 'error' ? 'text-red-700' : 'text-yellow-700')}>
            <p>
              {secondaryMessage}
            </p>
          </div>}
        </div>
      </div>
    </div>
  )
}

