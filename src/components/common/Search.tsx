import Input from './Input';

export default function Search() {
  return (
    <div className="w-80 text-white">
      <Input classWrapper="mb-3" name="search" label="Search..." type="text" />
      <div className=" text-center text-gray-300 text-md ">
        To search new users simply start with symbol `@`
      </div>
    </div>
  );
}
