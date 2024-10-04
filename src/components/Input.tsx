interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const Input = ({ type, placeholder, value, onChange, name }: InputProps) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-solid border-slate-900 rounded shadow p-3 text-black"
      required
    />
  );
};
export default Input;
