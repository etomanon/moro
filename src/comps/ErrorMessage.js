import React from 'react'

const ErrorMessage = ({error, errorText}) => {
  return (
    <>
      {
        error && <span className="text-error">
          {errorText}
        </span>
      }
    </>
  );
}

export default ErrorMessage;