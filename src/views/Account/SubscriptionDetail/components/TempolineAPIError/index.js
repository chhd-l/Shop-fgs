import React from 'react';
import { ErrorMessage } from '@/components/Message';

const TempolineApiError = ({ error }) => {
  return error ? (
    <div className="mt-6">
      <ErrorMessage msg={error} />
    </div>
  ) : null;
};

export default TempolineApiError;
