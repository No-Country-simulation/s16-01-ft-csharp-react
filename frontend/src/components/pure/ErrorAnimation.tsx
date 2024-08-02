const ErrorAnimation: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center w-16 h-16">
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="spinner" />
      </div>
      <div className="absolute flex items-center justify-center w-full h-full">
        <div className="exclamation">!</div>
      </div>
      <style>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid darkgray;
          width: 100%;
          height: 100%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .exclamation {
          font-size: 2rem;
          font-weight: bold;
          color: gray;
          animation: exclamationAppear 0.5s ease-out;
        }

        @keyframes exclamationAppear {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorAnimation;
