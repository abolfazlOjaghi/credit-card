const Input = ({placeholder, label, name, handleChanges, width = "w-96 max-md:w-80", maxlength, handleBlur, error}) => {
    return (
        <div className="flex flex-col gap-y-2 text-white">
            <label htmlFor={name}>{label}</label>
            <input type="text" className={`${width} ${error && "border-red-600"} focus:outline-none px-4 py-1 border-2 rounded-xl `} name={name} id={name} placeholder={placeholder} onChange={handleChanges} maxLength={maxlength} autoComplete="off" onBlur={handleBlur} />
            {error && <span className={`text-red-500 text-sm absolute mt-18 max-md:mt-16 ${width}`}>{error}</span>}
        </div>
    )
}
export default Input
// `