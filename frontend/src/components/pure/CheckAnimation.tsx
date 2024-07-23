const CheckAnimation: React.FC = () => {
  return (
    <div className="check-animation">
      <div className="circle">
        <svg className="check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <style>{`
        .check-animation {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .circle {
          width: 5rem;
          height: 5rem;
          border: 3px solid darkgray;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          animation: circle-grow 0.3s ease-out forwards;
        }

        @keyframes circle-grow {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        .check {
          width: 2rem;
          height: 2rem;
          stroke: grey;
          stroke-dasharray: 31;
          stroke-dashoffset: 31;
          animation: check-draw 0.3s 0.3s ease forwards;
        }

        @keyframes check-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckAnimation;
