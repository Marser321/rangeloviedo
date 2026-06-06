import React from 'react';

/**
 * Full-screen placeholder for scrollytelling sections while they load.
 */
export default function ScrollyPlaceholder() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0b0a08]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#c9a864] border-t-transparent" />
    </div>
  );
}
