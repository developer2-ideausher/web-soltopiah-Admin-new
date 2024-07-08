"use client";

export default function Dropdown({ data, placeholder, callback }) {
  const handler = (e) => {
    const val = e.target.value;
    const obj = data.filter((item, index) => item._id == val);
    callback(obj[0]);
  };
  return (
    <div className="w-full flex flex-wrap items-center relative ">
      <select
        onChange={handler}
        className="w-full text-sm py-3 pl-3 pr-2 cursor-pointer border rounded-lg focus:outline-none focus:border-2 focus:border-neutral4"
      >
        <option className="text-sm">{placeholder}</option>
        {data &&
          data.map((item, index) => (
            <option
              className="text-sm p-2 cursor-pointer"
              key={`${placeholder}-${index}`}
              value={item._id}
            >
              {item.title}
            </option>
          ))}
      </select>
      <span className="absolute top-3 right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9.99999 14.6874C9.75145 14.6863 9.51317 14.5882 9.33593 14.414L3.08593 8.16398C2.90981 7.98786 2.81087 7.74899 2.81087 7.49992C2.81087 7.25085 2.90981 7.01197 3.08593 6.83585C3.26205 6.65973 3.50092 6.56079 3.74999 6.56079C3.99907 6.56079 4.23794 6.65973 4.41406 6.83585L9.99999 12.4218L15.5859 6.83585C15.7621 6.65973 16.0009 6.56079 16.25 6.56079C16.4991 6.56079 16.7379 6.65973 16.9141 6.83585C17.0902 7.01197 17.1891 7.25085 17.1891 7.49992C17.1891 7.74899 17.0902 7.98786 16.9141 8.16398L10.6641 14.414C10.4868 14.5882 10.2485 14.6863 9.99999 14.6874Z"
            fill="#666576"
          />
        </svg>
      </span>
    </div>
  );
}
