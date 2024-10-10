export const Input1 = ({ children, innerRef, ...props }: any) => {
  return (
    <input
      className="w-full border-b-2 border-slate-500 bg-inherit p-2   text-black "
      {...props}
      ref={innerRef}
    >
      {children}
    </input>
  )
}
// export const Input2 = ({ children, ...props }: any) => {
//   return (
//     <input
//       className="w-full border-2 border-indigo-200 bg-inherit p-2 text-sm font-light text-gray-900 dark:text-gray-200"
//       {...props}
//     >
//       {children}
//     </input>
//   )
// }
