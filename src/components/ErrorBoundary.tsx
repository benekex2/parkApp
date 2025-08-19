'use client';

export const ErrorFallback = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
      <p className="text-red-500">Try refreshing the page or come back later.</p>
    </div>
  );
};
