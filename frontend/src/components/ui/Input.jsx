const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-surface-700 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-white border border-surface-200 rounded-xl 
          text-surface-800 placeholder-surface-400 focus:outline-none focus:border-primary-400 
          focus:ring-2 focus:ring-primary-100 transition-all duration-300
          ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;