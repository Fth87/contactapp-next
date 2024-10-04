interface ButtonProps {
  text: string;
  onClick: () => void;
  type: 'submit' | 'reset' | 'button' | undefined;
  disable: boolean;
}

const Button = ({ text, onClick, type, disable }: ButtonProps) => {
  return (
    <button type={type} className="bg-slate-900 text-white rounded p-5 border-black hover:bg-slate-700 active:bg-slate-600" onClick={onClick} disabled={disable} style={{ cursor: disable ? 'wait' : 'pointer' }}>
      {disable ? 'Loading..' : text}
    </button>
  );
};

export default Button;
